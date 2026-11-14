import "server-only";

import { createClient } from "@/lib/supabase/server";
import { isAuthenticationConfigured } from "./config";
import { getDatabasePool } from "@/lib/database/pool";
import {
  isApplicationRole,
  type ApplicationRole,
} from "./roles";

export type AuthenticatedUser = {
  id: string;
  email: string;
  fullName: string;
  roles: ApplicationRole[];
};

export async function getAuthenticatedUser(): Promise<
  AuthenticatedUser | null
> {
  if (!isAuthenticationConfigured()) {
    return null;
  }

  const supabase = await createClient();

  // getUser verifies identity with the auth server.
  // A locally decoded token is not sufficient for access.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const pool = getDatabasePool();

  const account = await pool.query<{
    id: string;
    email: string;
    full_name: string;
  }>(
    `
      SELECT id, email, full_name
      FROM app_users
      WHERE auth_provider_id = $1
        AND status = 'active'
      LIMIT 1
    `,
    [user.id]
  );

  if (account.rowCount !== 1) {
    return null;
  }

  const profile = account.rows[0];

  if (
    !user.email ||
    profile.email.toLowerCase() !==
      user.email.toLowerCase()
  ) {
    return null;
  }

  const assignedRoles = await pool.query<{
    role: string;
  }>(
    `
      SELECT role::text AS role
      FROM user_role_assignments
      WHERE user_id = $1
    `,
    [profile.id]
  );

  const roles = assignedRoles.rows
    .map((entry) => entry.role)
    .filter(isApplicationRole);

  if (roles.length === 0) {
    return null;
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    roles,
  };
}

export function hasRole(
  user: AuthenticatedUser,
  role: ApplicationRole
): boolean {
  return user.roles.includes(role);
}
