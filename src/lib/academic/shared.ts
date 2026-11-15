import "server-only";

import { getDatabasePool } from "@/lib/database/pool";
import {
  getAuthenticatedUser,
  type AuthenticatedUser,
} from "@/lib/auth/session";
import { redirect } from "next/navigation";

export type ActionResult = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialResult: ActionResult = {
  status: "idle",
  message: "",
};

export function value(
  form: FormData,
  name: string
): string {
  const input = form.get(name);

  return typeof input === "string"
    ? input.trim()
    : "";
}

export function validUuid(input: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    input
  );
}

export async function academicUser(
  allowed: Array<
    "owner" | "teacher" | "student" | "technical_admin"
  >
): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowed.some((role) => user.roles.includes(role))) {
    redirect("/portal");
  }

  return user;
}

export async function teacherHasBatch(
  teacherId: string,
  batchId: string
): Promise<boolean> {
  const pool = getDatabasePool();

  const result = await pool.query(
    `
      SELECT 1
      FROM batch_teachers
      WHERE teacher_id = $1
        AND batch_id = $2
      LIMIT 1
    `,
    [teacherId, batchId]
  );

  return result.rowCount === 1;
}

export async function studentHasBatch(
  studentId: string,
  batchId: string
): Promise<boolean> {
  const pool = getDatabasePool();

  const result = await pool.query(
    `
      SELECT 1
      FROM enrolments
      WHERE student_id = $1
        AND batch_id = $2
        AND status = 'active'
      LIMIT 1
    `,
    [studentId, batchId]
  );

  return result.rowCount === 1;
}

export function safeError(
  message: string
): ActionResult {
  return {
    status: "error",
    message,
  };
}

export function success(
  message: string
): ActionResult {
  return {
    status: "success",
    message,
  };
}

export function isDatabaseConflict(
  error: unknown
): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export function logAcademicFailure(
  operation: string
): void {
  console.error(`Academic operation failed: ${operation}`);
}
