import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { academicUser } from "@/lib/academic/shared";
import {
  getBatches,
  getSessions,
  getAssignments,
  getEnrolments,
  formattedDate,
} from "@/lib/academic/queries";
import AcademicForm from "@/components/academic/AcademicForm";
import AcademicTable from "@/components/academic/AcademicTable";
import {
  createSession,
  createAssignment,
  recordAttendance,
} from "@/app/portal/owner/operations/actions";

export const metadata: Metadata = {
  title: "My Teaching Classes | Future Minds",
  robots: { index: false, follow: false },
};

async function TeacherClassesContent() {
  const user = await academicUser(["teacher"]);

  const [
    batches,
    sessions,
    assignments,
    enrolments,
  ] = await Promise.all([
    getBatches(user.id),
    getSessions(user.id),
    getAssignments(user.id),
    getEnrolments(user.id),
  ]);

  const batchOptions = batches.map((batch) => ({
    value: batch.id,
    label: `${batch.course_title} — ${batch.name}`,
  }));

  return (
    <div className="fm-portal-container fm-academic">
      <Link className="fm-portal-back" href="/portal/teacher">
        ← Teacher dashboard
      </Link>

      <span className="fm-portal-label">
        TEACHER WORKSPACE
      </span>

      <h1>My Classes</h1>

      <p>
        Welcome, {user.fullName}. Your assigned
        batches, class timetable and coursework
        appear below.
      </p>

      <div className="fm-academic-stats">
        <div><strong>{batches.length}</strong><span>Assigned batches</span></div>
        <div><strong>{sessions.length}</strong><span>Sessions</span></div>
        <div><strong>{assignments.length}</strong><span>Assignments</span></div>
      </div>

      <AcademicTable
        title="My Assigned Batches"
        headers={["Course", "Batch", "Status"]}
        rows={batches.map((batch) => [
          batch.course_title,
          batch.name,
          batch.status,
        ])}
      />

      <div className="fm-academic-grid">
        <AcademicForm
          title="Schedule My Class"
          button="Schedule class"
          action={createSession}
          fields={[
            {
              name: "batchId",
              label: "My batch",
              type: "select",
              options: batchOptions,
              required: true,
            },
            {
              name: "title",
              label: "Class title",
              maxLength: 150,
              required: true,
            },
            {
              name: "startsAt",
              label: "Starts",
              type: "datetime-local",
              required: true,
            },
            {
              name: "endsAt",
              label: "Ends",
              type: "datetime-local",
              required: true,
            },
            {
              name: "meetingUrl",
              label: "HTTPS meeting link (optional)",
              type: "url",
            },
          ]}
        />

        <AcademicForm
          title="Create Homework"
          button="Create assignment"
          action={createAssignment}
          fields={[
            {
              name: "batchId",
              label: "My batch",
              type: "select",
              options: batchOptions,
              required: true,
            },
            {
              name: "title",
              label: "Assignment title",
              maxLength: 150,
              required: true,
            },
            {
              name: "description",
              label: "Instructions",
              type: "textarea",
              maxLength: 5000,
            },
            {
              name: "dueAt",
              label: "Due date (optional)",
              type: "datetime-local",
            },
          ]}
        />

        <AcademicForm
          title="Mark Attendance"
          button="Save attendance"
          action={recordAttendance}
          fields={[
            {
              name: "sessionId",
              label: "My session",
              type: "select",
              required: true,
              options: sessions.map((session) => ({
                value: session.id,
                label: `${session.batch_name} — ${session.title}`,
              })),
            },
            {
              name: "studentId",
              label: "Student",
              type: "select",
              required: true,
              options: Array.from(
                new Map(
                  enrolments
                    .filter(
                      (record) => record.status === "active"
                    )
                    .map((record) => [
                      record.student_id,
                      {
                        value: record.student_id,
                        label: record.student_name,
                      },
                    ])
                ).values()
              ),
            },
            {
              name: "status",
              label: "Attendance status",
              type: "select",
              required: true,
              options: [
                { value: "present", label: "Present" },
                { value: "absent", label: "Absent" },
                { value: "late", label: "Late" },
                { value: "excused", label: "Excused" },
              ],
            },
          ]}
        />
      </div>

      <AcademicTable
        title="My Timetable"
        headers={["Class", "Batch", "Starts", "Ends"]}
        rows={sessions.map((session) => [
          session.title,
          session.batch_name,
          formattedDate(session.starts_at),
          formattedDate(session.ends_at),
        ])}
      />

      <AcademicTable
        title="My Assignments"
        headers={["Title", "Batch", "Deadline"]}
        rows={assignments.map((assignment) => [
          assignment.title,
          assignment.batch_name,
          formattedDate(assignment.due_at),
        ])}
      />

      <AcademicTable
        title="My Students"
        headers={["Student", "Batch", "Status"]}
        rows={enrolments.map((record) => [
          record.student_name,
          record.batch_name,
          record.status,
        ])}
      />
    </div>
  );
}

export default function TeacherClassesPage() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading teaching workspace...</p>}>
        <TeacherClassesContent />
      </Suspense>
    </main>
  );
}
