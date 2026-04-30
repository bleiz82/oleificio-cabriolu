const fs = require('fs');
const path = require('path');

// ── HTML NAV + MOBILE MENU NUOVO ──
const NEW_NAV = `<!-- NAV -->
<nav id="nav" class="nav">
    <div class="nav__inner">
        <a href="/" class="nav__logo" aria-label="Oleificio Cabriolu">
            <img src="/img/oleificio_cabriolu_logo_500-403051a0.webp" alt="Oleificio Cabriolu" class="nav__logo-img">
        </a>
        <ul class="nav__links">
            <li><a href="/">Home</a></li>
            <li><a href="/storia">La Nostra Storia</a></li>
            <li><a href="/frangitura">Frangitura</a></li>
            <li><a href="/territorio">Territorio</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contatti">Contatti</a></li>
            <li class="nav__dropdown">
                <a href="/shop" class="nav__cta">Shop <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left:4px;vertical-align:middle"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                <ul class="nav__sub">
                    <li><a href="/shop/evo-puro">Extravergine Puro</a></li>
                    <li><a href="/shop/olio-peperoncino">Olio al Peperoncino</a></li>
                    <li><a href="/shop/olio-basilico">Olio al Basilico</a></li>
                    <li><a href="/shop/olio-limone">Olio al Limone</a></li>
                    <li><a href="/shop/latte">Latte Professionali</a></li>
                    <li><a href="/shop/cofanetto">Cofanetto Luxury</a></li>
                </ul>
            </li>
        </ul>
        <button class="nav__burger" id="navBurger" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
    </div>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/storia">La Nostra Storia</a></li>
        <li><a href="/frangitura">Frangitura</a></li>
        <li><a href="/territorio">Territorio</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contatti">Contatti</a></li>
        <li><a href="/shop">Shop</a></li>
        <li class="mobile-menu__divider"></li>
        <li><a href="/shop/evo-puro" class="mobile-menu__sub">Extravergine Puro</a></li>
        <li><a href="/shop/olio-peperoncino" class="mobile-menu__sub">Olio al Peperoncino</a></li>
        <li><a href="/shop/olio-basilico" class="mobile-menu__sub">Olio al Basilico</a></li>
        <li><a href="/shop/olio-limone" class="mobile-menu__sub">Olio al Limone</a></li>
        <li><a href="/shop/latte" class="mobile-menu__sub">Latte Professionali</a></li>
        <li><a href="/shop/cofanetto" class="mobile-menu__sub">Cofanetto Luxury</a></li>
    </ul>
</div>`;

// ── NUOVO common.js ──
const NEW_COMMON = `(function () {
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
`;

// ── NUOVO CSS NAV (da appendere a style.css dopo aver rimosso il vecchio) ──
const NEW_NAV_CSS = `
/* ===== NAV ===== */
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--nav-h);
    z-index: 100;
    display: flex;
    align-items: center;
    transition: background .4s, box-shadow .4s;
}

.nav--scrolled {
    background: rgba(10, 10, 10, .95);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 rgba(200, 169, 110, .1);
}

.nav__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav__logo {
    display: flex;
    flex-direction: column;
    line-height: 1;
}

.nav__logo-img {
    width: 160px;
    height: auto;
    display: block;
}

.nav__links {
    display: flex;
    gap: 32px;
    align-items: center;
}

.nav__links > li {
    position: relative;
}

.nav__links a {
    font-size: .85rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--cream-dim);
    transition: color .3s;
    position: relative;
}

.nav__links > li > a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--gold);
    transition: width .3s;
}

.nav__links > li > a:hover {
    color: var(--cream);
}

.nav__links > li > a:hover::after {
    width: 100%;
}

.nav__cta {
    border: 1px solid var(--gold);
    padding: 8px 20px !important;
    color: var(--gold) !important;
}

.nav__cta:hover {
    background: var(--gold);
    color: var(--black) !important;
}

.nav__cta::after {
    display: none !important;
}

/* -- DROPDOWN DESKTOP -- */
.nav__dropdown {
    position: relative;
}

.nav__sub {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    min-width: 220px;
    background: rgba(10, 10, 10, .97);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(200, 169, 110, .15);
    border-radius: 4px;
    padding: 12px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity .25s, transform .25s, visibility .25s;
    z-index: 110;
}

.nav__dropdown:hover .nav__sub,
.nav__dropdown.nav__dropdown--open .nav__sub {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.nav__sub li {
    padding: 0;
}

.nav__sub a {
    display: block;
    padding: 10px 24px;
    font-size: .8rem;
    letter-spacing: .5px;
    text-transform: none;
    color: var(--cream-dim);
    transition: background .2s, color .2s;
}

.nav__sub a::after {
    display: none;
}

.nav__sub a:hover {
    background: rgba(200, 169, 110, .1);
    color: var(--gold);
}

/* -- BURGER -- */
.nav__burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    width: 28px;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
}

.nav__burger span {
    display: block;
    height: 2px;
    background: var(--cream);
    transition: all .3s;
    transform-origin: center;
}

.nav__burger--open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav__burger--open span:nth-child(2) {
    opacity: 0;
}

.nav__burger--open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

/* -- MOBILE MENU -- */
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    background: rgba(10, 10, 10, .98);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity .4s;
    overflow-y: auto;
}

.mobile-menu--open {
    opacity: 1;
    pointer-events: auto;
}

.mobile-menu ul {
    text-align: center;
    padding: 80px 24px 40px;
}

.mobile-menu li {
    margin-bottom: 20px;
}

.mobile-menu a {
    font-family: var(--font-display);
    font-size: 2rem;
    color: var(--cream);
    letter-spacing: 2px;
    transition: color .3s;
}

.mobile-menu a:hover {
    color: var(--gold);
}

.mobile-menu__divider {
    width: 40px;
    height: 1px;
    background: rgba(200, 169, 110, .3);
    margin: 28px auto;
}

.mobile-menu__sub {
    font-size: 1.2rem !important;
    color: var(--cream-dim) !important;
    letter-spacing: 1px !important;
}

.mobile-menu__sub:hover {
    color: var(--gold) !important;
}

@media (max-width: 768px) {
    .nav__logo-img {
        width: 120px;
    }

    .nav__links {
        display: none;
    }

    .nav__burger {
        display: flex;
    }
}
`;

// ── FILES DA PROCESSARE ──
const PUBLIC = path.join(__dirname, 'public');

function findHtmlFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) {
            // skip node_modules, .git, img, fonts, css, js, video, frames
            if (['node_modules', '.git', 'img', 'fonts', 'css', 'js', 'video', 'frames'].includes(item.name)) continue;
            results = results.concat(findHtmlFiles(full));
        } else if (item.name.endsWith('.html')) {
            results.push(full);
        }
    }
    return results;
}

function replaceNav(html) {
    // Pattern: trova tutto da <!-- NAV --> o <!-- MOBILE MENU --> fino alla fine del mobile menu div
    // Strategia: trova il primo <nav e l'ultimo </div> del mobileMenu

    // Rimuovi blocco MOBILE MENU (potrebbe essere prima o dopo il NAV)
    // Rimuovi blocco NAV
    // Poi inserisci il nuovo prima del primo contenuto dopo il <body>

    let result = html;

    // Rimuovi qualsiasi <!-- MOBILE MENU --> ... </div> che contiene id="mobileMenu"
    result = result.replace(/[\t ]*<!-- MOBILE MENU -->[\s\S]*?<div[^>]*id="mobileMenu"[^>]*>[\s\S]*?<\/div>\s*/gi, '');

    // Rimuovi anche il formato senza commento: <div class="mobile-menu" id="mobileMenu"...>...</div>
    result = result.replace(/[\t ]*<div[^>]*class="mobile-menu"[^>]*id="mobileMenu"[^>]*[\s\S]*?<\/div>\s*(?=\n)/gi, '');
    // e il formato con id prima di class
    result = result.replace(/[\t ]*<div[^>]*id="mobileMenu"[^>]*class="mobile-menu"[^>]*[\s\S]*?<\/div>\s*/gi, '');

    // Rimuovi <!-- NAV --> ... </nav>
    result = result.replace(/[\t ]*<!-- NAV -->[\s\S]*?<\/nav>\s*/gi, '');

    // Rimuovi anche nav senza commento
    result = result.replace(/[\t ]*<nav[^>]*id="nav"[^>]*>[\s\S]*?<\/nav>\s*/gi, '');

    // Ora inserisci il nuovo nav dopo <body> (o dopo la prima riga dopo <body>)
    // Trova <body...>
    const bodyMatch = result.match(/<body[^>]*>/i);
    if (bodyMatch) {
        const bodyIdx = result.indexOf(bodyMatch[0]) + bodyMatch[0].length;
        // Inserisci dopo eventuali newline post-body
        let insertIdx = bodyIdx;
        while (result[insertIdx] === '\n' || result[insertIdx] === '\r') insertIdx++;
        result = result.slice(0, insertIdx) + '\n\n    ' + NEW_NAV + '\n\n' + result.slice(insertIdx);
    }

    return result;
}

function removeInlineBurger(html) {
    // Rimuovi: document.getElementById('navBurger').addEventListener('click', function () {
    //     document.getElementById('navLinks').classList.toggle('open');
    // });
    return html.replace(/\s*\/\/\s*burger[\s\S]*?document\.getElementById\(['"]navBurger['"]\)\.addEventListener\(['"]click['"][^}]*\{[^}]*\}\);?\s*/gi, '\n');
}

function removeInlineNavScroll(html) {
    // Rimuovi: // NAV scroll + il listener associato, SOLO se è dentro un <script> inline (non in file .js)
    // Questo è sicuro perché common.js ora gestisce il nav scroll
    return html.replace(/\s*\/\/\s*NAV scroll[\s\S]*?window\.addEventListener\(['"]scroll['"][^}]*\{[^}]*\}\);?\s*/gi, '\n');
}

// ── ESEGUI ──
console.log('=== FIX NAV — Oleificio Cabriolu ===\n');

// 1. Aggiorna common.js
const commonPath = path.join(PUBLIC, 'js', 'common.js');
fs.writeFileSync(commonPath, NEW_COMMON, 'utf8');
console.log('[OK] common.js riscritto');

// 2. Aggiorna style.css — rimuovi vecchio nav CSS e aggiungi nuovo
const cssPath = path.join(PUBLIC, 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Rimuovi vecchio blocco NAV (da /* NAV */ fino a .mobile-menu a:hover { ... })
// Cerchiamo il blocco che inizia con /* NAV */ e finisce prima del prossimo commento sezione
const navCssStart = css.indexOf('/* NAV */');
if (navCssStart === -1) {
    // Prova con ===== NAV =====
    const altStart = css.indexOf('/* ===== NAV ===== */');
    if (altStart !== -1) {
        // Già aggiornato? Rimuoviamo e rimettiamo
        const nextSection = css.indexOf('\n/*', altStart + 20);
        if (nextSection !== -1) {
            css = css.slice(0, altStart) + css.slice(nextSection);
        }
    }
} else {
    // Trova la fine del blocco nav — cerca il prossimo /* HERO */ o /* CANVAS */ o simile
    const possibleEnds = ['/* HERO */', '/* CANVAS */', '/* BUTTONS */', '/* PRODOTTI'];
    let navCssEnd = css.length;
    for (const marker of possibleEnds) {
        const idx = css.indexOf(marker);
        if (idx > navCssStart && idx < navCssEnd) {
            navCssEnd = idx;
        }
    }
    css = css.slice(0, navCssStart) + css.slice(navCssEnd);
}

// Rimuovi anche eventuali regole .mobile-menu sparse rimaste
// (non le tocchiamo se sono dentro il blocco che abbiamo appena rimosso)

// Inserisci nuovo CSS nav prima di /* HERO */ o /* CANVAS */ o all'inizio dei componenti
const heroMarker = css.indexOf('/* HERO */') !== -1 ? '/* HERO */' :
                    css.indexOf('/* CANVAS */') !== -1 ? '/* CANVAS */' : null;

if (heroMarker) {
    const insertPos = css.indexOf(heroMarker);
    css = css.slice(0, insertPos) + NEW_NAV_CSS + '\n\n' + css.slice(insertPos);
} else {
    // Appendi alla fine
    css += '\n' + NEW_NAV_CSS;
}

// Rimuovi vecchie regole mobile-menu responsive che potrebbero essere duplicate
// nel blocco @media(max-width:768px) — il nuovo CSS le include già
// Non facciamo nulla di aggressivo qui, le regole nuove hanno sufficiente specificità

fs.writeFileSync(cssPath, css, 'utf8');
console.log('[OK] style.css aggiornato');

// 3. Trova e aggiorna tutti gli HTML
const htmlFiles = findHtmlFiles(PUBLIC);
console.log(`\nTrovati ${htmlFiles.length} file HTML:\n`);

let updated = 0;
for (const file of htmlFiles) {
    const rel = path.relative(PUBLIC, file);
    let html = fs.readFileSync(file, 'utf8');
    const original = html;

    // Sostituisci nav
    html = replaceNav(html);

    // Rimuovi listener burger inline (storia)
    html = removeInlineBurger(html);

    // Rimuovi nav scroll inline (storia e altre pagine che lo hanno)
    html = removeInlineNavScroll(html);

    if (html !== original) {
        fs.writeFileSync(file, html, 'utf8');
        console.log(`  [AGGIORNATO] ${rel}`);
        updated++;
    } else {
        console.log(`  [INVARIATO]  ${rel}`);
    }
}

console.log(`\n=== FATTO! ${updated} file HTML aggiornati, common.js e style.css riscritti ===`);
console.log('Testa in locale, poi: git add . && git commit -m "nav unico + dropdown shop" && git push');
