import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { academicUser } from "@/lib/academic/shared";
import {
  getAccounts,
  getBatches,
  getSessions,
  getAssignments,
  getEnrolments,
  formattedDate,
} from "@/lib/academic/queries";
import AcademicForm from "@/components/academic/AcademicForm";
import AcademicTable from "@/components/academic/AcademicTable";
import {
  assignTeacher,
  enrolStudent,
  changeBatchStatus,
  createSession,
  createAssignment,
  recordAttendance,
} from "./actions";

export const metadata: Metadata = {
  title: "Academic Operations | Future Minds",
  robots: { index: false, follow: false },
};

async function OperationsContent() {
  const user = await academicUser(["owner"]);

  const [
    teachers,
    students,
    batches,
    sessions,
    assignments,
    enrolments,
  ] = await Promise.all([
    getAccounts("teacher"),
    getAccounts("student"),
    getBatches(),
    getSessions(),
    getAssignments(),
    getEnrolments(),
  ]);

  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.id,
    label: `${teacher.full_name} (${teacher.email})`,
  }));

  const studentOptions = students.map((student) => ({
    value: student.id,
    label: `${student.full_name} (${student.email})`,
  }));

  const batchOptions = batches.map((batch) => ({
    value: batch.id,
    label: `${batch.course_title} — ${batch.name}`,
  }));

  const sessionOptions = sessions.map((session) => ({
    value: session.id,
    label: `${session.batch_name} — ${session.title}`,
  }));

  return (
    <div className="fm-portal-container fm-academic">
      <Link className="fm-portal-back" href="/portal/owner">
        ← Owner dashboard
      </Link>

      <span className="fm-portal-label">
        CENTRE ADMINISTRATION
      </span>

      <h1>Academic Operations</h1>

      <p>
        Signed in as {user.fullName}. Assign teachers,
        manage enrolments, schedule lessons and maintain
        academic records.
      </p>

      <div className="fm-academic-stats">
        <div><strong>{teachers.length}</strong><span>Teachers</span></div>
        <div><strong>{students.length}</strong><span>Students</span></div>
        <div><strong>{batches.length}</strong><span>Batches</span></div>
        <div><strong>{enrolments.length}</strong><span>Enrolments</span></div>
      </div>

      <div className="fm-academic-grid">
        <AcademicForm
          title="Assign Teacher"
          description="Connect an approved teacher account to a batch."
          button="Assign teacher"
          action={assignTeacher}
          fields={[
            {
              name: "teacherId",
              label: "Teacher",
              type: "select",
              options: teacherOptions,
              required: true,
            },
            {
              name: "batchId",
              label: "Batch",
              type: "select",
              options: batchOptions,
              required: true,
            },
          ]}
        />

        <AcademicForm
          title="Enrol Student"
          description="Add an active student to a batch with capacity checks."
          button="Enrol student"
          action={enrolStudent}
          fields={[
            {
              name: "studentId",
              label: "Student",
              type: "select",
              options: studentOptions,
              required: true,
            },
            {
              name: "batchId",
              label: "Batch",
              type: "select",
              options: batchOptions,
              required: true,
            },
          ]}
        />

        <AcademicForm
          title="Batch Status"
          description="Move a teaching batch between draft, active and completed."
          button="Update batch"
          action={changeBatchStatus}
          fields={[
            {
              name: "batchId",
              label: "Batch",
              type: "select",
              options: batchOptions,
              required: true,
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              required: true,
              options: [
                { value: "draft", label: "Draft" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" },
              ],
            },
          ]}
        />

        <AcademicForm
          title="Schedule Class"
          description="Set lesson times and optionally link an externally created meeting."
          button="Schedule class"
          action={createSession}
          fields={[
            {
              name: "batchId",
              label: "Batch",
              type: "select",
              options: batchOptions,
              required: true,
            },
            {
              name: "title",
              label: "Class title",
              required: true,
              maxLength: 150,
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
              label: "HTTPS meeting URL (optional)",
              type: "url",
              maxLength: 1000,
            },
          ]}
        />

        <AcademicForm
          title="Create Assignment"
          description="Add coursework and instructions to a batch."
          button="Create assignment"
          action={createAssignment}
          fields={[
            {
              name: "batchId",
              label: "Batch",
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
          title="Record Attendance"
          description="Only actively enrolled students can have attendance recorded."
          button="Record attendance"
          action={recordAttendance}
          fields={[
            {
              name: "sessionId",
              label: "Class session",
              type: "select",
              options: sessionOptions,
              required: true,
            },
            {
              name: "studentId",
              label: "Student",
              type: "select",
              options: studentOptions,
              required: true,
            },
            {
              name: "status",
              label: "Attendance",
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
        title="Student Enrolments"
        headers={["Student", "Batch", "Status"]}
        rows={enrolments.map((record) => [
          record.student_name,
          record.batch_name,
          record.status,
        ])}
      />

      <AcademicTable
        title="Class Timetable"
        headers={["Class", "Batch", "Starts", "Ends"]}
        rows={sessions.map((session) => [
          session.title,
          session.batch_name,
          formattedDate(session.starts_at),
          formattedDate(session.ends_at),
        ])}
      />

      <AcademicTable
        title="Assignments"
        headers={["Assignment", "Batch", "Due"]}
        rows={assignments.map((assignment) => [
          assignment.title,
          assignment.batch_name,
          formattedDate(assignment.due_at),
        ])}
      />

      <p className="fm-academic-notice">
        Account creation remains administrator-controlled.
        Real payment collection is not enabled.
      </p>
    </div>
  );
}

export default function OwnerOperationsPage() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading operations...</p>}>
        <OperationsContent />
      </Suspense>
    </main>
  );
}
