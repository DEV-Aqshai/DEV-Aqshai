export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  status: string;
  accent: string;
  featured?: boolean;
  details: string[];
};

export const projects: Project[] = [
  {
    slug: "smart-simple-ai-board",
    number: "01",
    name: "Smart Simple AI Board",
    category: "AI / WEB APPLICATION",
    description: "An AI-assisted workspace that brings drawing, writing and problem-solving into one interactive canvas.",
    stack: ["Gemini API", "Express", "Fabric.js"],
    href: "https://github.com/DEV-Aqshai/smart-simple-AI-board",
    status: "PUBLIC REPOSITORY",
    accent: "violet",
    featured: true,
    details: [
      "Combines a visual canvas with AI-assisted workflows.",
      "Explores how natural-language AI can support creative and educational tasks.",
      "Built as a practical experiment in connecting frontend interactions to an AI service."
    ]
  },
  {
    slug: "echoes",
    number: "02",
    name: "Echoes",
    category: "ANDROID / KOTLIN",
    description: "An Android learning project exploring a personal assistant experience and native mobile development.",
    stack: ["Kotlin", "Android"],
    href: "https://github.com/DEV-Aqshai/Echoes",
    status: "PUBLIC REPOSITORY",
    accent: "blue",
    featured: true,
    details: [
      "Created as a hands-on project to learn Kotlin and Android development.",
      "Explores assistant-style interactions and mobile application structure.",
      "A practical learning project focused on building with native Android tools."
    ]
  },
  {
    slug: "exam-rescue",
    number: "03",
    name: "Exam Rescue",
    category: "ANDROID / EDUCATION",
    description: "An offline-first educational app concept designed around Sri Lankan GCE O/L student workflows.",
    stack: ["Android", "Kotlin", "Offline-first"],
    href: "https://github.com/DEV-Aqshai/Exam-rescue",
    status: "PUBLIC REPOSITORY",
    accent: "cyan",
    featured: true,
    details: [
      "Designed for students who need useful study tools without depending on a constant connection.",
      "Supports a Sri Lankan educational context and Tamil / English medium learning.",
      "Prioritizes practical student workflows and local usability."
    ]
  },
  {
    slug: "kurama",
    number: "04",
    name: "KURAMA",
    category: "3D / WEB EXPERIMENT",
    description: "A Three.js exploration that reflects an interest in interactive graphics and browser-based 3D.",
    stack: ["Three.js", "JavaScript"],
    href: "https://github.com/DEV-Aqshai/KURAMA",
    status: "PUBLIC REPOSITORY",
    accent: "blue",
    details: [
      "A playground for exploring real-time 3D in the browser.",
      "Relevant to the interactive visual direction of this portfolio."
    ]
  },
  {
    slug: "timetablemaker",
    number: "05",
    name: "TimeTableMaker",
    category: "WEB APPLICATION",
    description: "A timetable-building project focused on making school scheduling easier to organize.",
    stack: ["Web", "JavaScript"],
    href: "https://github.com/DEV-Aqshai/TimeTableMaker",
    status: "PUBLIC REPOSITORY",
    accent: "violet",
    details: [
      "Explores a practical scheduling workflow.",
      "A utility-focused project built around a familiar organizational problem."
    ]
  },
  {
    slug: "devz-skins",
    number: "06",
    name: "devz-skins",
    category: "CUSTOMIZATION / WEB",
    description: "A collection of developer-themed customization experiments for everyday platforms.",
    stack: ["JavaScript", "CSS"],
    href: "https://github.com/DEV-Aqshai/devz-skins",
    status: "PUBLIC REPOSITORY",
    accent: "cyan",
    details: [
      "Explores interface customization and visual consistency.",
      "Shows an interest in making familiar software feel more personal."
    ]
  }
];
