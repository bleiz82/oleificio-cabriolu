(function () {
  'use strict';

  /* ── COSTANTI ── */
  const TOTAL_FRAMES = 960;
  const DESKTOP_PATH = '/img/frames/desktop/frame_';
  const MOBILE_PATH = '/img/frames/mobile/frame_';
  const EXT = '.webp';
  const IS_MOBILE = window.innerWidth < 768;
  const BASE_PATH = IS_MOBILE ? MOBILE_PATH : DESKTOP_PATH;

  /* ── CANVAS ── */
  const canvas = document.getElementById('bc');
  const ctx = canvas.getContext('2d');
  const frames = [];
  let loadedCount = 0;
  let currentFrame = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrame);
  }

  function drawFrame(idx) {
    if (!frames[idx] || !frames[idx].complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = frames[idx];
    const cW = canvas.width, cH = canvas.height;
    const iR = img.naturalWidth / img.naturalHeight;
    const cR = cW / cH;
    let dW, dH, dX, dY;
    if (cR > iR) { dW = cW; dH = cW / iR; }
    else { dH = cH; dW = cH * iR; }
    dX = (cW - dW) / 2;
    dY = (cH - dH) / 2;
    ctx.drawImage(img, dX, dY, dW, dH);
  }

  function preloadFrames() {
    const promises = [];
    /* Primo frame subito (priorità) */
    const first = new Image();
    first.onload = () => { frames[0] = first; drawFrame(0); };
    first.src = BASE_PATH + '0001' + EXT;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i - 1;
      const p = new Promise((resolve) => {
        img.onload = () => { loadedCount++; resolve(); };
        img.onerror = () => { loadedCount++; resolve(); };
      });
      img.src = BASE_PATH + String(i).padStart(4, '0') + EXT;
      frames[idx] = img;
      promises.push(p);
    }
    return Promise.all(promises);
  }

  /* ── GSAP SETUP ── */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    /* ====== MASTER CANVAS SCRUB ====== */
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const rawFrame = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        if (rawFrame !== currentFrame) {
          currentFrame = rawFrame;
          drawFrame(currentFrame);
        }
      }
    });

    /* ====== HERO ====== */
    const heroContent = document.querySelector('.hero__content');
    const heroLines = document.querySelectorAll('.hero__line');
    const heroSub = document.querySelector('.hero__sub');
    const heroActions = document.querySelector('.hero__actions');
    const heroProof = document.querySelector('.hero__proof');

    /* Stato iniziale: tutto nascosto */
    gsap.set(heroContent, { opacity: 1 });           /* contenitore visibile */
    gsap.set(heroLines, { opacity: 0, y: 40 });    /* figli nascosti */
    gsap.set(heroSub, { opacity: 0, y: 20 });
    gsap.set(heroActions, { opacity: 0, y: 20 });
    gsap.set(heroProof, { opacity: 0, y: 20 });

    /* Entrata hero: dal 30% al 50% dello scroll hero (≈ frame 36-60) */
    const heroEnterTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: '30% top',
        end: '50% top',
        scrub: 1
      }
    });
    heroEnterTL
      .to(heroLines, { opacity: 1, y: 0, stagger: 0.15, duration: 1 })
      .to(heroSub, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(heroActions, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(heroProof, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

    /* Uscita hero: sfuma quando iniziano i prodotti */
    gsap.to(heroContent, {
      opacity: 0, y: -40,
      scrollTrigger: {
        trigger: '.prodotti',
        start: 'top bottom',
        end: 'top 60%',
        scrub: true
      }
    });

    /* HERO SCROLL INDICATOR */
    gsap.to('.hero__scroll', { opacity: 1, duration: 1, delay: 1.5 });
    gsap.to('.hero__scroll', {
      opacity: 0,
      scrollTrigger: { trigger: '.hero', start: '20% top', end: '25% top', scrub: true }
    });

    /* ====== PRODOTTI COPY ====== */
    document.querySelectorAll('.prodotti__scene').forEach(scene => {
      const copy = scene.querySelector('.prodotti__copy');
      const side = scene.dataset.copySide;
      const fromX = side === 'right' ? 80 : side === 'left' ? -80 : 0;

      gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: '10% bottom',    /* copy appare quando scena entra */
          end: '90% top',         /* copy scompare quando scena esce */
          scrub: 1
        }
      })
        .fromTo(copy,
          { opacity: 0, x: fromX, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 1 }
        )
        .to(copy, { opacity: 0, y: -40, duration: 0.6 }, '+=0.5');
    });

    /* ====== NAV SCROLL ====== */
    const nav = document.getElementById('nav');
    ScrollTrigger.create({
      start: 80,
      onUpdate: self => {
        nav.classList.toggle('nav--scrolled', self.direction === 1 || window.scrollY > 80);
      }
    });

    /* ====== GENERIC .ani FADE-IN ====== */
    document.querySelectorAll('.ani').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    /* ====== STORIA TIMELINE LINE ====== */
    const storiaFill = document.querySelector('.storia__line-fill');
    if (storiaFill) {
      gsap.to(storiaFill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.storia__timeline',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      });
    }

    /* ====== STORIA CARDS ====== */
    document.querySelectorAll('.storia__item').forEach(item => {
      const fromX = item.classList.contains('storia__item--reverse') ? 80 : -80;
      gsap.from(item.querySelector('.storia__card'), {
        x: fromX, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      gsap.from(item.querySelector('.storia__year-badge'), {
        scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)',
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    /* ====== FRANGITURA PARALLAX ====== */
    const frangImg = document.querySelector('.frangitura__bg img');
    if (frangImg) {
      gsap.to(frangImg, {
        yPercent: -15,
        scrollTrigger: {
          trigger: '.frangitura',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    /* ====== TERRITORIO COUNTERS ====== */
    document.querySelectorAll('.territorio__counter').forEach(counter => {
      const numEl = counter.querySelector('.territorio__number');
      const target = parseInt(counter.dataset.target);
      const suffix = counter.dataset.suffix || '';
      const isStatic = counter.dataset.static === 'true';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        onEnter: () => {
          if (isStatic) {
            numEl.textContent = target;
            return;
          }
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              numEl.textContent = Math.floor(this.targets()[0].val) + suffix;
            }
          });
        },
        once: true
      });
    });

    /* ====== RECENSIONI BARS ====== */
    document.querySelectorAll('.recensioni__bar-fill').forEach(bar => {
      const w = bar.dataset.width;
      gsap.to(bar, {
        width: w + '%',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          once: true
        }
      });
    });

    /* ====== RECENSIONI CARDS ====== */
    gsap.from('.recensioni__card', {
      y: 40, opacity: 0, rotateX: 8, stagger: 0.12, duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.recensioni__grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    /* ====== CTA FINALE WORDS ====== */
    gsap.to('.cta-final__word', {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-final',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

  } /* end initGSAP */

  /* ── MOBILE MENU ── */
  function initBurger() {
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('mobile-menu--open');
      burger.classList.toggle('nav__burger--open');
      burger.setAttribute('aria-expanded', isOpen);
      menu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('mobile-menu--open');
        burger.classList.remove('nav__burger--open');
        burger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── COOKIE BANNER ── */
  function initCookie() {
    const banner = document.getElementById('cookieBanner');
    if (!banner || localStorage.getItem('cb-consent')) return;
    setTimeout(() => banner.classList.add('cookie-banner--visible'), 2000);
    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem('cb-consent', 'accepted');
      banner.classList.remove('cookie-banner--visible');
    });
    document.getElementById('cookieReject')?.addEventListener('click', () => {
      localStorage.setItem('cb-consent', 'rejected');
      banner.classList.remove('cookie-banner--visible');
    });
  }

  /* ── CHATBOT ── */
  function initChatbot() {
    const fab = document.getElementById('chatbotFab');
    const panel = document.getElementById('chatbotPanel');
    const close = document.getElementById('chatbotClose');
    if (!fab || !panel) return;
    fab.addEventListener('click', () => {
      const open = panel.classList.toggle('chatbot-panel--open');
      panel.setAttribute('aria-hidden', !open);
    });
    close?.addEventListener('click', () => {
      panel.classList.remove('chatbot-panel--open');
      panel.setAttribute('aria-hidden', 'true');
    });
  }

  /* ── SMOOTH ANCHOR ── */
  function initSmooth() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }  /* ← QUESTA PARENTESI MANCAVA! */

  /* ── FAQ TOGGLE ── */
  function initFAQ() {
    document.querySelectorAll('.faq__item').forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          document.querySelectorAll('.faq__item').forEach(other => {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  }

  /* ── AVVIO ── */
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  preloadFrames().then(() => {
    console.log('✅ Tutti i ' + TOTAL_FRAMES + ' frame caricati');
    drawFrame(0);
    initGSAP();
  });
  initBurger();
  initCookie();
  initChatbot();
  initSmooth();
  initFAQ();

})();
