import type { Metadata } from "next";
import Link from "next/link";
import { programmes } from "@/lib/programmes";

export const metadata: Metadata = {
  title: "Our Programmes | Future Minds",
  description:
    "Explore Future Minds programmes for Classes 6–12, NEET, JEE and engineering education."
};

export default function ProgrammesPage() {
  return (
    <main className="inner-page">

      <section className="inner-hero">
        <div className="page-container">

          <span className="inner-eyebrow">
            ACADEMIC PROGRAMMES
          </span>

          <h1>
            Every ambition
            <br />
            <span>deserves a foundation.</span>
          </h1>

          <p>
            Explore our planned academic programmes
            for school students, entrance examination
            aspirants and engineering learners.
          </p>

        </div>
      </section>

      <section className="content-section">
        <div className="page-container">

          <div className="programmes-page-grid">

            {programmes.map((programme, index) => (
              <article
                className="course-card"
                key={programme.id}
              >

                <div className="course-card-heading">
                  <span>{programme.category}</span>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2>{programme.title}</h2>

                <p>{programme.description}</p>

                <div className="course-subjects">
                  {programme.subjects.map((subject) => (
                    <span key={subject}>{subject}</span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="course-link"
                >
                  Admission information ↗
                </Link>

              </article>
            ))}

          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="page-container">
          <h2>Your next chapter starts here.</h2>
          <p>
            Admissions and course availability
            information will be announced.
          </p>
          <Link href="/contact" className="button-primary">
            Contact information ↗
          </Link>
        </div>
      </section>

    </main>
  );
}
