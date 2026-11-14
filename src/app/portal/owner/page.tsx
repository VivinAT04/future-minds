import { Suspense } from "react";
import RoleDashboard from "@/components/auth/RoleDashboard";

export default function OwnerDashboard() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading workspace...</p>}>
        <RoleDashboard
          role="owner"
          modules={[
            "Centre Overview",
            "Admissions and Enrolments",
            "Teachers and Staff",
            "Students and Guardians",
            "Courses and Batches",
            "Timetables and Attendance",
            "Fees and Payments",
            "Financial Reports",
            "Operational Reports",
          ]}
        />
      </Suspense>
    </main>
  );
}
