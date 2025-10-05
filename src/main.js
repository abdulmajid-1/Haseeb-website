// Interactivity: navbar toggle, scroll reveal, form validation, current year

// Navbar toggle
const navToggleButton = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggleButton && mobileNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('hidden') === false;
    if (isOpen) {
      mobileNav.classList.add('hidden');
      navToggleButton.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.classList.remove('hidden');
      navToggleButton.setAttribute('aria-expanded', 'true');
    }
  });
  // Close nav on link click
  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      navToggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealElements = () => {
  const candidates = document.querySelectorAll('section h2, .service-card, .testimonial, form, .kicker, h1');
  candidates.forEach((el) => el.classList.add('reveal'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  candidates.forEach((el) => observer.observe(el));
};

// Form validation
const form = document.getElementById('contactForm');
const setError = (name, message) => {
  const p = document.querySelector(`[data-error-for="${name}"]`);
  if (p) p.textContent = message || '';
};
const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = /** @type {HTMLInputElement} */ (document.getElementById('name'));
    const email = /** @type {HTMLInputElement} */ (document.getElementById('email'));
    const message = /** @type {HTMLTextAreaElement} */ (document.getElementById('message'));

    let valid = true;
    if (!name.value.trim()) {
      setError('name', 'Please enter your full name');
      valid = false;
    } else {
      setError('name');
    }
    if (!email.value.trim() || !validateEmail(email.value)) {
      setError('email', 'Please enter a valid email');
      valid = false;
    } else {
      setError('email');
    }
    if (!message.value.trim()) {
      setError('message', 'Please enter a short message');
      valid = false;
    } else {
      setError('message');
    }

    if (valid) {
      // Simulate success
      form.reset();
      alert('Thanks! Your message has been sent.');
    }
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Init after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealElements);
} else {
  revealElements();
}


