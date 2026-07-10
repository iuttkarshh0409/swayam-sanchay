/**
 * projects-data.js
 * Single source of truth for all project metadata.
 *
 * ─── HOW TO ADD A NEW PROJECT ────────────────────────────────────────────────
 * Append one object to the PROJECTS array. Every UI surface — archive cards,
 * search, filters, category sections, and statistics — derives its data from
 * this file automatically. No component modifications are required.
 *
 * ─── CARD-LEVEL SCHEMA ───────────────────────────────────────────────────────
 *
 * Required:
 *   id              number     Unique integer, increment from last
 *   slug            string     URL-safe identifier e.g. "devlens"
 *   title           string     Display name
 *   status          string     See STATUS_MAP keys
 *   difficulty      string     See DIFFICULTY_MAP keys
 *   year            number     Year of primary development activity
 *   featured        boolean    true → appears in "Featured" filter
 *   category        string     See CATEGORY_ORDER for canonical values
 *   description     string     One-paragraph summary shown on the card
 *   technologies    string[]   Tech stack tags (lowercase, hyphenated)
 *   tags            string[]   Must match FILTER_CHIPS values
 *   openSource      boolean
 *   liveDeployment  boolean
 *
 * Optional:
 *   completionDate       string    e.g. "July 2025"
 *   estimatedBuildTime   string    e.g. "6 Weeks"
 *   projectScale         string    "Small" | "Medium" | "Large" | "Enterprise"
 *   projectType          string    e.g. "GitHub App" | "Web Platform" | "CLI Tool"
 *   metrics              string[]  Compact achievement pills e.g. "GitHub App"
 *   github               string | null
 *   live                 string | null
 *   caseStudy            string | null
 *   image                string | null
 *
 * Note: Long-form documentation fields (overview, problemStatement, solution,
 * architecture, challenges, lessonsLearned, futureImprovements, timeline,
 * highlights) are reserved for a future individual project pages iteration.
 * Do not add them here yet.
 */

export const PROJECTS = [
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "devlens",
    title: "DevLens",
    status: "flagship",
    difficulty: "research",
    year: 2026,
    featured: true,
    category: "Flagship",
    description:
      "An AI-powered GitHub code review platform that audits repositories using native GitHub Checks, intelligent repository analysis, and automated engineering best-practice scoring. Built as a production-grade GitHub App with a modern developer tooling ecosystem.",
    completionDate: "July 2026",
    estimatedBuildTime: "4 Weeks",
    projectScale: "Large",
    projectType: "GitHub App",
    metrics: [
      "GitHub App",
      "VS Code Extension",
      "CLI",
      "REST API",
      "10 AI Analyzers",
      "Render Deployment",
    ],
    technologies: [
      "fastapi",
      "python",
      "github-app",
      "github-api",
      "github-checks",
      "ai",
      "webhooks",
      "react",
      "render",
    ],
    tags: [
      "featured",
      "ai",
      "full-stack",
      "backend",
      "open-source",
      "developer-tools",
      "github-apps",
    ],
    github: "https://github.com/iuttkarshh0409/DevLens-v3",
    live: "https://github.com/apps/devlens-v3",
    caseStudy: null,
    image: null,
    openSource: true,
    liveDeployment: true,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    slug: "alumconnect",
    title: "AlumConnect",
    status: "in-production",
    difficulty: "advanced",
    year: 2025,
    featured: true,
    category: "Flagship",
    description:
      "A full-stack alumni networking and mentorship platform built with React, FastAPI, MongoDB Atlas, and Clerk Authentication. Enables alumni discovery, mentorship connections, role-based access, analytics dashboards, and cloud-native deployment.",
    completionDate: null,
    estimatedBuildTime: "Ongoing",
    projectScale: "Large",
    projectType: "Web Platform",
    metrics: [
      "Vercel + Render",
      "MongoDB Atlas",
      "Clerk Auth",
      "REST API",
      "Role-Based Access",
    ],
    technologies: [
      "react",
      "fastapi",
      "python",
      "mongodb-atlas",
      "clerk",
      "vercel",
      "render",
      "jwt",
    ],
    tags: ["featured", "full-stack", "backend", "open-source"],
    github: "https://github.com/iuttkarshh0409/alumconnect-backend",
    live: "https://www.alumconnectiips.app/",
    caseStudy: null,
    image: null,
    openSource: true,
    liveDeployment: true,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    slug: "swayam-sanchay",
    title: "Swayam-Sanchay",
    status: "active",
    difficulty: "intermediate",
    year: 2026,
    featured: false,
    category: "Web Applications",
    description:
      "A personal digital identity platform and engineering learning archive. Built intentionally using pure vanilla HTML, CSS variables, and zero heavy abstraction frameworks to ensure ultimate transparency, performance, and diagnostic clarity.",
    completionDate: null,
    estimatedBuildTime: "Ongoing",
    projectScale: "Small",
    projectType: "Personal Archive",
    metrics: [
      "Zero Frameworks",
      "Vercel Deployment",
      "Canvas Animation",
      "ES Modules",
      "Pure CSS Variables",
    ],
    technologies: [
      "vanilla-js",
      "css-variables",
      "canvas-api",
      "html5",
      "vite",
      "vercel",
    ],
    tags: ["featured", "frontend", "open-source", "learning"],
    github: "https://github.com/iuttkarshh0409",
    live: "https://swayam-sanchay.vercel.app/",
    caseStudy: null,
    image: null,
    openSource: true,
    liveDeployment: true,
  },
  // ──────────────────────────────────────────────────────────────────────────
{
  id: 4,
  slug: "aquasentinel",
  title: "AquaSentinel Indore",
  status: "complete",
  difficulty: "research",
  year: 2026,
  featured: false,
  category: "Research & Systems",

  description:
    "An AI-powered groundwater intelligence and municipal decision-support platform built for Indore. AquaSentinel combines machine learning forecasting, environmental telemetry, aquifer stress analysis, and automated intervention recommendations to help authorities monitor groundwater health and make data-driven policy decisions.",

  completionDate: "June 2026",
  estimatedBuildTime: "3 Weeks",
  projectScale: "Medium",
  projectType: "Environmental Intelligence Platform",

  metrics: [
    "Machine Learning",
    "Municipal Dashboard",
    "Forecast Model",
    "Risk Engine",
    "Interactive Analytics",
    "Policy Recommendations"
  ],

  technologies: [
    "react",
    "tailwindcss",
    "flask",
    "python",
    "scikit-learn",
    "recharts",
    "framer-motion"
  ],

  tags: [
    "ai",
    "research",
    "full-stack",
    "frontend",
    "backend",
    "open-source"
  ],

  github: "https://github.com/iuttkarshh0409/aquasentinel-indore",
  live: "https://aquasentinel-indore.vercel.app/",
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: true,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 5,
  slug: "projectmind",
  title: "ProjectMind",
  status: "complete",
  difficulty: "intermediate",
  year: 2026,
  featured: false,
  category: "Developer Tools",

  description:
    "An AI-powered change impact and review obligation engine that analyzes code modifications to predict downstream review responsibilities before they become hidden defects. ProjectMind combines deterministic dependency analysis with structured LLM reasoning to generate actionable engineering review checklists.",

  completionDate: "July 2026",
  estimatedBuildTime: "2 Weeks",
  projectScale: "Small",
  projectType: "AI Developer Tool",

  metrics: [
    "CLI Application",
    "Git Diff Analysis",
    "LLM Assisted",
    "Dependency Mapping",
    "Review Automation",
    "MIT Licensed"
  ],

  technologies: [
    "python",
    "fastapi",
    "pydantic",
    "google-gemini",
    "click",
    "pytest",
    "uv"
  ],

  tags: [
    "ai",
    "research",
    "developer-tools",
    "cli",
    "open-source"
  ],

  github: "https://github.com/iuttkarshh0409/ProjectMind",
  live: null,
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: false,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 6,
  slug: "orgsync",
  title: "OrgSync",
  status: "complete",
  difficulty: "advanced",
  year: 2026,
  featured: false,
  category: "Enterprise Systems",

  description:
    "A multi-tenant SaaS task management platform that enables multiple organizations to securely manage projects within a shared infrastructure. OrgSync implements tenant isolation, role-based access control, JWT authentication, Dockerized deployment, and complete task lifecycle management with activity auditing.",

  completionDate: "April 2026",
  estimatedBuildTime: "4 Weeks",
  projectScale: "Large",
  projectType: "Multi-Tenant SaaS Platform",

  metrics: [
    "Multi-Tenant Architecture",
    "JWT Authentication",
    "Role-Based Access",
    "Activity Audit Logs",
    "Dockerized Deployment",
    "PostgreSQL"
  ],

  technologies: [
    "react",
    "vite",
    "nodejs",
    "express",
    "postgresql",
    "jwt",
    "docker",
    "docker-compose",
    "nginx"
  ],

  tags: [
    "full-stack",
    "backend",
    "frontend",
    "open-source"
  ],

  github: "https://github.com/iuttkarshh0409/OrgSync",
  live: "https://org-sync-chi.vercel.app",
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: true,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 7,
  slug: "habit-cadence",
  title: "Habit Cadence",
  status: "complete",
  difficulty: "advanced",
  year: 2026,
  featured: false,
  category: "Full Stack",

  description:
    "A full-stack productivity and habit tracking platform engineered around behavioral analytics rather than simple task completion. Habit Cadence combines FastAPI, React, Turso, and interactive visualizations to help users understand consistency, long-term trends, and personal performance through intelligent insights.",

  completionDate: "March 2026",
  estimatedBuildTime: "8 Weeks",
  projectScale: "Medium",
  projectType: "Productivity Platform",

  metrics: [
    "Behavior Analytics",
    "Insight Engine",
    "CSV Export",
    "Edge Database",
    "Interactive Charts",
    "Serverless Deployment"
  ],

  technologies: [
    "react",
    "vite",
    "fastapi",
    "python",
    "tailwindcss",
    "zustand",
    "tanstack-query",
    "recharts",
    "turso",
    "vercel"
  ],

  tags: [
    "full-stack",
    "frontend",
    "backend",
    "open-source"
  ],

  github: "https://github.com/iuttkarshh0409/habit-cadence",
  live: "https://core-prime.vercel.app",
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: true,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 8,
  slug: "aeris-v2",
  title: "AERIS v2",
  status: "complete",
  difficulty: "research",
  year: 2026,
  featured: false,
  category: "Research & Systems",

  description:
    "An intelligence-driven reliability engine that transforms infrastructure failures into deterministic reliability signals. AERIS combines rule-based reasoning, drift analysis, severity escalation, and historical auditing to help engineers understand evolving system health instead of reacting to isolated incidents.",

  completionDate: "March 2026",
  estimatedBuildTime: "12 Weeks",
  projectScale: "Medium",
  projectType: "Reliability Intelligence Engine",

  metrics: [
    "Drift Analysis",
    "Logic Traces",
    "Severity Engine",
    "Observability",
    "REST API",
    "Historical Auditing"
  ],

  technologies: [
    "python",
    "fastapi",
    "sqlite",
    "rest-api",
    "observability",
    "analytics"
  ],

  tags: [
    "ai",
    "backend",
    "research",
    "developer-tools",
    "open-source"
  ],

  github: "https://github.com/iuttkarshh0409/aeris-v2",
  live: null,
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: false,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 9,
  slug: "eduRTC",
  title: "EduRTC",
  status: "complete",
  difficulty: "intermediate",
  year: 2026,
  featured: false,
  category: "Web Applications",

  description:
    "A real-time virtual classroom platform built around native WebRTC peer-to-peer communication. The system combines a FastAPI WebSocket signaling server with a React frontend to enable low-latency video conferencing, screen sharing, classroom chat, and collaborative remote learning.",

  completionDate: "March 2026",
  estimatedBuildTime: "2 Weeks",
  projectScale: "Medium",
  projectType: "Real-Time Collaboration Platform",

  metrics: [
    "Native WebRTC",
    "WebSocket Signaling",
    "P2P Chat",
    "Screen Sharing",
    "Video Conferencing",
    "Virtual Classrooms"
  ],

  technologies: [
    "react",
    "vite",
    "fastapi",
    "python",
    "webrtc",
    "websockets",
    "javascript"
  ],

  tags: [
    "frontend",
    "backend",
    "full-stack",
    "open-source"
  ],

  github: "https://github.com/iuttkarshh0409/---WEBrtc---",
  live: "https://we-brtc.vercel.app",
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: true,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 10,
  slug: "discipline-engine",
  title: "Discipline Engine",
  status: "complete",
  difficulty: "research",
  year: 2026,
  featured: false,
  category: "Research & Systems",

  description:
    "A decision intelligence platform that models projects as Directed Acyclic Graphs (DAGs) to recommend the most impactful next action. By combining Critical Path Method analysis, heuristic task scoring, velocity tracking, and probabilistic risk estimation, PDE shifts project management from simple task tracking to engineering-driven execution planning.",

  completionDate: "February 2026",
  estimatedBuildTime: "3 Weeks",
  projectScale: "Medium",
  projectType: "Decision Intelligence Engine",

  metrics: [
    "Critical Path Method",
    "DAG Engine",
    "Risk Analytics",
    "AI Strategy Advisor",
    "Performance Metrics",
    "Observability"
  ],

  technologies: [
    "python",
    "fastapi",
    "react",
    "sqlmodel",
    "pytest",
    "loguru",
    "mermaid",
    "gemini-ai"
  ],

  tags: [
    "research",
    "backend",
    "full-stack",
    "ai",
    "open-source"
  ],

  github: "https://github.com/iuttkarshh0409/discipline-engine",
  live: "https://discipline-engine.netlify.app",
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: true,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 11,
  slug: "farm-management-portal",
  title: "Farm Management Portal",
  status: "complete",
  difficulty: "advanced",
  year: 2025,
  featured: false,
  category: "Enterprise Systems",
  description:
    "A production-oriented backend platform for digital farm management, featuring JWT authentication, role-based access control, livestock lifecycle management, veterinary workflows, health record tracking, analytics dashboards, and a RESTful API architecture built with Flask and SQLAlchemy.",
  completionDate: "September 2025",
  estimatedBuildTime: "12 Weeks",
  projectScale: "Large",
  projectType: "Backend Platform",
  metrics: [
    "REST API",
    "JWT Auth",
    "RBAC",
    "SQLAlchemy",
    "Healthcare Workflow",
    "Pytest"
  ],
  technologies: [
    "python",
    "flask",
    "sqlalchemy",
    "sqlite",
    "postgresql",
    "jwt",
    "bcrypt",
    "pytest"
  ],
  tags: [
    "backend",
    "open-source",
    "enterprise"
  ],
  github: "https://github.com/iuttkarshh0409/backend_farm_management_portal",
  live: null,
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: false,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 12,
  slug: "anti-india-campaign-detection",
  title: "Anti-India Campaign Detection System",
  status: "experimental",
  difficulty: "intermediate",
  year: 2025,
  featured: false,
  category: "Experiments",
  description:
    "An interactive MVP security dashboard for monitoring and analyzing coordinated anti-India digital campaigns. Demonstrates real-time content analysis workflows, keyword intelligence, sentiment scoring, threat visualization, and alert management using simulated data.",
  completionDate: "September 2025",
  estimatedBuildTime: "2 Weeks",
  projectScale: "Medium",
  projectType: "Security Dashboard",
  metrics: [
    "Threat Scoring",
    "Sentiment Analysis",
    "Chart.js",
    "Live Dashboard",
    "Alert Engine"
  ],
  technologies: [
    "html5",
    "css3",
    "javascript",
    "chart.js"
  ],
  tags: [
    "frontend",
    "experimental"
  ],
  github: "https://github.com/iuttkarshh0409/aic-detection-model",
  live: null,
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: false,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 13,
  slug: "smart-academic-planner",
  title: "Smart Academic Planner",
  status: "complete",
  difficulty: "beginner",
  year: 2025,
  featured: false,
  category: "Web Applications",
  description:
    "An intelligent academic planning platform that combines timetable management, attendance analytics, semester calendar generation, and predictive attendance modeling to help students optimize academic performance and maintain attendance requirements.",
  completionDate: "2025",
  estimatedBuildTime: "2 Weeks",
  projectScale: "Medium",
  projectType: "Productivity Platform",
  metrics: [
    "Attendance Analytics",
    "Bunk Calculator",
    "Google Calendar Export",
    "Chart.js",
    "Offline First"
  ],
  technologies: [
    "html5",
    "css3",
    "javascript",
    "chart.js",
    "local-storage"
  ],
  tags: [
    "frontend",
    "learning",
    "productivity"
  ],
  github: "https://github.com/iuttkarshh0409/smart-academic-planner",
  live: null,
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: false,
},
// ──────────────────────────────────────────────────────────────────────────
{
  id: 14,
  slug: "edusync",
  title: "EduSync",
  status: "complete",
  difficulty: "intermediate",
  year: 2024,
  featured: false,
  category: "Web Applications",
  description:
    "A React Native mobile application for lecture schedule management, attendance awareness, course organization, and offline timetable access. Built with a Node.js backend and MySQL to provide students with a centralized academic scheduling platform.",
  completionDate: "December 2024",
  estimatedBuildTime: "6 Weeks",
  projectScale: "Medium",
  projectType: "Mobile Application",
  metrics: [
    "React Native",
    "Offline Support",
    "Lecture Timetable",
    "Notifications",
    "Node API"
  ],
  technologies: [
    "react-native",
    "nodejs",
    "express",
    "mysql",
    "javascript"
  ],
  tags: [
    "frontend",
    "backend",
    "mobile",
    "learning",
    "open-source"
  ],
  github: "https://github.com/iuttkarshh0409/EduSync",
  live: null,
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: false,
},
{
  id: 15,
  slug: "whatsdue-ai-agent",
  title: "WhatsDue",
  status: "complete",
  difficulty: "intermediate",
  year: 2024,
  featured: false,
  category: "Developer Tools",
  description:
    "A productivity automation tool that schedules assignment reminders through WhatsApp using Flask, MySQL, Twilio's WhatsApp API, and scheduled background jobs. Designed to automate deadline tracking and notification delivery with minimal user interaction.",
  completionDate: "October 2024",
  estimatedBuildTime: "3 Weeks",
  projectScale: "Small",
  projectType: "Automation Tool",
  metrics: [
    "Twilio WhatsApp API",
    "Cron Automation",
    "Flask REST API",
    "MySQL",
    "Scheduled Jobs"
  ],
  technologies: [
    "python",
    "flask",
    "mysql",
    "twilio",
    "cron",
    "javascript",
    "html5",
    "css3"
  ],
  tags: [
    "automation",
    "backend",
    "developer-tools",
    "open-source"
  ],
  github: "https://github.com/iuttkarshh0409/WhatsDueAIAgent",
  live: null,
  caseStudy: null,
  image: null,
  openSource: true,
  liveDeployment: false,
},
{
  "id": 16,
  "slug": "workledger",
  "title": "WorkLedger",
  "status": "in-production",
  "difficulty": "advanced",
  "year": 2026,
  "featured": true,
  "category": "Flagship",

  "description": "A production-grade intern and project management platform engineered for modern software teams. WorkLedger combines PostgreSQL, React, Express, repository-service architecture, observability tooling, performance optimization, and role-based workflows to manage contributors, milestones, assignments, reviews, analytics, and engineering operations through a clean, scalable architecture.",

  "completionDate": null,
  "estimatedBuildTime": "Ongoing",
  "projectScale": "Large",
  "projectType": "Engineering Management Platform",

  "metrics": [
    "PostgreSQL",
    "Neon Database",
    "Vercel Deployment",
    "Role-Based Access",
    "Repository Pattern",
    "Performance Audit"
  ],

  "technologies": [
    "react",
    "typescript",
    "vite",
    "express",
    "postgresql",
    "neon",
    "drizzle",
    "nodejs",
    "vercel"
  ],

  "tags": [
    "featured",
    "full-stack",
    "backend",
    "frontend",
    "open-source",
    "enterprise"
  ],

  "github": "https://github.com/iuttkarshh0409/WorkLedger",
  "live": "https://work-ledger-eight.vercel.app",
  "caseStudy": null,
  "image": null,
  "openSource": true,
  "liveDeployment": true
}
];

// ─────────────────────────────────────────────────────────────────────────────
// STATUS MAP
// Maps status keys → display label + CSS pill class.
// ─────────────────────────────────────────────────────────────────────────────
export const STATUS_MAP = {
  flagship:        { label: "★ FLAGSHIP",    cls: "status-flagship-pill"     },
  active:          { label: "ACTIVE",         cls: "status-active-pill"        },
  "in-production": { label: "IN PRODUCTION",  cls: "status-production-pill"   },
  complete:        { label: "COMPLETE",        cls: "status-complete-pill"     },
  research:        { label: "RESEARCH",        cls: "status-research-pill"     },
  experimental:    { label: "EXPERIMENTAL",    cls: "status-experimental-pill" },
  archived:        { label: "ARCHIVED",        cls: "status-archived-pill"     },
};

// ─────────────────────────────────────────────────────────────────────────────
// DIFFICULTY MAP
// Maps difficulty keys → display label + CSS badge class.
// ─────────────────────────────────────────────────────────────────────────────
export const DIFFICULTY_MAP = {
  beginner:     { label: "Beginner",     cls: "diff-beginner"     },
  intermediate: { label: "Intermediate", cls: "diff-intermediate" },
  advanced:     { label: "Advanced",     cls: "diff-advanced"     },
  research:     { label: "Research",     cls: "diff-research"     },
};

// ─────────────────────────────────────────────────────────────────────────────
// FILTER CHIPS
// value must match a tag used in PROJECTS[].tags, or special logic in
// matchesFilter() in projects.js. Chips with zero matching projects are
// hidden automatically by the renderer.
// ─────────────────────────────────────────────────────────────────────────────
export const FILTER_CHIPS = [
  { label: "All",             value: "all"            },
  { label: "Featured",        value: "featured"       },
  { label: "AI",              value: "ai"             },
  { label: "Full Stack",      value: "full-stack"     },
  { label: "Backend",         value: "backend"        },
  { label: "Frontend",        value: "frontend"       },
  { label: "Enterprise",        value: "enterprise"       },
  { label: "Open Source",     value: "open-source"    },
  { label: "Developer Tools", value: "developer-tools"},
  { label: "GitHub Apps",     value: "github-apps"    },
  { label: "CLI",             value: "cli"            },
  { label: "VS Code",         value: "vscode"         },
  { label: "Automation",      value: "automation"     },
  { label: "Research",        value: "research"       },
  { label: "University",      value: "university"     },
  { label: "Learning",        value: "learning"       },
  { label: "Experimental",    value: "experimental"   },
  { label: "Archived",        value: "archived"       },
];

// ─────────────────────────────────────────────────────────────────────────────
// SORT OPTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { label: "Newest",         value: "newest"   },
  { label: "Oldest",         value: "oldest"   },
  { label: "Alphabetical",   value: "alpha"    },
  { label: "Featured First", value: "featured" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY ORDER
// Sections not listed here render after these, alphabetically.
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORY_ORDER = [
  "Flagship",
  "Research & Systems",
  "Developer Tools",
  "Enterprise Systems",
  "Web Applications",
  "Full Stack",
  "Experiments",
  "Archived",
];

// ─────────────────────────────────────────────────────────────────────────────
// computeStats(projects)
// Derives all statistics shown in the archive stats row.
// Add new dimensions here as the archive grows — no UI changes needed.
// ─────────────────────────────────────────────────────────────────────────────
export function computeStats(projects) {
  return {
    total:          projects.length,
    openSource:     projects.filter(p => p.openSource).length,
    ai:             projects.filter(p => p.tags.includes("ai")).length,
    live:           projects.filter(p => p.liveDeployment).length,
    research:       projects.filter(p => p.tags.includes("research") || p.difficulty === "research").length,
    developerTools: projects.filter(p => p.tags.includes("developer-tools")).length,
    githubApps:     projects.filter(p => p.tags.includes("github-apps")).length,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// computeStatusCounts(projects)
// Used by the status line at the top of the archive page.
// ─────────────────────────────────────────────────────────────────────────────
export function computeStatusCounts(projects) {
  const counts = {};
  for (const p of projects) {
    counts[p.status] = (counts[p.status] || 0) + 1;
  }
  return counts;
}
