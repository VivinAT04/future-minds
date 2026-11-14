export const enquiryProgrammes = [
  { value: "school", label: "School Education" },
  { value: "entrance", label: "NEET / JEE Preparation" },
  { value: "engineering", label: "Engineering & Technology" },
  { value: "general", label: "General Enquiry" }
] as const;

export type EnquiryPayload = {
  guardianName: string;
  email: string;
  phone: string;
  programme: string;
  message: string;
  website?: string;
};

export function validateEnquiry(
  value: unknown
): { ok: true; data: EnquiryPayload } | {
  ok: false;
  error: string;
} {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return {
      ok: false,
      error: "Invalid enquiry."
    };
  }

  const input = value as Record<string, unknown>;

  const field = (name: string) =>
    typeof input[name] === "string"
      ? (input[name] as string).trim()
      : "";

  const data: EnquiryPayload = {
    guardianName: field("guardianName"),
    email: field("email"),
    phone: field("phone"),
    programme: field("programme"),
    message: field("message"),
    website: field("website")
  };

  if (data.website) {
    return {
      ok: false,
      error: "Invalid submission."
    };
  }

  if (
    data.guardianName.length < 2 ||
    data.guardianName.length > 100
  ) {
    return {
      ok: false,
      error: "Enter a valid contact name."
    };
  }

  if (
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    return {
      ok: false,
      error: "Enter a valid email address."
    };
  }

  if (
    data.phone &&
    !/^[+()\d\s-]{7,25}$/.test(data.phone)
  ) {
    return {
      ok: false,
      error: "Enter a valid telephone number."
    };
  }

  const allowed = enquiryProgrammes.map(
    (programme) => programme.value
  );

  if (!allowed.includes(
    data.programme as typeof allowed[number]
  )) {
    return {
      ok: false,
      error: "Select a valid programme."
    };
  }

  if (
    data.message.length < 10 ||
    data.message.length > 1500
  ) {
    return {
      ok: false,
      error: "Your message must be between 10 and 1500 characters."
    };
  }

  return { ok: true, data };
}
