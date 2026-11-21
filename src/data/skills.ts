import type { Skill } from "./portfolio-types";

export const skills: Skill[] = [
  {
    name: "Programming languages",
    category: "Languages",
    description: "Programming fundamentals and typed or untyped application code.",
    tools: ["Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    name: "Component-based interfaces",
    category: "Frontend",
    description: "Responsive pages, client-side navigation, and shared interface state.",
    tools: ["React", "React Router", "Context API", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    name: "Application services",
    category: "Backend",
    description: "RESTful application logic, CRUD operations, and external API integrations.",
    tools: ["Node.js", "Express", "Flask", "REST APIs", "CRUD"],
  },
  {
    name: "Data storage",
    category: "Databases",
    description:
      "Relational and document database fundamentals, with MongoDB and SQLite used in prototypes.",
    tools: ["MySQL", "MongoDB", "SQLite"],
  },
  {
    name: "Web frameworks",
    category: "Frameworks",
    description:
      "Tools used for interface components, API routing, and lightweight web services.",
    tools: ["React", "Express", "Flask"],
  },
  {
    name: "Tools and workflow",
    category: "Tools",
    description: "Source control, editing, and API inspection.",
    tools: ["Git", "GitHub", "VS Code", "Postman"],
  },
  {
    name: "Computer science foundations",
    category: "Foundations",
    description: "Core subjects from my Information Technology coursework.",
    tools: [
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Object-oriented Programming",
    ],
  },
];
