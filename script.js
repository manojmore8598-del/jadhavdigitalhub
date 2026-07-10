/**
 * Jadhav Digital Hub - Main JavaScript
 */
(function () {
  'use strict';

  const PHONE = '7709647973';
  const WHATSAPP = '917709647973';

  /* ---- Preloader ---- */
  function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('hidden'); }, 500);
    });
  }

  /* ---- Sticky Header ---- */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    function handleScroll() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  /* ---- Active Nav ---- */
  function initActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === page) link.classList.add('active');
    });
  }

  /* ---- Back To Top ---- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Animated Counters ---- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    function animate(el) {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 2000;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ---- AOS Init ---- */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
    }
  }

  /* ---- Gallery Lightbox ---- */
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;

    document.querySelectorAll('[data-lightbox]').forEach(function (item) {
      item.addEventListener('click', function () {
        lightboxImg.src = this.getAttribute('data-lightbox') || this.querySelector('img')?.src;
        lightboxImg.alt = this.querySelector('img')?.alt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---- Contact Form Validation ---- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'name', rule: function (v) { return v.trim().length >= 2; }, msg: 'कृपया वैध नाव प्रविष्ट करा' },
        { id: 'phone', rule: function (v) { return /^[6-9]\d{9}$/.test(v.replace(/\s/g, '')); }, msg: 'कृपया वैध 10 अंकी मोबाईल नंबर प्रविष्ट करा' },
        { id: 'email', rule: function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, msg: 'कृपया वैध ईमेल प्रविष्ट करा' },
        { id: 'subject', rule: function (v) { return v.trim().length >= 2; }, msg: 'कृपया विषय प्रविष्ट करा' },
        { id: 'message', rule: function (v) { return v.trim().length >= 10; }, msg: 'कृपया किमान 10 अक्षरे संदेश लिहा' }
      ];

      fields.forEach(function (f) {
        const input = document.getElementById(f.id);
        const feedback = input?.parentElement.querySelector('.invalid-feedback');
        if (!input) return;

        if (!f.rule(input.value)) {
          input.classList.add('is-invalid');
          if (feedback) feedback.textContent = f.msg;
          valid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (valid) {
        const success = form.querySelector('.form-success');
        if (success) success.classList.add('show');
        form.reset();
        setTimeout(function () {
          if (success) success.classList.remove('show');
        }, 5000);
      }
    });

    form.querySelectorAll('.form-control').forEach(function (input) {
      input.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  }

  /* ---- Newsletter ---- */
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        alert('धन्यवाद! तुम्ही यशस्वीरित्या सबस्क्राइब केले.');
        form.reset();
      } else {
        alert('कृपया वैध ईमेल प्रविष्ट करा.');
      }
    });
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initStickyHeader();
    initActiveNav();
    initBackToTop();
    initCounters();
    initAOS();
    initLightbox();
    initContactForm();
    initNewsletter();
  });
})();
