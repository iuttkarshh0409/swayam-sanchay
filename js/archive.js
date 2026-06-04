/**
 * Swayam-Sanchay: Interactive Notebook/Archive Database & Controller
 * Customized database holding Utkarsh Dubey's authentic learning logs.
 */

const NOTEBOOK_DATA = [
  {
    id: 1,
    title: "The Illusion of the Green Dashboard",
    category: "Observability",
    readTime: "2 min read",
    date: "May 24, 2026",
    excerpt: "Observability is not equivalent to understanding. Why successful deployment indicators and green status metrics often create a false sense of security.",
    tags: ["observability", "reliability", "debugging", "systems"],
    content: `
      <p>A service appearing healthy through deployment indicators, successful response codes, or an absence of console errors does not necessarily imply operational stability. We often fall into the trap of visual validation—equating a green dashboard circle with a robust production machine.</p>
      
      <p>In practice, systems exist in a state of continuous degradation. A system can silently crawl toward failure while your logs remain clean. For example, if a background task pool gets choked with deadlocks but the HTTP server continues responding with cached 200 OKs, the outer wall is functional while the engine is dead.</p>
      
      <pre><code>// The fallacy of simple health checking:
app.get("/healthz", async (req, res) => {
  // Returns 200 OK because the server is running,
  // but fails to verify if background message loops,
  // DB pooling queues, or third-party gateways are active.
  return res.status(200).send("OK");
});</code></pre>
      
      <p>True observability requires looking at the gaps. We must actively trace coordinates, map queue latency, measure database handshake delays, and continuously verify if our components are genuinely coordinated or merely running parallel in silent isolation.</p>
    `
  },
  {
    id: 2,
    title: "Cold Starts, Sleeping Services & Fragile Reliability",
    category: "Infrastructure",
    readTime: "3 min read",
    date: "May 10, 2026",
    excerpt: "What free-tier infrastructure quietly teaches about operational behavior. Managing database connection timeouts and delayed wake behaviors.",
    tags: ["cloud", "databases", "mongodb", "render"],
    content: `
      <p>Working within cloud restrictions (such as hosting a FastAPI runtime on Render's free tier connecting to MongoDB Atlas) exposes the structural realities of modern web scale. When a server goes to sleep due to inactivity, it triggers a cascade of silent operational stresses upon the first incoming request.</p>
      
      <p>The "Cold Start" is not just a delay; it is a test of a system's resilience. The initial request must trigger the container wake cycle, establish TCP handshakes, negotiate TLS with MongoDB Atlas, and allocate memory—all within the gateway's timeout bounds.</p>
      
      <pre><code># Resilient database connection bootstrap pattern
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def get_database_connection(uri: str, retries=5, delay=2):
    for attempt in range(retries):
        try:
            client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=2000)
            # Force handshake connection check
            await client.admin.command('ping')
            return client
        except Exception as e:
            if attempt == retries - 1:
                raise e
            await asyncio.sleep(delay * (attempt + 1)) # Exponential backoff</code></pre>
      
      <p>If your database bootstrap logic assumes instantaneous availability, the first cold start request will crash your client, forcing another container rebuild. Designing for fragile cloud environments teaches you to embrace connection pooling, retries, and failure boundaries as core architectural constraints.</p>
    `
  },
  {
    id: 3,
    title: "State Drift Between Frontend Assumptions and Backend Reality",
    category: "Architecture",
    readTime: "2 min read",
    date: "April 18, 2026",
    excerpt: "Exploring JWT session drift, expired authentication states, request mismatches, and the friction that emerges across distributed system layers.",
    tags: ["auth", "security", "apis", "jwt"],
    content: `
      <p>Modern distributed systems depend heavily on decoupled, stateless authentication (like JWTs stored in client memory). This structural independence introduces a silent vulnerability: state drift. When a client application assumes a session is fully active, but the backend token validation mechanism fails due to key rotation or expirations, the frontend is left operating in a vacuum of false assumptions.</p>
      
      <p>This gap manifests as silent interface failures. Buttons that click but do nothing, dashboards that render empty slots without throwing diagnostic logs, and form submissions that fail silently behind the UI.</p>
      
      <p>To prevent this operational drift, authentication must be treated as a continuous, observable stream rather than a static initial handshake. We must coordinate API interceptors, trace request flow lifecycles, and handle session terminations gracefully at every structural layer.</p>
    `
  },
  {
    id: 4,
    title: "The Cost of Excessive Abstraction",
    category: "Philosophy",
    readTime: "2 min read",
    date: "March 15, 2026",
    excerpt: "When modern tooling begins hiding the system itself. Reflecting on why heavily abstracted frameworks weaken direct system diagnostics.",
    tags: ["engineering", "simplicity", "tooling", "opinion"],
    content: `
      <p>In the quest to increase developer velocity, modern software ecosystems have built massive towers of visual and structural abstractions. We wrap HTTP interfaces in auto-generators, query databases through deep multi-layer ORMs, and run deployment architectures behind black-box cloud consoles.</p>
      
      <p>While useful for rapid prototyping, excessive abstraction comes with a severe tax: it hides the actual system. When an operational error occurs, debugging becomes an exercise in searching through layers of nested dependencies rather than inspecting raw system events.</p>
      
      <p>I have grown deeply skeptical of over-engineered architectures. Simple, explicit code—even if it requires writing boilerplate database lookups or manual request validation steps—is far more observable, easier to debug, and inherently more sustainable over a system's actual lifecycle. True engineering is about maintaining visibility and clear, direct control over your system's underlying reality.</p>
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
