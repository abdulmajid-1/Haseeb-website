// Interactivity: navbar toggle, scroll reveal, form validation, current year

// Navbar toggle with animated hamburger and sliding mobile menu
const navToggleButton = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggleButton && mobileNav) {
  navToggleButton.addEventListener('click', () => {
    const open = mobileNav.classList.contains('open');
    if (open) {
      mobileNav.classList.remove('open');
      navToggleButton.classList.remove('is-open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.classList.add('open');
      navToggleButton.classList.add('is-open');
      navToggleButton.setAttribute('aria-expanded', 'true');
    }
  });
  // Close nav on link click
  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggleButton.classList.remove('is-open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealElements = () => {
  const candidates = document.querySelectorAll('section h2, .card, .testimonial, form, .kicker, h1, .reveal, .zoom');
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

// Tabs: taxation
const initTaxationTabs = () => {
  const tablist = document.getElementById('taxationTabs');
  if (!tablist) return;
  /** @type {NodeListOf<HTMLButtonElement>} */
  const tabs = tablist.querySelectorAll('[role="tab"]');
  /** @type {Record<string, HTMLElement>} */
  const panels = {
    ntn: document.getElementById('panel-ntn'),
    income: document.getElementById('panel-income'),
    sales: document.getElementById('panel-sales'),
    advisory: document.getElementById('panel-advisory'),
  };

  const selectTab = (name) => {
    tabs.forEach((t) => {
      const active = t.dataset.tab === name;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    Object.entries(panels).forEach(([key, panel]) => {
      if (!panel) return;
      if (key === name) {
        panel.hidden = false;
      } else {
        panel.hidden = true;
      }
    });
  };

  tabs.forEach((t) => {
    t.addEventListener('click', () => selectTab(t.dataset.tab || 'ntn'));
    t.addEventListener('keydown', (e) => {
      const order = ['ntn', 'income', 'sales', 'advisory'];
      const idx = order.indexOf(t.dataset.tab || 'ntn');
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = order[(idx + 1) % order.length];
        const nextEl = tablist.querySelector(`[data-tab="${next}"]`);
        if (nextEl instanceof HTMLButtonElement) nextEl.focus();
        selectTab(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = order[(idx - 1 + order.length) % order.length];
        const prevEl = tablist.querySelector(`[data-tab="${prev}"]`);
        if (prevEl instanceof HTMLButtonElement) prevEl.focus();
        selectTab(prev);
      }
    });
  });

  // ensure initial state
  selectTab('ntn');
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
      name.classList.add('error');
      valid = false;
    } else {
      setError('name');
      name.classList.remove('error');
    }
    if (!email.value.trim() || !validateEmail(email.value)) {
      setError('email', 'Please enter a valid email');
      email.classList.add('error');
      valid = false;
    } else {
      setError('email');
      email.classList.remove('error');
    }
    if (!message.value.trim()) {
      setError('message', 'Please enter a short message');
      message.classList.add('error');
      valid = false;
    } else {
      setError('message');
      message.classList.remove('error');
    }

    if (valid) {
      // Simulate success
      form.reset();
      [name, email, message].forEach((el) => el.classList.remove('error'));
      alert('Thanks! Your message has been sent.');
    }
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Init after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { revealElements(); initTaxationTabs(); });
} else {
  revealElements();
  initTaxationTabs();
}



