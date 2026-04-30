// optimize-frangitura.mjs
// Converte le PNG di img/frangitura/ in AVIF/WebP (desktop + mobile)
// e ricodifica video/frangitura.mp4 in MP4/WebM ottimizzati + poster.

import { mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import sharp from 'sharp';

const exec = promisify(execFile);
const ROOT = process.cwd();

const SRC_IMG = path.join(ROOT, 'img', 'frangitura');
const SRC_VIDEO = path.join(ROOT, 'video', 'frangitura.mp4');

const OUT_DESKTOP = path.join(ROOT, 'public', 'img', 'frangitura', 'desktop');
const OUT_MOBILE = path.join(ROOT, 'public', 'img', 'frangitura', 'mobile');
const OUT_VIDEO = path.join(ROOT, 'public', 'video');

// Mappatura nome file sorgente → slug output kebab-case
const IMAGES = [
    { src: 'Raccolta Olive.png', slug: 'raccolta' },
    { src: 'Defogliazione e Lavaggio.png', slug: 'lavaggio' },
    { src: 'Il Frantoio in Azione.png', slug: 'mulino' },
    { src: 'Gramolatura.png', slug: 'gramolatura' },
    { src: 'Olio EVO in Caduta.png', slug: 'estrazione' },
    { src: 'Stoccaggio in Acciaio Inox.png', slug: 'stoccaggio' },
    { src: 'Olive Bosana.png', slug: 'bosana' },
];

// Frame iniziale del video → poster
const POSTER_SRC = 'Olive Bosana.png';

const DESKTOP_W = 1920, DESKTOP_H = 1080;
const MOBILE_W = 768, MOBILE_H = 432;

async function ensureDir(p) { await mkdir(p, { recursive: true }); }

async function processImage(srcFile, slug) {
    const inputPath = path.join(SRC_IMG, srcFile);
    if (!existsSync(inputPath)) {
        console.warn(`⚠️  MISSING image: ${inputPath}`);
        return;
    }

    // Desktop
    await sharp(inputPath)
        .resize(DESKTOP_W, DESKTOP_H, { fit: 'cover', position: 'center' })
        .avif({ quality: 65, effort: 6 })
        .toFile(path.join(OUT_DESKTOP, `${slug}.avif`));
    await sharp(inputPath)
        .resize(DESKTOP_W, DESKTOP_H, { fit: 'cover', position: 'center' })
        .webp({ quality: 78 })
        .toFile(path.join(OUT_DESKTOP, `${slug}.webp`));

    // Mobile
    await sharp(inputPath)
        .resize(MOBILE_W, MOBILE_H, { fit: 'cover', position: 'center' })
        .avif({ quality: 60, effort: 6 })
        .toFile(path.join(OUT_MOBILE, `${slug}.avif`));
    await sharp(inputPath)
        .resize(MOBILE_W, MOBILE_H, { fit: 'cover', position: 'center' })
        .webp({ quality: 75 })
        .toFile(path.join(OUT_MOBILE, `${slug}.webp`));

    console.log(`✓ image: ${slug}  (avif+webp × desktop+mobile)`);
}

async function processPoster() {
    const inputPath = path.join(SRC_IMG, POSTER_SRC);
    if (!existsSync(inputPath)) {
        console.warn(`⚠️  MISSING poster: ${inputPath}`);
        return;
    }
    await sharp(inputPath)
        .resize(DESKTOP_W, DESKTOP_H, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(OUT_VIDEO, 'frangitura-poster.jpg'));
    await sharp(inputPath)
        .resize(MOBILE_W, MOBILE_H, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(path.join(OUT_VIDEO, 'frangitura-poster-mobile.jpg'));
    console.log('✓ poster: frangitura-poster.jpg + mobile');
}

async function ffmpegRun(args, label) {
    try {
        await exec('ffmpeg', args, { maxBuffer: 1024 * 1024 * 64 });
        console.log(`✓ video: ${label}`);
    } catch (err) {
        console.error(`✗ ffmpeg failed (${label}):`, err.stderr?.toString().slice(-400) || err.message);
    }
}

async function processVideo() {
    if (!existsSync(SRC_VIDEO)) {
        console.warn(`⚠️  MISSING video: ${SRC_VIDEO}`);
        return;
    }

    // MP4 desktop — keyframe ogni 0.2s per scrubbing fluido
    await ffmpegRun([
        '-y', '-i', SRC_VIDEO,
        '-vf', `scale=${DESKTOP_W}:-2`,
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '24',
        '-g', '6', '-keyint_min', '6', '-sc_threshold', '0',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-an',
        path.join(OUT_VIDEO, 'frangitura-desktop.mp4')
    ], 'frangitura-desktop.mp4');

    // MP4 mobile
    await ffmpegRun([
        '-y', '-i', SRC_VIDEO,
        '-vf', `scale=${MOBILE_W}:-2`,
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '26',
        '-g', '6', '-keyint_min', '6', '-sc_threshold', '0',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-an',
        path.join(OUT_VIDEO, 'frangitura-mobile.mp4')
    ], 'frangitura-mobile.mp4');

    // WebM desktop (VP9)
    await ffmpegRun([
        '-y', '-i', SRC_VIDEO,
        '-vf', `scale=${DESKTOP_W}:-2`,
        '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0',
        '-g', '6', '-keyint_min', '6',
        '-row-mt', '1',
        '-an',
        path.join(OUT_VIDEO, 'frangitura-desktop.webm')
    ], 'frangitura-desktop.webm');
}

(async () => {
    console.log('\n🔧 Optimizing Frangitura assets...\n');

    await ensureDir(OUT_DESKTOP);
    await ensureDir(OUT_MOBILE);
    await ensureDir(OUT_VIDEO);

    for (const img of IMAGES) {
        await processImage(img.src, img.slug);
    }

    await processPoster();
    await processVideo();

    console.log('\n✅ Done. Output:');
    console.log(`   ${path.relative(ROOT, OUT_DESKTOP)}`);
    console.log(`   ${path.relative(ROOT, OUT_MOBILE)}`);
    console.log(`   ${path.relative(ROOT, OUT_VIDEO)}\n`);
})();
