import type { Metadata } from "next";
import Link from "next/link";
import "./programmes.css";

export const metadata: Metadata = {
  title: "Academic Programmes | Future Minds",
  description:
    "Explore school tuition, entrance examination preparation, and engineering education at Future Minds Coaching Center.",
};

const categories = [
  {
    id: "school",
    index: "01",
    eyebrow: "FOUNDATION & SECONDARY EDUCATION",
    title: "School Education",
    description:
      "Academic learning pathways organised by curriculum, class and subject.",
    groups: [
      {
        title: "Curricula",
        items: [
          "CBSE",
          "ICSE / ISC",
          "Tamil Nadu State Board",
          "Matriculation",
          "Other State Boards",
        ],
      },
      {
        title: "Academic Levels",
        items: [
          "Middle School · Classes 6–8",
          "Secondary · Classes 9–10",
          "Higher Secondary · Classes 11–12",
        ],
      },
      {
        title: "Science & Mathematics",
        items: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "General Science",
        ],
      },
      {
        title: "Languages & Other Subjects",
        items: [
          "Tamil",
          "English",
          "Hindi",
          "Social Science",
          "Computer Science",
          "Commerce & Accountancy",
        ],
      },
    ],
  },
  {
    id: "entrance",
    index: "02",
    eyebrow: "COMPETITIVE EXAMINATIONS",
    title: "Entrance Preparation",
    description:
      "Subject-focused pathways for medical and engineering entrance examinations.",
    groups: [
      {
        title: "Medical Entrance",
        items: [
          "NEET UG",
          "Physics",
          "Chemistry",
          "Botany",
          "Zoology",
        ],
      },
      {
        title: "Engineering Entrance",
        items: [
          "JEE Main",
          "JEE Advanced",
          "Mathematics",
          "Physics",
          "Chemistry",
        ],
      },
      {
        title: "Preparation Support",
        items: [
          "Concept Development",
          "Problem Solving",
          "Revision",
          "Practice Assessments",
          "Mock Examinations",
        ],
      },
    ],
  },
  {
    id: "engineering",
    index: "03",
    eyebrow: "UNDERGRADUATE & TECHNICAL EDUCATION",
    title: "Engineering & Technology",
    description:
      "Discipline-based academic support across engineering and technology subjects.",
    groups: [
      {
        title: "Computer & Digital Engineering",
        items: [
          "Computer Science (CSE)",
          "Information Technology",
          "Artificial Intelligence",
          "Data Science",
          "Cybersecurity",
        ],
      },
      {
        title: "Electronics & Electrical",
        items: [
          "Electronics & Communication",
          "Electrical & Electronics",
          "Instrumentation",
          "Embedded Systems",
        ],
      },
      {
        title: "Mechanical & Infrastructure",
        items: [
          "Mechanical Engineering",
          "Civil Engineering",
          "Automobile Engineering",
          "Aerospace Engineering",
          "Mechatronics",
        ],
      },
      {
        title: "Biomedical & Applied Sciences",
        items: [
          "Biomedical Engineering",
          "Biotechnology",
          "Chemical Engineering",
          "Robotics & Automation",
        ],
      },
      {
        title: "Common Engineering Subjects",
        items: [
          "Engineering Mathematics",
          "Programming",
          "Data Structures",
          "Engineering Mechanics",
          "Engineering Physics",
          "Digital Electronics",
        ],
      },
    ],
  },
];

export default function ProgrammesPage() {
  return (
    <main className="fm-catalogue">
      <section className="fm-intro">
        <div className="fm-container">
          <div className="fm-overline">
            FUTURE MINDS <span>/</span> ACADEMICS
          </div>

          <div className="fm-intro-grid">
            <div>
              <h1>
                Academic
                <br />
                <em>programmes.</em>
              </h1>
            </div>

            <div className="fm-intro-copy">
              <p>
                A structured approach to learning, from school
                education through competitive examinations and
                engineering disciplines.
              </p>
              <a href="#academic-directory">
                Browse the directory 
              </a>
            </div>
          </div>

          <div className="fm-index">
            <span>01 — School Education</span>
            <span>02 — Entrance Preparation</span>
            <span>03 — Engineering & Technology</span>
          </div>
        </div>
      </section>

      <section className="fm-directory" id="academic-directory">
        <div className="fm-container">
          <div className="fm-directory-heading">
            <div>
              <span className="fm-label">ACADEMIC DIRECTORY</span>
              <h2>Programme directory.</h2>
            </div>
            <p>
              Browse by education level, curriculum and discipline.
              Individual subjects and batches will be confirmed
              during admissions.
            </p>
          </div>

          {categories.map((category) => (
            <section
              id={category.id}
              className="fm-category"
              key={category.id}
            >
              <div className="fm-category-heading">
                <span className="fm-category-number">
                  {category.index}
                </span>

                <div>
                  <span className="fm-label">
                    {category.eyebrow}
                  </span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>

              <div className="fm-subject-grid">
                {category.groups.map((group) => (
                  <div className="fm-subject-group" key={group.title}>
                    <h4>{group.title}</h4>

                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                href={`/programmes/${category.id}`}
                className="fm-category-link"
              >
                Enquire about this area
                
              </Link>
            </section>
          ))}
        </div>
      </section>

      <section className="fm-end">
        <div className="fm-container fm-end-grid">
          <div>
            <span className="fm-label">NEXT STEPS</span>
            <h2>
              Explore the next stage
              <br />
              of your education.
            </h2>
          </div>

          <div>
            <p>
              This directory outlines planned academic areas.
              Course availability, teaching staff, fees and
              schedules are subject to confirmation.
            </p>
            <Link href="/contact">
              Admissions information 
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
