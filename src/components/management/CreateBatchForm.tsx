"use client";

import { useActionState } from "react";
import {
  createBatch,
  initialManagementState,
} from "@/app/portal/owner/courses/actions";

type CourseOption = {
  id: string;
  title: string;
  code: string;
};

export default function CreateBatchForm({
  courses,
}: {
  courses: CourseOption[];
}) {
  const [state, action, pending] = useActionState(
    createBatch,
    initialManagementState
  );

  return (
    <form action={action} className="fm-management-form">
      <label htmlFor="batch-course">Course</label>
      <select
        id="batch-course"
        name="courseId"
        defaultValue=""
        required
      >
        <option value="" disabled>
          Select a course
        </option>

        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title} ({course.code})
          </option>
        ))}
      </select>

      <label htmlFor="batch-name">Batch name</label>
      <input
        id="batch-name"
        name="name"
        placeholder="e.g. Weekend Batch A"
        minLength={3}
        maxLength={100}
        required
      />

      <label htmlFor="batch-capacity">
        Maximum students
      </label>
      <input
        id="batch-capacity"
        name="capacity"
        type="number"
        min={1}
        max={500}
        defaultValue={30}
        required
      />

      <button
        type="submit"
        disabled={pending || courses.length === 0}
      >
        {pending ? "Creating batch..." : "Create draft batch"}
      </button>

      {state.message && (
        <p
          role="status"
          aria-live="polite"
          className={
            state.status === "error"
              ? "fm-management-error"
              : "fm-management-success"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
