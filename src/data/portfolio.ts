export type LinkItem = { label: string; href: string };

export type Profile = {
  name: string;
  initials: string;
  title: string;
  introduction: string;
  summary: string;
  location?: string;
  availability?: string;
  email?: string;
  resume?: `/resume/${string}.pdf`;
  socials: LinkItem[];
  focus?: {
    status: string;
    goals?: string[];
    exploring?: string[];
    interests?: string[];
    projectSlugs?: string[];
  };
  facts?: { value: string; label: string }[];
};

export type Skill = { name: string; category: string; description: string; tools: string[] };
export type Service = {
  title: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  responsibilities: string[];
  problems: string[];
  approach?: string;
};
export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  kind: "Employment" | "Internship" | "Education" | "Certification" | "Achievement";
  details: string[];
};

export type ProjectImage = {
  src: `/images/projects/${string}`;
  alt: string;
  width: number;
  height: number;
};
export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  technologies: string[];
  featured?: boolean;
  cover?: ProjectImage;
  screenshots?: ProjectImage[];
  liveUrl?: string;
  repositoryUrl?: string;
  problem?: string;
  objectives?: string[];
  contributions?: string[];
  architecture?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  relatedSlugs?: string[];
};

export type Portfolio = {
  profile: Profile | null;
  services: Service[];
  skills: Skill[];
  projects: Project[];
  timeline: TimelineItem[];
  principles: { title: string; description: string }[];
  strengths: { title: string; evidence: string }[];
};

// Populate only from the supplied résumé or explicitly confirmed public materials.
// Keep timeline records newest first within each group.
export const portfolio: Portfolio = {
  profile: {
    name: "Akash P",
    initials: "AP",
    title: "Full-stack developer",
    introduction:
      "I’m an Information Technology student building responsive web applications with React, APIs, and databases.",
    summary:
      "I’m a B.Tech Information Technology student at Excel Engineering College. My projects span a mobile-first digital gold concept, an emergency dispatch dashboard, and a full-stack compliance prototype. They’re how I practice taking an idea from the interface through the data layer.",
    location: "Hosur, Tamil Nadu",
    availability: "Seeking a full-stack internship",
    email: "akashparamesh21@gmail.com",
    resume: "/resume/akash-p-resume.pdf",
    socials: [{ label: "GitHub", href: "https://github.com/akashp-developer" }],
    facts: [
      { value: "03", label: "Featured prototypes" },
      { value: "2028", label: "Expected graduation" },
      { value: "7.8 / 10", label: "CGPA" },
    ],
    focus: {
      status: "B.Tech Information Technology · Excel Engineering College",
      goals: [
        "Gain hands-on experience through a full-stack internship.",
        "Develop responsive applications that connect user interfaces, APIs, and databases.",
      ],
      exploring: ["REST APIs", "Backend services", "Database integration"],
      interests: ["Responsive web interfaces", "Full-stack prototypes"],
    },
  },
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
  skills: [
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
  ],
  projects: [
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
  ],
  timeline: [
    {
      title: "B.Tech in Information Technology",
      organization: "Excel Engineering College (Autonomous) · Komarapalayam",
      period: "Expected graduation 2028",
      kind: "Education",
      details: [
        "CGPA 7.8 / 10",
        "Coursework includes data structures, algorithms, databases, operating systems, and object-oriented programming.",
      ],
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
