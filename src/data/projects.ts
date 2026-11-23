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
      src: "/images/projects/custom-my-gold-cover.webp",
      alt: "Concept mockup of the Custom My Gold savings app beside an engraved gold coin",
      width: 1280,
      height: 853,
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
      "A dispatch dashboard with an interactive React demo for triaging emergency requests, assigning ambulance units, and reviewing fleet and hospital availability.",
    technologies: ["React", "Vite", "JavaScript", "CSS", "HTML", "Flask", "SQLite"],
    featured: true,
    cover: {
      src: "/images/projects/ambulance-react-dashboard.webp",
      alt: "Emergency response overview with a dispatch map, an activity chart, and recent requests",
      width: 1440,
      height: 960,
      caption: "React demo dashboard with sample data",
    },
    screenshots: [
      {
        src: "/images/projects/ambulance-react-emergencies.webp",
        alt: "Emergency requests table with search, priority and status filters, and allocation actions",
        width: 1440,
        height: 960,
      },
      {
        src: "/images/projects/ambulance-react-allocation.webp",
        alt: "Ambulance allocation screen with suggested units, a sample route map, and assignment controls",
        width: 1440,
        height: 960,
      },
    ],
    liveUrl: "/demos/smart-ambulance/index.html",
    repositoryUrl: "https://github.com/Arul-developerr/smart-ambulance",
    problem:
      "Dispatchers need to see incident priority and ambulance availability together when deciding how to allocate vehicles.",
    objectives: [
      "Bring incident management and vehicle availability into one dashboard.",
      "Support a priority-based allocation workflow.",
    ],
    contributions: [
      "Built the original Flask prototype for emergency incident management.",
      "Implemented incident prioritization and the dispatcher dashboard in the original prototype.",
    ],
    architecture:
      "The original prototype uses HTML, CSS, and JavaScript with Flask and SQLite. The linked React and Vite demo stores requests and preferences in browser localStorage. It uses illustrative records and a simulated map and runs without live GPS, hospital APIs, or emergency-service integrations.",
    features: [
      "Create and filter emergency requests by priority or status.",
      "Assign ambulance units and mark demo cases completed.",
      "Review sample fleet availability, the hospital directory, and dispatch analytics.",
      "Zoom and explore an illustrative dispatch map.",
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
      src: "/images/projects/tax-compliance-cover.webp",
      alt: "Concept mockup of a tax law monitoring dashboard with recent updates and a highlighted document preview",
      width: 1280,
      height: 853,
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
