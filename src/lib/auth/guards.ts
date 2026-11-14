import "server-only";

import { redirect } from "next/navigation";
import {
  getAuthenticatedUser,
  hasRole,
  type AuthenticatedUser,
} from "./session";
import type { ApplicationRole } from "./roles";

export async function requireAuthenticatedUser():
  Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(
  role: ApplicationRole
): Promise<AuthenticatedUser> {
  const user = await requireAuthenticatedUser();

  if (!hasRole(user, role)) {
    redirect("/portal");
  }

  return user;
}
