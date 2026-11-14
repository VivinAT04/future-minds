"use client";

import { useActionState } from "react";
import {
  createCourse,
  initialManagementState,
} from "@/app/portal/owner/courses/actions";

export default function CreateCourseForm() {
  const [state, action, pending] = useActionState(
    createCourse,
    initialManagementState
  );

  return (
    <form action={action} className="fm-management-form">
      <label htmlFor="course-code">Course code</label>
      <input
        id="course-code"
        name="code"
        placeholder="e.g. CBSE_MATH_10"
        minLength={3}
        maxLength={24}
        required
      />

      <label htmlFor="course-title">Course title</label>
      <input
        id="course-title"
        name="title"
        placeholder="e.g. Class 10 Mathematics"
        minLength={3}
        maxLength={150}
        required
      />

      <label htmlFor="course-description">
        Description (optional)
      </label>
      <textarea
        id="course-description"
        name="description"
        rows={3}
        maxLength={1000}
        placeholder="Brief academic overview"
      />

      <button type="submit" disabled={pending}>
        {pending ? "Creating course..." : "Create draft course"}
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
