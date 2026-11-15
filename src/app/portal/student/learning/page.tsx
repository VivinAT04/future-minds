import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { academicUser } from "@/lib/academic/shared";
import { getDatabasePool } from "@/lib/database/pool";
import {
  getSessions,
  getAssignments,
  formattedDate,
} from "@/lib/academic/queries";
import AcademicTable from "@/components/academic/AcademicTable";

export const metadata: Metadata = {
  title: "My Learning | Future Minds",
  robots: { index: false, follow: false },
};

type StudentBatch = {
  batch_name: string;
  course_title: string;
  status: string;
};

type AttendanceRow = {
  title: string;
  status: string;
  starts_at: Date;
};

async function StudentLearningContent() {
  const user = await academicUser(["student"]);
  const pool = getDatabasePool();

  const [batches, attendance, sessions, assignments] =
    await Promise.all([
      pool.query<StudentBatch>(
        `
          SELECT
            b.name AS batch_name,
            c.title AS course_title,
            e.status::text AS status
          FROM enrolments e
          JOIN batches b ON b.id = e.batch_id
          JOIN courses c ON c.id = b.course_id
          WHERE e.student_id = $1
          ORDER BY e.enrolled_at DESC
          LIMIT 200
        `,
        [user.id]
      ),

      pool.query<AttendanceRow>(
        `
          SELECT
            s.title,
            s.starts_at,
            a.status::text AS status
          FROM attendance a
          JOIN class_sessions s
            ON s.id = a.session_id
          JOIN enrolments e
            ON e.batch_id = s.batch_id
           AND e.student_id = a.student_id
           AND e.status = 'active'
          WHERE a.student_id = $1
          ORDER BY s.starts_at DESC
          LIMIT 200
        `,
        [user.id]
      ),

      getSessions(undefined, user.id),
      getAssignments(undefined, user.id),
    ]);

  return (
    <div className="fm-portal-container fm-academic">
      <Link className="fm-portal-back" href="/portal/student">
        ← Student dashboard
      </Link>

      <span className="fm-portal-label">
        STUDENT LEARNING WORKSPACE
      </span>

      <h1>My Learning</h1>

      <p>
        Welcome, {user.fullName}. Review your
        enrolled courses, timetable, homework and
        attendance.
      </p>

      <div className="fm-academic-stats">
        <div>
          <strong>{batches.rows.length}</strong>
          <span>Enrolments</span>
        </div>

        <div>
          <strong>{sessions.length}</strong>
          <span>Class sessions</span>
        </div>

        <div>
          <strong>{assignments.length}</strong>
          <span>Assignments</span>
        </div>
      </div>

      <AcademicTable
        title="My Courses"
        headers={["Course", "Batch", "Status"]}
        rows={batches.rows.map((batch) => [
          batch.course_title,
          batch.batch_name,
          batch.status,
        ])}
      />

      <section className="fm-academic-panel">
        <h2>My Class Timetable</h2>

        {sessions.length === 0 ? (
          <p>No classes are scheduled yet.</p>
        ) : (
          <div className="fm-academic-session-list">
            {sessions.map((session) => (
              <article key={session.id}>
                <h3>{session.title}</h3>

                <p>{session.batch_name}</p>

                <p>
                  {formattedDate(session.starts_at)}
                  {" – "}
                  {formattedDate(session.ends_at)}
                </p>

                {session.meeting_url && (
                  <a
                    href={session.meeting_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join externally hosted class
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="fm-academic-panel">
        <h2>My Homework</h2>

        {assignments.length === 0 ? (
          <p>No assignments have been posted yet.</p>
        ) : (
          <div className="fm-academic-session-list">
            {assignments.map((assignment) => (
              <article key={assignment.id}>
                <h3>{assignment.title}</h3>

                <p>{assignment.batch_name}</p>

                {assignment.description && (
                  <p>{assignment.description}</p>
                )}

                <p>
                  Due: {formattedDate(assignment.due_at)}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <AcademicTable
        title="My Attendance"
        headers={["Class", "Date", "Attendance"]}
        rows={attendance.rows.map((record) => [
          record.title,
          formattedDate(record.starts_at),
          record.status,
        ])}
      />

      <p className="fm-academic-notice">
        Homework submission uploads and online
        payments are not yet enabled.
        Contact the centre for assistance.
      </p>
    </div>
  );
}

export default function StudentLearningPage() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading learning records...</p>}>
        <StudentLearningContent />
      </Suspense>
    </main>
  );
}
