import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { academicUser } from "@/lib/academic/shared";
import { getDatabasePool } from "@/lib/database/pool";
import AcademicTable from "@/components/academic/AcademicTable";

export const metadata: Metadata = {
  title: "Platform Health | Future Minds",
  robots: { index: false, follow: false },
};

type Migration = {
  filename: string;
  applied_at: Date;
};

async function HealthContent() {
  const user = await academicUser([
    "technical_admin",
    "owner",
  ]);

  const pool = getDatabasePool();

  const [health, migrations] = await Promise.all([
    pool.query("SELECT 1 AS healthy"),

    pool.query<Migration>(
      `
        SELECT filename, applied_at
        FROM schema_migrations
        ORDER BY applied_at DESC
        LIMIT 100
      `
    ),
  ]);

  return (
    <div className="fm-portal-container fm-academic">
      <Link
        className="fm-portal-back"
        href="/portal/technical-admin"
      >
        ← Technical workspace
      </Link>

      <span className="fm-portal-label">
        PLATFORM OPERATIONS
      </span>

      <h1>Platform Health</h1>

      <p>
        Authorised technical view for {user.fullName}.
        No database credentials or private connection
        details are displayed.
      </p>

      <div className="fm-academic-stats">
        <div>
          <strong>
            {health.rows[0]?.healthy === 1
              ? "Online"
              : "Error"}
          </strong>
          <span>Database connection</span>
        </div>

        <div>
          <strong>{migrations.rows.length}</strong>
          <span>Database migrations</span>
        </div>
      </div>

      <AcademicTable
        title="Migration History"
        headers={["Migration", "Applied"]}
        rows={migrations.rows.map((migration) => [
          migration.filename,
          new Date(migration.applied_at).toLocaleString(
            "en-GB"
          ),
        ])}
      />

      <p className="fm-academic-notice">
        This is a basic health check, not a complete
        monitoring or security management system.
      </p>
    </div>
  );
}

export default function TechnicalHealthPage() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Checking platform health...</p>}>
        <HealthContent />
      </Suspense>
    </main>
  );
}
