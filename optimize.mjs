import sharp from "sharp";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";

const dirs = [
  "public/img/prodotti",
  "public/img/storia",
  "public/img/hero",
  "public/img/texture",
  "public/img/frangitura",
  "public/img/ui",
  "public/video",
  "public/fonts"
];

for (const d of dirs) {
  if (!existsSync(d)) await mkdir(d, { recursive: true });
}

console.log("Cartelle create");

async function convert(input, output, width, height, format, quality, fit = "inside") {
  try {
    await sharp(input)
      .resize(width, height, { fit })
      .toFormat(format, { quality })
      .toFile(output);
    console.log("OK " + output);
  } catch (e) {
    console.error("ERRORE " + output + ": " + e.message);
  }
}

const prodotti = [
  { file: "product-evo-puro", out: "product-evo-puro" },
  { file: "product-olio-peperoncino", out: "product-olio-peperoncino" },
  { file: "product-olio-limone", out: "product-olio-limone" },
  { file: "product-olio-basilico", out: "product-olio-basilico" },
];

for (const p of prodotti) {
  await convert("IMMAGINI/" + p.file + ".png", "public/img/prodotti/" + p.out + ".avif", 800, 1000, "avif", 80);
  await convert("IMMAGINI/" + p.file + ".png", "public/img/prodotti/" + p.out + ".webp", 800, 1000, "webp", 82);
}

const bottiglie = ["0.10", "0.25", "0.50", "0.75"];
for (const size of bottiglie) {
  await convert("IMMAGINI/bottle-evo-" + size + ".png", "public/img/prodotti/bottle-evo-" + size + ".avif", 800, 1000, "avif", 80);
  await convert("IMMAGINI/bottle-evo-" + size + ".png", "public/img/prodotti/bottle-evo-" + size + ".webp", 800, 1000, "webp", 82);
}

for (const latta of ["3l", "5l"]) {
  await convert("IMMAGINI/latta-" + latta + ".png", "public/img/prodotti/latta-" + latta + ".avif", 800, 1000, "avif", 80);
  await convert("IMMAGINI/latta-" + latta + ".png", "public/img/prodotti/latta-" + latta + ".webp", 800, 1000, "webp", 82);
}

await convert("IMMAGINI/box-luxury.png", "public/img/prodotti/box-luxury.avif", 1200, 675, "avif", 80);
await convert("IMMAGINI/box-luxury.png", "public/img/prodotti/box-luxury.webp", 1200, 675, "webp", 82);

await convert("IMMAGINI/bottle-hero-parallax.png", "public/img/prodotti/bottle-hero-parallax.avif", 800, 1400, "avif", 85);
await convert("IMMAGINI/bottle-hero-parallax.png", "public/img/prodotti/bottle-hero-parallax.webp", 800, 1400, "webp", 85);

await convert("IMMAGINI/og_home.png", "public/img/hero/hero-fallback.avif", 1920, 1080, "avif", 85, "cover");
await convert("IMMAGINI/og_home.png", "public/img/hero/hero-fallback.webp", 1920, 1080, "webp", 85, "cover");
await convert("IMMAGINI/og_home.png", "public/img/hero/og-home.jpg", 1200, 630, "jpeg", 90, "cover");

for (const anno of ["1890", "1940", "1970"]) {
  await convert("IMMAGINI/storia-" + anno + ".png", "public/img/storia/storia-" + anno + ".avif", 800, 500, "avif", 80, "cover");
  await convert("IMMAGINI/storia-" + anno + ".png", "public/img/storia/storia-" + anno + ".webp", 800, 500, "webp", 82, "cover");
}
await convert("IMMAGINI/storia-oggi-ritagliata.png", "public/img/storia/storia-oggi.avif", 800, 500, "avif", 80, "cover");
await convert("IMMAGINI/storia-oggi-ritagliata.png", "public/img/storia/storia-oggi.webp", 800, 500, "webp", 82, "cover");

await convert("IMMAGINI/monte-linas-panorama.png", "public/img/storia/monte-linas-panorama.avif", 2560, 1080, "avif", 80, "cover");
await convert("IMMAGINI/monte-linas-panorama.png", "public/img/storia/monte-linas-panorama.webp", 2560, 1080, "webp", 82, "cover");

await convert("IMMAGINI/frangitura-azione.png", "public/img/frangitura/frangitura-azione.avif", 600, 1080, "avif", 80, "cover");
await convert("IMMAGINI/frangitura-azione.png", "public/img/frangitura/frangitura-azione.webp", 600, 1080, "webp", 82, "cover");

await convert("IMMAGINI/oil-texture-spread.png", "public/img/texture/oil-texture-spread.avif", 1920, 1080, "avif", 75, "cover");
await convert("IMMAGINI/oil-texture-spread.png", "public/img/texture/oil-texture-spread.webp", 1920, 1080, "webp", 78, "cover");

console.log("\nTUTTE LE IMMAGINI OTTIMIZZATE!");
