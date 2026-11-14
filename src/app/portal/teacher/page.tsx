import { Suspense } from "react";
import RoleDashboard from "@/components/auth/RoleDashboard";

export default function TeacherDashboard() {
  return (
    <main className="fm-portal">
      <Suspense fallback={<p>Loading workspace...</p>}>
        <RoleDashboard
          role="teacher"
          modules={[
            "My Assigned Classes",
            "Teaching Timetable",
            "Google Meet Sessions",
            "Student Attendance",
            "Learning Resources",
            "Assignments",
            "Assessments and Marks",
            "Moderated Communication",
          ]}
        />
      </Suspense>
    </main>
  );
}
