export type CatalogueGroup = {
  id: string;
  number: string;
  category: string;
  title: string;
  introduction: string;
  sections: {
    title: string;
    items: string[];
  }[];
};

export const catalogue: CatalogueGroup[] = [
  {
    id: "school",
    number: "01",
    category: "SCHOOL EDUCATION",
    title: "School Tuition",
    introduction:
      "Academic support for students from Class 6 to Class 12, organised by educational board, grade and subject.",
    sections: [
      {
        title: "Educational Boards",
        items: [
          "CBSE",
          "ICSE / CISCE",
          "Tamil Nadu State Board",
          "Matriculation",
          "Other State Boards"
        ]
      },
      {
        title: "Classes",
        items: [
          "Class 6",
          "Class 7",
          "Class 8",
          "Class 9",
          "Class 10",
          "Class 11",
          "Class 12"
        ]
      },
      {
        title: "Core Subjects",
        items: [
          "Mathematics",
          "Science",
          "Physics",
          "Chemistry",
          "Biology",
          "Computer Science",
          "Social Science",
          "Commerce"
        ]
      },
      {
        title: "Languages",
        items: [
          "Tamil",
          "English",
          "Hindi",
          "Other Languages"
        ]
      }
    ]
  },
  {
    id: "entrance",
    number: "02",
    category: "COMPETITIVE EXAMINATIONS",
    title: "Entrance Exam Preparation",
    introduction:
      "Specialised academic preparation for competitive entrance examinations, with subject-focused learning pathways.",
    sections: [
      {
        title: "Medical Entrance",
        items: [
          "NEET UG",
          "Physics",
          "Chemistry",
          "Botany",
          "Zoology"
        ]
      },
      {
        title: "Engineering Entrance",
        items: [
          "JEE Main",
          "JEE Advanced",
          "Mathematics",
          "Physics",
          "Chemistry"
        ]
      },
      {
        title: "Preparation Activities",
        items: [
          "Concept Revision",
          "Problem Solving",
          "Practice Tests",
          "Mock Examinations",
          "Exam Strategies"
        ]
      }
    ]
  },
  {
    id: "engineering",
    number: "03",
    category: "HIGHER EDUCATION",
    title: "Engineering & Technology",
    introduction:
      "A flexible academic framework for engineering learners, organised by discipline and individual subjects.",
    sections: [
      {
        title: "Computing & Electronics",
        items: [
          "Computer Science Engineering (CSE)",
          "Information Technology (IT)",
          "Artificial Intelligence & Data Science",
          "Electronics & Communication (ECE)",
          "Electrical & Electronics (EEE)"
        ]
      },
      {
        title: "Core Engineering",
        items: [
          "Mechanical Engineering",
          "Civil Engineering",
          "Chemical Engineering",
          "Aerospace Engineering",
          "Automobile Engineering"
        ]
      },
      {
        title: "Interdisciplinary Engineering",
        items: [
          "Biomedical Engineering",
          "Biotechnology",
          "Mechatronics",
          "Robotics & Automation",
          "Instrumentation Engineering"
        ]
      },
      {
        title: "Common Engineering Subjects",
        items: [
          "Engineering Mathematics",
          "Engineering Physics",
          "Engineering Chemistry",
          "Programming",
          "Data Structures",
          "Engineering Mechanics",
          "Digital Electronics",
          "Statistics"
        ]
      }
    ]
  }
];

export const academicBoards = [
  "CBSE",
  "ICSE / CISCE",
  "Tamil Nadu State Board",
  "Matriculation",
  "Other State Boards"
];

export const academicLevels = [
  "Classes 6–8",
  "Classes 9–10",
  "Classes 11–12",
  "NEET & JEE",
  "Engineering & Technology"
];

export const catalogueNotice =
  "This is the planned programme catalogue. Specific subjects, faculty availability, batches and admissions will be confirmed by Future Minds.";
