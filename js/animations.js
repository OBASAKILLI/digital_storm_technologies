/* ==========================================================================
   DIGITAL STORM TECHNOLOGIES - INTERACTIVE ANIMATIONS & GLOBE ENGINE
   "Engineering Intelligent Software for a Digital Future"
   Custom Cursor, 3D Tilt Cards, Animated Counters & Spinning 3D Canvas Globe
   ========================================================================== */
class AnimationCoordinator {
  constructor() {
    this.cursor = null;
    this.follower = null;
    this.mouse = { x: -100, y: -100 };
    this.followerPos = { x: -100, y: -100 };

    this.init();
  }

  init() {
    this.initCustomCursor();
    this.initScrollReveal();
    this.initStatCounters();
    this.init3DCardTilt();
    this.initInteractiveGlobe('contact-globe-canvas');
  }

  initCustomCursor() {
    // Only enable on non-touch screens
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);

    this.follower = document.createElement('div');
    this.follower.className = 'cursor-follower';
    document.body.appendChild(this.follower);

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursor.style.left = `${this.mouse.x}px`;
      this.cursor.style.top = `${this.mouse.y}px`;
    });

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const animateCursor = () => {
      this.followerPos.x = lerp(this.followerPos.x, this.mouse.x, 0.16);
      this.followerPos.y = lerp(this.followerPos.y, this.mouse.y, 0.16);
      if (this.follower) {
        this.follower.style.left = `${this.followerPos.x}px`;
        this.follower.style.top = `${this.followerPos.y}px`;
      }
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Magnetism on interactive buttons
    const magneticBtns = document.querySelectorAll('.btn, .nav-icon-btn, .card-icon-wrap, .stat-card');
    magneticBtns.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        el.style.transform = '';
      });
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.25;
        const deltaY = (e.clientY - centerY) * 0.25;
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    });
  }

  initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.reveal-fade, .reveal-up, .reveal-scale, .reveal-left, .reveal-right'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetVal = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const isDecimal = String(targetVal).includes('.');

          let currentVal = 0;
          const duration = 2000;
          const startTime = performance.now();

          const updateCount = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuad
            const easeProgress = progress * (2 - progress);
            currentVal = targetVal * easeProgress;

            if (isDecimal) {
              el.innerText = `${prefix}${currentVal.toFixed(1)}${suffix}`;
            } else {
              el.innerText = `${prefix}${Math.floor(currentVal).toLocaleString()}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.innerText = `${prefix}${targetVal.toLocaleString()}${suffix}`;
            }
          };

          requestAnimationFrame(updateCount);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
  }

  init3DCardTilt() {
    const cards = document.querySelectorAll('.glass-card, .stat-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  initInteractiveGlobe(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 440);
    let height = (canvas.height = 440);

    const offices = [
      { name: 'Nairobi HQ, Kenya', lat: -1.2921, lng: 36.8219, color: '#FF7A00' },
      { name: 'Mombasa Coastal Hub, Kenya', lat: -4.0435, lng: 39.6682, color: '#10B981' },
      { name: 'Kisumu Western Lab, Kenya', lat: -0.0917, lng: 34.7680, color: '#3B82F6' },
      { name: 'Eldoret Tech Center, Kenya', lat: 0.5143, lng: 35.2698, color: '#F59E0B' },
      { name: 'Nakuru Engineering Node, Kenya', lat: -0.3031, lng: 36.0800, color: '#EC4899' },
      { name: 'Nyeri Innovation Hub, Kenya', lat: -0.4201, lng: 36.9476, color: '#8B5CF6' }
    ];

    let rotation = 0;

    const renderGlobe = () => {
      rotation += 0.005;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * 0.42;

      // Globe background halo
      const haloGrad = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.25);
      haloGrad.addColorStop(0, 'rgba(221, 122, 40, 0.12)');
      haloGrad.addColorStop(1, 'rgba(221, 122, 40, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Theme-responsive wireframe color
      const isLight = document.documentElement.getAttribute('data-theme') === 'light' || document.documentElement.getAttribute('data-theme') === 'cream';
      const gridStroke = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.08)';
      const gridStrokeSub = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.05)';

      // Sphere wireframe circles
      ctx.strokeStyle = gridStroke;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const rad = (lat * Math.PI) / 180;
        const yOffset = Math.sin(rad) * r;
        const circleR = Math.cos(rad) * r;
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOffset, circleR, circleR * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = gridStroke;
        ctx.stroke();
      }

      // Longitude meridians
      for (let lng = 0; lng < 180; lng += 30) {
        const angle = (lng * Math.PI) / 180 + rotation;
        const xStretch = Math.sin(angle);
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xStretch * r), r, 0, 0, Math.PI * 2);
        ctx.strokeStyle = gridStrokeSub;
        ctx.stroke();
      }

      // Render Office Marker Nodes
      const projectCoords = (lat, lng) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180) + rotation;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta);

        return { x: cx + x, y: cy - y, z };
      };

      offices.forEach((office, i) => {
        const pos = projectCoords(office.lat, office.lng);

        // Only draw nodes on front hemisphere
        if (pos.z > -20) {
          const alpha = Math.min(1, (pos.z + r) / r);

          // Pulse ring
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(221, 122, 40, ${alpha * 0.25})`;
          ctx.fill();

          // Core node
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = office.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = office.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect Nairobi HQ (index 0) to other offices with flight arcs
          if (i > 0) {
            const hqPos = projectCoords(offices[0].lat, offices[0].lng);
            if (hqPos.z > -20) {
              ctx.beginPath();
              ctx.moveTo(hqPos.x, hqPos.y);
              // Quadratic curve peak
              const midX = (hqPos.x + pos.x) / 2;
              const midY = (hqPos.y + pos.y) / 2 - 30;
              ctx.quadraticCurveTo(midX, midY, pos.x, pos.y);
              ctx.strokeStyle = `rgba(221, 122, 40, ${alpha * 0.4})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        }
      });

      requestAnimationFrame(renderGlobe);
    };

    renderGlobe();
  }
}

window.AnimationCoordinator = AnimationCoordinator;

// Auto-init on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationCoordinator = new AnimationCoordinator();
});
