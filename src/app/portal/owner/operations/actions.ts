"use server";

import { revalidatePath } from "next/cache";
import { getDatabasePool } from "@/lib/database/pool";
import {
  academicUser,
  validUuid,
  value,
  safeError,
  success,
  isDatabaseConflict,
  logAcademicFailure,
  type ActionResult,
} from "@/lib/academic/shared";

function refresh(): void {
  revalidatePath("/portal/owner/operations");
  revalidatePath("/portal/teacher/classes");
  revalidatePath("/portal/student/learning");
}

export async function assignTeacher(
  _previous: ActionResult,
  form: FormData
): Promise<ActionResult> {
  await academicUser(["owner"]);

  const teacherId = value(form, "teacherId");
  const batchId = value(form, "batchId");

  if (!validUuid(teacherId) || !validUuid(batchId)) {
    return safeError("Select a valid teacher and batch.");
  }

  try {
    const pool = getDatabasePool();

    const result = await pool.query(
      `
        INSERT INTO batch_teachers (
          batch_id,
          teacher_id
        )
        SELECT
          b.id,
          u.id
        FROM batches b
        CROSS JOIN app_users u
        JOIN user_role_assignments r
          ON r.user_id = u.id
         AND r.role = 'teacher'
        WHERE b.id = $1
          AND u.id = $2
          AND u.status = 'active'
        ON CONFLICT (batch_id, teacher_id)
        DO NOTHING
        RETURNING batch_id
      `,
      [batchId, teacherId]
    );

    if (result.rowCount === 0) {
      return safeError(
        "Teacher was already assigned, or the selected account or batch is invalid."
      );
    }

    refresh();

    return success("Teacher assigned successfully.");
  } catch {
    logAcademicFailure("assignTeacher");

    return safeError("Unable to assign this teacher.");
  }
}

export async function enrolStudent(
  _previous: ActionResult,
  form: FormData
): Promise<ActionResult> {
  await academicUser(["owner"]);

  const studentId = value(form, "studentId");
  const batchId = value(form, "batchId");

  if (!validUuid(studentId) || !validUuid(batchId)) {
    return safeError("Select a valid student and batch.");
  }

  const pool = getDatabasePool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      "SELECT pg_advisory_xact_lock(hashtext($1), 101)",
      [batchId]
    );

    const result = await client.query(
      `
        INSERT INTO enrolments (
          batch_id,
          student_id,
          status
        )
        SELECT
          b.id,
          u.id,
          'active'::enrolment_status
        FROM batches b
        JOIN app_users u
          ON u.id = $2
        JOIN user_role_assignments r
          ON r.user_id = u.id
         AND r.role = 'student'
        WHERE b.id = $1
          AND u.status = 'active'
          AND b.status <> 'cancelled'
          AND (
            b.capacity IS NULL
            OR (
              SELECT count(*)
              FROM enrolments e
              WHERE e.batch_id = b.id
                AND e.status = 'active'
            ) < b.capacity
          )
        ON CONFLICT (batch_id, student_id)
        DO NOTHING
        RETURNING id
      `,
      [batchId, studentId]
    );

    if (result.rowCount !== 1) {
      await client.query("ROLLBACK");

      return safeError(
        "Enrolment unavailable. Check capacity, account status and existing enrolments."
      );
    }

    await client.query("COMMIT");

    refresh();

    return success("Student enrolled successfully.");
  } catch {
    await client.query("ROLLBACK").catch(() => {});

    logAcademicFailure("enrolStudent");

    return safeError("Unable to enrol this student.");
  } finally {
    client.release();
  }
}

export async function changeBatchStatus(
  _previous: ActionResult,
  form: FormData
): Promise<ActionResult> {
  await academicUser(["owner"]);

  const batchId = value(form, "batchId");
  const status = value(form, "status");

  if (!validUuid(batchId)) {
    return safeError("Invalid batch.");
  }

  if (!["draft", "active", "completed"].includes(status)) {
    return safeError("Invalid batch status.");
  }

  try {
    const pool = getDatabasePool();

    const result = await pool.query(
      `
        UPDATE batches
        SET status = $2::batch_status
        WHERE id = $1
          AND status <> 'cancelled'
        RETURNING id
      `,
      [batchId, status]
    );

    if (result.rowCount !== 1) {
      return safeError("Batch not found or cannot be modified.");
    }

    refresh();

    return success("Batch status updated.");
  } catch {
    logAcademicFailure("changeBatchStatus");

    return safeError("Unable to update batch status.");
  }
}

export async function createSession(
  _previous: ActionResult,
  form: FormData
): Promise<ActionResult> {
  const user = await academicUser(["owner", "teacher"]);

  const batchId = value(form, "batchId");
  const title = value(form, "title");
  const start = value(form, "startsAt");
  const end = value(form, "endsAt");
  const meetingUrl = value(form, "meetingUrl");

  if (!validUuid(batchId)) {
    return safeError("Select a valid batch.");
  }

  if (title.length < 3 || title.length > 150) {
    return safeError("Session title must contain 3–150 characters.");
  }

  const startsAt = new Date(start);
  const endsAt = new Date(end);

  if (
    !Number.isFinite(startsAt.getTime()) ||
    !Number.isFinite(endsAt.getTime()) ||
    endsAt <= startsAt
  ) {
    return safeError("Enter valid start and end times.");
  }

  const duration =
    endsAt.getTime() - startsAt.getTime();

  if (duration > 8 * 60 * 60 * 1000) {
    return safeError("A session cannot exceed eight hours.");
  }

  if (meetingUrl) {
    try {
      const url = new URL(meetingUrl);

      if (
        url.protocol !== "https:" ||
        meetingUrl.length > 1000
      ) {
        return safeError("Enter a valid HTTPS meeting URL.");
      }
    } catch {
      return safeError("Enter a valid HTTPS meeting URL.");
    }
  }

  try {
    const pool = getDatabasePool();

    const result = await pool.query(
      `
        INSERT INTO class_sessions (
          batch_id,
          title,
          starts_at,
          ends_at,
          meeting_provider,
          meeting_url
        )
        SELECT
          b.id,
          $2,
          $3::timestamptz,
          $4::timestamptz,
          CASE
            WHEN $5 = '' THEN NULL
            ELSE 'external'
          END,
          NULLIF($5, '')
        FROM batches b
        WHERE b.id = $1
          AND b.status <> 'cancelled'
          AND (
            $6::boolean
            OR EXISTS (
              SELECT 1
              FROM batch_teachers bt
              WHERE bt.batch_id = b.id
                AND bt.teacher_id = $7
            )
          )
        RETURNING id
      `,
      [
        batchId,
        title,
        startsAt.toISOString(),
        endsAt.toISOString(),
        meetingUrl,
        user.roles.includes("owner"),
        user.id,
      ]
    );

    if (result.rowCount !== 1) {
      return safeError(
        "You are not assigned to this batch, or the batch is unavailable."
      );
    }

    refresh();

    return success("Class session scheduled.");
  } catch {
    logAcademicFailure("createSession");

    return safeError("Unable to schedule the class.");
  }
}

export async function createAssignment(
  _previous: ActionResult,
  form: FormData
): Promise<ActionResult> {
  const user = await academicUser(["owner", "teacher"]);

  const batchId = value(form, "batchId");
  const title = value(form, "title");
  const description = value(form, "description");
  const due = value(form, "dueAt");

  if (!validUuid(batchId)) {
    return safeError("Select a valid batch.");
  }

  if (title.length < 3 || title.length > 150) {
    return safeError("Assignment title must contain 3–150 characters.");
  }

  if (description.length > 5000) {
    return safeError("Assignment instructions are too long.");
  }

  let dueAt: string | null = null;

  if (due) {
    const date = new Date(due);

    if (!Number.isFinite(date.getTime())) {
      return safeError("Invalid due date.");
    }

    dueAt = date.toISOString();
  }

  try {
    const pool = getDatabasePool();

    const result = await pool.query(
      `
        INSERT INTO assignments (
          batch_id,
          title,
          description,
          due_at,
          created_by
        )
        SELECT
          b.id,
          $2,
          NULLIF($3, ''),
          $4::timestamptz,
          $5
        FROM batches b
        WHERE b.id = $1
          AND b.status <> 'cancelled'
          AND (
            $6::boolean
            OR EXISTS (
              SELECT 1
              FROM batch_teachers bt
              WHERE bt.batch_id = b.id
                AND bt.teacher_id = $5
            )
          )
        RETURNING id
      `,
      [
        batchId,
        title,
        description,
        dueAt,
        user.id,
        user.roles.includes("owner"),
      ]
    );

    if (result.rowCount !== 1) {
      return safeError(
        "You are not assigned to this batch, or the batch is unavailable."
      );
    }

    refresh();

    return success("Assignment created.");
  } catch {
    logAcademicFailure("createAssignment");

    return safeError("Unable to create the assignment.");
  }
}

export async function recordAttendance(
  _previous: ActionResult,
  form: FormData
): Promise<ActionResult> {
  const user = await academicUser(["owner", "teacher"]);

  const sessionId = value(form, "sessionId");
  const studentId = value(form, "studentId");
  const status = value(form, "status");

  if (!validUuid(sessionId) || !validUuid(studentId)) {
    return safeError("Select a valid session and student.");
  }

  if (
    !["present", "absent", "late", "excused"].includes(status)
  ) {
    return safeError("Invalid attendance status.");
  }

  try {
    const pool = getDatabasePool();

    const result = await pool.query(
      `
        INSERT INTO attendance (
          session_id,
          student_id,
          status,
          recorded_by,
          recorded_at
        )
        SELECT
          s.id,
          e.student_id,
          $3::attendance_status,
          $4,
          now()
        FROM class_sessions s
        JOIN enrolments e
          ON e.batch_id = s.batch_id
         AND e.student_id = $2
         AND e.status = 'active'
        WHERE s.id = $1
          AND (
            $5::boolean
            OR EXISTS (
              SELECT 1
              FROM batch_teachers bt
              WHERE bt.batch_id = s.batch_id
                AND bt.teacher_id = $4
            )
          )
        ON CONFLICT (session_id, student_id)
        DO UPDATE SET
          status = EXCLUDED.status,
          recorded_by = EXCLUDED.recorded_by,
          recorded_at = now()
        RETURNING session_id
      `,
      [
        sessionId,
        studentId,
        status,
        user.id,
        user.roles.includes("owner"),
      ]
    );

    if (result.rowCount !== 1) {
      return safeError(
        "Student is not actively enrolled in this session or access was denied."
      );
    }

    refresh();

    return success("Attendance recorded.");
  } catch (error) {
    if (isDatabaseConflict(error)) {
      return safeError("Conflicting attendance record.");
    }

    logAcademicFailure("recordAttendance");

    return safeError("Unable to record attendance.");
  }
}
