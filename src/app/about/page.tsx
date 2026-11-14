import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Future Minds",
  description:
    "Learn about Future Minds Coaching Center and our approach to education."
};

export default function AboutPage() {
  return (
    <main className="inner-page">

      <section className="inner-hero">
        <div className="page-container">
          <span className="inner-eyebrow">ABOUT FUTURE MINDS</span>

          <h1>
            Education designed
            <br />
            <span>for what comes next.</span>
          </h1>

          <p>
            Future Minds is building a learning environment
            where academic understanding, confidence and
            preparation come together.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="page-container two-column">

          <div>
            <span className="inner-eyebrow">OUR PURPOSE</span>
            <h2>Helping learners move forward.</h2>
          </div>

          <div className="content-copy">
            <p>
              Every learner has different goals, strengths and
              challenges. Our aim is to support their academic
              development through clear explanations,
              structured learning and consistent practice.
            </p>

            <p>
              From school education to competitive
              examinations and engineering subjects,
              Future Minds is designed to support
              learners across important stages of education.
            </p>
          </div>

        </div>
      </section>

      <section className="content-section soft-section">
        <div className="page-container">

          <span className="inner-eyebrow">OUR APPROACH</span>

          <h2>Three principles. One purpose.</h2>

          <div className="values-grid">

            <article className="value-card">
              <span>01</span>
              <h3>Understand</h3>
              <p>
                Build strong conceptual foundations
                before moving to advanced topics.
              </p>
            </article>

            <article className="value-card">
              <span>02</span>
              <h3>Practise</h3>
              <p>
                Strengthen knowledge through
                focused exercises and revision.
              </p>
            </article>

            <article className="value-card">
              <span>03</span>
              <h3>Progress</h3>
              <p>
                Develop confidence and move
                towards academic goals.
              </p>
            </article>

          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="page-container">
          <h2>Discover our programmes.</h2>
          <Link href="/programmes" className="button-primary">
            Explore programmes ↗
          </Link>
        </div>
      </section>

    </main>
  );
}
