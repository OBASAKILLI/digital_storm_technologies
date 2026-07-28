/* ==========================================================================
   DIGITAL STORM TECHNOLOGIES - MASTER APPLICATION COORDINATOR
   "Engineering Intelligent Software for a Digital Future"
   Loading Screen, Navigation, Enterprise Search Modal, Theme & Language
   ========================================================================== */

class DigitalStormApp {
  constructor() {
    let theme = 'dark';
    let lang = 'en';
    try {
      theme = localStorage.getItem('dst_theme') || theme;
      if (theme === 'cream') theme = 'light';
      lang = localStorage.getItem('dst_lang') || lang;
    } catch(e) {}
    this.currentTheme = theme;
    this.currentLang = lang;

    this.init();
  }

  init() {
    this.initLoadingScreen();
    this.initStickyHeader();
    this.initMobileMenu();
    this.initThemeSwitcher();
    this.initLanguageSelector();
    this.initSearchModal();
    this.initQuoteModal();
    this.initLoginModal();
    this.initNewsletter();
    this.initActiveNav();
    this.initHeroHUDTabs();
  }

  initHeroHUDTabs() {
    const tabButtons = document.querySelectorAll('.hud-tab-btn');
    const tabContents = document.querySelectorAll('.hud-tab-content');
    if (!tabButtons.length) return;

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  initLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    const fill = document.getElementById('loader-fill');
    const pct = document.getElementById('loader-pct');
    if (!loader) return;

    // Check if user already loaded in session to speed up subsequent pages
    let duration = 800;
    try {
      const hasLoadedOnce = sessionStorage.getItem('dst_loaded_once');
      duration = hasLoadedOnce ? 250 : 800;
      sessionStorage.setItem('dst_loaded_once', 'true');
    } catch(e) {}

    // Instant click-to-skip for immediate inspection
    const skipLoader = () => {
      loader.classList.add('hidden');
    };
    loader.addEventListener('click', skipLoader);

    let start = null;
    const animateLoad = (now) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      const percent = Math.floor(ease * 100);

      if (fill) fill.style.width = `${percent}%`;
      if (pct) pct.innerText = `${percent}%`;

      if (progress < 1 && !loader.classList.contains('hidden')) {
        requestAnimationFrame(animateLoad);
      } else {
        setTimeout(() => {
          loader.classList.add('hidden');
        }, 150);
      }
    };
    requestAnimationFrame(animateLoad);
  }

  initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    // Handle dropdown items on touch
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          item.classList.toggle('open');
        }
      });
    });
  }

  initThemeSwitcher() {
    const themeBtn = document.getElementById('theme-switcher-btn');
    const applyTheme = (theme) => {
      if (theme === 'cream' || theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun" style="color: var(--orange)"></i>';
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
      localStorage.setItem('dst_theme', theme);
      this.currentTheme = theme;
    };

    applyTheme(this.currentTheme);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = (this.currentTheme === 'dark' || !this.currentTheme) ? 'light' : 'dark';
        applyTheme(nextTheme);
        const modeLabel = nextTheme === 'light' ? 'TITANIUM LIGHT' : 'OBSIDIAN DARK';
        this.showToast('System Theme Modified', `Switched to ${modeLabel} mode.`);
      });
    }
  }

  initLanguageSelector() {
    const langBtn = document.getElementById('lang-btn');
    const langItems = document.querySelectorAll('.lang-item');
    if (!langBtn) return;

    langItems.forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        const langName = item.innerText;
        localStorage.setItem('dst_lang', lang);
        this.currentLang = lang;
        langBtn.querySelector('span').innerText = lang.toUpperCase();
        this.showToast('Language Region Updated', `Switched interface language to ${langName}.`);
      });
    });

    langBtn.querySelector('span').innerText = this.currentLang.toUpperCase();
  }

  initSearchModal() {
    const searchBtn = document.getElementById('search-btn');
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const closeBtn = document.getElementById('search-close');
    if (!modal || !input) return;

    const openSearch = () => {
      modal.classList.add('active');
      input.focus();
    };

    const closeSearch = () => {
      modal.classList.remove('active');
      input.value = '';
      if (resultsContainer) resultsContainer.innerHTML = '';
    };

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);

    // Ctrl+K or Cmd+K shortcut
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeSearch();
      }
    });

    // Real-time enterprise search index
    const searchIndex = [
      { title: 'ICTAMS — Tax Administration Platform', url: 'portfolio.html?id=ictams', tag: 'Case Study' },
      { title: 'MUMCARE — Maternal EHR Hospital System', url: 'portfolio.html?id=mumcare', tag: 'Case Study' },
      { title: 'DAIRY — IoT Agriculture Telematics', url: 'portfolio.html?id=dairy', tag: 'Case Study' },
      { title: 'SACCO — Next-Gen Core Banking Ledger', url: 'portfolio.html?id=sacco', tag: 'Case Study' },
      { title: 'Enterprise Software & Core ERP Architecture', url: 'services.html', tag: 'Service' },
      { title: 'AI Solutions & Machine Learning Engineering', url: 'services.html#ai-solutions', tag: 'Service' },
      { title: 'Cybersecurity Zero-Trust Architecture', url: 'services.html#cybersecurity', tag: 'Service' },
      { title: 'Healthcare, Finance & Government Verticals', url: 'industries.html', tag: 'Industry' },
      { title: '.NET 8, Blazor, React & Azure Stack', url: 'technologies.html', tag: 'Tech Stack' },
      { title: 'Join Digital Storm — Careers & Jobs', url: 'careers.html', tag: 'Company' },
      { title: 'Nairobi HQ, Kampala & London Offices', url: 'contact.html', tag: 'Contact' }
    ];

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!resultsContainer) return;
      if (!q) {
        resultsContainer.innerHTML = '';
        return;
      }

      const matches = searchIndex.filter(item =>
        item.title.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--white-alpha-40);">No matching enterprise modules found for "${this.escapeHtml(q)}". Try searching for 'ERP', 'Hospital', or 'AI'.</div>`;
        return;
      }

      resultsContainer.innerHTML = matches.map(item => `
        <a href="${item.url}" class="mega-menu-card" style="margin-bottom: 0.6rem; text-decoration: none;">
          <div class="mega-menu-icon"><i class="fa-solid fa-server"></i></div>
          <div>
            <div style="font-family: var(--font-code); font-size: 0.75rem; color: var(--orange);">${item.tag}</div>
            <div class="mega-menu-title">${item.title}</div>
          </div>
        </a>
      `).join('');
    });
  }

  initQuoteModal() {
    const quoteBtns = document.querySelectorAll('.btn-quote, [data-action="request-quote"]');
    const modal = document.getElementById('quote-modal');
    const closeBtn = document.getElementById('quote-close');
    const form = document.getElementById('quote-form');
    if (!modal || !quoteBtns.length) return;

    quoteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.remove('active');
        this.showToast('Architecture Proposal Request Sent', 'Our Chief Enterprise Architect will email your comprehensive roadmap within 4 hours.');
        form.reset();
      });
    }
  }

  initLoginModal() {
    const loginBtns = document.querySelectorAll('.btn-login, [data-action="login-portal"]');
    const modal = document.getElementById('login-modal');
    const closeBtn = document.getElementById('login-close');
    const form = document.getElementById('login-form');
    if (!modal || !loginBtns.length) return;

    loginBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.remove('active');
        this.showToast('Biometric Verification Simulated', 'Connecting to secure Digital Storm Enterprise Client Cloud...');
        form.reset();
      });
    }
  }

  initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value.trim()) {
          this.showToast('Newsletter Subscribed', `Enterprise insights will be sent to ${input.value.trim()}.`);
          input.value = '';
        }
      });
    });
  }

  initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === 'index.html' && href === './')) {
        link.parentElement.classList.add('active');
      } else {
        link.parentElement.classList.remove('active');
      }
    });
  }

  showToast(title, message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--orange); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <div>
        <div style="font-weight: 700; color: #FFF; font-size: 0.95rem;">${title}</div>
        <div style="color: var(--white-alpha-70); font-size: 0.85rem;">${message}</div>
      </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 4500);
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

window.DigitalStormApp = DigitalStormApp;

// Auto-init master app
document.addEventListener('DOMContentLoaded', () => {
  window.digitalStormApp = new DigitalStormApp();
});
