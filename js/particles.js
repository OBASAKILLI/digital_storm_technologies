/* ==========================================================================
   DIGITAL STORM TECHNOLOGIES - LIVING DIGITAL GALAXY BACKGROUND ENGINE
   "Engineering Intelligent Software for a Digital Future"
   Vanilla ES2024 Canvas Particle & Circuit Signal Renderer
   ========================================================================== */
class DigitalGalaxyEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.stars = [];
    this.circuitSignals = [];
    this.hexagons = [];
    this.mouse = { x: this.width / 2, y: this.height / 2, active: false };
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    this.createStars(140);
    this.createCircuitSignals(28);
    this.createHexGrid(24);

    window.addEventListener('resize', () => {
      this.resize();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createStars(count) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.4,
        color: Math.random() > 0.75 ? '#DD7A28' : '#FFFFFF',
        alpha: Math.random() * 0.8 + 0.2,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  createCircuitSignals(count) {
    this.circuitSignals = [];
    for (let i = 0; i < count; i++) {
      this.circuitSignals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        dirX: Math.random() > 0.5 ? 1 : -1,
        dirY: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 2 + 1,
        length: Math.random() * 80 + 40,
        color: '#DD7A28',
        alpha: Math.random() * 0.7 + 0.3,
        stepCounter: 0,
        switchInterval: Math.floor(Math.random() * 120 + 60)
      });
    }
  }

  createHexGrid(count) {
    this.hexagons = [];
    for (let i = 0; i < count; i++) {
      this.hexagons.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 40 + 20,
        alpha: Math.random() * 0.12 + 0.02,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseVal: Math.random() * Math.PI
      });
    }
  }

  drawHexagon(x, y, radius, alpha) {
    this.ctx.save();
    this.ctx.strokeStyle = `rgba(221, 122, 40, ${alpha})`;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const hX = x + radius * Math.cos(angle);
      const hY = y + radius * Math.sin(angle);
      if (i === 0) this.ctx.moveTo(hX, hY);
      else this.ctx.lineTo(hX, hY);
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  animate() {
    this.time += 0.015;
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light' || document.documentElement.getAttribute('data-theme') === 'cream';

    // 1. Render Hexagonal Grid Background (Dark Mode only for clean Silicon Valley aesthetic in light mode)
    if (!isLightTheme) {
      for (const hex of this.hexagons) {
        hex.pulseVal += hex.pulseSpeed;
        const currentAlpha = Math.abs(Math.sin(hex.pulseVal)) * 0.12;
        this.drawHexagon(hex.x, hex.y, hex.size, currentAlpha);
      }
    }

    // 2. Render Stars & Network Lines
    const starsLen = this.stars.length;
    for (let i = 0; i < starsLen; i++) {
      const star = this.stars[i];
      star.x += star.speedX;
      star.y += star.speedY;

      // Screen wrap
      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      // Twinkle alpha (softer in light mode for blueprint elegance)
      star.alpha = isLightTheme 
        ? 0.15 + Math.abs(Math.sin(this.time * 2 + i)) * 0.35
        : 0.3 + Math.abs(Math.sin(this.time * 2 + i)) * 0.7;

      // Draw star node
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color === '#DD7A28' || star.color === '#FF7A00'
        ? `rgba(234, 88, 12, ${star.alpha})`
        : (isLightTheme ? `rgba(15, 23, 42, ${star.alpha * 0.55})` : `rgba(255, 255, 255, ${star.alpha})`);
      this.ctx.fill();

      // Connect nearby stars with delicate circuit lines
      for (let j = i + 1; j < starsLen; j++) {
        const star2 = this.stars[j];
        const dx = star.x - star2.x;
        const dy = star.y - star2.y;
        const distSq = dx * dx + dy * dy;
        const maxDist = 140;

        if (distSq < maxDist * maxDist) {
          const dist = Math.sqrt(distSq);
          const lineAlpha = (1 - dist / maxDist) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(star.x, star.y);
          this.ctx.lineTo(star2.x, star2.y);
          this.ctx.strokeStyle = isLightTheme
            ? `rgba(15, 23, 42, ${lineAlpha * 0.45})`
            : `rgba(221, 122, 40, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }

      // 3. Interactive Mouse Magnetism / Light Rays
      if (this.mouse.active) {
        const dx = star.x - this.mouse.x;
        const dy = star.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const pullAlpha = (1 - dist / 180) * 0.35;
          this.ctx.beginPath();
          this.ctx.moveTo(star.x, star.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(221, 122, 40, ${pullAlpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    // 4. Render Orange Electrical Signal Particles along orthogonal paths
    for (const sig of this.circuitSignals) {
      sig.stepCounter++;
      if (sig.stepCounter > sig.switchInterval) {
        sig.stepCounter = 0;
        if (Math.random() > 0.5) {
          sig.dirX = 0;
          sig.dirY = Math.random() > 0.5 ? 1 : -1;
        } else {
          sig.dirX = Math.random() > 0.5 ? 1 : -1;
          sig.dirY = 0;
        }
      }

      sig.x += sig.dirX * sig.speed;
      sig.y += sig.dirY * sig.speed;

      if (sig.x < 0) sig.x = this.width;
      if (sig.x > this.width) sig.x = 0;
      if (sig.y < 0) sig.y = this.height;
      if (sig.y > this.height) sig.y = 0;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(sig.x, sig.y);
      this.ctx.lineTo(
        sig.x - sig.dirX * sig.length,
        sig.y - sig.dirY * sig.length
      );
      const grad = this.ctx.createLinearGradient(
        sig.x,
        sig.y,
        sig.x - sig.dirX * sig.length,
        sig.y - sig.dirY * sig.length
      );
      grad.addColorStop(0, 'rgba(221, 122, 40, 0.9)');
      grad.addColorStop(1, 'rgba(221, 122, 40, 0)');
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2.5;
      this.ctx.stroke();

      // Signal Head Glow Node
      this.ctx.beginPath();
      this.ctx.arc(sig.x, sig.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#DD7A28';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#DD7A28';
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.DigitalGalaxyEngine = DigitalGalaxyEngine;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DigitalGalaxyEngine('galaxy-canvas');
});
