import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  courseDetails,
  findCourse
} from "@/lib/course-details";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courseDetails.map((course) => ({
    slug: course.slug
  }));
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = findCourse(slug);

  if (!course) {
    return {
      title: "Programme Not Found | Future Minds"
    };
  }

  return {
    title: `${course.title} | Future Minds`,
    description: course.description
  };
}

export default async function ProgrammeDetail({
  params
}: Props) {
  const { slug } = await params;
  const course = findCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="fm-detail">
      <section className="fm-detail-hero">
        <div className="fm-detail-container">

          <nav
            className="fm-breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/programmes">Programmes</Link>
            <span>/</span>
            <span>{course.title}</span>
          </nav>

          <span className="fm-detail-label">
            {course.category}
          </span>

          <h1>{course.title}</h1>

          <p>{course.description}</p>

          <Link
            href={`/admissions?programme=${course.slug}`}
            className="fm-detail-button"
          >
            Register your interest
            <span aria-hidden="true">↗</span>
          </Link>

        </div>
      </section>

      <section className="fm-detail-content">
        <div className="fm-detail-container">

          <div className="fm-detail-intro">
            <span className="fm-detail-label">
              PROGRAMME OVERVIEW
            </span>

            <h2>
              A structured approach
              <br />
              to learning.
            </h2>

            <p>{course.overview}</p>
          </div>

          <div className="fm-detail-grid">
            {course.areas.map((area) => (
              <article
                className="fm-detail-card"
                key={area.title}
              >
                <h3>{area.title}</h3>

                <ul>
                  {area.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="fm-detail-notice">
            <strong>Programme availability</strong>
            <p>
              This page describes planned academic areas.
              Specific subjects, teachers, timetables,
              fees and batch availability are subject
              to confirmation.
            </p>
          </div>

        </div>
      </section>

      <section className="fm-detail-cta">
        <div className="fm-detail-container">
          <h2>Interested in this programme?</h2>
          <p>
            Submit an enquiry to learn about future
            admissions and availability.
          </p>

          <Link
            href={`/admissions?programme=${course.slug}`}
            className="fm-detail-button"
          >
            Register your interest
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
