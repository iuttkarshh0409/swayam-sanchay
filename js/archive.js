/**
 * Swayam-Sanchay: Interactive Notebook/Archive Database & Controller
 * Customized database holding Utkarsh Dubey's authentic learning logs.
 */

const NOTEBOOK_DATA = [
  {
    id: 1,
    title: "Should Alumni Databases Show Reported or Current Employers? A Data Dilemma",
    category: "Data Systems",
    readTime: "2 min read",
    date: "Jun 02, 2026",
    excerpt: "When building an alumni database, one of the most overlooked challenges is data freshness. Should we keep self-reported data or update via LinkedIn?",
    tags: ["databases", "product-design", "data-freshness", "linkedin"],
    content: `
      <p>When building an alumni database, one of the most overlooked yet critical challenges is data freshness. Recently, while cleaning up an alumni dataset for my university, I ran into a problem: Several alumni had switched companies since submitting their details.</p>
      <p>This raised a big question: Should I keep the information they originally provided, or update it according to their LinkedIn profile?</p>

      <p><strong>The Two Sides of the Problem:</strong></p>
      <ol style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li><strong>Keep Alumni's Self-Reported Data:</strong>
          <ul>
            <li><strong>Pros:</strong> Reflects what the alumni themselves officially submitted. No risk of misrepresentation.</li>
            <li><strong>Cons:</strong> Becomes outdated quickly. Less useful for networking and career benchmarking.</li>
          </ul>
        </li>
        <li><strong>Update According to LinkedIn (Latest Info):</strong>
          <ul>
            <li><strong>Pros:</strong> Keeps the database relevant and accurate. Helps students and peers see where alumni are now.</li>
            <li><strong>Cons:</strong> May override what the alumni wanted to share (e.g., their job at graduation). Raises ethical questions if updated without consent.</li>
          </ul>
        </li>
      </ol>

      <p><strong>The Best of Both Worlds: Dual Fields</strong></p>
      <p>Instead of choosing one, why not keep both?</p>
      <ul>
        <li>Reported Company / Role &rarr; Data alumni provided at the time of survey.</li>
        <li>Current Company / Role (verified) &rarr; Updated from LinkedIn or other reliable sources.</li>
      </ul>
      <p>By doing this, you respect alumni's input, keep the database future-proof, and maintain transparency with a "Last Verified" timestamp.</p>

      <p><strong>Takeaway:</strong></p>
      <p>Alumni data isn't static. People change jobs, roles, and even industries. If an alumni database wants to stay historically accurate and practically useful, it must record both: what alumni said then, and where they are now. That's not just data cleaning—it's responsible data stewardship.</p>
    `
  },
  {
    id: 2,
    title: "The Batch Year Dilemma: How to Record Alumni Who Exit Early from Integrated Programs",
    category: "Database Design",
    readTime: "2 min read",
    date: "May 28, 2026",
    excerpt: "How do you decide the 'Batch Year' of a student who exits an integrated MCA/MTech/MBA program early with a UG degree?",
    tags: ["database-design", "academic-systems", "modeling"],
    content: `
      <p>When maintaining an alumni database, some challenges are obvious (missing emails, duplicate entries, outdated companies). But others sneak in from the structure of the academic programs themselves.</p>
      <p>At my university, we have two departments: IIPS (offering integrated MCA, MTech, MBA—with an option to exit after 3 years with a UG degree) and IET (offering traditional BTech and MTech programs).</p>
      <p>This creates a tough question for alumni data management: How do you decide the "Batch Year" of a student who exits an integrated program after UG?</p>

      <p><strong>Why It's Tricky:</strong></p>
      <p>A student joined Integrated MCA in 2018. If they exit in 2021 with a BCA, are they Batch of 2018 or Batch of 2021? If they continue and finish in 2023, then they're clearly Batch of 2023 (MCA). If you just record a single year (say, admission), you lose clarity. If you record only graduation year, you can't distinguish between UG exit vs PG completion.</p>

      <p><strong>Possible Approaches:</strong></p>
      <ol style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li><strong>Single Year (Entry Only):</strong> Record only the admission year (e.g., Batch of 2018). (Simple, but doesn't capture exit timing or final degree).</li>
        <li><strong>Year Range (Entry–Exit):</strong> Example: 2018–2021 (BCA Exit) vs 2018–2023 (MCA). (Clear and transparent, but inconsistent if data entry is incomplete).</li>
        <li><strong>Dual Fields (Best Practice):</strong> Instead of overloading "Batch Year," split it: Admission Year, Graduation Year, Exit Status, and Final Degree.</li>
      </ol>

      <p><strong>Takeaway:</strong></p>
      <p>Alumni data should reflect the journey, not just the label. By keeping separate fields for Admission Year, Graduation Year, and Exit Status, you avoid ambiguity and build a database that works for both institutional history and alumni networking.</p>
    `
  },
  {
    id: 3,
    title: "I Built a Failure-Aware System Because 'Retry Until It Works' Is a Lie",
    category: "Reliability",
    readTime: "3 min read",
    date: "May 15, 2026",
    excerpt: "Most systems fail quietly. I built a Failure-Aware System that treats failure as first-class data using Event-First Failure Modeling.",
    tags: ["systems", "reliability", "event-sourcing", "sqlite", "python"],
    content: `
      <p>Most systems fail quietly. Not in dramatic, everything-is-on-fire ways. They fail politely. Repeatedly. With retries. With logs no one reads. With states no one models.</p>
      <p>So, I built a Failure-Aware System. Not a monitoring dashboard. Not an alerting tool. A system that treats failure as first-class data.</p>

      <p><strong>The Problem I Actually Wanted to Solve:</strong></p>
      <p>In most applications, failures are transient, retries are automatic, logs are verbose, and responsibility is vague. A failed sync today looks identical to a failed sync yesterday. The system doesn't remember failure; it just keeps trying. That's amnesia, not resilience.</p>

      <p><strong>The Core Idea: Event-First Failure Modeling</strong></p>
      <p>At the heart of this project is a simple rule: Nothing retries unless it's recorded as an event. Every failure is captured as an immutable event, stored with raw payload (JSON, untouched), and tracked with retry counts and state transitions. No silent retries. No magical recovery. Just facts.</p>

      <p>I separated the system into two concerns:</p>
      <ul>
        <li><strong>Event Log:</strong> what happened</li>
        <li><strong>Domain State:</strong> what the system believes now</li>
      </ul>
      <p>That single separation eliminated a surprising amount of complexity. I logged raw events, projected domain state later, and allowed retries to be driven by history, not hope. This made the system harder to write—and far easier to reason about.</p>

      <p><strong>Retry Logic Without Lying to Yourself:</strong></p>
      <p>Each event tracks its retry count, next retry time (with backoff), and final state: <code>PENDING</code>, <code>FAILED</code>, <code>SYNCED</code>, or <code>DEAD</code>. A <code>DEAD</code> event is not a bug; it's a decision.</p>

      <p><strong>The Debugging That Actually Changed Me:</strong></p>
      <p>I hit bugs where the database schema and runtime schema disagreed, migrations silently didn't run, or a closed DB connection looked "fine" until it wasn't. No stack trace screamed at me. The system just stopped making sense. That's when I realized: Backend bugs aren't loud. They're patient. It taught me to design systems that explain themselves, to respect failure instead of hiding it, and to think in terms of state over time.</p>
    `
  },
  {
    id: 4,
    title: "Building an Operational Drift Analyzer",
    category: "Telemetry",
    readTime: "3 min read",
    date: "Apr 28, 2026",
    excerpt: "How 'Not Enough Data' taught me more than any success ever did. Building a reasoning system instead of a threshold alerting engine.",
    tags: ["telemetry", "data-lifecycle", "statistics", "debugging"],
    content: `
      <p>Most software failures don't happen suddenly. They creep in. Retries start increasing, terminal failures appear more often, and nothing is broken, but everything feels... off.</p>
      <p>This project started with a simple question: How do you detect that a system's behavior is drifting, without lying to yourself?</p>

      <p><strong>The Idea: Drift, Not Alerts</strong></p>
      <p>Traditional monitoring systems love thresholds (e.g., Retry count > X). The problem is that thresholds ignore context: historical behavior, sample size, uncertainty, and natural variance. From a statistical perspective, that's reckless. So, I decided to build an Operational Drift Analyzer—a reasoning system, not an alerting engine.</p>

      <p><strong>Core Signals:</strong></p>
      <ol style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li><strong>Retry Pressure:</strong> Soft failures comparison between baseline window (past) and recent window (now) using rate comparison.</li>
        <li><strong>Dead Event Ratio:</strong> Terminal failures divided by total events. The hard part is knowing when not to compute it. If sample size is too small, a ratio is meaningless. So, if there isn't enough data, the answer is <code>None</code>, not <code>0</code>. This data sufficiency rule was one of the most important design decisions.</li>
      </ol>

      <p><strong>The Bug That Wouldn't Die:</strong></p>
      <p>For days, my system kept saying "Not enough data" when I knew there was enough data. The real issue wasn't the logic—it was snapshot persistence. I was fixing the computation but reading old snapshots from the database and trusting CLI output blindly. That moment hurt because it forced me to accept something fundamental: If you don't understand your data lifecycle end-to-end, your code is lying to you.</p>

      <p><strong>Why I Didn't Use Machine Learning:</strong></p>
      <p>ML would have hidden the problem instead of clarifying it. This project is about explainability, auditability, and trust. A simple statistical model you understand beats a complex one you don't. Every single time.</p>
    `
  },
  {
    id: 5,
    title: "I Built a Habit Tracker - Then Realized the Hard Part Wasn't Tracking Habits",
    category: "Behavioral Data",
    readTime: "3 min read",
    date: "Mar 20, 2026",
    excerpt: "Treating habit logs as behavioral data, not moral judgments. Designing streaks, dynamic consistency percentages, and daily reflection context notes.",
    tags: ["habit-tracker", "sqlite", "analytics", "product-design"],
    content: `
      <p>Out of all available habit-tracking apps on the Play Store, the majority obsess over streaks. When you miss a day, weeks of effort feels wasted. Opaque logic and paywalls turn these apps into guilt machines.</p>
      <p>So, I built a habit tracker that treats habits as data, not as moral judgments. A transparent behavior logging system.</p>

      <p><strong>Core Design Philosophy:</strong></p>
      <ul>
        <li><strong>Data over motivation:</strong> Record what happened, not tell users how to feel.</li>
        <li><strong>No permanent penalties:</strong> Missing a day should not invalidate historical effort.</li>
        <li><strong>Explainability matters:</strong> Insights must be explainable in plain language.</li>
        <li><strong>Users own their data:</strong> Raw logs should always be exportable.</li>
      </ul>

      <p><strong>Why Streaks Aren't Enough:</strong></p>
      <p>A 10-day streak followed by one missed day looks like failure, even if overall consistency is high. So, I treated streaks as short-term momentum and consistency percentages as the long-term behavior indicator. Metrics are lenses, not verdicts.</p>

      <p><strong>Context Notes:</strong></p>
      <p>Data alone doesn't explain why behavior changes. I added optional daily reflection notes (illness, travel, academic pressure) to attribute insights to real-life context without shaming the user.</p>

      <p><strong>Debugging and SQLite Realities:</strong></p>
      <p>The project broke in unexpected ways: time windows produced empty datasets, CSV exports were corrupted, and SQLite timestamps behaved differently than I assumed. It taught me that most system bugs aren't logic errors—they're assumption errors.</p>
    `
  },
  {
    id: 6,
    title: "AERIS v2: Rebuilding a Reliability Intelligence Engine",
    category: "Reliability",
    readTime: "2 min read",
    date: "May 20, 2026",
    excerpt: "Rebuilding AERIS v1 to design a reliability intelligence engine around deterministic explainable rules and time-window drift detection.",
    tags: ["reliability", "systems-design", "observability", "distributed-systems"],
    content: `
      <p>I rebuilt something that already worked. Not because it failed… but because I realized I didn’t fully understand why it worked.</p>
      <p>A few weeks ago, I shared AERIS v1 — an Operational Drift Analyzer. It taught me how systems behave. AERIS v2 forced me to think about how systems should be understood. This time, I didn't just write code. I designed a reliability intelligence engine based on deterministic, explainable logic, not ML or black-box predictions.</p>

      <p><strong>Key Insights from Rebuilding:</strong></p>
      <ul>
        <li><strong>Observability tools:</strong> They tell you something is wrong but never what kind of wrong it is.</li>
        <li><strong>Failures aren't events:</strong> They are patterns evolving over time.</li>
        <li><strong>Retry success:</strong> Can lie to you while the system silently accumulates instability.</li>
        <li><strong>Confidence:</strong> Matters as much as the metric itself.</li>
      </ul>

      <p><strong>AERIS v2 Core Pillars:</strong></p>
      <ol style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li><strong>Treat failures as data, not noise:</strong> Every event is immutable. No overwrites. No hiding history.</li>
        <li><strong>Replace black-box intelligence with explainable rules:</strong> Every severity classification answers why, not just what.</li>
        <li><strong>Detect drift like a system, not like a dashboard:</strong> Compare time windows. Measure change. Attach confidence.</li>
      </ol>

      <p>The system now works as a layered intelligence pipeline: Event Intelligence (capture + persistence), Severity Intelligence (rule-based classification), and Drift Intelligence (statistical comparison + confidence).</p>
    `
  },
  {
    id: 7,
    title: "Deterministic Project Execution: Project Discipline Engine (PDE)",
    category: "Systems Design",
    readTime: "2 min read",
    date: "May 08, 2026",
    excerpt: "Modeling projects as DAG dependencies using the Critical Path Method (CPM) and heuristic priority calculations to maximize execution velocity.",
    tags: ["systems-design", "algorithms", "fastapi", "graphs"],
    content: `
      <p>The hardest part of any project isn’t effort. It’s deciding what deserves effort right now. So, I built a deterministic execution engine to answer that question mathematically: the Project Discipline Engine (PDE).</p>
      <p>PDE treats projects as Directed Acyclic Graphs (DAGs) and applies:</p>
      <ul>
        <li><strong>Critical Path Method (CPM):</strong> For deterministic scheduling using forward/backward passes to compute task slack.</li>
        <li><strong>Velocity-based risk modeling:</strong> For probabilistic completion forecasting by comparing real-time against required velocity.</li>
        <li><strong>Multi-factor heuristic engine:</strong> To recommend the single most impactful task to execute right now.</li>
      </ul>

      <p><strong>Task Prioritization Formula:</strong></p>
      <pre><code>Score = (Impact &times; 10) - (Effort &times; 5) + MilestoneBonus + Urgency + TimeFit - DelayPenalty</code></pre>

      <p><strong>Engineering Depth:</strong></p>
      <p>Built with FastAPI and SQLModel. It includes structured logging (Loguru), internal metrics endpoints (/metrics), and isolating unit tests validating linear chains, parallel branches, slack correctness, and ranking validation.</p>
    `
  },
  {
    id: 8,
    title: "Infrastructure Discipline: Surviving Production Deployments",
    category: "Infrastructure",
    readTime: "2 min read",
    date: "May 02, 2026",
    excerpt: "Reflections on production stabilizing: MongoDB Atlas auth troubleshooting, CORS alignments, and debugging hook issues.",
    tags: ["mongodb-atlas", "render", "vercel", "deployment"],
    content: `
      <p>The last few days weren’t about building new features. They were about making the system survive production. Deployment stabilization isn’t flashy. It’s where assumptions get tested and shortcuts get exposed.</p>

      <p><strong>What it involved:</strong></p>
      <ul>
        <li>Debugging MongoDB Atlas authentication failures in production by interpreting raw TLS and SCRAM errors.</li>
        <li>Migrating local databases to Atlas using <code>mongodump</code> and handling duplicate index conflicts.</li>
        <li>Fixing subtle React hook initialization issues that broke dashboards.</li>
        <li>Resolving CORS and token alignment between Vercel (frontend) and Render (backend).</li>
      </ul>

      <p><strong>Key Learning:</strong></p>
      <p>Production exposes what local development hides: execution order, database indexes, and authentication boundaries are not optional. Shipping isn't just about writing code; it's about making systems stable under pressure.</p>
    `
  },
  {
    id: 9,
    title: "System Auth Migration: Transitioning to Clerk",
    category: "Security",
    readTime: "2 min read",
    date: "Apr 15, 2026",
    excerpt: "Refactoring JWT verification and session handling to migrate custom OAuth to Clerk without breaking protected routes.",
    tags: ["auth", "security", "clerk", "migrations"],
    content: `
      <p>I recently completed a full authentication migration in one of my projects — moving from a custom OAuth-based setup to Clerk. This wasn’t just a plug-and-play replacement.</p>

      <p><strong>The migration involved:</strong></p>
      <ul>
        <li>Removing legacy OAuth logic embedded deep inside the backend.</li>
        <li>Refactoring JWT verification and request flow.</li>
        <li>Reworking session handling without breaking existing routes.</li>
        <li>Maintaining a clean dev bypass system without compromising production integrity.</li>
        <li>Ensuring frontend and backend stayed perfectly aligned during the transition.</li>
      </ul>

      <p><strong>Takeaway:</strong></p>
      <p>Authentication touches everything. One small mistake can silently break protected routes, sessions, or user roles. Instead of layering hacks, removing the roots and rebuilding the flow properly ensures clean migrations over temporary fixes.</p>
    `
  },
  {
    id: 10,
    title: "Backend Autonomy: Designing APIs That Stand Alone",
    category: "Architecture",
    readTime: "2 min read",
    date: "Apr 05, 2026",
    excerpt: "Why a backend should be testable without its frontend. Designing domain boundaries, authorization rules, and contracts.",
    tags: ["architecture", "apis", "testing", "backend"],
    content: `
      <p>&ldquo;If your backend needs a frontend to be tested, your architecture is already lying to you.&rdquo;</p>
      <p>Recently, I’ve been reminded that a clean backend isn’t &ldquo;overengineering&rdquo; — it’s basic survival. Working on a system with user roles, workflows, and communication between entities, I could add new features without breaking existing ones, test user flows entirely through API calls, and simulate real-world behavior without a frontend.</p>

      <p><strong>Core Architectural Foundations:</strong></p>
      <ul>
        <li>Clear domain boundaries</li>
        <li>Explicit authorization rules</li>
        <li>Predictable data contracts</li>
        <li>APIs that can stand on their own</li>
      </ul>

      <p><strong>Value of Autonomy:</strong></p>
      <p>With a clean backend, the frontend becomes optional, not a crutch. You can test logic, edge cases, and workflows independently, onboard contributors faster, and freeze features with confidence instead of fear. A well-designed backend buys you freedom to grow systems without collapsing.</p>
    `
  }
];

class ArchiveController {
  constructor() {
    this.notes = NOTEBOOK_DATA;
    this.activeCategory = "ALL";
    this.searchQuery = "";
    
    this.searchInput = document.getElementById("archive-search");
    this.tabsContainer = document.getElementById("filter-tabs");
    this.notesContainer = document.getElementById("notes-container");
    
    if (!this.notesContainer) return;
    
    this.init();
  }

  init() {
    this.renderTabs();
    this.renderNotes();
    this.registerEvents();
  }

  registerEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderNotes();
      });
    }
  }

  renderTabs() {
    if (!this.tabsContainer) return;
    
    // Count items per category
    const counts = { ALL: this.notes.length };
    this.notes.forEach(note => {
      counts[note.category] = (counts[note.category] || 0) + 1;
    });

    const categories = ["ALL", ...new Set(this.notes.map(n => n.category))];
    
    this.tabsContainer.innerHTML = categories.map(cat => {
      const activeClass = cat === this.activeCategory ? "active" : "";
      return `
        <button class="filter-tab ${activeClass}" data-category="${cat}">
          <span>${cat}</span>
          <span class="filter-count">${counts[cat] || 0}</span>
        </button>
      `;
    }).join("");

    // Attach click events
    this.tabsContainer.querySelectorAll(".filter-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.activeCategory = tab.dataset.category;
        
        // Update styling
        this.tabsContainer.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        this.renderNotes();
      });
    });
  }

  renderNotes() {
    if (!this.notesContainer) return;

    // Filter notes based on active Category and Search Query
    const filteredNotes = this.notes.filter(note => {
      const matchesCategory = this.activeCategory === "ALL" || note.category === this.activeCategory;
      
      const matchesSearch = 
        note.title.toLowerCase().includes(this.searchQuery) ||
        note.excerpt.toLowerCase().includes(this.searchQuery) ||
        note.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)) ||
        note.category.toLowerCase().includes(this.searchQuery);
        
      return matchesCategory && matchesSearch;
    });

    if (filteredNotes.length === 0) {
      this.notesContainer.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 3rem 1.5rem;">
          <p style="color: var(--text-muted);">No notebooks or system logs match your search.</p>
        </div>
      `;
      return;
    }

    this.notesContainer.innerHTML = filteredNotes.map(note => {
      const tagHTML = note.tags.map(tag => `<span class="tag">#${tag}</span>`).join("");
      
      return `
        <article class="glass-card note-card reveal" data-note-id="${note.id}">
          <div class="glass-card-content">
            <div class="note-meta">
              <span class="note-category">${note.category}</span>
              <span>${note.readTime} &bull; ${note.date}</span>
            </div>
            <h3 class="note-title">${note.title}</h3>
            <p class="note-excerpt">${note.excerpt}</p>
            <div class="note-body">${note.content}</div>
            <div class="tag-container">${tagHTML}</div>
          </div>
        </article>
      `;
    }).join("");

    // Trigger immediate animation frame reveal
    setTimeout(() => {
      this.notesContainer.querySelectorAll(".note-card").forEach(card => {
        card.classList.add("revealed");
      });
    }, 50);

    // Expand/Collapse Logic
    this.notesContainer.querySelectorAll(".note-card").forEach(card => {
      card.addEventListener("click", (e) => {
        // Prevent expansion if clicking on individual links/buttons inside the note body
        if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a') || e.target.closest('code')) {
          return;
        }
        
        const isCurrentlyExpanded = card.classList.contains("expanded");
        
        // Collapse all others
        this.notesContainer.querySelectorAll(".note-card").forEach(c => {
          c.classList.remove("expanded");
        });

        // Toggle clicked card
        if (!isCurrentlyExpanded) {
          card.classList.add("expanded");
          
          // Smooth scroll to card
          card.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });
  }
}

// Initialise on load
document.addEventListener("DOMContentLoaded", () => {
  window.archive = new ArchiveController();
});
