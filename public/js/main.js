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

    const bodyH = document.body.scrollHeight - window.innerHeight;

    /* ====================================================
       Calcola frame REALE per ogni sezione (posizione DOM)
       ==================================================== */
    function getFrameAt(el, position) {
      /* position: 'top' | 'bottom' | 'mid' */
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bot = top + el.scrollHeight;
      let px;
      if (position === 'top') px = top;
      else if (position === 'bottom') px = bot;
      else px = (top + bot) / 2;
      return Math.round((px / bodyH) * TOTAL_FRAMES);
    }

    /* ── HERO ── */
    const heroEl = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero__content');
    const heroLines = document.querySelectorAll('.hero__line');
    const heroSub = document.querySelector('.hero__sub');
    const heroActions = document.querySelector('.hero__actions');
    const heroProof = document.querySelector('.hero__proof');
    const heroScroll = document.querySelector('.hero__scroll');

    const HERO_MID = getFrameAt(heroEl, 'mid');    /* ≈ 51  */
    const HERO_END = getFrameAt(heroEl, 'bottom');  /* ≈ 102 */

    /* Stato iniziale */
    gsap.set(heroContent, { opacity: 1, visibility: 'visible' });
    gsap.set(heroLines, { opacity: 0, y: 40 });
    gsap.set(heroSub, { opacity: 0, y: 20 });
    gsap.set(heroActions, { opacity: 0, y: 20 });
    gsap.set(heroProof, { opacity: 0, y: 20 });

    /* ── PRODOTTI SCENE — calcolo frame reali dal DOM ── */
    const scenes = [];
    document.querySelectorAll('.prodotti__scene').forEach(scene => {
      const copy = scene.querySelector('.prodotti__copy');
      const side = scene.dataset.copySide;
      const fromX = side === 'right' ? 60 : side === 'left' ? -60 : 0;
      const fStart = getFrameAt(scene, 'top');
      const fEnd = getFrameAt(scene, 'bottom');
      const fMid = Math.round((fStart + fEnd) / 2);

      gsap.set(copy, { opacity: 0, x: fromX, y: 30 });

      scenes.push({ copy, fromX, fStart, fEnd, fMid, shown: false, hidden: false });
    });

    /* Traccia stato hero */
    let heroShown = false;
    let heroHidden = false;

    /* ====================================================
       MASTER SCROLL — un solo onUpdate governa tutto
       ==================================================== */
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const f = Math.floor(self.progress * (TOTAL_FRAMES - 1));

        /* Aggiorna canvas */
        if (f !== currentFrame) {
          currentFrame = f;
          drawFrame(currentFrame);
        }

        /* ══════ HERO TEXT ══════
           Entra a HERO_MID (≈51), resta visibile fino a HERO_END (≈102)
           Esce da HERO_END a HERO_END+10 */

        if (f >= HERO_MID && f <= HERO_END && !heroShown) {
          heroShown = true;
          heroHidden = false;
          gsap.to(heroLines, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' });
          gsap.to(heroSub, { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power2.out' });
          gsap.to(heroActions, { opacity: 1, y: 0, duration: 0.4, delay: 0.25, ease: 'power2.out' });
          gsap.to(heroProof, { opacity: 1, y: 0, duration: 0.3, delay: 0.35, ease: 'power2.out' });
        }
        if (f > HERO_END + 10 && !heroHidden) {
          heroHidden = true;
          gsap.to(heroContent, { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' });
        }
        /* Scroll indietro: resetta */
        if (f < HERO_MID && heroShown) {
          heroShown = false;
          heroHidden = false;
          gsap.set([heroLines, heroSub, heroActions, heroProof], { opacity: 0, y: 20 });
          gsap.set(heroContent, { opacity: 1, y: 0 });
        }

        /* Scroll indicator */
        if (heroScroll) {
          heroScroll.style.opacity = f < 15 ? '1' : '0';
        }

        /* ══════ PRODOTTI COPY ══════
           Ogni scena: copy entra a fMid, resta fino a fEnd, esce fEnd→fEnd+5 */

        scenes.forEach(s => {
          /* ENTRA a metà scena */
          if (f >= s.fMid && f <= s.fEnd + 5 && !s.shown) {
            s.shown = true;
            s.hidden = false;
            gsap.to(s.copy, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
          }
          /* ESCE a fine scena */
          if (f > s.fEnd + 5 && !s.hidden) {
            s.hidden = true;
            gsap.to(s.copy, { opacity: 0, y: -25, duration: 0.25, ease: 'power2.in' });
          }
          /* RESET scroll indietro */
          if (f < s.fMid && s.shown) {
            s.shown = false;
            s.hidden = false;
            gsap.set(s.copy, { opacity: 0, x: s.fromX, y: 30 });
          }
        });
      }
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
  }

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
