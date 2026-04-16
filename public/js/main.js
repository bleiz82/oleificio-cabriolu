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
    const first = new Image();
    first.onload = () => { frames[0] = first; drawFrame(0); };
    first.src = BASE_PATH + '0001' + EXT;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i - 1;
      const p = new Promise(r => {
        img.onload = () => { loadedCount++; r(); };
        img.onerror = () => { loadedCount++; r(); };
      });
      img.src = BASE_PATH + String(i).padStart(4, '0') + EXT;
      frames[idx] = img;
      promises.push(p);
    }
    return Promise.all(promises);
  }

  /* ── GSAP ── */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    /* MASTER CANVAS */
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const f = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        if (f !== currentFrame) {
          currentFrame = f;
          drawFrame(currentFrame);
        }
      }
    });

    /* ═══════════════════════════════════════
       HERO
       ═══════════════════════════════════════ */
    const heroContent = document.querySelector('.hero__content');
    const heroAll = heroContent.querySelectorAll('.hero__line, .hero__sub, .hero__actions, .hero__proof');

    /* Forza stato iniziale nascosto su TUTTI i figli */
    gsap.set(heroAll, { opacity: 0, y: 30, visibility: 'hidden' });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
      /* 0% → 50%: resta nascosto */
      .to(heroAll, { opacity: 0, y: 30, visibility: 'hidden', duration: 50 })
      /* 50% → 60%: fade in tutti i figli */
      .to(heroAll, { opacity: 1, y: 0, visibility: 'visible', stagger: 0.5, duration: 10 })
      /* 60% → 92%: resta visibile */
      .to(heroAll, { opacity: 1, y: 0, duration: 32 })
      /* 92% → 100%: fade out */
      .to(heroAll, { opacity: 0, y: -30, duration: 8 });

    /* Scroll indicator */
    const heroScroll = document.querySelector('.hero__scroll');
    if (heroScroll) {
      gsap.set(heroScroll, { opacity: 1 });
      gsap.timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true }
      }).to(heroScroll, { opacity: 0 });
    }

    /* ═══════════════════════════════════════
       PRODOTTI — ogni scena
       ═══════════════════════════════════════ */
    document.querySelectorAll('.prodotti__scene').forEach(scene => {
      const copy = scene.querySelector('.prodotti__copy');
      const side = scene.dataset.copySide;
      const fromX = side === 'right' ? 60 : side === 'left' ? -60 : 0;

      /* Forza nascosto */
      gsap.set(copy, { opacity: 0, x: fromX, y: 30, visibility: 'hidden' });

      gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
        /* 0% → 50%: nascosto */
        .to(copy, { opacity: 0, x: fromX, y: 30, visibility: 'hidden', duration: 50 })
        /* 50% → 60%: fade in */
        .to(copy, { opacity: 1, x: 0, y: 0, visibility: 'visible', duration: 10 })
        /* 60% → 92%: visibile */
        .to(copy, { opacity: 1, x: 0, y: 0, duration: 32 })
        /* 92% → 100%: fade out */
        .to(copy, { opacity: 0, y: -30, duration: 8 });
    });

    /* ═══════════════════════════════════════
       NAV
       ═══════════════════════════════════════ */
    const nav = document.getElementById('nav');
    ScrollTrigger.create({
      start: 80,
      onUpdate: self => {
        nav.classList.toggle('nav--scrolled', self.direction === 1 || window.scrollY > 80);
      }
    });

    /* GENERIC .ani */
    document.querySelectorAll('.ani').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    /* STORIA LINE */
    const storiaFill = document.querySelector('.storia__line-fill');
    if (storiaFill) {
      gsap.to(storiaFill, {
        height: '100%', ease: 'none',
        scrollTrigger: { trigger: '.storia__timeline', start: 'top 80%', end: 'bottom 20%', scrub: true }
      });
    }

    /* STORIA CARDS */
    document.querySelectorAll('.storia__item').forEach(item => {
      const fromX = item.classList.contains('storia__item--reverse') ? 80 : -80;
      gsap.from(item.querySelector('.storia__card'), {
        x: fromX, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      gsap.from(item.querySelector('.storia__year-badge'), {
        scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)',
        scrollTrigger: { trigger: item, start: 'top 75%', toggleActions: 'play none none reverse' }
      });
    });

    /* FRANGITURA */
    const frangImg = document.querySelector('.frangitura__bg img');
    if (frangImg) {
      gsap.to(frangImg, {
        yPercent: -15,
        scrollTrigger: { trigger: '.frangitura', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }

    /* TERRITORIO COUNTERS */
    document.querySelectorAll('.territorio__counter').forEach(counter => {
      const numEl = counter.querySelector('.territorio__number');
      const target = parseInt(counter.dataset.target);
      const suffix = counter.dataset.suffix || '';
      const isStatic = counter.dataset.static === 'true';
      ScrollTrigger.create({
        trigger: counter, start: 'top 85%',
        onEnter: () => {
          if (isStatic) { numEl.textContent = target; return; }
          gsap.to({ val: 0 }, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate: function () { numEl.textContent = Math.floor(this.targets()[0].val) + suffix; }
          });
        },
        once: true
      });
    });

    /* RECENSIONI BARS */
    document.querySelectorAll('.recensioni__bar-fill').forEach(bar => {
      gsap.to(bar, {
        width: bar.dataset.width + '%', duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: bar, start: 'top 90%', once: true }
      });
    });

    /* RECENSIONI CARDS */
    gsap.from('.recensioni__card', {
      y: 40, opacity: 0, rotateX: 8, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.recensioni__grid', start: 'top 80%', toggleActions: 'play none none reverse' }
    });

    /* CTA WORDS */
    gsap.to('.cta-final__word', {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-final', start: 'top 75%', toggleActions: 'play none none reverse' }
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

  /* ── COOKIE ── */
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

  /* ── SMOOTH ── */
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
  }

  /* ── FAQ ── */
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
