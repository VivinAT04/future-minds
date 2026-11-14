import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth/guards";
import { getDatabasePool } from "@/lib/database/pool";
import CreateCourseForm from "@/components/management/CreateCourseForm";
import CreateBatchForm from "@/components/management/CreateBatchForm";
import "./management.css";

export const metadata: Metadata = {
  title: "Course Management | Future Minds",
  robots: {
    index: false,
    follow: false,
  },
};

type Course = {
  id: string;
  code: string;
  title: string;
  is_published: boolean;
};

type Batch = {
  id: string;
  name: string;
  status: string;
  capacity: number | null;
  course_title: string;
};

async function CourseManagementContent() {
  const user = await requireRole("owner");
  const pool = getDatabasePool();

  const [coursesResult, batchesResult] =
    await Promise.all([
      pool.query<Course>(
        `
          SELECT
            id,
            code,
            title,
            is_published
          FROM courses
          ORDER BY title ASC
          LIMIT 200
        `
      ),

      pool.query<Batch>(
        `
          SELECT
            b.id,
            b.name,
            b.status::text AS status,
            b.capacity,
            c.title AS course_title
          FROM batches b
          JOIN courses c ON c.id = b.course_id
          ORDER BY b.created_at DESC
          LIMIT 200
        `
      ),
    ]);

  const courses = coursesResult.rows;
  const batches = batchesResult.rows;

  return (
    <div className="fm-portal-container">
      <div className="fm-management-heading">
        <div>
          <Link href="/portal/owner" className="fm-portal-back">
            ← Owner workspace
          </Link>

          <span className="fm-portal-label">
            ACADEMIC ADMINISTRATION
          </span>

          <h1>Courses & Batches</h1>

          <p>
            Manage academic courses and teaching batches.
            New records begin in draft status.
          </p>
        </div>

        <div className="fm-management-identity">
          Authorised owner: {user.fullName}
        </div>
      </div>

      <div className="fm-management-summary">
        <div>
          <span>Courses</span>
          <strong>{courses.length}</strong>
        </div>

        <div>
          <span>Batches</span>
          <strong>{batches.length}</strong>
        </div>

        <div>
          <span>Draft courses</span>
          <strong>
            {courses.filter(
              (course) => !course.is_published
            ).length}
          </strong>
        </div>
      </div>

      <div className="fm-management-columns">
        <section className="fm-management-panel">
          <h2>Create Course</h2>
          <p>
            Set up a new academic course.
          </p>
          <CreateCourseForm />
        </section>

        <section className="fm-management-panel">
          <h2>Create Batch</h2>
          <p>
            Add a teaching batch to an existing course.
          </p>
          <CreateBatchForm courses={courses} />
        </section>
      </div>

      <section className="fm-management-list">
        <h2>Course Directory</h2>

        {courses.length === 0 ? (
          <p>No courses have been created yet.</p>
        ) : (
          <div className="fm-management-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Course</th>
                  <th>Publication</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>
                      {course.is_published
                        ? "Published"
                        : "Draft"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="fm-management-list">
        <h2>Batch Directory</h2>

        {batches.length === 0 ? (
          <p>No batches have been created yet.</p>
        ) : (
          <div className="fm-management-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Course</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id}>
                    <td>{batch.name}</td>
                    <td>{batch.course_title}</td>
                    <td>{batch.capacity ?? "—"}</td>
                    <td>{batch.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="fm-management-footnote">
        This page displays up to 200 courses and
        200 batches. Advanced search, editing and
        publication approvals will be added separately.
      </p>
    </div>
  );
}

export default function CourseManagementPage() {
  return (
    <main className="fm-portal fm-management">
      <Suspense
        fallback={
          <div className="fm-portal-container">
            <p>Loading academic management...</p>
          </div>
        }
      >
        <CourseManagementContent />
      </Suspense>
    </main>
  );
}
