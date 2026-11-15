import Link from "next/link";
import { Suspense } from "react";
import RoleDashboard from "@/components/auth/RoleDashboard";

export default function TechnicalAdminDashboard() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading workspace...</p>}>
        <div className="fm-portal-container">
          <Link
            href="/portal/technical-admin/health"
            className="fm-owner-management-link"
          >
            Platform Health →
          </Link>
        </div>
        <RoleDashboard
          role="technical_admin"
          modules={[
            "Platform Health",
            "System Configuration",
            "Technical User Support",
            "Application Integrations",
            "Database Operations",
            "Security Monitoring",
            "Audit Logs",
            "Backup and Recovery",
            "Deployment Management",
          ]}
        />
      </Suspense>
    </main>
  );
}
