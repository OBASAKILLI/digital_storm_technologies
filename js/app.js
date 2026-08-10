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


// --- MOBILE APP MENUS ---------------------------------------------------------
const MobileMenus = (() => {
  function init() {
    // 1. Mobile Hamburger / Drawer Menu (for completeness, though hidden on mobile)
    const hamburger = document.getElementById('nav-hamburger');
    const drawer    = document.getElementById('nav-drawer');
    if (hamburger && drawer) {
      hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('open');
        drawer.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }

    // 2. Mobile App "More" Menu
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
