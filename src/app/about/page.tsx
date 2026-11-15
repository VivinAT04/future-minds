import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Future Minds",
  description:
    "Learn about the academic purpose and teaching approach of Future Minds Coaching Center.",
};

export default function AboutPage() {
  return (
    <main className="editorial-interior">
      <section className="editorial-interior-hero">
        <div className="editorial-container">
          <span className="editorial-overline">
            ABOUT THE CENTRE
          </span>

          <h1>
            Education begins
            <br />
            with understanding.
          </h1>

          <p>
            Future Minds is developing a thoughtful
            learning environment supporting school,
            entrance examination and engineering
            education.
          </p>
        </div>
      </section>

      <section className="editorial-interior-content">
        <div className="editorial-container editorial-copy-columns">
          <div>
            <span className="editorial-overline">
              OUR PURPOSE
            </span>

            <h2>
              Clear teaching.
              <br />
              Meaningful progress.
            </h2>
          </div>

          <div className="editorial-prose">
            <p>
              Learners bring different experiences,
              interests and academic goals. Our aim
              is to make difficult subjects more
              approachable through careful explanation
              and structured practice.
            </p>

            <p>
              The centre&apos;s academic areas span
              school curricula, competitive entrance
              preparation and engineering disciplines.
              Individual course availability is
              confirmed during admissions.
            </p>
          </div>
        </div>
      </section>

      <section className="editorial-about-principles">
        <div className="editorial-container">
          <span className="editorial-overline">
            WHAT GUIDES OUR WORK
          </span>

          <div className="editorial-principle-list">
            <div>
              <span>01</span>
              <h3>Clarity</h3>
              <p>
                Explain concepts in a way learners
                can understand and apply.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Consistency</h3>
              <p>
                Encourage structured learning
                and regular practice.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Confidence</h3>
              <p>
                Help students approach academic
                challenges with greater assurance.
              </p>
            </div>
          </div>

          <Link
            href="/programmes"
            className="editorial-text-link"
          >
            Explore academic programmes
          </Link>
        </div>
      </section>
    </main>
  );
}
