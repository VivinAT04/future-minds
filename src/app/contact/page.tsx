import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Future Minds",
  description:
    "Contact and admissions information for Future Minds Coaching Center.",
};

export default function ContactPage() {
  return (
    <main className="editorial-interior">
      <section className="editorial-interior-hero">
        <div className="editorial-container">
          <span className="editorial-overline">
            CONTACT
          </span>

          <h1>
            Questions about
            <br />
            your next course?
          </h1>

          <p>
            Start with our academic programme
            information, then register your interest
            through admissions.
          </p>
        </div>
      </section>

      <section className="editorial-interior-content">
        <div className="editorial-container editorial-copy-columns">
          <div>
            <span className="editorial-overline">
              ENQUIRIES
            </span>

            <h2>
              Finding the right
              learning path.
            </h2>
          </div>

          <div className="editorial-prose">
            <p>
              We are preparing our official contact
              and admissions channels. Confirmed
              information about class availability,
              teachers, fees and schedules will be
              provided through the centre.
            </p>

            <p>
              In the meantime, you can explore
              our academic areas and register
              your interest when the enquiry
              service is available.
            </p>

            <div className="editorial-contact-actions">
              <Link
                href="/programmes"
                className="editorial-button"
              >
                Explore programmes
              </Link>

              <Link
                href="/admissions"
                className="editorial-text-link"
              >
                Admissions information
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
