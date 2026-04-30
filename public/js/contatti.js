/* ============================================================
   CONTATTI — Page animations + form
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
        initCards();
        initCTA();
        initContactForm();
        initChatbot();
    });

    function initHeroVideo(hasGSAP) {
        const hero = document.querySelector('.cont-hero');
        const video = hero ? hero.querySelector('video') : null;
        if (!hero || !video) return;
        video.muted = true; video.playsInline = true; video.preload = 'auto';

        const setTime = (p) => {
            if (!isFinite(video.duration) || video.duration === 0) return;
            video.currentTime = Math.max(0, Math.min(video.duration, video.duration * p));
            hero.classList.toggle('copy-visible', p >= 0.4);
        };

        const start = () => {
            if (reduceMotion) { setTime(0); hero.classList.add('copy-visible'); return; }
            if (hasGSAP && window.ScrollTrigger) {
                ScrollTrigger.create({
                    trigger: hero, start: 'top top', end: 'bottom bottom',
                    scrub: 0.5, onUpdate: (self) => setTime(self.progress)
                });
                console.log('[contatti] ScrollTrigger active, video duration:', video.duration);
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

    function initCards() {
        const cards = document.querySelectorAll('.cont-card');
        if (!cards.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('is-visible'), i * 120);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        cards.forEach((c) => io.observe(c));
    }

    function initCTA() {
        const cta = document.querySelector('.cont-cta');
        if (!cta) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
            });
        }, { threshold: 0.3 });
        io.observe(cta);
    }

    function initContactForm() {
        const form = document.getElementById('contattiForm');
        const note = document.getElementById('contFormNote');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            note.classList.remove('is-error');
            note.textContent = '';

            const data = new FormData(form);
            const nome = (data.get('nome') || '').toString().trim();
            const email = (data.get('email') || '').toString().trim();
            const motivo = (data.get('motivo') || '').toString().trim();
            const messaggio = (data.get('messaggio') || '').toString().trim();
            const privacy = data.get('privacy');

            if (!nome || !email || !motivo || !messaggio || !privacy) {
                note.classList.add('is-error');
                note.textContent = 'Compila tutti i campi obbligatori.';
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                note.classList.add('is-error');
                note.textContent = 'Inserisci un indirizzo email valido.';
                return;
            }

            // Simulazione invio (sostituisci con backend reale)
            const btn = form.querySelector('.cont-form__btn');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Invio in corso…';

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = originalText;
                note.textContent = '✓ Grazie ' + nome.split(' ')[0] + '! Ti rispondiamo entro 24 ore.';
                form.reset();
            }, 900);
        });
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
            const um = document.createElement('div');
            um.className = 'chatbot-msg chatbot-msg--user';
            um.innerHTML = '<p></p>';
            um.querySelector('p').textContent = text;
            body.appendChild(um);
            input.value = '';
            body.scrollTop = body.scrollHeight;

            setTimeout(() => {
                const bm = document.createElement('div');
                bm.className = 'chatbot-msg chatbot-msg--bot';
                bm.innerHTML = '<p>Grazie del messaggio! Ti ricontattiamo a breve. Per richieste urgenti chiama <a href="tel:+390709316XX">070 9316 XX</a> o scrivi a <a href="mailto:info@oleificiocabriolu.it">info@oleificiocabriolu.it</a>.</p>';
                body.appendChild(bm);
                body.scrollTop = body.scrollHeight;
            }, 700);
        });
    }
})();
