// build-frangitura.mjs
import { mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');

async function ensureDir(p) {
    await mkdir(p, { recursive: true });
}

async function copyIfExists(src, dest) {
    if (!existsSync(src)) {
        console.warn(`⚠️  MISSING: ${src}`);
        return false;
    }
    await ensureDir(path.dirname(dest));
    await copyFile(src, dest);
    const s = await stat(dest);
    console.log(`✓ ${path.relative(ROOT, dest)}  (${(s.size / 1024).toFixed(1)} KB)`);
    return true;
}

async function copyDir(srcDir, destDir, filter = () => true) {
    if (!existsSync(srcDir)) return;
    await ensureDir(destDir);
    const entries = await readdir(srcDir, { withFileTypes: true });
    for (const e of entries) {
        const s = path.join(srcDir, e.name);
        const d = path.join(destDir, e.name);
        if (e.isDirectory()) await copyDir(s, d, filter);
        else if (filter(e.name)) await copyIfExists(s, d);
    }
}

console.log('\n🔧 Building Frangitura into public/ ...\n');

// 1) HTML
await copyIfExists(
    path.join(ROOT, 'frangitura', 'index.html'),
    path.join(PUB, 'frangitura', 'index.html')
);

// 2) CSS (intero style.css)
await copyIfExists(
    path.join(ROOT, 'css', 'style.css'),
    path.join(PUB, 'css', 'style.css')
);

// 3) JS della pagina + comuni
await copyIfExists(path.join(ROOT, 'js', 'frangitura.js'), path.join(PUB, 'js', 'frangitura.js'));
await copyIfExists(path.join(ROOT, 'js', 'common.js'), path.join(PUB, 'js', 'common.js'));
await copyIfExists(path.join(ROOT, 'js', 'main.js'), path.join(PUB, 'js', 'main.js'));

// 4) Fonts (.woff2 only)
await copyDir(
    path.join(ROOT, 'fonts'),
    path.join(PUB, 'fonts'),
    name => name.endsWith('.woff2')
);

// 5) Logo (se esiste in img/)
const logoCandidates = [
    'oleificio_cabriolu_logo_500-403051a0.webp',
    'logo.webp',
    'logo.png'
];
for (const name of logoCandidates) {
    const src = path.join(ROOT, 'img', name);
    if (existsSync(src)) await copyIfExists(src, path.join(PUB, 'img', name));
}

console.log('\n✅ Done. Now run:  npx serve public  →  http://localhost:3000/frangitura/\n');
