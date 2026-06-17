import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

/** Max width @2x for display size — keeps checkout photos sharp on mobile. */
const TARGETS = {
  'rooms-rates/hero-caesars.jpg': 860,
  'rooms-rates/room-standard.jpg': 750,
  'rooms-rates/room-julius.jpg': 750,
  'rooms-rates/room-deluxe-a.jpg': 750,
  'rooms-rates/room-nobu.jpg': 750,
  'rooms-rates/map-caesars.jpg': 720,
  'rooms-rates/nearby-waldorf.jpg': 532,
  'rooms-rates/nearby-red-rock.jpg': 532,
  'rooms-rates/nearby-luxury-suites.jpg': 532,
  'review-stay-hero-hotel.jpg': 860,
  'northstar-room.jpg': 430,
  'northstar-hero.jpg': 860,
  'about-gr/about-gr-bg.jpg': 720,
};

const assetsRoot = path.resolve('src/assets/bundled');

async function optimize(relativePath, maxWidth) {
  const input = path.join(assetsRoot, relativePath);
  const parsed = path.parse(relativePath);
  const outputDir = path.join(assetsRoot, parsed.dir);
  await mkdir(outputDir, { recursive: true });
  const output = path.join(outputDir, `${parsed.name}.webp`);

  const image = sharp(input);
  const meta = await image.metadata();
  const width = meta.width && meta.width > maxWidth ? maxWidth : meta.width;

  await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(output);

  const [before, after] = await Promise.all([stat(input), stat(output)]);
  console.log(
    `${relativePath} → ${parsed.name}.webp  ${Math.round(before.size / 1024)}KB → ${Math.round(after.size / 1024)}KB`,
  );
}

const entries = Object.entries(TARGETS);
for (const [relativePath, maxWidth] of entries) {
  await optimize(relativePath, maxWidth);
}

// Remove unused duplicate source not referenced in app.
const unused = path.join(assetsRoot, 'rooms-rates/room-deluxe-b.jpg');
try {
  await stat(unused);
  console.log('Note: room-deluxe-b.jpg is unused in the app.');
} catch {
  /* ok */
}
