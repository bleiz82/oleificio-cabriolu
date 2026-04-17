(function () {
  'use strict';

  const TOTAL_FRAMES = 960;
  const DESKTOP_PATH = '/img/frames/desktop/frame_';
  const MOBILE_PATH = '/img/frames/mobile/frame_';
  const EXT = '.webp';
  const IS_MOBILE = window.innerWidth < 768;
  const BASE_PATH = IS_MOBILE ? MOBILE_PATH : DESKTOP_PATH;

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

  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    /* ═══════════════════════════════════════
       v20: versione pulita
       - copy basato sui frame reali (v17)
       - fix centraggio Latte (v18)
       - NESSUN blocco postSections
       ═══════════════════════════════════════ */

    /* --- Prepara hero --- */
    const heroContent = document.querySelector('.hero__content');
    const heroChildren = heroContent.querySelectorAll('.hero__line, .hero__sub, .hero__actions, .hero__proof');

    heroContent.style.cssText = [
      'position:fixed', 'top:0', 'left:50%', 'transform:translateX(-50%)',
      'width:100%', 'max-width:800px', 'height:100vh',
      'display:flex', 'flex-direction:column', 'justify-content:center', 'align-items:center',
      'text-align:center', 'padding:40px 24px', 'z-index:5', 'pointer-events:none',
      'background:radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
    ].join(';') + ';';
    heroContent.querySelectorAll('.btn').forEach(b => b.style.pointerEvents = 'auto');

    const HERO_SHOW = 60;
    const HERO_END = 120;
    let heroVisible = false;
    let heroAnimated = false;

    gsap.set(heroChildren, { opacity: 0, y: 30, visibility: 'hidden' });
    gsap.set(heroContent, { opacity: 0, display: 'flex' });

    /* --- Prepara prodotti --- */
    const scenes = [];
    const allCopies = [];

    document.querySelectorAll('.prodotti__scene').forEach((scene, idx) => {
      const copy = scene.querySelector('.prodotti__copy');
      const side = scene.dataset.copySide;
      const frameStart = parseInt(scene.dataset.frameStart);
      const frameEnd = parseInt(scene.dataset.frameEnd);
      const frameMid = Math.floor((frameStart + frameEnd) / 2);

      const isCenter = (side === 'center');
      const fromX = isCenter ? 0 : (side === 'right' ? 60 : -60);

      let cssPos = [
        'position:fixed', 'top:0', 'height:100vh',
        'display:none',
        'flex-direction:column', 'justify-content:center',
        'padding:0 5vw', 'z-index:5', 'pointer-events:none'
      ];

      if (side === 'left') {
        cssPos.push('left:0', 'right:auto', 'max-width:480px');
        cssPos.push('background:linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)');
      } else if (side === 'right') {
        cssPos.push('left:auto', 'right:0', 'max-width:480px');
        cssPos.push('background:linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)');
      } else {
        cssPos.push('left:0', 'right:0', 'margin-left:auto', 'margin-right:auto',
          'max-width:600px', 'text-align:center', 'align-items:center');
        cssPos.push('background:radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)');
      }

      copy.style.cssText = cssPos.join(';') + ';';
      copy.querySelectorAll('.btn').forEach(b => b.style.pointerEvents = 'auto');

      if (isCenter) {
        gsap.set(copy, { opacity: 0, y: 30, visibility: 'hidden' });
      } else {
        gsap.set(copy, { opacity: 0, x: fromX, y: 30, visibility: 'hidden' });
      }

      allCopies.push(copy);
      scenes.push({ copy, side, fromX, isCenter, frameStart, frameEnd, frameMid, visible: false, animated: false });
    });

    /* --- MASTER ScrollTrigger: controlla frame + visibilità copy --- */
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

        /* --- HERO copy --- */
        const shouldShowHero = (f >= HERO_SHOW && f < HERO_END);
        if (shouldShowHero && !heroVisible) {
          heroVisible = true;
          heroContent.style.display = 'flex';
          if (!heroAnimated) {
            heroAnimated = true;
            gsap.to(heroContent, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            gsap.to(heroChildren, { opacity: 1, y: 0, visibility: 'visible', stagger: 0.08, duration: 0.5, ease: 'power2.out' });
          } else {
            gsap.to(heroContent, { opacity: 1, duration: 0.3 });
          }
        } else if (!shouldShowHero && heroVisible) {
          heroVisible = false;
          gsap.to(heroContent, { opacity: 0, duration: 0.3, onComplete: () => { heroContent.style.display = 'none'; } });
        }

        /* --- PRODOTTI copy --- */
        scenes.forEach((s, idx) => {
          const shouldShow = (f >= s.frameMid && f < s.frameEnd);
          if (shouldShow && !s.visible) {
            s.visible = true;
            allCopies.forEach((c, i) => {
              if (i !== idx) {
                c.style.display = 'none';
                scenes[i].visible = false;
              }
            });
            heroContent.style.display = 'none';
            heroVisible = false;
            s.copy.style.display = 'flex';
            if (!s.animated) {
              s.animated = true;
              if (s.isCenter) {
                gsap.to(s.copy, { opacity: 1, y: 0, visibility: 'visible', duration: 0.5, ease: 'power2.out' });
              } else {
                gsap.to(s.copy, { opacity: 1, x: 0, y: 0, visibility: 'visible', duration: 0.5, ease: 'power2.out' });
              }
            } else {
              gsap.to(s.copy, { opacity: 1, duration: 0.3 });
            }
          } else if (!shouldShow && s.visible) {
            s.visible = false;
            gsap.to(s.copy, { opacity: 0, duration: 0.3, onComplete: () => { s.copy.style.display = 'none'; } });
          }
        });
      }
    });

    /* Scroll indicator */
    const heroScroll = document.querySelector('.hero__scroll');
    if (heroScroll) {
      gsap.set(heroScroll, { opacity: 1 });
      gsap.timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '25% top', scrub: true }
      }).to(heroScroll, { opacity: 0 });
    }

    /* NAV */
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
