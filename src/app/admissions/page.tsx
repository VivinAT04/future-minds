import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/admissions/EnquiryForm";

export const metadata: Metadata = {
  title: "Admissions Enquiry | Future Minds",
  description:
    "Register your interest in Future Minds academic programmes."
};

type Props = {
  searchParams: Promise<{
    programme?: string;
  }>;
};

async function AdmissionsContent({
  searchParams
}: Props) {
  const { programme } = await searchParams;

  const configured = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.ENQUIRY_TO_EMAIL &&
    process.env.RESEND_FROM_EMAIL
  );

  return (
    <main className="fm-admissions">
      <section className="fm-admissions-hero">
        <div className="fm-detail-container">
          <span className="fm-detail-label">
            FUTURE MINDS / ADMISSIONS
          </span>

          <h1>
            Your learning journey
            <br />
            starts with a conversation.
          </h1>

          <p>
            Let us know which academic programme
            you are interested in.
          </p>
        </div>
      </section>

      <section className="fm-admissions-content">
        <div className="fm-detail-container fm-admissions-grid">

          <div>
            <span className="fm-detail-label">
              ADMISSIONS ENQUIRY
            </span>

            <h2>Get in touch.</h2>

            <p>
              Future Minds is preparing its academic
              programmes. Details regarding batches,
              teaching staff, timetables and fees
              will be announced once confirmed.
            </p>

            <Link href="/programmes">
              Explore academic programmes →
            </Link>
          </div>

          <div className="fm-admissions-panel">
            {configured ? (
              <EnquiryForm
                initialProgramme={programme}
              />
            ) : (
              <div className="fm-admissions-unavailable">
                <h3>Enquiries opening soon</h3>
                <p>
                  The secure enquiry service is being
                  configured. Online submissions are
                  not currently available.
                </p>
                <Link href="/programmes">
                  Explore programmes →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}


export default function AdmissionsPage(props: Props) {
  return (
    <Suspense
      fallback={
        <main className="fm-admissions">
          <section className="fm-admissions-hero">
            <div className="fm-detail-container">
              <span className="fm-detail-label">
                FUTURE MINDS / ADMISSIONS
              </span>
              <h1>Admissions & Enquiries</h1>
              <p>Loading admissions information...</p>
            </div>
          </section>
        </main>
      }
    >
      <AdmissionsContent {...props} />
    </Suspense>
  );
}
