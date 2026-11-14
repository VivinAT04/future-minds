export type CourseDetail = {
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  areas: {
    title: string;
    subjects: string[];
  }[];
};

export const courseDetails: CourseDetail[] = [
  {
    slug: "school",
    title: "School Education",
    category: "Classes 6–12",
    description:
      "Curriculum-aligned academic learning across school boards and subjects.",
    overview:
      "Future Minds aims to support learners across middle school, secondary and higher secondary education through a structured, concept-focused approach.",
    areas: [
      {
        title: "Educational Boards",
        subjects: [
          "CBSE",
          "ICSE / ISC",
          "Tamil Nadu State Board",
          "Matriculation",
          "Other State Boards"
        ]
      },
      {
        title: "Class Levels",
        subjects: [
          "Classes 6–8",
          "Classes 9–10",
          "Classes 11–12"
        ]
      },
      {
        title: "Science and Mathematics",
        subjects: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "General Science"
        ]
      },
      {
        title: "Languages and Other Subjects",
        subjects: [
          "Tamil",
          "English",
          "Hindi",
          "Social Science",
          "Computer Science",
          "Commerce",
          "Accountancy"
        ]
      }
    ]
  },
  {
    slug: "entrance",
    title: "Competitive Exam Preparation",
    category: "NEET & JEE",
    description:
      "Focused learning pathways for medical and engineering entrance examinations.",
    overview:
      "Our planned preparation pathways cover essential subject areas, problem-solving practice, revision and examination readiness.",
    areas: [
      {
        title: "NEET UG",
        subjects: [
          "Physics",
          "Chemistry",
          "Botany",
          "Zoology"
        ]
      },
      {
        title: "JEE Main",
        subjects: [
          "Mathematics",
          "Physics",
          "Chemistry"
        ]
      },
      {
        title: "JEE Advanced",
        subjects: [
          "Advanced Mathematics",
          "Advanced Physics",
          "Advanced Chemistry"
        ]
      },
      {
        title: "Learning Activities",
        subjects: [
          "Concept Revision",
          "Problem Solving",
          "Practice Assessments",
          "Mock Examinations"
        ]
      }
    ]
  },
  {
    slug: "engineering",
    title: "Engineering & Technology",
    category: "Higher Education",
    description:
      "Discipline-based academic support for undergraduate engineering learners.",
    overview:
      "Future Minds plans to organise engineering education around individual disciplines and subjects, allowing learners to identify relevant areas of academic support.",
    areas: [
      {
        title: "Computer and Digital Engineering",
        subjects: [
          "Computer Science Engineering",
          "Information Technology",
          "Artificial Intelligence",
          "Data Science",
          "Cybersecurity"
        ]
      },
      {
        title: "Electronics and Electrical Engineering",
        subjects: [
          "Electronics and Communication",
          "Electrical and Electronics",
          "Instrumentation",
          "Embedded Systems"
        ]
      },
      {
        title: "Mechanical and Infrastructure",
        subjects: [
          "Mechanical Engineering",
          "Civil Engineering",
          "Automobile Engineering",
          "Aerospace Engineering",
          "Mechatronics"
        ]
      },
      {
        title: "Biomedical and Applied Engineering",
        subjects: [
          "Biomedical Engineering",
          "Biotechnology",
          "Chemical Engineering",
          "Robotics and Automation"
        ]
      },
      {
        title: "Common Engineering Subjects",
        subjects: [
          "Engineering Mathematics",
          "Programming",
          "Data Structures",
          "Engineering Mechanics",
          "Digital Electronics",
          "Engineering Physics"
        ]
      }
    ]
  }
];

export function findCourse(slug: string) {
  return courseDetails.find((course) => course.slug === slug);
}
