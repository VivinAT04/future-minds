"use client";

import { useState } from "react";
import { enquiryProgrammes } from "@/lib/enquiry";

export default function EnquiryForm({
  initialProgramme = "general"
}: {
  initialProgramme?: string;
}) {
  const [programme, setProgramme] = useState(
    enquiryProgrammes.some(
      (item) => item.value === initialProgramme
    )
      ? initialProgramme
      : "general"
  );

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setFeedback("");
    setSuccess(false);

    const form = event.currentTarget;
    const values = new FormData(form);

    const payload = {
      guardianName: values.get("guardianName"),
      email: values.get("email"),
      phone: values.get("phone"),
      programme,
      message: values.get("message"),
      website: values.get("website")
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      setFeedback(
        typeof result.message === "string"
          ? result.message
          : "The request could not be completed."
      );

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setProgramme("general");
      }
    } catch {
      setFeedback(
        "The service is unavailable. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="fm-enquiry-form"
      onSubmit={submit}
    >
      <div className="fm-form-row">
        <label>
          Parent / Guardian / Adult Learner Name *
          <input
            name="guardianName"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Full name"
          />
        </label>

        <label>
          Email Address *
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="fm-form-row">
        <label>
          Telephone Number (optional)
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            placeholder="+91 ..."
          />
        </label>

        <label>
          Academic Programme *
          <select
            name="programme"
            value={programme}
            onChange={(event) =>
              setProgramme(event.target.value)
            }
            required
          >
            {enquiryProgrammes.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Your Enquiry *
        <textarea
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={1500}
          placeholder="Tell us which class, board, subject or engineering discipline you are interested in. Please avoid sharing sensitive personal information."
        />
      </label>

      <div
        className="fm-honeypot"
        aria-hidden="true"
      >
        <label>
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <p className="fm-form-privacy">
        This form is intended for parents, guardians
        and adult learners. Please do not include
        sensitive personal information or a child&apos;s
        personal contact details. Submitted information
        will be used to respond to the enquiry.
      </p>

      <button
        className="fm-form-submit"
        type="submit"
        disabled={loading}
      >
        {loading ? "Sending enquiry..." : "Send enquiry"}
        <span aria-hidden="true">↗</span>
      </button>

      {feedback && (
        <p
          role="status"
          aria-live="polite"
          className={
            success
              ? "fm-form-feedback success"
              : "fm-form-feedback error"
          }
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
