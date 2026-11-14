import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { ROLE_INFORMATION } from "@/lib/auth/roles";
import LogoutButton from "@/components/auth/LogoutButton";
import "./portal.css";

export const metadata: Metadata = {
  title: "My Workspace | Future Minds",
  robots: {
    index: false,
    follow: false,
  },
};

async function WorkspaceContent() {
  const user = await requireAuthenticatedUser();

  return (
    <div className="fm-portal-container">
      <div className="fm-portal-heading">
        <div>
          <span className="fm-portal-label">
            FUTURE MINDS / PRIVATE WORKSPACE
          </span>

          <h1>Welcome, {user.fullName}</h1>

          <p>
            Select an authorised workspace
            to continue.
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="fm-portal-grid">
        {user.roles.map((role) => {
          const info = ROLE_INFORMATION[role];

          return (
            <Link
              href={info.pathname}
              className="fm-portal-card"
              key={role}
            >
              <span className="fm-portal-label">
                AUTHORISED ACCESS
              </span>

              <h2>{info.title}</h2>

              <p>{info.description}</p>

              <strong>
                Enter workspace →
              </strong>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function PortalHome() {
  return (
    <main className="fm-portal">
      <Suspense
        fallback={
          <div className="fm-portal-container">
            <p>Loading your secure workspace...</p>
          </div>
        }
      >
        <WorkspaceContent />
      </Suspense>
    </main>
  );
}
