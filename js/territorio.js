/* ============================================================
   TERRITORIO — Page animations
   ============================================================ */
(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js-ready');

    const ready = (fn) => {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    };

    ready(() => {
        const hasGSAP = typeof window.gsap !== 'undefined';
        if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

        initHeroVideo(hasGSAP);
        initScrambleQuote();
        initSteps();
        initCountUp();
        initCTA();
        initChatbot();
    });

    function initHeroVideo(hasGSAP) {
        const hero = document.querySelector('.terr-hero');
        const video = hero ? hero.querySelector('video') : null;
        if (!hero || !video) return;
        video.muted = true; video.playsInline = true; video.preload = 'auto';

        const setTime = (p) => {
            if (!isFinite(video.duration) || video.duration === 0) return;
            video.currentTime = Math.max(0, Math.min(video.duration, video.duration * p));
            hero.classList.toggle('copy-visible', p >= 0.5);
        };

        const start = () => {
            if (reduceMotion) { setTime(0); hero.classList.add('copy-visible'); return; }
            if (hasGSAP && window.ScrollTrigger) {
                ScrollTrigger.create({
                    trigger: hero, start: 'top top', end: 'bottom bottom',
                    scrub: 0.5, onUpdate: (self) => setTime(self.progress)
                });
                console.log('[territorio] ScrollTrigger active, video duration:', video.duration);
            }
        };

        if (video.readyState >= 1) start();
        else video.addEventListener('loadedmetadata', start, { once: true });
    }

    function initScrambleQuote() {
        const target = document.querySelector('.scramble, [data-scramble]');
        if (!target) return;
        const finalText = target.textContent.trim();
        const chars = '!<>-_/[]{}=+*^?#';
        let frame = 0, queue = [], frameRequest;
        const update = () => {
            let output = '', complete = 0;
            for (let i = 0; i < queue.length; i++) {
                const item = queue[i];
                if (frame >= item.end) { complete++; output += item.to; }
                else if (frame >= item.start) {
                    if (!item.char || Math.random() < 0.28) item.char = chars[Math.floor(Math.random() * chars.length)];
                    output += '<span class="dud">' + item.char + '</span>';
                } else { output += item.from; }
            }
            target.innerHTML = output;
            if (complete !== queue.length) { frameRequest = requestAnimationFrame(update); frame++; }
        };
        const setText = (newText) => {
            const oldText = target.textContent;
            const length = Math.max(oldText.length, newText.length);
            queue = [];
            for (let i = 0; i < length; i++) {
                const s = Math.floor(Math.random() * 40);
                queue.push({ from: oldText[i] || '', to: newText[i] || '', start: s, end: s + Math.floor(Math.random() * 40), char: '' });
            }
            cancelAnimationFrame(frameRequest); frame = 0; update();
        };
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) { if (!reduceMotion) setText(finalText); io.disconnect(); } });
        }, { threshold: 0.4 });
        io.observe(target);
    }

    function initSteps() {
        const steps = document.querySelectorAll('.terr-step');
        if (!steps.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
        steps.forEach((s) => io.observe(s));
    }

    function initCountUp() {
        const nodes = document.querySelectorAll('[data-count]');
        if (!nodes.length) return;
        const animate = (el) => {
            const target = parseFloat(el.dataset.value) || 0;
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const decimals = parseInt(el.dataset.decimals || '0', 10);
            const startT = performance.now();
            const tick = (now) => {
                const p = Math.min(1, (now - startT) / 1800);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = prefix + (target * eased).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + suffix;
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    if (reduceMotion) {
                        const t = parseFloat(e.target.dataset.value || 0);
                        e.target.textContent = (e.target.dataset.prefix || '') + t + (e.target.dataset.suffix || '');
                    } else animate(e.target);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        nodes.forEach((n) => io.observe(n));
    }

    function initCTA() {
        const cta = document.querySelector('.terr-cta');
        if (!cta) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
            });
        }, { threshold: 0.3 });
        io.observe(cta);
    }

    function initChatbot() {
        const fab = document.getElementById('chatbotFab');
        const panel = document.getElementById('chatbotPanel');
        const closeBtn = document.getElementById('chatbotClose');
        const form = document.getElementById('chatbotForm');
        const input = document.getElementById('chatbotInput');
        const body = document.getElementById('chatbotBody');
        if (!fab || !panel) return;

        const open = () => {
            panel.classList.add('is-open');
            panel.setAttribute('aria-hidden', 'false');
            fab.setAttribute('aria-expanded', 'true');
            fab.classList.add('is-hidden');
            setTimeout(() => input && input.focus(), 300);
        };
        const close = () => {
            panel.classList.remove('is-open');
            panel.setAttribute('aria-hidden', 'true');
            fab.setAttribute('aria-expanded', 'false');
            fab.classList.remove('is-hidden');
        };

        fab.addEventListener('click', open);
        closeBtn && closeBtn.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
        });

        form && form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;
            const userMsg = document.createElement('div');
            userMsg.className = 'chatbot-msg chatbot-msg--user';
            userMsg.innerHTML = '<p></p>';
            userMsg.querySelector('p').textContent = text;
            body.appendChild(userMsg);
            input.value = '';
            body.scrollTop = body.scrollHeight;

            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chatbot-msg chatbot-msg--bot';
                botMsg.innerHTML = '<p>Grazie del messaggio! Ti ricontattiamo a breve. Per richieste urgenti chiama <a href="tel:+390709316XX">070 9316 XX</a> o scrivi a <a href="mailto:info@oleificiocabriolu.it">info@oleificiocabriolu.it</a>.</p>';
                body.appendChild(botMsg);
                body.scrollTop = body.scrollHeight;
            }, 700);
        });
    }
})();
