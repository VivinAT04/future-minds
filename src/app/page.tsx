import Link from "next/link";

const programmes = [
  {
    number: "01",
    name: "School Education",
    description:
      "Curriculum-aligned academic support for Classes 6–12, with an emphasis on foundational understanding and subject proficiency.",
    detail: "Classes 6–12",
    subjects: [
      "CBSE",
      "ICSE / ISC",
      "Tamil Nadu State Board",
      "Matriculation",
      "Mathematics",
      "Science",
      "Languages",
    ],
    href: "/programmes/school",
  },
  {
    number: "02",
    name: "Entrance Examinations",
    description:
      "Conceptual preparation and structured problem-solving across subjects relevant to medical and engineering entrance examinations.",
    detail: "NEET UG · JEE Main · JEE Advanced",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Botany",
      "Zoology",
      "Practice & Revision",
    ],
    href: "/programmes/entrance",
  },
  {
    number: "03",
    name: "Engineering & Technology",
    description:
      "Subject-based academic guidance across undergraduate engineering disciplines, from computing and electronics to applied sciences.",
    detail: "Undergraduate Academic Support",
    subjects: [
      "Computer Science",
      "Artificial Intelligence",
      "Electronics",
      "Mechanical",
      "Biomedical",
      "Civil",
    ],
    href: "/programmes/engineering",
  },
];

const learningApproach = [
  {
    index: "01",
    title: "Establish understanding",
    description:
      "Start with the principles behind a topic, clarify terminology, and connect new ideas to existing knowledge.",
  },
  {
    index: "02",
    title: "Apply through practice",
    description:
      "Work through examples and questions that turn theoretical understanding into practical problem-solving.",
  },
  {
    index: "03",
    title: "Review and improve",
    description:
      "Use revision, reflection and feedback to identify gaps and strengthen academic confidence.",
  },
];

export default function Home() {
  return (
    <main className="fm-premium-home">
      <section className="fm-premium-hero">
        <div className="fm-premium-width fm-premium-hero-grid">
          <div className="fm-premium-hero-copy">
            <span className="fm-premium-eyebrow">
              AN ACADEMIC LEARNING CENTRE
            </span>

            <h1>
              A better way
              <br />
              to <em>understand.</em>
              <br />
              A stronger way
              <br />
              to learn.
            </h1>

            <p>
              Future Minds brings together school
              education, competitive examination
              preparation and engineering studies
              in one structured academic environment.
            </p>

            <div className="fm-premium-actions">
              <Link
                className="fm-premium-button"
                href="/programmes"
              >
                Explore programmes
              </Link>

              <Link
                className="fm-premium-plain-link"
                href="/about"
              >
                Discover our approach
              </Link>
            </div>

            <div className="fm-premium-hero-meta">
              <span>School</span>
              <span>Entrance preparation</span>
              <span>Engineering</span>
            </div>
          </div>

          <div className="fm-premium-feature">
            <div className="fm-premium-feature-top">
              <span>FUTURE MINDS</span>
              <span>ACADEMIC AREAS</span>
            </div>

            <div className="fm-premium-feature-body">
              <span className="fm-premium-feature-number">
                01 — 03
              </span>

              <h2>
                Learning
                <br />
                begins with
                <br />
                <em>curiosity.</em>
              </h2>

              <div className="fm-premium-feature-rule" />

              <p>
                Understand the subject.
                <br />
                Strengthen the foundation.
                <br />
                Develop the confidence to progress.
              </p>
            </div>

            <div className="fm-premium-feature-bottom">
              <span>KNOWLEDGE</span>
              <span>UNDERSTANDING</span>
              <span>PROGRESS</span>
            </div>
          </div>
        </div>
      </section>

      <section className="fm-premium-intro">
        <div className="fm-premium-width fm-premium-split">
          <div>
            <span className="fm-premium-eyebrow">
              THE FUTURE MINDS APPROACH
            </span>
          </div>

          <div>
            <h2>
              Good education does more than prepare
              someone for an examination.
            </h2>

            <p>
              It helps learners develop the ability
              to reason, question, solve problems and
              understand unfamiliar ideas. Our academic
              approach places these abilities at the
              centre of learning.
            </p>
          </div>
        </div>
      </section>

      <section
        className="fm-premium-programmes"
        id="programmes"
      >
        <div className="fm-premium-width">
          <div className="fm-premium-heading">
            <div>
              <span className="fm-premium-eyebrow">
                OUR ACADEMIC AREAS
              </span>

              <h2>
                Programmes for
                <br />
                different stages of learning.
              </h2>
            </div>

            <p>
              Explore the educational areas covered
              by Future Minds. Individual subjects,
              batches and schedules are confirmed
              through the admissions process.
            </p>
          </div>

          <div className="fm-premium-programme-list">
            {programmes.map((programme) => (
              <article
                className="fm-premium-programme"
                key={programme.number}
              >
                <span className="fm-premium-index">
                  {programme.number}
                </span>

                <div className="fm-premium-programme-content">
                  <span className="fm-premium-category">
                    {programme.detail}
                  </span>

                  <h3>{programme.name}</h3>

                  <p>{programme.description}</p>

                  <div className="fm-premium-subjects">
                    {programme.subjects.map((subject) => (
                      <span key={subject}>{subject}</span>
                    ))}
                  </div>
                </div>

                <Link
                  href={programme.href}
                  className="fm-premium-programme-link"
                >
                  Explore this area
                </Link>
              </article>
            ))}
          </div>

          <Link
            className="fm-premium-directory-link"
            href="/programmes"
          >
            View the full programme directory
          </Link>
        </div>
      </section>

      <section
        className="fm-premium-method"
        id="approach"
      >
        <div className="fm-premium-width fm-premium-method-grid">
          <div>
            <span className="fm-premium-eyebrow">
              HOW WE APPROACH LEARNING
            </span>

            <h2>
              Clarity first.
              <br />
              <em>Progress follows.</em>
            </h2>

            <p>
              Our learning philosophy is built
              around three connected practices.
            </p>
          </div>

          <div className="fm-premium-method-list">
            {learningApproach.map((item) => (
              <article key={item.index}>
                <span>{item.index}</span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fm-premium-pathway">
        <div className="fm-premium-width">
          <span className="fm-premium-eyebrow">
            FINDING THE RIGHT PROGRAMME
          </span>

          <h2>
            From an academic interest
            <br />
            to a clear learning plan.
          </h2>

          <div className="fm-premium-pathway-grid">
            <div>
              <strong>Explore</strong>
              <p>
                Browse programmes by curriculum,
                education level or engineering
                discipline.
              </p>
            </div>

            <div>
              <strong>Enquire</strong>
              <p>
                Register interest in an academic
                area and share the information
                relevant to your learning needs.
              </p>
            </div>

            <div>
              <strong>Confirm</strong>
              <p>
                Review the available subjects,
                learning arrangements and fees
                before proceeding with enrolment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="fm-premium-cta">
        <div className="fm-premium-width fm-premium-cta-grid">
          <div>
            <span className="fm-premium-eyebrow">
              ADMISSIONS & ENQUIRIES
            </span>

            <h2>
              Explore what comes
              <br />
              next in your education.
            </h2>
          </div>

          <div>
            <p>
              Find programme information and
              register your interest. Course
              availability, fees and teaching
              schedules are provided when confirmed.
            </p>

            <Link
              className="fm-premium-button"
              href="/admissions"
            >
              Admissions information
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
