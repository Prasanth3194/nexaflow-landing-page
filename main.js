// ============================================================
//  NexaFlow Landing Page — main.js
// ============================================================

/* ---- NAV SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- BURGER MENU ---- */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll(
  '.feature-card, .step, .tcard, .section-header, .hero__content, .stat'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

/* ---- FORM VALIDATION ---- */
const form       = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');
const nameInput  = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameErr    = document.getElementById('nameErr');
const emailErr   = document.getElementById('emailErr');

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

function showError(input, errEl, msg) {
  input.classList.add('error');
  errEl.textContent = msg;
}

function clearError(input, errEl) {
  input.classList.remove('error');
  errEl.textContent = '';
}

[nameInput, emailInput].forEach(input => {
  input.addEventListener('input', () => {
    if (input === nameInput)  clearError(nameInput, nameErr);
    if (input === emailInput) clearError(emailInput, emailErr);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  if (!nameInput.value.trim()) {
    showError(nameInput, nameErr, 'Please enter your full name.');
    valid = false;
  }
  if (!emailInput.value.trim()) {
    showError(emailInput, emailErr, 'Please enter your email.');
    valid = false;
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailErr, 'Please enter a valid email address.');
    valid = false;
  }

  if (valid) {
    form.hidden = true;
    successMsg.hidden = false;
  }
});

/* ---- TESTIMONIAL DOTS ---- */
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});