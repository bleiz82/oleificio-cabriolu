'use strict';
(function () {

    const TOTAL_FRAMES = 200;
    const BASE_PATH = '/img/frames/storia/frame_';
    const EXT = '.webp';

    const canvas = document.getElementById('storiaCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !ctx) return;

    const frames = [];
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
        let dW, dH;
        if (cR > iR) { dW = cW; dH = cW / iR; }
        else { dH = cH; dW = cH * iR; }
        ctx.drawImage(img, (cW - dW) / 2, (cH - dH) / 2, dW, dH);
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
                img.onload = () => r();
                img.onerror = () => r();
            });
            img.src = BASE_PATH + String(i).padStart(4, '0') + EXT;
            frames[idx] = img;
            promises.push(p);
        }
        return Promise.all(promises);
    }

    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        const wrap = document.getElementById('storia-canvas-wrap');
        const timeline = document.getElementById('storia-timeline');

        ScrollTrigger.create({
            trigger: wrap,
            start: 'top top',
            endTrigger: timeline,
            end: 'top top',
            scrub: 0.5,
            onUpdate: function (self) {
                const f = Math.round(self.progress * (TOTAL_FRAMES - 1));
                if (f !== currentFrame) {
                    currentFrame = f;
                    drawFrame(f);
                }
            }
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    preloadFrames().then(function () {
        console.log('✅ Storia: ' + TOTAL_FRAMES + ' frame caricati');
        drawFrame(0);
        initGSAP();
    });

})();
