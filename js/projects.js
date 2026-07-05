/**
 * projects.js — Archive page controller (/projects)
 *
 * Renders: status line, stats, filter chips, sort selector,
 *          category-grouped project cards with enriched metadata.
 * Handles: live search, filter, sort, mouse spotlights,
 *          scroll reveals, UTC clock.
 */

import {
  PROJECTS,
  FILTER_CHIPS,
  SORT_OPTIONS,
  CATEGORY_ORDER,
  STATUS_MAP,
  DIFFICULTY_MAP,
  computeStats,
  computeStatusCounts,
} from "./projects-data.js";

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  query:        "",
  activeFilter: "all",
  sortBy:       "newest",
};

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const searchInput     = document.getElementById("archive-search");
const sortSelect      = document.getElementById("archive-sort");
const filterChipsEl   = document.getElementById("filter-chips");
const filterSummaryEl = document.getElementById("filter-summary");
const categoriesEl    = document.getElementById("archive-categories");
const emptyEl         = document.getElementById("archive-empty");
const clearBtn        = document.getElementById("archive-clear-btn");
const statsRowEl      = document.getElementById("stats-row");
const statLineEl      = document.getElementById("stat-line-text");

// ─── Bootstrap ────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderStatusLine();
  renderStats();
  renderSortOptions();
  renderFilterChips();
  renderArchive();
  bindSearch();
  bindSort();
  bindClearBtn();
  initScrollReveals();
  initSystemClock();
});

// ═══════════════════════════════════════════════════════════════════════════════
// STATUS LINE — computed from real data
// ═══════════════════════════════════════════════════════════════════════════════
function renderStatusLine() {
  const counts = computeStatusCounts(PROJECTS);

  // Group statuses into three display buckets
  const active   = (counts["active"]   || 0) + (counts["flagship"] || 0) + (counts["in-production"] || 0);
  const complete = counts["complete"] || 0;
  const archived = counts["archived"] || 0;

  statLineEl.innerHTML = [
    `<span class="stat-item">Showing <span class="stat-count">${PROJECTS.length}</span> Projects</span>`,
    active   ? `<span class="stat-item"><span class="stat-count">${active}</span> Active</span>`   : "",
    complete  ? `<span class="stat-item"><span class="stat-count">${complete}</span> Complete</span>` : "",
    archived  ? `<span class="stat-item"><span class="stat-count">${archived}</span> Archived</span>` : "",
  ].filter(Boolean).join("");
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATS ROW
// ═══════════════════════════════════════════════════════════════════════════════
function renderStats() {
  const s = computeStats(PROJECTS);

  const pills = [
    { num: s.total,          label: "Projects"          },
    { num: s.openSource,     label: "Open Source"       },
    { num: s.ai,             label: "AI Projects"       },
    { num: s.live,           label: "Live Deployments"  },
    { num: s.developerTools, label: "Developer Tools"   },
    { num: s.githubApps,     label: "GitHub Apps"       },
    { num: s.research,       label: "Research"          },
  ].filter(p => p.num > 0);

  statsRowEl.innerHTML = pills
    .map(p => `
      <div class="archive-stat-pill">
        <span class="archive-stat-num">${p.num}</span>
        <span>${p.label}</span>
      </div>`)
    .join("");
}

// ═══════════════════════════════════════════════════════════════════════════════
// SORT
// ═══════════════════════════════════════════════════════════════════════════════
function renderSortOptions() {
  sortSelect.innerHTML = SORT_OPTIONS.map(
    o => `<option value="${o.value}">${o.label}</option>`
  ).join("");
  sortSelect.value = state.sortBy;
}

function bindSort() {
  sortSelect.addEventListener("change", () => {
    state.sortBy = sortSelect.value;
    renderArchive();
  });
}

function sortProjects(projects) {
  const list = [...projects];
  switch (state.sortBy) {
    case "oldest":   return list.sort((a, b) => a.year - b.year);
    case "alpha":    return list.sort((a, b) => a.title.localeCompare(b.title));
    case "featured": return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    default:         return list.sort((a, b) => b.year - a.year);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FILTER CHIPS
// ═══════════════════════════════════════════════════════════════════════════════
function renderFilterChips() {
  filterChipsEl.innerHTML = FILTER_CHIPS.map(chip => {
    const count =
      chip.value === "all"
        ? PROJECTS.length
        : PROJECTS.filter(p => matchesFilter(p, chip.value)).length;

    // Hide chips with zero projects — keeps the row clean
    if (count === 0 && chip.value !== "all") return "";

    const isActive = state.activeFilter === chip.value;
    return `
      <button
        class="archive-chip${isActive ? " active" : ""}"
        data-filter="${chip.value}"
        aria-pressed="${isActive}"
      >
        ${chip.label}<span class="archive-chip-count">${count}</span>
      </button>`;
  }).join("");

  filterChipsEl.querySelectorAll(".archive-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeFilter = btn.dataset.filter;
      renderFilterChips();
      renderArchive();
    });
  });
}

function matchesFilter(project, filterValue) {
  if (filterValue === "all")        return true;
  if (filterValue === "archived")   return project.status === "archived";
  if (filterValue === "experimental") return project.status === "experimental";
  return project.tags.includes(filterValue);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════════════════════════════
function bindSearch() {
  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim().toLowerCase();
    renderArchive();
  });
}

function matchesSearch(project, query) {
  if (!query) return true;
  const haystack = [
    project.title,
    project.description,
    project.category,
    project.projectType  || "",
    project.difficulty   || "",
    project.status       || "",
    String(project.year),
    ...(project.technologies || []),
    ...(project.tags          || []),
    ...(project.metrics       || []),
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

// ═══════════════════════════════════════════════════════════════════════════════
// RENDER ARCHIVE
// ═══════════════════════════════════════════════════════════════════════════════
function renderArchive() {
  const filtered = PROJECTS.filter(
    p => matchesFilter(p, state.activeFilter) && matchesSearch(p, state.query)
  );
  const sorted = sortProjects(filtered);

  updateFilterSummary(sorted.length);

  if (sorted.length === 0) {
    categoriesEl.innerHTML = "";
    emptyEl.style.display = "block";
    return;
  }
  emptyEl.style.display = "none";

  const grouped = groupByCategory(sorted);
  categoriesEl.innerHTML = grouped
    .map(({ category, projects }) => renderCategorySection(category, projects))
    .join("");

  initMouseSpotlights();
}

function groupByCategory(projects) {
  const map = new Map();
  for (const p of projects) {
    const cat = p.category || "Experiments";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat).push(p);
  }

  const ordered = [];
  for (const cat of CATEGORY_ORDER) {
    if (map.has(cat)) {
      ordered.push({ category: cat, projects: map.get(cat) });
      map.delete(cat);
    }
  }
  for (const [cat, projs] of [...map.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    ordered.push({ category: cat, projects: projs });
  }
  return ordered;
}

function updateFilterSummary(count) {
  const filterLabel =
    state.activeFilter === "all"
      ? "all projects"
      : FILTER_CHIPS.find(c => c.value === state.activeFilter)?.label ?? state.activeFilter;

  const queryPart = state.query ? ` matching "${state.query}"` : "";
  filterSummaryEl.textContent =
    count === 0
      ? `No results${queryPart}`
      : `${count} project${count !== 1 ? "s" : ""} · ${filterLabel}${queryPart}`;
  filterSummaryEl.classList.toggle("has-results", count > 0);
}

// ═══════════════════════════════════════════════════════════════════════════════
// RENDER HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
function renderCategorySection(category, projects) {
  return `
    <section class="archive-category-section" data-category="${escHtml(category)}">
      <div class="archive-category-header">
        <span class="archive-category-label">${escHtml(category)}</span>
        <span class="archive-category-count">${projects.length}</span>
        <div class="archive-category-line"></div>
      </div>
      <div class="archive-project-grid">
        ${projects.map(renderProjectCard).join("")}
      </div>
    </section>`;
}

function renderProjectCard(project) {
  const statusDef     = STATUS_MAP[project.status]     ?? STATUS_MAP["active"];
  const difficultyDef = DIFFICULTY_MAP[project.difficulty] ?? null;
  const flagshipClass = project.status === "flagship" ? " flagship" : "";

  // Status badge
  const statusBadge = `
    <span class="project-status ${statusDef.cls}">
      <span class="status-dot"></span>${statusDef.label}
    </span>`;

  // Difficulty badge (only if defined)
  const diffBadge = difficultyDef
    ? `<span class="diff-badge ${difficultyDef.cls}">${difficultyDef.label}</span>`
    : "";

  // Additional metadata (completion date, build time, type, scale)
  const detailItems = [];
  if (project.completionDate)      detailItems.push(`<span class="archive-detail-item"><span class="archive-detail-key">completed:</span><span class="archive-detail-val">${escHtml(project.completionDate)}</span></span>`);
  if (project.estimatedBuildTime)  detailItems.push(`<span class="archive-detail-item"><span class="archive-detail-key">build:</span><span class="archive-detail-val">${escHtml(project.estimatedBuildTime)}</span></span>`);
  if (project.projectType)         detailItems.push(`<span class="archive-detail-item"><span class="archive-detail-key">type:</span><span class="archive-detail-val">${escHtml(project.projectType)}</span></span>`);
  if (project.projectScale)        detailItems.push(`<span class="archive-detail-item"><span class="archive-detail-key">scale:</span><span class="archive-detail-val">${escHtml(project.projectScale)}</span></span>`);
  const detailRow = detailItems.length
    ? `<div class="archive-card-details">${detailItems.join("")}</div>`
    : "";

  // Metrics pills (max 4 on card, full list on project page)
  const metricsHtml = project.metrics?.length
    ? `<div class="archive-card-metrics">
        ${project.metrics.slice(0, 4).map(m => `<span class="metric-pill">${escHtml(m)}</span>`).join("")}
       </div>`
    : "";

  // Tech tags
  const techTags = project.technologies
    .map(t => `<span class="tag">${escHtml(t)}</span>`)
    .join("");

  // Action buttons
  const buttons = [];
  if (project.github)    buttons.push(`<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="archive-card-btn btn-source"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>GitHub</a>`);
  if (project.live)      buttons.push(`<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="archive-card-btn btn-live"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Live</a>`);
  if (project.caseStudy) buttons.push(`<a href="${project.caseStudy}" class="archive-card-btn btn-case"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Case Study</a>`);

  return `
    <article class="glass-card archive-card${flagshipClass}">
      <div class="glass-card-content">
        <div class="archive-card-header">
          <h3 class="archive-card-title">${escHtml(project.title)}</h3>
          ${statusBadge}
        </div>
        <div class="archive-card-meta">
          <span class="archive-card-year">${project.year}</span>
          ${diffBadge}
        </div>
        <p class="archive-card-desc">${escHtml(project.description)}</p>
        ${detailRow}
        ${metricsHtml}
        <div class="archive-card-tags tag-container">${techTags}</div>
        <div class="archive-card-buttons">${buttons.join("")}</div>
      </div>
    </article>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLEAR BUTTON
// ═══════════════════════════════════════════════════════════════════════════════
function bindClearBtn() {
  clearBtn.addEventListener("click", () => {
    state.query        = "";
    state.activeFilter = "all";
    state.sortBy       = "newest";
    searchInput.value  = "";
    sortSelect.value   = "newest";
    renderFilterChips();
    renderArchive();
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════
function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function initMouseSpotlights() {
  document.querySelectorAll(".glass-card").forEach(card => {
    if (card.__spotlightBound) return;
    card.__spotlightBound = true;
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
    });
  });
}

function initScrollReveals() {
  const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach(el => observer.observe(el));
}

function initSystemClock() {
  const el = document.getElementById("terminal-clock");
  if (!el) return;
  function tick() {
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, "0");
    const m = String(now.getUTCMinutes()).padStart(2, "0");
    const s = String(now.getUTCSeconds()).padStart(2, "0");
    el.innerHTML = `[UTC ${h}:${m}:${s}] <span class="clock-sync-dot"></span> sys.clock.synced`;
  }
  tick();
  setInterval(tick, 1000);
}
