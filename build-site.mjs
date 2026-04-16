import { writeFileSync, mkdirSync } from 'fs';
mkdirSync('public/css', { recursive: true });
mkdirSync('public/js', { recursive: true });

const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Olio Extravergine Sardo dal 1890 | Oleificio Cabriolu Villacidro</title>
<meta name="description" content="Olio extravergine d'oliva sardo dal 1890. Cultivar Bosana e Nera di Villacidro, frangitura a freddo entro 24h. 125 recensioni, 4.9 stelle. Spedizione gratuita sopra 45€.">
<link rel="canonical" href="https://www.oleificiocabriolu.it/">
<meta property="og:type" content="website">
<meta property="og:title" content="Oleificio Cabriolu — Olio EVO Sardo dal 1890">
<meta property="og:description" content="Cinque generazioni di passione. Cultivar autoctone, frangitura a freddo. 125 recensioni, 4.9 stelle.">
<meta property="og:image" content="https://www.oleificiocabriolu.it/img/hero/og-home.jpg">
<meta property="og:url" content="https://www.oleificiocabriolu.it/">
<meta property="og:locale" content="it_IT">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A0A0A">
<link rel="preload" href="/fonts/cormorant-garamond-v16-latin-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-v13-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/img/frames/desktop/frame_0001.webp" as="image">
<link rel="stylesheet" href="/css/style.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
{"@type":"LocalBusiness","@id":"https://www.oleificiocabriolu.it/#business","name":"Oleificio Cabriolu","image":"https://www.oleificiocabriolu.it/img/hero/og-home.jpg","telephone":"+39 070 0000000","email":"info@oleificiocabriolu.it","url":"https://www.oleificiocabriolu.it","address":{"@type":"PostalAddress","streetAddress":"Zona Industriale","addressLocality":"Villacidro","addressRegion":"SU","postalCode":"09039","addressCountry":"IT"},"geo":{"@type":"GeoCoordinates","latitude":39.4597,"longitude":8.7422},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"13:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"15:00","closes":"18:00"}],"foundingDate":"1890","founder":[{"@type":"Person","name":"Jessica Cabriolu"},{"@type":"Person","name":"Mattia Cabriolu"}],"priceRange":"€€","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"125","bestRating":"5"},"sameAs":["https://www.instagram.com/oleificiocabriolu/","https://www.facebook.com/oleificiocabriolu"]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Quali cultivar utilizza l'Oleificio Cabriolu?","acceptedAnswer":{"@type":"Answer","text":"Utilizziamo cultivar autoctone sarde: Bosana e Nera di Villacidro, coltivate nei nostri 25 ettari di uliveti ai piedi del Monte Linas."}},
{"@type":"Question","name":"Cosa significa frangitura a freddo?","acceptedAnswer":{"@type":"Answer","text":"La frangitura a freddo avviene a temperatura controllata sotto i 27°C entro 24 ore dalla raccolta, preservando polifenoli, antiossidanti e profilo aromatico."}},
{"@type":"Question","name":"Quanto costa la spedizione?","acceptedAnswer":{"@type":"Answer","text":"Gratuita sopra 45€. Sotto i 45€ costa 6,90€ in tutta Italia."}},
{"@type":"Question","name":"Offrite frangitura conto terzi?","acceptedAnswer":{"@type":"Answer","text":"Sì, il frantoio è aperto ai produttori locali per la frangitura conto terzi da ottobre a dicembre."}},
{"@type":"Question","name":"Come conservo l'olio extravergine?","acceptedAnswer":{"@type":"Answer","text":"In luogo fresco e buio, tra 14°C e 18°C. Una volta aperto, consumare entro 4-6 mesi."}},
{"@type":"Question","name":"Da quanto esiste l'Oleificio Cabriolu?","acceptedAnswer":{"@type":"Answer","text":"Dal 1890. Oggi alla quinta generazione con Jessica e Mattia Cabriolu."}}
]}
]}</script>
</head>
<body>

<!-- CANVAS SFONDO -->
<canvas id="bc" aria-hidden="true"></canvas>

<!-- NAV -->
<nav id="nav" class="nav">
<div class="nav__inner">
<a href="/" class="nav__logo" aria-label="Oleificio Cabriolu"><span class="nav__logo-text">CABRIOLU</span><span class="nav__logo-sub">dal 1890</span></a>
<ul class="nav__links">
<li><a href="#prodotti">Prodotti</a></li>
<li><a href="#storia">La Nostra Storia</a></li>
<li><a href="#frangitura">Frangitura</a></li>
<li><a href="#territorio">Territorio</a></li>
<li><a href="#faq">FAQ</a></li>
<li><a href="#contatti" class="nav__cta">Contatti</a></li>
</ul>
<button class="nav__burger" id="navBurger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
</div>
</nav>
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
<ul>
<li><a href="#prodotti">Prodotti</a></li>
<li><a href="#storia">La Nostra Storia</a></li>
<li><a href="#frangitura">Frangitura</a></li>
<li><a href="#territorio">Territorio</a></li>
<li><a href="#faq">FAQ</a></li>
<li><a href="#contatti">Contatti</a></li>
</ul>
</div>

<!-- ========== HERO (frame 1-120) ========== -->
<section id="hero" class="hero">
<div class="hero__content">
<h1 class="hero__title">
<span class="hero__line hero__line--gold">L'olio che cercavi</span>
<span class="hero__line">non viene dal supermercato</span>
</h1>
<p class="hero__sub">Extravergine sardo di cultivar Bosana e Nera di Villacidro, franto a freddo entro 24 ore dalla raccolta. Dal 1890, cinque generazioni di frantoiani.</p>
<div class="hero__actions">
<a href="#prodotti" class="btn btn--gold">Scopri i Nostri Oli</a>
<a href="#storia" class="btn btn--outline">La Nostra Storia</a>
</div>
<div class="hero__proof">
<div class="hero__stars">★★★★★</div>
<span>4.9/5 — 125 recensioni verificate</span>
</div>
</div>
<div class="hero__scroll"><span>Scorri per esplorare</span><div class="hero__scroll-bar"></div></div>
</section>

<!-- ========== PRODOTTI (frame 121-840) ========== -->
<section id="prodotti" class="prodotti">

<!-- SCENA A: EVO PURO (frame 121-240) — bottiglia finisce a DX, copy a SX -->
<div class="prodotti__scene" data-frame-start="121" data-frame-end="240" data-copy-side="left">
<div class="prodotti__copy">
<span class="prodotti__tag">Il Nostro Flagship</span>
<h2 class="prodotti__name">Extravergine Puro</h2>
<p class="prodotti__cultivar">Monocultivar Bosana &amp; Nera di Villacidro</p>
<p class="prodotti__desc">Fruttato medio-intenso con note di carciofo fresco, mandorla verde e pomodoro. Frangitura a freddo entro 24 ore dalla raccolta, ciclo continuo a due fasi. Un olio che racconta la Sardegna in ogni goccia.</p>
<p class="prodotti__formats">Disponibile in 0.25L · 0.50L · 0.75L</p>
<a href="/prodotti/evo-puro" class="btn btn--gold btn--sm">Scopri EVO Puro</a>
</div>
</div>

<!-- SCENA B: PEPERONCINO (frame 241-360) — bottiglia finisce a SX, copy a DX -->
<div class="prodotti__scene" data-frame-start="241" data-frame-end="360" data-copy-side="right">
<div class="prodotti__copy">
<span class="prodotti__tag">Aromatizzato</span>
<h2 class="prodotti__name">Olio al Peperoncino</h2>
<p class="prodotti__cultivar">Infuso con peperoncino sardo selezionato</p>
<p class="prodotti__desc">Piccantezza decisa ma equilibrata, su una base di extravergine Cabriolu. Ideale su bruschette, pasta aglio olio, pizza e grigliate. Il calore della Sardegna in un condimento.</p>
<p class="prodotti__formats">Disponibile in 0.25L</p>
<a href="/prodotti/olio-peperoncino" class="btn btn--gold btn--sm">Scopri Olio al Peperoncino</a>
</div>
</div>

<!-- SCENA C: BASILICO (frame 361-480) — bottiglia finisce a DX, copy a SX -->
<div class="prodotti__scene" data-frame-start="361" data-frame-end="480" data-copy-side="left">
<div class="prodotti__copy">
<span class="prodotti__tag">Aromatizzato</span>
<h2 class="prodotti__name">Olio al Basilico</h2>
<p class="prodotti__cultivar">Infuso con basilico fresco mediterraneo</p>
<p class="prodotti__desc">Freschezza verde e aromatica che trasforma insalate, caprese, pesce alla griglia e bruschette. L'essenza del Mediterraneo catturata nel nostro extravergine.</p>
<p class="prodotti__formats">Disponibile in 0.25L</p>
<a href="/prodotti/olio-basilico" class="btn btn--gold btn--sm">Scopri Olio al Basilico</a>
</div>
</div>

<!-- SCENA D: LIMONE (frame 481-600) — bottiglia finisce a SX, copy a DX -->
<div class="prodotti__scene" data-frame-start="481" data-frame-end="600" data-copy-side="right">
<div class="prodotti__copy">
<span class="prodotti__tag">Aromatizzato</span>
<h2 class="prodotti__name">Olio al Limone</h2>
<p class="prodotti__cultivar">Infuso con agrumi sardi selezionati</p>
<p class="prodotti__desc">Agrumato, luminoso e delicato. Sublime su crostacei, tartare di pesce, verdure al vapore e dolci. Un raggio di sole liquido che esalta ogni piatto.</p>
<p class="prodotti__formats">Disponibile in 0.25L</p>
<a href="/prodotti/olio-limone" class="btn btn--gold btn--sm">Scopri Olio al Limone</a>
</div>
</div>

<!-- SCENA E: LATTE (frame 601-720) — copy al centro -->
<div class="prodotti__scene" data-frame-start="601" data-frame-end="720" data-copy-side="center">
<div class="prodotti__copy">
<span class="prodotti__tag">Formati Famiglia</span>
<h2 class="prodotti__name">Latte Professionali</h2>
<p class="prodotti__cultivar">Lo stesso EVO Puro, nel formato che preferisci</p>
<p class="prodotti__desc">Per chi non vuole mai restare senza. La latta protegge l'olio dalla luce, preservando polifenoli e aromi più a lungo. Ideale per famiglie, ristoratori e chi usa l'olio ogni giorno.</p>
<p class="prodotti__formats">Disponibile in 3L · 5L</p>
<a href="/prodotti/latte" class="btn btn--gold btn--sm">Scopri le Latte</a>
</div>
</div>

<!-- SCENA G: COFANETTO (frame 721-840) — bottiglia finisce a DX, copy a SX -->
<div class="prodotti__scene" data-frame-start="721" data-frame-end="840" data-copy-side="left">
<div class="prodotti__copy">
<span class="prodotti__tag">Idea Regalo</span>
<h2 class="prodotti__name">Cofanetto Luxury</h2>
<p class="prodotti__cultivar">Quattro oli in un'elegante confezione regalo</p>
<p class="prodotti__desc">EVO Puro, Peperoncino, Basilico e Limone racchiusi in un cofanetto premium. Il regalo perfetto per chi ama la cucina, le feste, i compleanni o semplicemente il bello.</p>
<a href="/prodotti/cofanetto" class="btn btn--gold btn--sm">Scopri il Cofanetto</a>
</div>
</div>

</section>

<!-- ========== STORIA ========== -->
<section id="storia" class="section storia">
<div class="section__inner">
<p class="section__overtitle ani">Cinque Generazioni di Frantoiani</p>
<h2 class="section__title ani">La Nostra Storia</h2>
<div class="storia__timeline">
<div class="storia__line-track"><div class="storia__line-fill"></div></div>

<div class="storia__item ani">
<div class="storia__year-badge">1890</div>
<div class="storia__card">
<div class="storia__img"><picture><source srcset="/img/storia/storia-1890.avif" type="image/avif"><img src="/img/storia/storia-1890.webp" alt="Frantoio Cabriolu nel 1890" width="800" height="500" loading="lazy"></picture></div>
<div class="storia__text"><h3>La Fondazione</h3><p>Nonno Antoniccu Cabriolu pianta i primi ulivi nella campagna di Villacidro, ai piedi del Monte Linas. Nasce un frantoio a macine di granito che diventerà il cuore della famiglia per cinque generazioni.</p></div>
</div></div>

<div class="storia__item storia__item--reverse ani">
<div class="storia__year-badge">1940</div>
<div class="storia__card">
<div class="storia__img"><picture><source srcset="/img/storia/storia-1940.avif" type="image/avif"><img src="/img/storia/storia-1940.webp" alt="Oleificio Cabriolu anni 40" width="800" height="500" loading="lazy"></picture></div>
<div class="storia__text"><h3>La Tradizione Resiste</h3><p>Nonostante la guerra, la seconda generazione custodisce il frantoio e gli uliveti. L'olio Cabriolu diventa un riferimento per tutta la comunità di Villacidro e del Medio Campidano.</p></div>
</div></div>

<div class="storia__item ani">
<div class="storia__year-badge">1970</div>
<div class="storia__card">
<div class="storia__img"><picture><source srcset="/img/storia/storia-1970.avif" type="image/avif"><img src="/img/storia/storia-1970.webp" alt="Modernizzazione frantoio anni 70" width="800" height="500" loading="lazy"></picture></div>
<div class="storia__text"><h3>La Modernizzazione</h3><p>La terza generazione introduce il ciclo continuo a due fasi mantenendo la temperatura sotto i 27°C. La qualità sale, la produzione cresce, la tradizione resta intatta.</p></div>
</div></div>

<div class="storia__item storia__item--reverse ani">
<div class="storia__year-badge">Oggi</div>
<div class="storia__card">
<div class="storia__img"><picture><source srcset="/img/storia/storia-oggi.avif" type="image/avif"><img src="/img/storia/storia-oggi.webp" alt="Jessica e Mattia Cabriolu" width="800" height="500" loading="lazy"></picture></div>
<div class="storia__text"><h3>Jessica &amp; Mattia</h3><p>La quinta generazione porta l'Oleificio Cabriolu nel mondo. Stessa passione, stesse cultivar, stessa terra — ora accessibili in tutta Italia e in Europa con un click.</p></div>
</div></div>

</div></div></section>

<!-- ========== FRANGITURA ========== -->
<section id="frangitura" class="section frangitura">
<div class="frangitura__bg"><picture><source srcset="/img/frangitura/frangitura-azione.avif" type="image/avif"><img src="/img/frangitura/frangitura-azione.webp" alt="Frangitura a freddo Cabriolu" width="768" height="1376" loading="lazy"></picture></div>
<div class="frangitura__content">
<p class="section__overtitle ani">Il Processo</p>
<h2 class="section__title ani">Frangitura a Freddo</h2>
<p class="frangitura__lead ani">Dalla raccolta alla bottiglia in meno di 24 ore</p>
<p class="frangitura__desc ani">Le olive vengono raccolte a mano dai nostri 25 ettari di uliveti e frante entro 24 ore a temperatura controllata sotto i 27°C. Il ciclo continuo a due fasi preserva polifenoli, antiossidanti e l'intero profilo aromatico.</p>
<ul class="frangitura__list ani">
<li>Raccolta manuale entro 24 ore</li>
<li>Temperatura costante &lt; 27°C</li>
<li>Ciclo continuo a 2 fasi</li>
<li>Stoccaggio in acciaio inox sotto azoto</li>
</ul>
<a href="#faq" class="btn btn--gold ani">Domande sulla Frangitura?</a>
</div></section>

<!-- ========== TERRITORIO ========== -->
<section id="territorio" class="section territorio">
<div class="territorio__bg"><picture><source srcset="/img/storia/monte-linas-panorama.avif" type="image/avif"><img src="/img/storia/monte-linas-panorama.webp" alt="Monte Linas Villacidro" width="1584" height="672" loading="lazy"></picture></div>
<div class="section__inner">
<p class="section__overtitle ani">Villacidro, Sardegna</p>
<h2 class="section__title ani">Il Nostro Territorio</h2>
<div class="territorio__grid">
<div class="territorio__counter ani" data-target="1890" data-static="true"><span class="territorio__number">0000</span><span class="territorio__label">Anno di Fondazione</span></div>
<div class="territorio__counter ani" data-target="25" data-suffix="+"><span class="territorio__number">0</span><span class="territorio__label">Ettari di Uliveti</span></div>
<div class="territorio__counter ani" data-target="5000" data-suffix="+"><span class="territorio__number">0</span><span class="territorio__label">Alberi d'Olivo</span></div>
<div class="territorio__counter ani" data-target="5"><span class="territorio__number">0</span><span class="territorio__label">Generazioni</span></div>
</div></div></section>

<!-- ========== RIPROVA SOCIALE ========== -->
<section id="recensioni" class="section recensioni">
<div class="section__inner">
<p class="section__overtitle ani">125 Recensioni Verificate</p>
<h2 class="section__title ani">4.9 su 5 Stelle</h2>
<div class="recensioni__hero ani">
<div class="recensioni__big-stars">★★★★★</div>
<div class="recensioni__big-score">4.9<span>/5</span></div>
<p class="recensioni__count">Basato su <strong>125 recensioni</strong> verificate</p>
<div class="recensioni__bars">
<div class="recensioni__bar"><span>5★</span><div class="recensioni__bar-track"><div class="recensioni__bar-fill" data-width="89"></div></div><span>89%</span></div>
<div class="recensioni__bar"><span>4★</span><div class="recensioni__bar-track"><div class="recensioni__bar-fill" data-width="8"></div></div><span>8%</span></div>
<div class="recensioni__bar"><span>3★</span><div class="recensioni__bar-track"><div class="recensioni__bar-fill" data-width="2"></div></div><span>2%</span></div>
<div class="recensioni__bar"><span>2★</span><div class="recensioni__bar-track"><div class="recensioni__bar-fill" data-width="1"></div></div><span>1%</span></div>
<div class="recensioni__bar"><span>1★</span><div class="recensioni__bar-track"><div class="recensioni__bar-fill" data-width="0"></div></div><span>0%</span></div>
</div>
</div>
<div class="recensioni__grid">

<article class="recensioni__card ani">
<div class="recensioni__card-stars">★★★★★</div>
<blockquote>"Il miglior olio extravergine che abbia mai assaggiato. Si sente la Sardegna in ogni goccia. Fruttato intenso con note di carciofo incredibili. Non torno più al supermercato."</blockquote>
<div class="recensioni__author"><strong>Marco R.</strong><span>Chef — Milano</span><span class="recensioni__verified">✓ Acquisto verificato</span></div>
</article>

<article class="recensioni__card ani">
<div class="recensioni__card-stars">★★★★★</div>
<blockquote>"Ordinato il cofanetto per Natale. Packaging curatissimo, qualità superiore. I miei ospiti sono rimasti entusiasti. Ne ho già riordinati tre per i compleanni."</blockquote>
<div class="recensioni__author"><strong>Anna S.</strong><span>Food Blogger — Roma</span><span class="recensioni__verified">✓ Acquisto verificato</span></div>
</article>

<article class="recensioni__card ani">
<div class="recensioni__card-stars">★★★★★</div>
<blockquote>"Compro la latta da 5L ogni anno da tre anni. Con quest'olio anche un piatto semplice diventa speciale. Spedizione sempre velocissima e imballaggio perfetto."</blockquote>
<div class="recensioni__author"><strong>Giuseppe M.</strong><span>Cliente dal 2019 — Torino</span><span class="recensioni__verified">✓ Acquisto verificato</span></div>
</article>

<article class="recensioni__card ani">
<div class="recensioni__card-stars">★★★★★</div>
<blockquote>"L'olio al peperoncino è una bomba sulla pizza. Piccante ma non copre il sapore dell'olio. Qualità che si sente al primo assaggio. Consigliatissimo."</blockquote>
<div class="recensioni__author"><strong>Laura T.</strong><span>Pizzaiola — Napoli</span><span class="recensioni__verified">✓ Acquisto verificato</span></div>
</article>

<article class="recensioni__card ani">
<div class="recensioni__card-stars">★★★★★</div>
<blockquote>"Sono tedesca e ho scoperto Cabriolu durante una vacanza in Sardegna. Ora lo ordino regolarmente. È incomparabile con qualsiasi olio che trovo qui in Germania."</blockquote>
<div class="recensioni__author"><strong>Katharina W.</strong><span>Cliente — Berlino</span><span class="recensioni__verified">✓ Acquisto verificato</span></div>
</article>

<article class="recensioni__card ani">
<div class="recensioni__card-stars">★★★★★</div>
<blockquote>"Uso l'olio al limone sul pesce e le verdure. Delicato, mai troppo forte. Lo compro come regalo per amici e parenti — piace sempre a tutti."</blockquote>
<div class="recensioni__author"><strong>Francesca D.</strong><span>Insegnante — Cagliari</span><span class="recensioni__verified">✓ Acquisto verificato</span></div>
</article>

</div></div></section>

<!-- ========== FAQ ========== -->
<section id="faq" class="section faq">
<div class="section__inner">
<p class="section__overtitle ani">Domande Frequenti</p>
<h2 class="section__title ani">Tutto sull'Olio Cabriolu</h2>
<div class="faq__list">
<details class="faq__item ani"><summary>Quali cultivar utilizza l'Oleificio Cabriolu?</summary><p>Utilizziamo esclusivamente cultivar autoctone sarde: Bosana e Nera di Villacidro, coltivate nei nostri 25 ettari di uliveti ai piedi del Monte Linas. La Bosana dona un fruttato medio-intenso con note di carciofo e mandorla, la Nera di Villacidro aggiunge complessità con sentori di pomodoro verde ed erbe aromatiche.</p></details>
<details class="faq__item ani"><summary>Cosa significa frangitura a freddo?</summary><p>La frangitura a freddo avviene a temperatura controllata sotto i 27°C entro 24 ore dalla raccolta. Questo processo preserva i polifenoli, gli antiossidanti e il profilo aromatico dell'olio, garantendo qualità superiore rispetto alla frangitura industriale.</p></details>
<details class="faq__item ani"><summary>Quanto costa la spedizione?</summary><p>La spedizione è gratuita per ordini superiori a 45€. Per importi inferiori il costo è di 6,90€ per tutta Italia. Spediamo anche in Europa — contattaci per i costi internazionali.</p></details>
<details class="faq__item ani"><summary>Offrite frangitura conto terzi?</summary><p>Sì, il nostro frantoio è aperto ai produttori locali per la frangitura conto terzi durante la stagione di raccolta (ottobre-dicembre). Contattaci per prenotare il turno.</p></details>
<details class="faq__item ani"><summary>Come conservo l'olio extravergine?</summary><p>Conservalo in luogo fresco e buio, tra 14°C e 18°C, lontano da fonti di calore e luce diretta. Una volta aperto, consuma entro 4-6 mesi. Le nostre latte proteggono naturalmente dalla luce.</p></details>
<details class="faq__item ani"><summary>Da quanto esiste l'Oleificio Cabriolu?</summary><p>L'Oleificio Cabriolu è stato fondato nel 1890 a Villacidro da nonno Antoniccu. Oggi è alla quinta generazione con Jessica e Mattia Cabriolu.</p></details>
</div></div></section>

<!-- ========== BLOG ========== -->
<section id="blog" class="section blog">
<div class="section__inner">
<p class="section__overtitle ani">Dal Blog</p>
<h2 class="section__title ani">Storie dall'Uliveto</h2>
<div class="blog__grid">
<article class="blog__card ani"><div class="blog__badge">Guida</div><h3>Come Riconoscere un Olio EVO di Qualità</h3><p>Colore, profumo, sapore: i tre sensi per distinguere un extravergine autentico da un prodotto industriale.</p><a href="/blog/riconoscere-olio-evo-qualita" class="blog__link">Leggi l'articolo →</a></article>
<article class="blog__card ani"><div class="blog__badge">Processo</div><h3>Frangitura a Freddo: Cosa Significa Davvero</h3><p>Temperatura, tempistica, tecnologia. Tutto quello che c'è dietro un olio franto a freddo entro 24 ore.</p><a href="/blog/frangitura-a-freddo-significato" class="blog__link">Leggi l'articolo →</a></article>
<article class="blog__card ani"><div class="blog__badge">Territorio</div><h3>Cultivar Bosana: l'Oliva Regina della Sardegna</h3><p>Origini, caratteristiche organolettiche e perché la Bosana produce uno degli oli più premiati d'Italia.</p><a href="/blog/cultivar-bosana-sardegna" class="blog__link">Leggi l'articolo →</a></article>
</div></div></section>

<!-- ========== CTA FINALE (frame 841-960, bottiglia versa = sfondo) ========== -->
<section id="cta-final" class="section cta-final">
<div class="section__inner">
<h2 class="cta-final__title ani"><span class="cta-final__word">Porta</span> <span class="cta-final__word">la</span> <span class="cta-final__word">Sardegna</span> <span class="cta-final__word">a</span> <span class="cta-final__word cta-final__word--gold">Tavola</span></h2>
<p class="cta-final__sub ani">Spedizione gratuita per ordini sopra €45</p>
<a href="#prodotti" class="btn btn--gold btn--lg ani">Acquista Ora</a>
</div>
</section>

<!-- ========== FOOTER ========== -->
<footer id="contatti" class="footer">
<div class="footer__inner">
<div class="footer__brand">
<span class="footer__logo">CABRIOLU</span><span class="footer__logo-sub">dal 1890</span>
<p class="footer__tagline">Olio Extravergine d'Oliva Sardo — Villacidro, Sardegna</p>
<div class="footer__social">
<a href="https://www.instagram.com/oleificiocabriolu/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
<a href="https://www.facebook.com/oleificiocabriolu" target="_blank" rel="noopener" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
</div>
</div>
<div class="footer__nav"><h4>Navigazione</h4><ul><li><a href="#prodotti">Prodotti</a></li><li><a href="#storia">Storia</a></li><li><a href="#frangitura">Frangitura</a></li><li><a href="#territorio">Territorio</a></li><li><a href="#faq">FAQ</a></li><li><a href="#blog">Blog</a></li></ul></div>
<div class="footer__contact"><h4>Contatti</h4><address><p>Zona Industriale<br>09039 Villacidro (SU)<br>Sardegna, Italia</p><p><a href="tel:+390700000000">+39 070 000 0000</a></p><p><a href="mailto:info@oleificiocabriolu.it">info@oleificiocabriolu.it</a></p></address><h4>Orari</h4><p>Lun — Ven: 08:00 — 13:00 / 15:00 — 18:00</p></div>
<div class="footer__info"><h4>Punto Vendita</h4><p>Visita il nostro frantoio a Villacidro per acquistare direttamente e degustare i nostri oli. Frangitura conto terzi disponibile da ottobre a dicembre.</p></div>
</div>
<div class="footer__bottom">
<p>&copy; 2026 Oleificio Cabriolu — Tutti i diritti riservati</p>
<div class="footer__legal"><a href="/privacy">Privacy</a><a href="/cookie">Cookie</a><a href="/termini">Termini</a></div>
<p class="footer__credit">by <a href="https://www.digidentityagency.com" target="_blank" rel="noopener">DigIdentity Agency</a></p>
</div>
</footer>

<!-- COOKIE -->
<div class="cookie-banner" id="cookieBanner"><p>Utilizziamo cookie tecnici e analitici. <a href="/cookie">Scopri di più</a></p><div class="cookie-banner__actions"><button class="btn btn--gold btn--sm" id="cookieAccept">Accetta</button><button class="btn btn--outline btn--sm" id="cookieReject">Rifiuta</button></div></div>

<!-- CHATBOT FAB -->
<button class="chatbot-fab" id="chatbotFab" aria-label="Assistente virtuale"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg></button>
<div class="chatbot-panel" id="chatbotPanel" aria-hidden="true">
<div class="chatbot-panel__header"><span>Assistente Cabriolu</span><button id="chatbotClose">✕</button></div>
<div class="chatbot-panel__body" id="chatbotBody"><p class="chatbot-panel__welcome">Ciao! Chiedimi tutto sui nostri oli, spedizioni, o prenota una visita al frantoio.</p></div>
<div class="chatbot-panel__input"><input type="text" id="chatbotInput" placeholder="Scrivi un messaggio..." aria-label="Messaggio"><button id="chatbotSend">→</button></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer><\/script>
<script src="/js/main.js" defer><\/script>
</body>
</html>`;

writeFileSync('public/index.html', html, 'utf8');
console.log('✅ public/index.html — ' + (html.length/1024).toFixed(1) + ' KB');
// =====================================================
// STYLE.CSS
// =====================================================
const css = `
@font-face{font-family:'Cormorant Garamond';font-style:normal;font-weight:700;font-display:swap;src:url('/fonts/cormorant-garamond-v16-latin-700.woff2') format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:url('/fonts/inter-v13-latin-regular.woff2') format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-weight:300;font-display:swap;src:url('/fonts/inter-v13-latin-300.woff2') format('woff2')}

:root{
--black:#0A0A0A;--dark:#111;--green:#1A2A1A;--green-light:#2D3B2D;
--gold:#C8A96E;--gold-light:#D4B97A;--cream:#FAF6F0;--cream-dim:rgba(250,246,240,.7);
--font-display:'Cormorant Garamond',Georgia,serif;
--font-body:'Inter',system-ui,sans-serif;
--nav-h:70px;--ease:cubic-bezier(.22,1,.36,1);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:auto;overflow-x:hidden}
body{font-family:var(--font-body);font-weight:400;color:var(--cream);background:var(--black);line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased}
img,video{display:block;max-width:100%;height:auto}
a{color:inherit;text-decoration:none}
ul,ol{list-style:none}
button{cursor:pointer;border:none;background:none;font:inherit;color:inherit}
address{font-style:normal}

/* CANVAS */
#bc{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none}

/* BUTTONS */
.btn{display:inline-block;padding:14px 32px;border-radius:0;font-family:var(--font-body);font-weight:400;font-size:.9rem;letter-spacing:1.5px;text-transform:uppercase;transition:all .35s var(--ease);text-align:center}
.btn--gold{background:var(--gold);color:var(--black)}
.btn--gold:hover{background:var(--gold-light);transform:translateY(-2px)}
.btn--outline{border:1px solid var(--gold);color:var(--gold);background:transparent}
.btn--outline:hover{background:var(--gold);color:var(--black)}
.btn--sm{padding:10px 24px;font-size:.8rem}
.btn--lg{padding:18px 48px;font-size:1rem}

/* NAV */
.nav{position:fixed;top:0;left:0;width:100%;height:var(--nav-h);z-index:100;display:flex;align-items:center;transition:background .4s,box-shadow .4s}
.nav--scrolled{background:rgba(10,10,10,.92);backdrop-filter:blur(12px);box-shadow:0 1px 0 rgba(200,169,110,.1)}
.nav__inner{max-width:1200px;margin:0 auto;padding:0 24px;width:100%;display:flex;align-items:center;justify-content:space-between}
.nav__logo{display:flex;flex-direction:column;line-height:1}
.nav__logo-text{font-family:var(--font-display);font-weight:700;font-size:1.5rem;color:var(--gold);letter-spacing:3px}
.nav__logo-sub{font-family:var(--font-body);font-weight:300;font-size:.65rem;letter-spacing:4px;color:var(--cream-dim);text-transform:uppercase}
.nav__links{display:flex;gap:32px;align-items:center}
.nav__links a{font-size:.85rem;letter-spacing:1px;text-transform:uppercase;color:var(--cream-dim);transition:color .3s;position:relative}
.nav__links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--gold);transition:width .3s}
.nav__links a:hover{color:var(--cream)}
.nav__links a:hover::after{width:100%}
.nav__cta{border:1px solid var(--gold);padding:8px 20px !important;color:var(--gold) !important}
.nav__cta:hover{background:var(--gold);color:var(--black) !important}
.nav__burger{display:none;flex-direction:column;gap:5px;width:28px}
.nav__burger span{display:block;height:2px;background:var(--cream);transition:all .3s;transform-origin:center}
.nav__burger--open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.nav__burger--open span:nth-child(2){opacity:0}
.nav__burger--open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
.mobile-menu{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(10,10,10,.97);z-index:99;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .4s}
.mobile-menu--open{opacity:1;pointer-events:auto}
.mobile-menu a{font-family:var(--font-display);font-size:2rem;color:var(--cream);letter-spacing:2px}
.mobile-menu li{margin-bottom:24px;text-align:center}
.mobile-menu a:hover{color:var(--gold)}

/* HERO */
.hero{position:relative;z-index:2;min-height:300vh;display:flex;flex-direction:column;justify-content:center;align-items:center}
.hero__content{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 24px;max-width:800px;margin:0 auto;z-index:2}
.hero__title{font-family:var(--font-display);font-weight:700;font-size:clamp(2.2rem,6vw,4.5rem);line-height:1.12;margin-bottom:24px}
.hero__line{display:block;opacity:0;transform:translateY(40px)}
.hero__line--gold{color:var(--gold)}
.hero__sub{font-size:1.05rem;color:var(--cream-dim);max-width:560px;line-height:1.7;margin-bottom:32px;opacity:0;transform:translateY(20px)}
.hero__actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;opacity:0;transform:translateY(20px)}
.hero__proof{display:flex;align-items:center;gap:12px;margin-top:28px;opacity:0;transform:translateY(20px)}
.hero__stars{color:var(--gold);font-size:1.1rem;letter-spacing:2px}
.hero__proof span{font-size:.85rem;color:var(--cream-dim)}
.hero__scroll{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;z-index:10;opacity:0}
.hero__scroll span{font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--cream-dim)}
.hero__scroll-bar{width:1px;height:40px;background:var(--gold);animation:scrollPulse 2s ease infinite}
@keyframes scrollPulse{0%,100%{opacity:.3;transform:scaleY(.6)}50%{opacity:1;transform:scaleY(1)}}

/* PRODOTTI SCENES */
.prodotti{position:relative;z-index:2}
.prodotti__scene{min-height:300vh;position:relative}
.prodotti__copy{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;padding:0 5vw;max-width:480px;z-index:3;opacity:0}
.prodotti__scene[data-copy-side="left"] .prodotti__copy{margin-right:auto}
.prodotti__scene[data-copy-side="right"] .prodotti__copy{margin-left:auto}
.prodotti__scene[data-copy-side="center"] .prodotti__copy{margin:0 auto;text-align:center;align-items:center}
.prodotti__tag{display:inline-block;font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);border:1px solid var(--gold);padding:4px 14px;margin-bottom:16px;align-self:flex-start}
.prodotti__scene[data-copy-side="center"] .prodotti__tag{align-self:center}
.prodotti__name{font-family:var(--font-display);font-weight:700;font-size:clamp(1.8rem,4vw,3rem);color:var(--cream);margin-bottom:8px;line-height:1.15}
.prodotti__cultivar{font-size:.85rem;color:var(--gold);margin-bottom:16px;font-style:italic}
.prodotti__desc{font-size:.95rem;color:var(--cream-dim);line-height:1.8;margin-bottom:20px}
.prodotti__formats{font-size:.8rem;color:var(--cream-dim);letter-spacing:1px;margin-bottom:24px}

/* SECTION GENERIC */
.section{position:relative;z-index:2;padding:120px 0}
.section__inner{max-width:1200px;margin:0 auto;padding:0 24px;width:100%}
.section__overtitle{font-weight:300;font-size:.875rem;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
.section__title{font-family:var(--font-display);font-weight:700;font-size:clamp(2rem,5vw,3.5rem);color:var(--cream);margin-bottom:48px;line-height:1.15}

/* STORIA */
.storia{background:rgba(26,42,26,.88)}
.storia__timeline{position:relative;max-width:900px;margin:0 auto}
.storia__line-track{position:absolute;left:50%;top:0;bottom:0;width:2px;background:rgba(200,169,110,.15);transform:translateX(-50%)}
.storia__line-fill{width:100%;height:0%;background:var(--gold);transition:none}
.storia__item{display:flex;gap:40px;margin-bottom:80px;position:relative;align-items:center}
.storia__item:last-child{margin-bottom:0}
.storia__item--reverse{flex-direction:row-reverse}
.storia__year-badge{position:absolute;left:50%;transform:translateX(-50%);width:64px;height:64px;border-radius:50%;background:var(--black);border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:.85rem;color:var(--gold);z-index:2}
.storia__card{display:flex;gap:32px;width:calc(50% - 52px);align-items:center}
.storia__item:not(.storia__item--reverse) .storia__card{margin-right:auto}
.storia__item--reverse .storia__card{margin-left:auto}
.storia__img{flex:0 0 45%;border-radius:4px;overflow:hidden}
.storia__img img{width:100%;transition:transform .6s var(--ease)}
.storia__img:hover img{transform:scale(1.04)}
.storia__text{flex:1}
.storia__text h3{font-family:var(--font-display);font-size:1.5rem;color:var(--cream);margin-bottom:10px}
.storia__text p{font-size:.9rem;color:var(--cream-dim);line-height:1.7}

/* FRANGITURA */
.frangitura{display:flex;min-height:100vh;align-items:center;background:var(--black);overflow:hidden}
.frangitura__bg{flex:0 0 50%;height:100vh;position:relative;overflow:hidden}
.frangitura__bg img{width:100%;height:100%;object-fit:cover}
.frangitura__content{flex:1;padding:60px 60px 60px 80px}
.frangitura__lead{font-family:var(--font-display);font-size:1.3rem;color:var(--gold);margin-bottom:20px}
.frangitura__desc{font-size:1rem;color:var(--cream-dim);line-height:1.8;margin-bottom:28px;max-width:500px}
.frangitura__list{margin-bottom:32px}
.frangitura__list li{font-size:.95rem;color:var(--cream-dim);padding:8px 0 8px 24px;position:relative}
.frangitura__list li::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:8px;height:8px;border-radius:50%;background:var(--gold)}

/* TERRITORIO */
.territorio{position:relative;min-height:80vh;display:flex;align-items:center;overflow:hidden}
.territorio__bg{position:absolute;inset:0;z-index:-1}
.territorio__bg img{width:100%;height:100%;object-fit:cover;opacity:.25}
.territorio__bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,var(--black) 0%,transparent 30%,transparent 70%,var(--black) 100%)}
.territorio__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;text-align:center;margin-top:40px}
.territorio__counter{padding:32px 16px}
.territorio__number{display:block;font-family:var(--font-display);font-size:clamp(2.5rem,5vw,3.5rem);color:var(--gold);margin-bottom:8px}
.territorio__label{font-size:.85rem;color:var(--cream-dim);letter-spacing:1px;text-transform:uppercase}

/* RECENSIONI */
.recensioni{background:rgba(26,42,26,.88)}
.recensioni__hero{text-align:center;margin-bottom:60px;padding:48px 32px;background:rgba(10,10,10,.4);border:1px solid rgba(200,169,110,.12);border-radius:8px}
.recensioni__big-stars{font-size:2.5rem;color:var(--gold);letter-spacing:6px;margin-bottom:8px}
.recensioni__big-score{font-family:var(--font-display);font-size:4rem;color:var(--cream);line-height:1}
.recensioni__big-score span{font-size:1.5rem;color:var(--cream-dim)}
.recensioni__count{font-size:.95rem;color:var(--cream-dim);margin:16px 0 28px}
.recensioni__bars{max-width:360px;margin:0 auto}
.recensioni__bar{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:.8rem;color:var(--cream-dim)}
.recensioni__bar-track{flex:1;height:6px;background:rgba(200,169,110,.1);border-radius:3px;overflow:hidden}
.recensioni__bar-fill{height:100%;background:var(--gold);border-radius:3px;width:0%;transition:width 1.2s var(--ease)}
.recensioni__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.recensioni__card{background:rgba(10,10,10,.5);border:1px solid rgba(200,169,110,.1);padding:32px 28px;border-radius:6px;transition:all .4s var(--ease);transform-origin:center bottom}
.recensioni__card:hover{border-color:var(--gold);transform:translateY(-4px)}
.recensioni__card-stars{color:var(--gold);font-size:1rem;letter-spacing:2px;margin-bottom:16px}
.recensioni__card blockquote{font-size:.9rem;color:var(--cream-dim);line-height:1.7;margin-bottom:20px;font-style:italic}
.recensioni__author{display:flex;flex-direction:column;gap:2px}
.recensioni__author strong{font-family:var(--font-display);font-size:1.05rem;color:var(--cream)}
.recensioni__author span{font-size:.8rem;color:var(--cream-dim)}
.recensioni__verified{color:var(--gold) !important;font-size:.75rem !important}

/* FAQ */
.faq{background:rgba(10,10,10,.92)}
.faq__list{max-width:800px;margin:0 auto}
.faq__item{border-bottom:1px solid rgba(200,169,110,.15)}
.faq__item summary{padding:24px 0;font-family:var(--font-display);font-size:1.2rem;color:var(--cream);cursor:pointer;display:flex;justify-content:space-between;align-items:center;list-style:none}
.faq__item summary::-webkit-details-marker{display:none}
.faq__item summary::after{content:'+';font-size:1.5rem;color:var(--gold);transition:transform .3s}
.faq__item[open] summary::after{transform:rotate(45deg)}
.faq__item p{padding:0 0 24px;font-size:.95rem;color:var(--cream-dim);line-height:1.7}

/* BLOG */
.blog{background:rgba(26,42,26,.88)}
.blog__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px}
.blog__card{background:rgba(10,10,10,.5);border:1px solid rgba(200,169,110,.1);padding:40px 32px;border-radius:4px;transition:all .35s var(--ease)}
.blog__card:hover{border-color:var(--gold);transform:translateY(-4px)}
.blog__badge{display:inline-block;font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);border:1px solid var(--gold);padding:3px 10px;margin-bottom:16px}
.blog__card h3{font-family:var(--font-display);font-size:1.3rem;color:var(--cream);margin-bottom:12px;line-height:1.3}
.blog__card p{font-size:.9rem;color:var(--cream-dim);line-height:1.6;margin-bottom:20px}
.blog__link{font-size:.85rem;color:var(--gold);letter-spacing:1px}

/* CTA FINALE */
.cta-final{min-height:60vh;display:flex;align-items:center;justify-content:center;text-align:center;background:transparent}
.cta-final__title{font-family:var(--font-display);font-weight:700;font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.15;margin-bottom:24px;color:var(--cream)}
.cta-final__word{display:inline-block;opacity:0;transform:translateY(30px)}
.cta-final__word--gold{color:var(--gold)}
.cta-final__sub{font-size:1.05rem;color:var(--cream-dim);margin-bottom:32px}

/* FOOTER */
.footer{position:relative;z-index:2;background:rgba(10,10,10,.95);border-top:1px solid rgba(200,169,110,.15);padding:80px 0 0}
.footer__inner{max-width:1200px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px}
.footer__logo{font-family:var(--font-display);font-weight:700;font-size:1.8rem;color:var(--gold);letter-spacing:3px;display:block}
.footer__logo-sub{font-size:.7rem;letter-spacing:4px;color:var(--cream-dim);text-transform:uppercase;display:block;margin-bottom:16px}
.footer__tagline{font-size:.9rem;color:var(--cream-dim);line-height:1.6;margin-bottom:20px}
.footer__social{display:flex;gap:16px}
.footer__social a{color:var(--cream-dim);transition:color .3s}
.footer__social a:hover{color:var(--gold)}
.footer__nav h4,.footer__contact h4,.footer__info h4{font-family:var(--font-display);font-size:1.1rem;color:var(--gold);margin-bottom:16px}
.footer__nav li{margin-bottom:10px}
.footer__nav a,.footer__contact p,.footer__contact a,.footer__info p{font-size:.9rem;color:var(--cream-dim);line-height:1.6}
.footer__contact a:hover,.footer__nav a:hover{color:var(--gold)}
.footer__bottom{max-width:1200px;margin:60px auto 0;padding:24px;border-top:1px solid rgba(200,169,110,.1);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
.footer__bottom p{font-size:.8rem;color:var(--cream-dim)}
.footer__legal{display:flex;gap:20px}
.footer__legal a{font-size:.8rem;color:var(--cream-dim)}
.footer__legal a:hover{color:var(--cream)}
.footer__credit a{color:var(--gold)}

/* COOKIE */
.cookie-banner{position:fixed;bottom:0;left:0;width:100%;background:rgba(17,17,17,.97);border-top:1px solid rgba(200,169,110,.15);padding:20px 24px;z-index:200;display:flex;align-items:center;justify-content:space-between;gap:24px;transform:translateY(100%);transition:transform .4s var(--ease)}
.cookie-banner--visible{transform:translateY(0)}
.cookie-banner p{font-size:.85rem;color:var(--cream-dim);flex:1}
.cookie-banner a{color:var(--gold)}
.cookie-banner__actions{display:flex;gap:12px}

/* CHATBOT */
.chatbot-fab{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:var(--gold);color:var(--black);display:flex;align-items:center;justify-content:center;z-index:150;box-shadow:0 4px 20px rgba(200,169,110,.3);transition:transform .3s,box-shadow .3s}
.chatbot-fab:hover{transform:scale(1.08)}
.chatbot-panel{position:fixed;bottom:92px;right:24px;width:360px;max-height:500px;background:var(--dark);border:1px solid rgba(200,169,110,.2);border-radius:8px;z-index:150;display:flex;flex-direction:column;opacity:0;pointer-events:none;transform:translateY(16px);transition:all .3s var(--ease)}
.chatbot-panel--open{opacity:1;pointer-events:auto;transform:translateY(0)}
.chatbot-panel__header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid rgba(200,169,110,.15)}
.chatbot-panel__header span{font-family:var(--font-display);font-size:1.1rem;color:var(--gold)}
.chatbot-panel__body{flex:1;padding:20px;overflow-y:auto;min-height:280px}
.chatbot-panel__welcome{font-size:.9rem;color:var(--cream-dim);line-height:1.6;background:rgba(200,169,110,.08);padding:14px 16px;border-radius:8px}
.chatbot-panel__input{display:flex;border-top:1px solid rgba(200,169,110,.15);padding:12px 16px;gap:10px}
.chatbot-panel__input input{flex:1;background:transparent;border:1px solid rgba(200,169,110,.2);padding:10px 14px;border-radius:4px;color:var(--cream);font-size:.9rem}
.chatbot-panel__input input::placeholder{color:var(--cream-dim)}
.chatbot-panel__input input:focus{outline:none;border-color:var(--gold)}
.chatbot-panel__input button{color:var(--gold);font-size:1.3rem}

/* GSAP STATES */
.ani{opacity:0;transform:translateY(30px)}

/* RESPONSIVE */
@media(max-width:1024px){
.storia__item,.storia__item--reverse{flex-direction:column;align-items:flex-start}
.storia__card{width:100%;flex-direction:column}
.storia__year-badge{position:relative;left:auto;transform:none;margin-bottom:16px}
.storia__line-track{display:none}
.frangitura{flex-direction:column}
.frangitura__bg{flex:none;width:100%;height:50vh}
.frangitura__content{padding:40px 24px}
.footer__inner{grid-template-columns:1fr 1fr}
.recensioni__grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
.nav__links{display:none}
.nav__burger{display:flex}
.prodotti__copy{max-width:100%;padding:0 20px}
.prodotti__scene[data-copy-side="left"] .prodotti__copy,
.prodotti__scene[data-copy-side="right"] .prodotti__copy{margin:0 auto;text-align:center;align-items:center}
.prodotti__tag{align-self:center}
.territorio__grid{grid-template-columns:repeat(2,1fr);gap:24px}
.recensioni__grid{grid-template-columns:1fr}
.blog__grid{grid-template-columns:1fr}
.footer__inner{grid-template-columns:1fr}
.footer__bottom{flex-direction:column;text-align:center}
.footer__legal{justify-content:center}
.chatbot-panel{width:calc(100% - 48px);right:24px}
.cookie-banner{flex-direction:column;text-align:center}
}
@media(prefers-reduced-motion:reduce){
*,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important}
}
`;

writeFileSync('public/css/style.css', css, 'utf8');
console.log('✅ public/css/style.css — ' + (css.length/1024).toFixed(1) + ' KB');
// =====================================================
// MAIN.JS
// =====================================================
const js = `
(function(){
'use strict';

/* ── COSTANTI ── */
const TOTAL_FRAMES = 960;
const DESKTOP_PATH = '/img/frames/desktop/frame_';
const MOBILE_PATH  = '/img/frames/mobile/frame_';
const EXT = '.webp';
const IS_MOBILE = window.innerWidth < 768;
const BASE_PATH = IS_MOBILE ? MOBILE_PATH : DESKTOP_PATH;

/* ── CANVAS ── */
const canvas = document.getElementById('bc');
const ctx = canvas.getContext('2d');
const frames = [];
let loadedCount = 0;
let currentFrame = 0;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawFrame(currentFrame);
}

function drawFrame(idx){
  if(!frames[idx] || !frames[idx].complete) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const img = frames[idx];
  const cW = canvas.width, cH = canvas.height;
  const iR = img.naturalWidth / img.naturalHeight;
  const cR = cW / cH;
  let dW, dH, dX, dY;
  if(cR > iR){ dW = cW; dH = cW / iR; } else { dH = cH; dW = cH * iR; }
  dX = (cW - dW) / 2;
  dY = (cH - dH) / 2;
  ctx.drawImage(img, dX, dY, dW, dH);
}

function preloadFrames(){
  const promises = [];
  for(let i = 1; i <= TOTAL_FRAMES; i++){
    const img = new Image();
    const idx = i - 1;
    const p = new Promise((resolve) => {
      img.onload = () => { loadedCount++; resolve(); };
      img.onerror = () => { loadedCount++; resolve(); };
    });
    img.src = BASE_PATH + String(i).padStart(4,'0') + EXT;
    frames[idx] = img;
    promises.push(p);
  }
  /* Primo frame subito */
  const first = new Image();
  first.onload = () => { frames[0] = first; drawFrame(0); };
  first.src = BASE_PATH + '0001' + EXT;
  return Promise.all(promises);
}

/* ── GSAP SETUP ── */
function initGSAP(){
  gsap.registerPlugin(ScrollTrigger);

  /* scroll totale del sito = 960 frame */
  /* il body scroll totale guida il canvas */
  const allSections = document.querySelectorAll('.hero, .prodotti__scene, .cta-final');
  let totalScrollHeight = 0;
  allSections.forEach(s => { totalScrollHeight += s.scrollHeight; });

  /* MASTER CANVAS SCRUB */
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => {
      const rawFrame = Math.floor(self.progress * (TOTAL_FRAMES - 1));
      if(rawFrame !== currentFrame){
        currentFrame = rawFrame;
        drawFrame(currentFrame);
      }
    }
  });

  /* HERO TEXT */
  const heroTL = gsap.timeline({
    scrollTrigger:{
      trigger:'.hero',
      start:'top top',
      end:'60% top',
      scrub:1
    }
  });
  heroTL
    .to('.hero__line', { opacity:1, y:0, stagger:0.15, duration:1 })
    .to('.hero__sub', { opacity:1, y:0, duration:0.8 }, '-=0.5')
    .to('.hero__actions', { opacity:1, y:0, duration:0.6 }, '-=0.4')
    .to('.hero__proof', { opacity:1, y:0, duration:0.5 }, '-=0.3');

  /* HERO SCROLL INDICATOR */
  gsap.to('.hero__scroll', { opacity:1, duration:1, delay:1.5 });
  gsap.to('.hero__scroll', {
    opacity:0,
    scrollTrigger:{ trigger:'.hero', start:'20% top', end:'25% top', scrub:true }
  });

  /* PRODOTTI COPY — appare/scompare per ogni scena */
  document.querySelectorAll('.prodotti__scene').forEach(scene => {
    const copy = scene.querySelector('.prodotti__copy');
    gsap.timeline({
      scrollTrigger:{
        trigger: scene,
        start: '20% bottom',
        end: '80% top',
        scrub: 1
      }
    })
    .fromTo(copy,
      { opacity:0, x: scene.dataset.copySide === 'right' ? 60 : scene.dataset.copySide === 'left' ? -60 : 0, y:20 },
      { opacity:1, x:0, y:0, duration:1 }
    )
    .to(copy, { opacity:0, y:-30, duration:0.5 }, '+=0.3');
  });

  /* NAV SCROLL */
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 80,
    onUpdate: self => {
      nav.classList.toggle('nav--scrolled', self.direction === 1 || window.scrollY > 80);
    }
  });

  /* GENERIC ANIMATIONS (.ani) */
  document.querySelectorAll('.ani').forEach(el => {
    gsap.to(el, {
      opacity:1, y:0,
      duration:0.8,
      ease:'power2.out',
      scrollTrigger:{
        trigger:el,
        start:'top 85%',
        toggleActions:'play none none reverse'
      }
    });
  });

  /* STORIA TIMELINE LINE FILL */
  const storiaFill = document.querySelector('.storia__line-fill');
  if(storiaFill){
    gsap.to(storiaFill, {
      height:'100%',
      ease:'none',
      scrollTrigger:{
        trigger:'.storia__timeline',
        start:'top 80%',
        end:'bottom 20%',
        scrub:true
      }
    });
  }

  /* STORIA CARDS — slide in from alternating sides */
  document.querySelectorAll('.storia__item').forEach((item, i) => {
    const fromX = item.classList.contains('storia__item--reverse') ? 80 : -80;
    gsap.from(item.querySelector('.storia__card'), {
      x: fromX, opacity:0, duration:1, ease:'power3.out',
      scrollTrigger:{
        trigger:item,
        start:'top 80%',
        toggleActions:'play none none reverse'
      }
    });
    gsap.from(item.querySelector('.storia__year-badge'), {
      scale:0, opacity:0, duration:0.6, ease:'back.out(2)',
      scrollTrigger:{
        trigger:item,
        start:'top 75%',
        toggleActions:'play none none reverse'
      }
    });
  });

  /* FRANGITURA PARALLAX */
  const frangImg = document.querySelector('.frangitura__bg img');
  if(frangImg){
    gsap.to(frangImg, {
      yPercent:-15,
      scrollTrigger:{
        trigger:'.frangitura',
        start:'top bottom',
        end:'bottom top',
        scrub:true
      }
    });
  }

  /* TERRITORIO COUNTERS */
  document.querySelectorAll('.territorio__counter').forEach(counter => {
    const numEl = counter.querySelector('.territorio__number');
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const isStatic = counter.dataset.static === 'true';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        if(isStatic){
          numEl.textContent = target;
          return;
        }
        gsap.to({ val:0 }, {
          val: target,
          duration: 2,
          ease:'power2.out',
          onUpdate: function(){
            numEl.textContent = Math.floor(this.targets()[0].val) + suffix;
          }
        });
      },
      once: true
    });
  });

  /* RECENSIONI BARS */
  document.querySelectorAll('.recensioni__bar-fill').forEach(bar => {
    const w = bar.dataset.width;
    gsap.to(bar, {
      width: w + '%',
      duration:1.2,
      ease:'power2.out',
      scrollTrigger:{
        trigger:bar,
        start:'top 90%',
        once:true
      }
    });
  });

  /* RECENSIONI CARDS — stagger reveal */
  gsap.from('.recensioni__card', {
    y:40, opacity:0, rotateX:8, stagger:0.12, duration:0.7,
    ease:'power2.out',
    scrollTrigger:{
      trigger:'.recensioni__grid',
      start:'top 80%',
      toggleActions:'play none none reverse'
    }
  });

  /* CTA FINALE WORDS */
  gsap.to('.cta-final__word', {
    opacity:1, y:0, stagger:0.1, duration:0.6,
    ease:'power3.out',
    scrollTrigger:{
      trigger:'.cta-final',
      start:'top 75%',
      toggleActions:'play none none reverse'
    }
  });

}/* end initGSAP */

/* ── MOBILE MENU ── */
function initBurger(){
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  if(!burger || !menu) return;
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
      burger.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    });
  });
}

/* ── COOKIE BANNER ── */
function initCookie(){
  const banner = document.getElementById('cookieBanner');
  if(!banner || localStorage.getItem('cb-consent')) return;
  setTimeout(() => banner.classList.add('cookie-banner--visible'), 2000);
  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('cb-consent','accepted');
    banner.classList.remove('cookie-banner--visible');
  });
  document.getElementById('cookieReject')?.addEventListener('click', () => {
    localStorage.setItem('cb-consent','rejected');
    banner.classList.remove('cookie-banner--visible');
  });
}

/* ── CHATBOT ── */
function initChatbot(){
  const fab = document.getElementById('chatbotFab');
  const panel = document.getElementById('chatbotPanel');
  const close = document.getElementById('chatbotClose');
  if(!fab || !panel) return;
  fab.addEventListener('click', () => {
    const open = panel.classList.toggle('chatbot-panel--open');
    panel.setAttribute('aria-hidden', !open);
  });
  close?.addEventListener('click', () => {
    panel.classList.remove('chatbot-panel--open');
    panel.setAttribute('aria-hidden','true');
  });
}

/* ── SMOOTH ANCHOR ── */
function initSmooth(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if(id === '#') return;
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });
}

/* ── FAQ TOGGLE ── */
function initFAQ(){
  document.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('toggle', () => {
      if(item.open){
        document.querySelectorAll('.faq__item').forEach(other => {
          if(other !== item) other.removeAttribute('open');
        });
      }
    });
  });
}

/* ── INIT ── */
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
`;

writeFileSync('public/js/main.js', js, 'utf8');
console.log('✅ public/js/main.js — ' + (js.length/1024).toFixed(1) + ' KB');

console.log('\\n══════════════════════════════════════');
console.log('  BUILD COMPLETATO');
console.log('  → public/index.html');
console.log('  → public/css/style.css');
console.log('  → public/js/main.js');
console.log('══════════════════════════════════════');
console.log('\\nEsegui: npx serve public');
console.log('Apri: http://localhost:3000');
console.log('Refresh: Ctrl+Shift+R\\n');
