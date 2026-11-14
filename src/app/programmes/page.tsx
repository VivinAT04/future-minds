import type { Metadata } from "next";
import Link from "next/link";
import {
  catalogue,
  academicBoards,
  academicLevels,
  catalogueNotice
} from "@/lib/programmes";

export const metadata: Metadata = {
  title: "Academic Programmes | Future Minds",
  description:
    "Explore Future Minds academic pathways for Classes 6–12, CBSE, ICSE, Tamil Nadu State Board, Matriculation, NEET, JEE and engineering education."
};

export default function ProgrammesPage() {
  return (
    <main className="catalogue-page">

      <section className="catalogue-hero">
        <div className="catalogue-container">
          <span className="catalogue-eyebrow">
            FUTURE MINDS / ACADEMIC PROGRAMMES
          </span>

          <h1>
            Learning pathways
            <br />
            <span>for every ambition.</span>
          </h1>

          <p>
            From foundational school education to competitive
            examinations and advanced engineering subjects,
            explore a structured approach to academic learning.
          </p>

          <div className="catalogue-hero-actions">
            <a href="#school" className="catalogue-primary">
              Explore programmes <span>↗</span>
            </a>

            <Link href="/contact" className="catalogue-secondary">
              Admissions information ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="catalogue-overview">
        <div className="catalogue-container">

          <div className="catalogue-overview-grid">

            <div>
              <span className="catalogue-eyebrow">
                EDUCATIONAL BOARDS
              </span>

              <div className="catalogue-chip-list">
                {academicBoards.map((board) => (
                  <span key={board}>{board}</span>
                ))}
              </div>
            </div>

            <div>
              <span className="catalogue-eyebrow">
                ACADEMIC LEVELS
              </span>

              <div className="catalogue-chip-list">
                {academicLevels.map((level) => (
                  <span key={level}>{level}</span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="catalogue-directory">
        <div className="catalogue-container">

          <div className="catalogue-section-intro">
            <span className="catalogue-eyebrow">
              EXPLORE OUR ACADEMIC AREAS
            </span>

            <h2>
              Discover the right
              <br />
              <span>learning direction.</span>
            </h2>

            <p>
              Our programme structure is organised by education
              level, board, discipline and subject, making it
              easier to identify relevant academic support.
            </p>
          </div>

          <nav
            className="catalogue-anchor-nav"
            aria-label="Programme categories"
          >
            {catalogue.map((group) => (
              <a href={`#${group.id}`} key={group.id}>
                {group.number} / {group.title}
              </a>
            ))}
          </nav>

          {catalogue.map((group) => (
            <section
              className="catalogue-group"
              id={group.id}
              key={group.id}
            >
              <div className="catalogue-group-header">

                <div className="catalogue-number">
                  {group.number}
                </div>

                <div className="catalogue-heading">
                  <span className="catalogue-eyebrow">
                    {group.category}
                  </span>

                  <h2>{group.title}</h2>

                  <p>{group.introduction}</p>
                </div>

              </div>

              <div className="catalogue-subject-grid">
                {group.sections.map((section) => (
                  <article
                    className="catalogue-subject-card"
                    key={section.title}
                  >
                    <h3>{section.title}</h3>

                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>
                          <span className="catalogue-list-marker" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="catalogue-group-footer">
                <Link href="/contact">
                  Enquire about this academic area
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>

            </section>
          ))}

        </div>
      </section>

      <section className="catalogue-notice">
        <div className="catalogue-container">
          <strong>Programme availability</strong>
          <p>{catalogueNotice}</p>
        </div>
      </section>

      <section className="catalogue-final-cta">
        <div className="catalogue-container">
          <span className="catalogue-eyebrow">
            FUTURE MINDS COACHING CENTER
          </span>

          <h2>
            Your academic journey
            <br />
            begins with a direction.
          </h2>

          <p>
            Admissions details, batch schedules and individual
            subject availability will be published when confirmed.
          </p>

          <Link href="/contact" className="catalogue-primary">
            Admissions information <span>↗</span>
          </Link>
        </div>
      </section>

    </main>
  );
}
