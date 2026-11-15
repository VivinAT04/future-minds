import "server-only";

import { getDatabasePool } from "@/lib/database/pool";

export type AccountOption = {
  id: string;
  full_name: string;
  email: string;
};

export type BatchOption = {
  id: string;
  name: string;
  status: string;
  course_title: string;
};

export type SessionRow = {
  id: string;
  title: string;
  batch_id: string;
  batch_name: string;
  starts_at: Date;
  ends_at: Date;
  meeting_url: string | null;
};

export type AssignmentRow = {
  id: string;
  title: string;
  description: string | null;
  batch_id: string;
  batch_name: string;
  due_at: Date | null;
};

export type EnrolmentRow = {
  student_id: string;
  student_name: string;
  batch_id: string;
  batch_name: string;
  status: string;
};

export function formattedDate(
  value: Date | string | null
): string {
  if (!value) return "Not scheduled";

  return new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London",
  });
}

export async function getAccounts(
  role: "teacher" | "student"
): Promise<AccountOption[]> {
  const pool = getDatabasePool();

  const result = await pool.query<AccountOption>(
    `
      SELECT
        u.id,
        u.full_name,
        u.email
      FROM app_users u
      JOIN user_role_assignments r
        ON r.user_id = u.id
      WHERE r.role = $1::user_role
        AND u.status = 'active'
      ORDER BY u.full_name
      LIMIT 250
    `,
    [role]
  );

  return result.rows;
}

export async function getBatches(
  teacherId?: string
): Promise<BatchOption[]> {
  const pool = getDatabasePool();

  const result = await pool.query<BatchOption>(
    `
      SELECT
        b.id,
        b.name,
        b.status::text AS status,
        c.title AS course_title
      FROM batches b
      JOIN courses c
        ON c.id = b.course_id
      WHERE (
        $1::uuid IS NULL
        OR EXISTS (
          SELECT 1
          FROM batch_teachers bt
          WHERE bt.batch_id = b.id
            AND bt.teacher_id = $1
        )
      )
      ORDER BY c.title, b.name
      LIMIT 250
    `,
    [teacherId ?? null]
  );

  return result.rows;
}

export async function getSessions(
  teacherId?: string,
  studentId?: string
): Promise<SessionRow[]> {
  const pool = getDatabasePool();

  const result = await pool.query<SessionRow>(
    `
      SELECT
        s.id,
        s.title,
        s.batch_id,
        b.name AS batch_name,
        s.starts_at,
        s.ends_at,
        s.meeting_url
      FROM class_sessions s
      JOIN batches b ON b.id = s.batch_id
      WHERE (
        $1::uuid IS NULL
        OR EXISTS (
          SELECT 1
          FROM batch_teachers bt
          WHERE bt.batch_id = b.id
            AND bt.teacher_id = $1
        )
      )
      AND (
        $2::uuid IS NULL
        OR EXISTS (
          SELECT 1
          FROM enrolments e
          WHERE e.batch_id = b.id
            AND e.student_id = $2
            AND e.status = 'active'
        )
      )
      ORDER BY s.starts_at DESC
      LIMIT 250
    `,
    [teacherId ?? null, studentId ?? null]
  );

  return result.rows;
}

export async function getAssignments(
  teacherId?: string,
  studentId?: string
): Promise<AssignmentRow[]> {
  const pool = getDatabasePool();

  const result = await pool.query<AssignmentRow>(
    `
      SELECT
        a.id,
        a.title,
        a.description,
        a.batch_id,
        b.name AS batch_name,
        a.due_at
      FROM assignments a
      JOIN batches b ON b.id = a.batch_id
      WHERE (
        $1::uuid IS NULL
        OR EXISTS (
          SELECT 1
          FROM batch_teachers bt
          WHERE bt.batch_id = b.id
            AND bt.teacher_id = $1
        )
      )
      AND (
        $2::uuid IS NULL
        OR EXISTS (
          SELECT 1
          FROM enrolments e
          WHERE e.batch_id = b.id
            AND e.student_id = $2
            AND e.status = 'active'
        )
      )
      ORDER BY a.created_at DESC
      LIMIT 250
    `,
    [teacherId ?? null, studentId ?? null]
  );

  return result.rows;
}

export async function getEnrolments(
  teacherId?: string
): Promise<EnrolmentRow[]> {
  const pool = getDatabasePool();

  const result = await pool.query<EnrolmentRow>(
    `
      SELECT
        e.student_id,
        u.full_name AS student_name,
        e.batch_id,
        b.name AS batch_name,
        e.status::text AS status
      FROM enrolments e
      JOIN app_users u ON u.id = e.student_id
      JOIN batches b ON b.id = e.batch_id
      WHERE (
        $1::uuid IS NULL
        OR EXISTS (
          SELECT 1
          FROM batch_teachers bt
          WHERE bt.batch_id = b.id
            AND bt.teacher_id = $1
        )
      )
      ORDER BY b.name, u.full_name
      LIMIT 500
    `,
    [teacherId ?? null]
  );

  return result.rows;
}
