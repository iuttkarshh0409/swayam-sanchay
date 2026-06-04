/**
 * Swayam-Sanchay: Interactive Knowledge Graph Canvas Background
 * Draws connected particles (curiosity nodes) that float in deep space and interact with the mouse.
 */

class CuriosityGraph {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 160 };
    
    // Performance controls
    this.maxParticles = 65;
    this.connectionDistance = 110;
    this.mouseConnectionDistance = 150;
    
    this.init();
    this.animate();
    this.registerEvents();
  }

  init() {
    this.resizeCanvas();
    this.particles = [];
    
    // Determine particle count based on screen size (scale down on mobile)
    const count = window.innerWidth < 768 ? 35 : this.maxParticles;

    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.35, // Slow, calm speeds
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1.2,
      // Accents from variables.css: Primary (indigo) or Secondary (purple)
      color: Math.random() > 0.4 ? 'rgba(129, 140, 248, ' : 'rgba(167, 139, 250, ',
      opacity: Math.random() * 0.4 + 0.15
    };
  }

  registerEvents() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.init();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Keep inside bounds
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Pull toward cursor slightly if close (interactive curiosity force)
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 0.4;
          p.y += (dy / dist) * force * 0.4;
        }
      }

      // Draw dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + p.opacity + ')';
      this.ctx.fill();

      // Check connections between particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const alpha = (1 - dist / this.connectionDistance) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }

      // Check connection to cursor
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouseConnectionDistance) {
          const alpha = (1 - dist / this.mouseConnectionDistance) * 0.18;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Initialise when DOM is fully prepared
document.addEventListener('DOMContentLoaded', () => {
  new CuriosityGraph('canvas-mesh');
});
