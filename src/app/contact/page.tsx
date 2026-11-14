import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Future Minds",
  description:
    "Future Minds Coaching Center contact and admissions information."
};

export default function ContactPage() {
  return (
    <main className="inner-page">

      <section className="inner-hero">
        <div className="page-container">

          <span className="inner-eyebrow">
            CONTACT & ADMISSIONS
          </span>

          <h1>
            Start a conversation
            <br />
            <span>about your future.</span>
          </h1>

          <p>
            We are preparing our admissions and
            communication channels.
          </p>

        </div>
      </section>

      <section className="content-section">
        <div className="page-container">

          <div className="contact-content">

            <div>
              <span className="inner-eyebrow">
                GETTING STARTED
              </span>

              <h2>
                Future Minds
                <br />
                Coaching Center
              </h2>

              <p>
                Contact details, admissions procedures
                and course schedules will be published
                here when confirmed.
              </p>

              <p>
                We will introduce a secure enquiry
                form once its backend and privacy
                controls are ready.
              </p>
            </div>

            <div className="contact-info-card">

              <span className="inner-eyebrow">
                PROGRAMMES
              </span>

              <h3>Academic pathways</h3>

              <ul>
                <li>Classes 6–12</li>
                <li>CBSE, ICSE and Matriculation</li>
                <li>NEET Preparation</li>
                <li>JEE Preparation</li>
                <li>Engineering Classes</li>
              </ul>

              <Link
                href="/programmes"
                className="course-link"
              >
                View all programmes ↗
              </Link>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
