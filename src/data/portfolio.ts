import { education } from "./education";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";
import type { LinkItem, Portfolio } from "./portfolio-types";
export type * from "./portfolio-types";

// Populate only from the supplied r?sum? or explicitly confirmed public materials.
export const portfolio: Portfolio = {
  profile,
  projects,
  skills,
  timeline: [...experience, ...education],
  services: [
    {
      title: "Frontend development",
      description:
        "Responsive, component-based interfaces for web applications and prototypes.",
      capabilities: [
        "Mobile-first layouts",
        "Reusable React components",
        "Multi-page navigation",
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "React Router"],
      responsibilities: ["Build page layouts, navigation, and shared client-side state."],
      problems: ["Complex workflows that are difficult to navigate on small screens."],
      approach:
        "Start with the smallest viewport and shared components, then check how the experience scales.",
    },
    {
      title: "Full-stack prototyping",
      description:
        "End-to-end web prototypes with application data, APIs, and a working interface.",
      capabilities: ["Dashboard UI", "User authentication", "Data-backed workflows"],
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      responsibilities: ["Connect application views to backend and database services."],
      problems: [
        "Testing a workflow that depends on persistent data and multiple parts of the stack.",
      ],
      approach:
        "Define the main user flow and data needs before integrating the interface and backend.",
    },
    {
      title: "Backend and API integration",
      description: "Backend services and integrations for data-driven interfaces.",
      capabilities: ["REST APIs", "CRUD operations", "Third-party API integration"],
      technologies: ["Node.js", "Express", "MongoDB", "Postman"],
      responsibilities: ["Structure data operations and connect application features to APIs."],
      problems: [
        "Keeping frontend workflows in sync with server-side data and external services.",
      ],
      approach:
        "Model the data and API contract, then check requests and responses before using them in the UI.",
    },
  ],
  principles: [
    {
      title: "Reusable by default",
      description:
        "Use shared components and state where several views need to behave consistently.",
    },
    {
      title: "Start with small screens",
      description:
        "Design the core interaction for mobile first, then make room for more context on larger screens.",
    },
    {
      title: "Clear data flow",
      description:
        "Keep the interface, application logic, and database responsibilities easy to trace.",
    },
    {
      title: "Verify each step",
      description:
        "Check how a view responds to real data, including empty states and failed requests.",
    },
  ],
  strengths: [
    {
      title: "Model a practical workflow",
      evidence:
        "The ambulance prototype brings incidents, priority, and vehicle availability into one dispatcher view.",
    },
    {
      title: "Keep mobile journeys connected",
      evidence:
        "Custom My Gold uses shared client-side state across savings, engraving, and gifting screens.",
    },
    {
      title: "Work across the stack",
      evidence:
        "The compliance prototype connects authentication and a React dashboard with backend services and AI APIs.",
    },
  ],
};

export const navigation: LinkItem[] = [
  { label: "Services", href: "/services" },
  { label: "Skills", href: "/skills" },
  { label: "Works", href: "/works" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export const stages = [
  {
    title: "Understand",
    description:
      "Identify the people using the product, the problem they need to solve, and what success should look like.",
  },
  {
    title: "Plan and design",
    description:
      "Map the core journeys, agree on the scope, and turn the decisions into a layout and a technical plan.",
  },
  {
    title: "Develop",
    description:
      "Build the smallest complete version of each workflow, with predictable state and clear component boundaries.",
  },
  {
    title: "Integrate",
    description:
      "Connect the interface to services and verify loading, success, empty, and failure states with representative data.",
  },
  {
    title: "Test and deploy",
    description:
      "Check keyboard and mobile behavior, run automated checks, and verify the deployed build.",
  },
];
