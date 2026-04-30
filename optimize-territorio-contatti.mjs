// optimize-territorio-contatti.mjs
import sharp from 'sharp';
import { execSync } from 'node:child_process';
import { mkdirSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const PAGES = [
    {
        slug: 'territorio',
        images: [
            { src: 'Cultivar Bosana.png', name: 'bosana' },
            { src: 'Cultivar Nera di Villacidro.png', name: 'nera-villacidro' },
            { src: 'Foglia di Ulivo Backlit.png', name: 'foglia' },
            { src: 'Il frantoio storico.png', name: 'frantoio' },
            { src: 'Mappa illustrata della Sardegna.png', name: 'mappa-sardegna' },
            { src: 'Monte Linas con Oliveti.png', name: 'monte-linas' },
            { src: 'Uliveto secolare.png', name: 'uliveto-secolare' },
            { src: 'Vista Aerea Oliveti.png', name: 'vista-aerea' }
        ],
        posterSource: 'Vista Aerea Oliveti.png',
        video: 'territorio.mp4'
    },
    {
        slug: 'contatti',
        images: [
            { src: 'Busta Vintage.png', name: 'busta' },
            { src: "Goccia d'Oro.png", name: 'goccia' },
            { src: 'Ingresso Frantoio.png', name: 'ingresso' },
            { src: 'Mappa Oleificio.png', name: 'mappa-oleificio' },
            { src: 'Pattern Olive.png', name: 'pattern' },
            { src: 'Scrivania.png', name: 'scrivania' }
        ],
        posterSource: 'Ingresso Frantoio.png',
        video: 'contatti.mp4'
    }
];

const SIZES = {
    desktop: { w: 1920, h: 1080 },
    mobile: { w: 768, h: 432 }
};

function ensureDir(p) {
    if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function findVideo(folder, name) {
    const dir = path.join(ROOT, folder);
    if (!existsSync(dir)) return null;
    const files = readdirSync(dir);
    const found = files.find(f => f.toLowerCase() === name.toLowerCase());
    return found ? path.join(dir, found) : null;
}

console.log('\n🔧 Optimizing Territorio + Contatti assets...\n');

for (const page of PAGES) {
    console.log(`\n=== ${page.slug.toUpperCase()} ===`);

    const srcDir = path.join(ROOT, 'img', page.slug);
    const outDesktop = path.join(ROOT, 'public', 'img', page.slug, 'desktop');
    const outMobile = path.join(ROOT, 'public', 'img', page.slug, 'mobile');
    const outVideo = path.join(ROOT, 'public', 'video');
    ensureDir(outDesktop);
    ensureDir(outMobile);
    ensureDir(outVideo);

    // IMAGES
    for (const img of page.images) {
        const srcPath = path.join(srcDir, img.src);
        if (!existsSync(srcPath)) {
            console.warn(`⚠️  MISSING image: ${img.src}`);
            continue;
        }

        for (const [variant, size] of Object.entries(SIZES)) {
            const outDir = variant === 'desktop' ? outDesktop : outMobile;

            await sharp(srcPath)
                .resize(size.w, size.h, { fit: 'cover', position: 'center' })
                .avif({ quality: 50, effort: 4 })
                .toFile(path.join(outDir, `${img.name}.avif`));

            await sharp(srcPath)
                .resize(size.w, size.h, { fit: 'cover', position: 'center' })
                .webp({ quality: 75, effort: 4 })
                .toFile(path.join(outDir, `${img.name}.webp`));
        }
        console.log(`✓ image: ${img.name}`);
    }

    // POSTER
    const posterSrc = path.join(srcDir, page.posterSource);
    if (existsSync(posterSrc)) {
        await sharp(posterSrc)
            .resize(1920, 1080, { fit: 'cover' })
            .jpeg({ quality: 78, progressive: true })
            .toFile(path.join(outVideo, `${page.slug}-poster.jpg`));
        await sharp(posterSrc)
            .resize(768, 432, { fit: 'cover' })
            .jpeg({ quality: 78, progressive: true })
            .toFile(path.join(outVideo, `${page.slug}-poster-mobile.jpg`));
        console.log(`✓ poster: ${page.slug}-poster.jpg + mobile`);
    } else {
        console.warn(`⚠️  MISSING poster: ${page.posterSource}`);
    }

    // VIDEO
    const videoSrc = findVideo('video', page.video);
    if (videoSrc) {
        const desktopMp4 = path.join(outVideo, `${page.slug}-desktop.mp4`);
        const mobileMp4 = path.join(outVideo, `${page.slug}-mobile.mp4`);
        const desktopWebm = path.join(outVideo, `${page.slug}-desktop.webm`);

        execSync(`ffmpeg -y -i "${videoSrc}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -c:v libx264 -preset slow -crf 26 -an -movflags +faststart -pix_fmt yuv420p "${desktopMp4}"`, { stdio: 'pipe' });
        console.log(`✓ video: ${page.slug}-desktop.mp4`);

        execSync(`ffmpeg -y -i "${videoSrc}" -vf "scale=768:432:force_original_aspect_ratio=increase,crop=768:432" -c:v libx264 -preset slow -crf 28 -an -movflags +faststart -pix_fmt yuv420p "${mobileMp4}"`, { stdio: 'pipe' });
        console.log(`✓ video: ${page.slug}-mobile.mp4`);

        execSync(`ffmpeg -y -i "${videoSrc}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -c:v libvpx-vp9 -crf 32 -b:v 0 -an "${desktopWebm}"`, { stdio: 'pipe' });
        console.log(`✓ video: ${page.slug}-desktop.webm`);
    } else {
        console.warn(`⚠️  MISSING video: ${page.video}`);
    }
}

console.log('\n✅ Done.\n');
