/* ============================================================
   LÊ QUỐC HẢI – Senior Construction Project Manager
   script.js  |  Premium CV/Portfolio
   ============================================================ */

'use strict';

/* ==================== LOADING SCREEN ==================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) { ls.classList.add('hidden'); }
    initAnimations();
  }, 2200);
});

/* ==================== DARK / LIGHT MODE ==================== */
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcons();
}

function updateToggleIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.dark-toggle-icon').forEach(el => {
    el.textContent = isDark ? '☀️' : '🌙';
  });
}
document.addEventListener('DOMContentLoaded', updateToggleIcons);

/* ==================== NAVBAR ==================== */
const navbar = document.getElementById('navbar');
const mobileNav = document.querySelector('.mobile-nav');
const hamburger = document.querySelector('.hamburger');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  updateScrollProgress();
  updateBackToTop();
  updateActiveNav();
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    if (mobileNav) mobileNav.classList.toggle('open');
  });
}

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    if (mobileNav) mobileNav.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const links = document.querySelectorAll(`.nav-links a[href="#${id}"]`);
    links.forEach(link => {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  });
}

/* ==================== SCROLL PROGRESS BAR ==================== */
const scrollProgress = document.getElementById('scroll-progress');
function updateScrollProgress() {
  if (!scrollProgress) return;
  const winScroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (winScroll / height) * 100;
  scrollProgress.style.width = pct + '%';
}

/* ==================== BACK TO TOP ==================== */
const backToTop = document.getElementById('back-to-top');
function updateBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ==================== TYPING EFFECT ==================== */
const phrases = [
  'Project Director',
  'Construction Manager',
  'Project Management Expert',
  'Construction Consultant',
  'BIM Specialist',
  'Contract Manager'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, deleting ? 60 : 100);
}
setTimeout(typeEffect, 2500);

/* ==================== PARTICLE GENERATOR ==================== */
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 80 + 20;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:-${size}px;
      animation-duration:${Math.random() * 20 + 12}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ==================== SCROLL ANIMATIONS (AOS) ==================== */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters and bars when section appears
        if (entry.target.closest('#highlights')) animateCounters();
        if (entry.target.closest('#skills')) animateBars();
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.aos, .aos-left, .aos-right').forEach(el => {
    observer.observe(el);
  });
}

/* ==================== COUNTER ANIMATION ==================== */
let countersRan = false;
function animateCounters() {
  if (countersRan) return;
  countersRan = true;
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

/* ==================== SKILL BAR ANIMATION ==================== */
let barsRan = false;
function animateBars() {
  if (barsRan) return;
  barsRan = true;
  document.querySelectorAll('.skill-fill').forEach(el => {
    const pct = el.getAttribute('data-pct');
    setTimeout(() => { el.style.width = pct + '%'; }, 100);
  });
}

/* ==================== PROJECT FILTER ==================== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const cat = card.getAttribute('data-cat');
      const show = filter === 'all' || cat === filter;
      card.style.display = show ? '' : 'none';
      card.style.animation = show ? 'fadeInUp .4s ease forwards' : '';
    });
  });
});

/* ==================== CONTACT FORM ==================== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Đang gửi...';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }, 1500);
  });
}

/* ==================== STAGGERED CARD DELAYS ==================== */
document.querySelectorAll('.highlight-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
});
document.querySelectorAll('.cert-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.07) + 's';
});

/* ==================== FALLBACK INIT ==================== */
// In case load event already fired before this script runs
if (document.readyState === 'complete') {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls && !ls.classList.contains('hidden')) {
      ls.classList.add('hidden');
      initAnimations();
    }
  }, 2200);
}
