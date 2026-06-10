/**
 * Swayam-Sanchay: Main Coordinate Script
 * Coordinates IntersectionObservers, mouse spotlights, navigation highlights, and timezone system indicators.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMouseSpotlights();
  initScrollReveals();
  initNavigationSync();
  initSystemClock();
  initFeaturedWritingLinks();
});

/**
 * 1. Mouse Spotlight Glow Effect
 * Tracks cursor positions within .glass-card containers to position CSS gradients dynamically.
 */
function initMouseSpotlights() {
  const cards = document.querySelectorAll(".glass-card, .connector-card");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/**
 * 2. Scroll-triggered Reveal Animations
 * Uses IntersectionObserver to trigger css-based reveals when DOM sections enter the viewport.
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * 3. Sticky Navigation Syncing
 * Observes sections and highlights the corresponding capsule navigation dock link.
 */
function initNavigationSync() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("data-scroll") === id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, {
    threshold: 0,
    rootMargin: "-40% 0px -55% 0px"
  });
  
  sections.forEach(sec => sectionObserver.observe(sec));

  // Dynamic smooth-scroll triggers
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-scroll");
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/**
 * 4. Micro-interactive System Time Clock & Status
 * Simulates a tech terminal showing active coordinates and real UTC metrics.
 */
function initSystemClock() {
  const clockElement = document.getElementById("terminal-clock");
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    clockElement.innerHTML = `[UTC ${hours}:${minutes}:${seconds}] <span class="clock-sync-dot"></span> sys.clock.synced`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * 5. Featured Writing Cross-Linking
 * Directs button clicks in the Featured Writing section to expand corresponding full Notebook entries.
 */
function initFeaturedWritingLinks() {
  document.addEventListener("click", (e) => {
    const featuredBtn = e.target.closest("[data-featured-note-id]");
    if (featuredBtn && window.archive) {
      e.preventDefault();
      const noteId = parseInt(featuredBtn.getAttribute("data-featured-note-id"), 10);
      window.archive.openNote(noteId);
    }
  });
}
