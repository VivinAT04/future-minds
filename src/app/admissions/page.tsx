import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import EnquiryForm from "@/components/admissions/EnquiryForm";

export const metadata: Metadata = {
  title: "Admissions | Future Minds Coaching Center",
  description:
    "Explore admissions and register your interest in Future Minds academic programmes.",
};

type AdmissionsProps = {
  searchParams: Promise<{
    programme?: string | string[];
  }>;
};

function AdmissionsIntroduction() {
  return (
    <section className="fm-admissions-hero">
      <div className="fm-detail-container">
        <span className="fm-detail-label">
          FUTURE MINDS / ADMISSIONS
        </span>

        <h1>
          Your future begins
          <br />
          with learning.
        </h1>

        <p>
          Discover academic opportunities across school
          education, competitive examinations and
          engineering disciplines.
        </p>
      </div>
    </section>
  );
}

function AdmissionsFallback() {
  return (
    <section className="fm-admissions-content">
      <div className="fm-detail-container">
        <p role="status">
          Loading admissions information...
        </p>
      </div>
    </section>
  );
}

async function AdmissionsContent({
  searchParams,
}: AdmissionsProps) {
  const params = await searchParams;

  const selectedProgramme =
    typeof params.programme === "string"
      ? params.programme
      : "general";

  const configured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL &&
      process.env.ENQUIRY_TO_EMAIL
  );

  return (
    <section className="fm-admissions-content">
      <div className="fm-detail-container fm-admissions-grid">
        <div>
          <span className="fm-detail-label">
            ADMISSIONS ENQUIRY
          </span>

          <h2>Start your journey.</h2>

          <p>
            Future Minds provides information about
            school tuition, NEET and JEE preparation,
            and engineering education.
          </p>

          <p>
            Individual subjects, batch schedules,
            teaching staff and fee structures
            will be confirmed before enrolment.
          </p>

          <Link href="/programmes">
            Explore academic programmes →
          </Link>
        </div>

        <div className="fm-admissions-panel">
          {configured ? (
            <EnquiryForm
              initialProgramme={selectedProgramme}
            />
          ) : (
            <div className="fm-admissions-unavailable">
              <h3>Enquiries opening soon</h3>

              <p>
                Our online admissions enquiry service
                is currently being configured.
              </p>

              <p>
                Please check back when official
                admissions information becomes available.
              </p>

              <Link href="/programmes">
                View available programme information →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AdmissionsPage(
  props: AdmissionsProps
) {
  return (
    <main className="fm-admissions">
      <AdmissionsIntroduction />

      <Suspense fallback={<AdmissionsFallback />}>
        <AdmissionsContent {...props} />
      </Suspense>
    </main>
  );
}
