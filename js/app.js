/* ==========================================================================
   DIGITAL STORM TECHNOLOGIES — MAIN APP JS v3.0
   Clean, minimal, no frameworks
   ========================================================================== */

'use strict';

// ─── THEME SYSTEM ────────────────────────────────────────────────────────────
const ThemeManager = (() => {
  const root = document.documentElement;
  const STORAGE_KEY = 'dst-theme';

  // Swap every theme-aware image to the correct src for the given theme
  function swapThemeImages(theme) {
    document.querySelectorAll('img[data-dark-src], img[data-light-src]').forEach(img => {
      const dark  = img.getAttribute('data-dark-src');
      const light = img.getAttribute('data-light-src');
      const target = theme === 'light' ? light : dark;
      if (target && img.getAttribute('src') !== target) {
        img.setAttribute('src', target);
      }
    });
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update theme icon
    document.querySelectorAll('.theme-icon').forEach(icon => {
      icon.className = 'theme-icon fa-solid ' + (theme === 'light' ? 'fa-sun' : 'fa-moon');
    });

    // Swap images immediately
    swapThemeImages(theme);
  }

  function toggle() {
    const current = root.getAttribute('data-theme');
    apply(current === 'light' ? 'dark' : 'light');
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const theme = saved || preferred;
    apply(theme);

    // Also swap after all resources load (catches lazily rendered images)
    window.addEventListener('load', () => swapThemeImages(theme));

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  }

  return { init, toggle, apply };
})();

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const Navbar = (() => {
  function init() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const drawer = document.querySelector('.nav-drawer');

    if (!navbar) return;

    // Scroll effect
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    if (hamburger && drawer) {
      hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('open');
        if (open) {
          drawer.classList.add('open');
          document.body.style.overflow = 'hidden';
        } else {
          drawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      });

      // Close drawer on link click
      drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          drawer.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  return { init };
})();

// ─── PARALLAX ────────────────────────────────────────────────────────────────
const Parallax = (() => {
  const shapes = [];

  function init() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      shapes.push({ el, speed });
    });

    if (shapes.length === 0) return;

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function onScroll() {
    const scrollY = window.scrollY;
    shapes.forEach(({ el, speed }) => {
      const rect = el.parentElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const offset = (window.innerHeight / 2 - centerY) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  return { init };
})();

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
const ScrollReveal = (() => {
  let observer;

  function init() {
    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });
  }

  return { init };
})();

// ─── STATS COUNTER ───────────────────────────────────────────────────────────
const StatsCounter = (() => {
  function animateCount(el, target, duration = 1800) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;
    const suffix = el.dataset.suffix || '';

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          if (!isNaN(target)) animateCount(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }

  return { init };
})();

// ─── CLIENTS TICKER (pause on hover already in CSS, JS init) ─────────────────
const ClientsTicker = (() => {
  function init() {
    const track = document.querySelector('.clients-track');
    if (!track) return;

    // Duplicate items for seamless loop
    const original = track.innerHTML;
    track.innerHTML = original + original;
  }

  return { init };
})();

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
const ContactForm = (() => {
  function init() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('[name="name"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || '';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value || '';
      
      const subject = encodeURIComponent(`New Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
      
      // Open the user's email client
      window.location.href = `mailto:emmanukiptoo98@gmail.com?subject=${subject}&body=${body}`;
      
      const btn = form.querySelector('[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML = '<i class="fa-solid fa-envelope"></i> Opening Mail Client...';
      btn.style.background = 'var(--orange)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  return { init };
})();

// ─── BACK TO TOP ─────────────────────────────────────────────────────────────
const BackToTop = (() => {
  function init() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return { init };
})();

// ─── BOOT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Navbar.init();
  Parallax.init();
  ScrollReveal.init();
  StatsCounter.init();
  ClientsTicker.init();
  ContactForm.init();
  BackToTop.init();
});

// ─── MOBILE APP MENUS ─────────────────────────────────────────────────────────
const MobileMenus = (() => {
  function init() {
    // Mobile App "More" Menu
    const moreBtn = document.getElementById('mobile-more-btn');
    const moreMenu = document.getElementById('mobile-more-menu');
    const overlay = document.getElementById('mobile-more-overlay');
    const closeBtn = document.getElementById('mobile-more-close');

    if(moreBtn && moreMenu && overlay) {
      const openMenu = () => {
        overlay.classList.add('open');
        moreMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      };
      
      const closeMenu = () => {
        overlay.classList.remove('open');
        moreMenu.classList.remove('open');
        document.body.style.overflow = '';
      };

      moreBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      overlay.addEventListener('click', closeMenu);
    }
  }
  return { init };
})();

// Re-inject into the Boot sequence
document.addEventListener('DOMContentLoaded', () => {
  MobileMenus.init();
});

// Cookie Banner Logic
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  
  if (banner && acceptBtn) {
    if (!localStorage.getItem('cookie_consent')) {
      setTimeout(() => {
        banner.classList.add('show');
      }, 1500); // delay before showing
    }

    acceptBtn.onclick = () => {
      localStorage.setItem('cookie_consent', 'true');
      banner.classList.remove('show');
    };
  }
});
