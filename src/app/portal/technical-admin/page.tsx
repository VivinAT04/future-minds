import { Suspense } from "react";
import RoleDashboard from "@/components/auth/RoleDashboard";

export default function TechnicalAdminDashboard() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading workspace...</p>}>
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
