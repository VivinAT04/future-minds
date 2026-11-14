export const APPLICATION_ROLES = [
  "owner",
  "technical_admin",
  "teacher",
  "student",
] as const;

export type ApplicationRole =
  (typeof APPLICATION_ROLES)[number];

export const ROLE_INFORMATION: Record<
  ApplicationRole,
  {
    title: string;
    description: string;
    pathname: string;
  }
> = {
  owner: {
    title: "Centre Administration",
    description:
      "Manage academic operations, staff, enrolments and financial oversight.",
    pathname: "/portal/owner",
  },

  technical_admin: {
    title: "Technical Administration",
    description:
      "Manage platform infrastructure, application configuration and technical governance.",
    pathname: "/portal/technical-admin",
  },

  teacher: {
    title: "Teaching Workspace",
    description:
      "Manage assigned classes, teaching resources, attendance and assessments.",
    pathname: "/portal/teacher",
  },

  student: {
    title: "Student Workspace",
    description:
      "Access enrolled courses, learning materials, assignments and academic progress.",
    pathname: "/portal/student",
  },
};

export function isApplicationRole(
  value: unknown
): value is ApplicationRole {
  return (
    typeof value === "string" &&
    APPLICATION_ROLES.some((role) => role === value)
  );
}
