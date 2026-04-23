(function () {
    'use strict';

    /* -- NAV SCROLL -- */
    var nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            nav.classList.toggle('nav--scrolled', window.scrollY > 80);
        }, { passive: true });
    }

    /* -- BURGER + MOBILE MENU -- */
    var burger = document.getElementById('navBurger');
    var menu = document.getElementById('mobileMenu');
    if (burger && menu) {
        burger.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('mobile-menu--open');
            burger.classList.toggle('nav__burger--open');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                menu.classList.remove('mobile-menu--open');
                burger.classList.remove('nav__burger--open');
                burger.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    /* -- DROPDOWN SHOP (touch devices) -- */
    var dropdown = document.querySelector('.nav__dropdown');
    if (dropdown) {
        var cta = dropdown.querySelector('.nav__cta');
        if (cta && 'ontouchstart' in window) {
            cta.addEventListener('click', function (e) {
                if (!dropdown.classList.contains('nav__dropdown--open')) {
                    e.preventDefault();
                    dropdown.classList.add('nav__dropdown--open');
                }
            });
            document.addEventListener('click', function (e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('nav__dropdown--open');
                }
            });
        }
    }

    /* -- CHATBOT -- */
    var fab = document.getElementById('chatbotFab');
    var panel = document.getElementById('chatbotPanel');
    var close = document.getElementById('chatbotClose');
    var input = document.getElementById('chatbotInput');
    var send = document.getElementById('chatbotSend');
    var body = document.getElementById('chatbotBody');
    if (fab && panel) {
        fab.addEventListener('click', function () {
            var open = panel.classList.toggle('chatbot-panel--open');
            panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        });
        if (close) {
            close.addEventListener('click', function () {
                panel.classList.remove('chatbot-panel--open');
                panel.setAttribute('aria-hidden', 'true');
            });
        }
        function sendMsg() {
            if (!input || !body) return;
            var msg = input.value.trim();
            if (!msg) return;
            var u = document.createElement('p');
            u.style.cssText = 'color:#fff;margin-top:12px;font-size:.85rem';
            u.textContent = '> ' + msg;
            body.appendChild(u);
            var b = document.createElement('p');
            b.style.cssText = 'margin-top:8px;color:rgba(255,255,255,.55);font-size:.85rem';
            b.textContent = 'Grazie! Scrivici a info@oleificiocabriolu.it';
            body.appendChild(b);
            input.value = '';
            body.scrollTop = body.scrollHeight;
        }
        if (send) send.addEventListener('click', sendMsg);
        if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendMsg(); });
    }

})();
