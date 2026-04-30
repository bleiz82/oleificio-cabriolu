(function () {
    'use strict';

    /* Aspetta che GSAP sia disponibile */
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    /* ── DISABILITA le transition CSS che confliggono ── */
    document.querySelectorAll('.timeline__item, .valori__card').forEach(function (el) {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
    });

    /* ══════════════════════════════════════════
       1. TIMELINE — PARALLAX + SLIDE LATERALE
       ══════════════════════════════════════════ */
    var timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach(function (item, i) {
        var img = item.querySelector('.timeline__item__img');
        var fromX = (i % 2 === 0) ? -60 : 60;

        gsap.from(item, {
            x: fromX,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        if (img) {
            gsap.from(img, {
                y: 80,
                scale: 1.08,
                duration: 1.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'top 30%',
                    scrub: 1
                }
            });
        }
    });

    /* ══════════════════════════════════════════
       2. TIMELINE LINE — DRAW PROGRESSIVO
       ══════════════════════════════════════════ */
    var timelineLine = document.querySelector('.timeline__line');
    if (timelineLine) {
        var lineOverlay = document.createElement('div');
        lineOverlay.style.cssText = 'position:absolute;left:16px;top:0;bottom:0;width:1px;background:#0A0A0A;z-index:1;transform-origin:top;';
        timelineLine.appendChild(lineOverlay);

        gsap.to(lineOverlay, {
            scaleY: 0,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
                trigger: timelineLine,
                start: 'top 80%',
                end: 'bottom 50%',
                scrub: true
            }
        });
    }

    /* ══════════════════════════════════════════
       3. IMAGE REVEAL — SIPARIO DORATO
       ══════════════════════════════════════════ */
    document.querySelectorAll('.timeline__item__img').forEach(function (img) {
        var wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:relative;overflow:hidden;border-radius:4px;margin-bottom:24px;';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        img.style.marginBottom = '0';

        var curtain = document.createElement('div');
        curtain.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#C9A84C;z-index:2;transform-origin:left;';
        wrapper.appendChild(curtain);

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
        tl.from(img, { scale: 1.3, duration: 1.4, ease: 'power3.out' }, 0);
        tl.to(curtain, { scaleX: 0, transformOrigin: 'right center', duration: 1, ease: 'power3.inOut' }, 0.1);
    });

    /* ══════════════════════════════════════════
       4. SPLIT TEXT — TITOLI LETTERA PER LETTERA
       ══════════════════════════════════════════ */
    document.querySelectorAll('.timeline__intro h2, .valori__header h2, .storia-cta h2').forEach(function (title) {
        var text = title.textContent;
        title.innerHTML = '';
        title.style.overflow = 'hidden';

        for (var c = 0; c < text.length; c++) {
            var span = document.createElement('span');
            span.textContent = text[c] === ' ' ? '\u00A0' : text[c];
            span.style.cssText = 'display:inline-block;opacity:0;transform:translateY(100%);';
            title.appendChild(span);
        }

        gsap.to(title.querySelectorAll('span'), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    /* ══════════════════════════════════════════
       5. VALORI CARDS — FLIP 3D SCAGLIONATO
       ══════════════════════════════════════════ */
    var valoriGrid = document.querySelector('.valori__grid');
    if (valoriGrid) valoriGrid.style.perspective = '1000px';

    document.querySelectorAll('.valori__card').forEach(function (card, i) {
        card.style.transformStyle = 'preserve-3d';
        gsap.from(card, {
            rotateX: 15,
            rotateY: (i % 2 === 0) ? -10 : 10,
            y: 80,
            opacity: 0,
            duration: 1,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    /* ══════════════════════════════════════════
       6. COUNTER ANIMATO — ANNI TIMELINE
       ══════════════════════════════════════════ */
    document.querySelectorAll('.timeline__year').forEach(function (el) {
        var target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;
        var obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reset'
            },
            onUpdate: function () {
                el.textContent = Math.round(obj.val);
            }
        });
    });

    /* ══════════════════════════════════════════
       7. COUNTER — NUMERI VALORI (01, 02...)
       ══════════════════════════════════════════ */
    document.querySelectorAll('.valori__card__num').forEach(function (el) {
        var target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;
        var obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reset'
            },
            onUpdate: function () {
                el.textContent = String(Math.round(obj.val)).padStart(2, '0');
            }
        });
    });

    /* ══════════════════════════════════════════
       8. YEAR GLOW
       ══════════════════════════════════════════ */
    document.querySelectorAll('.timeline__year').forEach(function (el) {
        gsap.fromTo(el,
            { textShadow: '0 0 0 rgba(201,168,76,0)' },
            {
                textShadow: '0 0 40px rgba(201,168,76,.4)',
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    /* ══════════════════════════════════════════
       9. CTA — GLOW PULSANTE + FADE IN
       ══════════════════════════════════════════ */
    var ctaSection = document.querySelector('.storia-cta');
    var ctaBtn = document.querySelector('.btn-gold');

    if (ctaSection) {
        gsap.from(ctaSection.querySelectorAll('h2, p'), {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    if (ctaBtn) {
        gsap.to(ctaBtn, {
            boxShadow: '0 0 30px 8px rgba(201,168,76,.35)',
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'sine.inOut'
        });

        gsap.from(ctaBtn, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: ctaBtn,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    /* ══════════════════════════════════════════
       10. INTRO + TIMELINE TEXT — FADE UP
       ══════════════════════════════════════════ */
    document.querySelectorAll('.timeline__intro p, .valori__header p').forEach(function (p) {
        gsap.from(p, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: p,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    document.querySelectorAll('.timeline__text').forEach(function (txt) {
        gsap.from(txt, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: txt,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

})();
