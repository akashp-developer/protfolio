import type { Project } from "./portfolio-types";

export const projects: Project[] = [
  {
    slug: "custom-my-gold",
    title: "Custom My Gold",
    category: "Frontend",
    status: "Prototype",
    summary:
      "A mobile-first digital gold concept with savings, personalized coin engraving, and gifting flows.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "React Router", "Context API"],
    featured: true,
    cover: {
      src: "/images/projects/custom-my-gold.webp",
      alt: "Editorial illustration of concentric gold coins",
      width: 1280,
      height: 840,
    },
    problem:
      "Explore how savings, personalization, and gifting could fit into a single digital gold experience.",
    objectives: [
      "Prototype the core flows for a mobile viewport.",
      "Keep interface state available as users move between screens.",
    ],
    contributions: [
      "Developed the mobile-first frontend and navigation.",
      "Used Context API for shared client-side state.",
    ],
    architecture:
      "A React and TypeScript frontend with Tailwind CSS for styling, React Router for navigation, and Context API for shared client-side state.",
    features: ["Digital gold and savings", "Personalized coin engraving", "Gifting"],
    challenges: ["Maintaining continuity across a multi-screen mobile experience."],
    solutions: [
      "Used shared client-side state and route-based navigation to connect the flows.",
    ],
    relatedSlugs: ["ambulance-dispatch", "tax-compliance"],
  },
  {
    slug: "ambulance-dispatch",
    title: "Smart Ambulance Allocation",
    category: "Operations",
    status: "Prototype",
    summary:
      "An emergency-response dashboard prototype for managing incidents, checking ambulance availability, and prioritizing allocation.",
    technologies: ["HTML", "CSS", "JavaScript", "Flask", "SQLite"],
    featured: true,
    cover: {
      src: "/images/projects/ambulance-dispatch.webp",
      alt: "Editorial illustration of dispatch routes on a map",
      width: 1280,
      height: 840,
    },
    problem:
      "Dispatchers need to see incident priority and ambulance availability together when deciding how to allocate vehicles.",
    objectives: [
      "Bring incident management and vehicle availability into one dashboard.",
      "Support a priority-based allocation workflow.",
    ],
    contributions: [
      "Built the emergency incident management prototype.",
      "Implemented incident prioritization and the dispatcher dashboard.",
    ],
    architecture:
      "An HTML, CSS, and JavaScript interface with Flask on the server and SQLite for data storage.",
    features: [
      "Incident management",
      "Ambulance availability",
      "Incident prioritization",
      "Dispatcher dashboard",
    ],
    challenges: ["Showing incident priority alongside available ambulances."],
    solutions: [
      "Combined incident information, vehicle availability, and prioritization in the dispatcher dashboard.",
    ],
    relatedSlugs: ["tax-compliance", "custom-my-gold"],
  },
  {
    slug: "tax-compliance",
    title: "Adaptive Tax Law Monitoring",
    category: "Full stack",
    status: "Prototype",
    summary:
      "A full-stack compliance prototype with authentication, a dashboard, AI-assisted tax law monitoring, and alerts.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "AI APIs"],
    featured: true,
    cover: {
      src: "/images/projects/tax-compliance.webp",
      alt: "Editorial illustration of layered compliance documents",
      width: 1280,
      height: 840,
    },
    problem:
      "Explore a more centralized way to monitor tax law changes and surface compliance alerts.",
    objectives: [
      "Bring monitoring and alerts into an authenticated dashboard.",
      "Integrate AI APIs into the prototype’s monitoring workflow.",
    ],
    contributions: [
      "Developed the full-stack prototype with user authentication and an interactive dashboard.",
      "Integrated AI-assisted tax monitoring and compliance alerts.",
    ],
    architecture:
      "A React dashboard connected to a Node.js and Express backend, with MongoDB and external AI APIs.",
    features: [
      "User authentication",
      "Compliance dashboard",
      "AI-assisted monitoring",
      "Compliance alerts",
    ],
    challenges: ["Connecting monitoring inputs and alert output to a single interface."],
    solutions: [
      "Integrated the AI APIs with the full-stack dashboard and exposed alerts in the interface.",
    ],
    relatedSlugs: ["ambulance-dispatch", "custom-my-gold"],
  },
];
