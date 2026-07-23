document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initHeroParallax();
});

function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .image-reveal, .image-reveal-vertical').forEach((el) => {
    observer.observe(el);
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  updateHeader();
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuLinks = menu ? menu.querySelectorAll('a') : [];

  if (!menuBtn || !menu) return;

  function openMenu() {
    menu.classList.add('mobile-menu--open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    updateMenuIcon(true);
  }

  function closeMenu() {
    menu.classList.remove('mobile-menu--open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    updateMenuIcon(false);
  }

  function updateMenuIcon(isOpen) {
    menuBtn.innerHTML = isOpen
      ? '<span class="material-symbols-outlined">close</span>'
      : '<span class="material-symbols-outlined">menu</span>';
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('mobile-menu--open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });

  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroImg = hero.querySelector('.hero__media img');

  if (!heroImg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const progress = Math.min(scrollY / heroHeight, 1);

        heroImg.style.transform = `scale(${1 + progress * 0.05}) translateY(${scrollY * 0.15}px)`;

        ticking = false;
      });

      ticking = true;
    }
  });
}
