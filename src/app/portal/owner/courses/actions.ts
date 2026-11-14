"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guards";
import { getDatabasePool } from "@/lib/database/pool";

export type ManagementActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialManagementState: ManagementActionState = {
  status: "idle",
  message: "",
};

function field(form: FormData, name: string): string {
  const value = form.get(name);

  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function createCourse(
  _previous: ManagementActionState,
  form: FormData
): Promise<ManagementActionState> {
  await requireRole("owner");

  const code = field(form, "code").toUpperCase();
  const title = field(form, "title");
  const description = field(form, "description");

  if (!/^[A-Z0-9][A-Z0-9_-]{2,23}$/.test(code)) {
    return {
      status: "error",
      message:
        "Course code must contain 3–24 letters, numbers, underscores or hyphens.",
    };
  }

  if (title.length < 3 || title.length > 150) {
    return {
      status: "error",
      message: "Course title must contain 3–150 characters.",
    };
  }

  if (description.length > 1000) {
    return {
      status: "error",
      message: "Description must not exceed 1000 characters.",
    };
  }

  try {
    const pool = getDatabasePool();

    await pool.query(
      `
        INSERT INTO courses (
          code,
          title,
          description,
          is_published
        )
        VALUES ($1, $2, $3, false)
      `,
      [code, title, description || null]
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return {
        status: "error",
        message: "A course with this code already exists.",
      };
    }

    console.error("Course creation failed");

    return {
      status: "error",
      message:
        "The course could not be created. Please try again.",
    };
  }

  revalidatePath("/portal/owner/courses");

  return {
    status: "success",
    message: "Course created as an unpublished draft.",
  };
}

export async function createBatch(
  _previous: ManagementActionState,
  form: FormData
): Promise<ManagementActionState> {
  await requireRole("owner");

  const courseId = field(form, "courseId");
  const name = field(form, "name");
  const capacityInput = field(form, "capacity");

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      courseId
    )
  ) {
    return {
      status: "error",
      message: "Select a valid course.",
    };
  }

  if (name.length < 3 || name.length > 100) {
    return {
      status: "error",
      message: "Batch name must contain 3–100 characters.",
    };
  }

  const capacity = Number(capacityInput);

  if (
    !/^\d+$/.test(capacityInput) ||
    !Number.isSafeInteger(capacity) ||
    capacity < 1 ||
    capacity > 500
  ) {
    return {
      status: "error",
      message: "Capacity must be between 1 and 500.",
    };
  }

  try {
    const pool = getDatabasePool();

    const result = await pool.query(
      `
        INSERT INTO batches (
          course_id,
          name,
          capacity,
          status
        )
        SELECT
          id,
          $2,
          $3,
          'draft'::batch_status
        FROM courses
        WHERE id = $1
        RETURNING id
      `,
      [courseId, name, capacity]
    );

    if (result.rowCount !== 1) {
      return {
        status: "error",
        message: "The selected course was not found.",
      };
    }
  } catch {
    console.error("Batch creation failed");

    return {
      status: "error",
      message:
        "The batch could not be created. Please try again.",
    };
  }

  revalidatePath("/portal/owner/courses");

  return {
    status: "success",
    message: "Batch created in draft status.",
  };
}
