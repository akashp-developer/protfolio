import type { Profile } from "./portfolio-types";
import { socials } from "./socials";

export const profile: Profile = {
  name: "Akash P",
  initials: "AP",
  title: "Full-stack developer",
  introduction:
    "I’m an Information Technology student building responsive React interfaces and connecting them to APIs and databases. I use full-stack prototypes to put those pieces together.",
  summary:
    "I’m a B.Tech Information Technology student at Excel Engineering College. I build responsive interfaces and full-stack prototypes, from a mobile-first digital gold concept to emergency dispatch and compliance dashboards.",
  location: "Hosur, Tamil Nadu",
  availability: "Open to full-stack development internships",
  email: "akashparamesh21@gmail.com",
  resume: "/resume/akash-p-resume.pdf",
  socials,
  facts: [
    { value: "04", label: "Featured prototypes" },
    { value: "2028", label: "Graduation year" },
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
};
