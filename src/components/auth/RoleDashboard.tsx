import Link from "next/link";
import LogoutButton from "./LogoutButton";
import {
  ROLE_INFORMATION,
  type ApplicationRole,
} from "@/lib/auth/roles";
import { requireRole } from "@/lib/auth/guards";

type Props = {
  role: ApplicationRole;
  modules: string[];
};

export default async function RoleDashboard({
  role,
  modules,
}: Props) {
  const user = await requireRole(role);
  const info = ROLE_INFORMATION[role];

  return (
    <div className="fm-portal-container">
      <div className="fm-portal-heading">
        <div>
          <Link
            className="fm-portal-back"
            href="/portal"
          >
            ← All workspaces
          </Link>

          <span className="fm-portal-label">
            FUTURE MINDS / AUTHORISED WORKSPACE
          </span>

          <h1>{info.title}</h1>

          <p>{info.description}</p>
          <p>Signed in as {user.fullName}</p>
        </div>

        <LogoutButton />
      </div>

      <div className="fm-portal-section">
        <h2>Workspace modules</h2>

        <p>
          The modules below are planned. Their
          operational functionality will be added
          in upcoming development phases.
        </p>

        <div className="fm-portal-grid">
          {modules.map((module) => (
            <div
              key={module}
              className="fm-portal-card"
            >
              <span className="fm-portal-label">
                PLANNED MODULE
              </span>

              <h3>{module}</h3>

              <p>
                Implementation pending.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
