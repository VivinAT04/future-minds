import { Suspense } from "react";
import RoleDashboard from "@/components/auth/RoleDashboard";

export default function StudentDashboard() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading workspace...</p>}>
        <RoleDashboard
          role="student"
          modules={[
            "My Courses",
            "Class Timetable",
            "Online Class Sessions",
            "Learning Materials",
            "Assignments",
            "Assessments and Results",
            "Attendance Overview",
            "Academic Progress",
          ]}
        />
      </Suspense>
    </main>
  );
}
