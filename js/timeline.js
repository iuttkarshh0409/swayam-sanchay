/**
 * Swayam-Sanchay: Interactive Journey & Chronological Timeline Expander
 * Handles showing supplementary technical logs, failures, and reading references for each milestone.
 */

class TimelineController {
  constructor() {
    this.timelineContainer = document.querySelector(".timeline-path");
    if (!this.timelineContainer) return;
    this.init();
  }

  init() {
    this.timelineContainer.querySelectorAll(".timeline-item").forEach(item => {
      const detailsBlock = item.querySelector(".timeline-details");
      if (!detailsBlock) return;
      
      // Inject click-to-discover hint or interactive indicator
      const dot = item.querySelector(".timeline-indicator");
      if (dot) {
        dot.style.cursor = "pointer";
        dot.title = "Explore detailed progress log";
      }

      // Check if extra logs exist in custom dataset (we will define this directly in the HTML markup)
      // We will add expandable logs support
      const trigger = item.querySelector(".timeline-title");
      if (trigger) {
        trigger.style.cursor = "pointer";
        trigger.addEventListener("click", () => this.toggleTimelineItem(item));
      }
      
      if (dot) {
        dot.addEventListener("click", () => this.toggleTimelineItem(item));
      }
    });
  }

  toggleTimelineItem(item) {
    const isExpanded = item.classList.contains("timeline-expanded");
    
    // Smooth transition toggle
    if (isExpanded) {
      item.classList.remove("timeline-expanded");
      const logs = item.querySelector(".timeline-extra-logs");
      if (logs) {
        logs.style.maxHeight = "0px";
        logs.style.opacity = "0";
        setTimeout(() => { logs.style.display = "none"; }, 300);
      }
    } else {
      item.classList.add("timeline-expanded");
      const logs = item.querySelector(".timeline-extra-logs");
      if (logs) {
        logs.style.display = "block";
        // Calculate height
        logs.style.maxHeight = "none";
        const height = logs.scrollHeight + "px";
        logs.style.maxHeight = "0px";
        logs.style.opacity = "0";
        
        // Trigger reflow
        logs.offsetHeight;
        
        logs.style.transition = "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
        logs.style.maxHeight = height;
        logs.style.opacity = "1";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TimelineController();
});
