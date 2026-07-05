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
    year: 2025,
    featured: true,
    category: "Flagship",
    description:
      "An AI-powered GitHub code review platform that audits repositories using native GitHub Checks, intelligent repository analysis, and automated engineering best-practice scoring. Built as a production-grade GitHub App with a modern developer tooling ecosystem.",
    completionDate: "July 2025",
    estimatedBuildTime: "8 Weeks",
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
    live: null,
    caseStudy: null,
    image: null,
    openSource: true,
    liveDeployment: false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    slug: "alumconnect",
    title: "AlumConnect",
    status: "complete",
    difficulty: "advanced",
    year: 2025,
    featured: true,
    category: "Flagship",
    description:
      "A full-stack alumni networking and mentorship platform built with React, FastAPI, MongoDB Atlas, and Clerk Authentication. Enables alumni discovery, mentorship connections, role-based access, analytics dashboards, and cloud-native deployment.",
    completionDate: "May 2025",
    estimatedBuildTime: "6 Weeks",
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
    live: null,
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
    year: 2025,
    featured: true,
    category: "Flagship",
    description:
      "A personal digital identity platform and engineering learning archive. Built intentionally using pure vanilla HTML, CSS variables, and zero heavy abstraction frameworks to ensure ultimate transparency, performance, and diagnostic clarity.",
    completionDate: null,
    estimatedBuildTime: "Ongoing",
    projectScale: "Medium",
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
    live: null,
    caseStudy: null,
    image: null,
    openSource: true,
    liveDeployment: true,
  },
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
  "AI & Research",
  "Developer Tools",
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
