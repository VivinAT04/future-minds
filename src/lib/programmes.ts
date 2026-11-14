export type Programme = {
  id: string;
  category: string;
  title: string;
  description: string;
  subjects: string[];
};

export const programmes: Programme[] = [
  {
    id: "school",
    category: "SCHOOL EDUCATION",
    title: "Classes 6–12",
    description:
      "Structured academic tuition designed to strengthen concepts and prepare students for examinations.",
    subjects: [
      "CBSE",
      "ICSE",
      "Matriculation",
      "Mathematics",
      "Science",
      "Board Examination Preparation"
    ]
  },
  {
    id: "neet",
    category: "MEDICAL ENTRANCE",
    title: "NEET Preparation",
    description:
      "Focused preparation for students pursuing medical entrance examinations.",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology",
      "Concept Practice",
      "Exam Preparation"
    ]
  },
  {
    id: "jee",
    category: "ENGINEERING ENTRANCE",
    title: "JEE Preparation",
    description:
      "Concept-driven preparation for JEE Main and JEE Advanced.",
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "JEE Main",
      "JEE Advanced"
    ]
  },
  {
    id: "engineering",
    category: "HIGHER EDUCATION",
    title: "Engineering Classes",
    description:
      "Academic support for engineering students across selected subjects.",
    subjects: [
      "Engineering Mathematics",
      "Core Engineering Subjects",
      "Concept Development",
      "Examination Support"
    ]
  }
];
