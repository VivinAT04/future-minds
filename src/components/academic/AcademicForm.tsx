"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/academic/shared";

export type FormField = {
  name: string;
  label: string;
  type?:
    | "text"
    | "number"
    | "datetime-local"
    | "url"
    | "textarea"
    | "select";
  options?: Array<{
    value: string;
    label: string;
  }>;
  required?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
};

type Props = {
  title: string;
  description?: string;
  button: string;
  fields: FormField[];
  action: (
    previous: ActionResult,
    form: FormData
  ) => Promise<ActionResult>;
};

const initialState: ActionResult = {
  status: "idle",
  message: "",
};

export default function AcademicForm({
  title,
  description,
  button,
  fields,
  action,
}: Props) {
  const [state, formAction, pending] =
    useActionState(action, initialState);

  return (
    <section className="fm-academic-panel">
      <h2>{title}</h2>

      {description && <p>{description}</p>}

      <form
        action={formAction}
        className="fm-academic-form"
      >
        {fields.map((field) => {
          const id = `${title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-")}-${field.name}`;

          return (
            <div key={field.name}>
              <label htmlFor={id}>{field.label}</label>

              {field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  defaultValue=""
                  required={field.required}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  {field.options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={4}
                  maxLength={field.maxLength}
                  required={field.required}
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                  maxLength={field.maxLength}
                />
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={
            pending ||
            fields.some(
              (field) =>
                field.required &&
                field.type === "select" &&
                (field.options?.length ?? 0) === 0
            )
          }
        >
          {pending ? "Saving..." : button}
        </button>

        {state.message && (
          <p
            role="status"
            aria-live="polite"
            className={
              state.status === "error"
                ? "fm-academic-error"
                : "fm-academic-success"
            }
          >
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}
