#!/usr/bin/env node
/**
 * Downloads every image the site needs into public/images/
 *
 *   npm run images
 *
 * Each image is fetched already resized and converted to WebP, so there is no
 * build step and nothing to optimise afterwards. Files that already exist are
 * skipped, so it is safe to re-run. Use --force to overwrite everything.
 *
 * Filenames and sizes come from src/lib/images.js, the same list the site reads,
 * so the two can never disagree.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGE_MANIFEST } from '../src/lib/images.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEST_DIR = join(ROOT, 'public', 'images');

const force = process.argv.includes('--force');
const exists = (p) => access(p).then(() => true, () => false);

async function download({ file, w, h, unsplash }) {
  const dest = join(DEST_DIR, file);

  if (!force && (await exists(dest))) {
    return `skipped, already there`;
  }

  // Ask for the exact dimensions we render at. Without &h= Unsplash returns the
  // photo's own aspect ratio, which for portrait photos means most of the pixels
  // get cropped away and thrown out by the browser.
  const url =
    `https://images.unsplash.com/${unsplash}` +
    `?w=${w}&h=${h}&q=75&fm=webp&fit=crop&crop=entropy&auto=format`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const bytes = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, bytes);
  return `${w}x${h}, ${Math.round(bytes.length / 1024)} KB`;
}

await mkdir(DEST_DIR, { recursive: true });

console.log(`\nDownloading ${IMAGE_MANIFEST.length} images into public/images/\n`);

let failed = 0;
let total = 0;

// Four at a time, to be polite to the CDN.
for (let i = 0; i < IMAGE_MANIFEST.length; i += 4) {
  const batch = IMAGE_MANIFEST.slice(i, i + 4);
  const results = await Promise.allSettled(batch.map(download));

  results.forEach((r, j) => {
    const name = batch[j].file.padEnd(22);
    if (r.status === 'fulfilled') {
      console.log(`  ok    ${name} ${r.value}`);
      const kb = parseInt(r.value, 10);
      if (!Number.isNaN(kb) && r.value.includes('KB')) total += kb;
    } else {
      failed++;
      console.error(`  FAIL  ${name} ${r.reason.message}`);
    }
  });
}

// Final check: is every file the site expects actually on disk? A missing file
// here means a visible hole on the site, so say so plainly.
const missing = [];
for (const item of IMAGE_MANIFEST) {
  if (!(await exists(join(DEST_DIR, item.file)))) missing.push(item);
}

if (missing.length === 0) {
  console.log(`\nAll ${IMAGE_MANIFEST.length} images are in public/images/.`);
  console.log(`Next, shrink them: npm run optimize\n`);
  process.exit(0);
}

// Warn, but still exit 0, so `npm start` goes on to launch the site. A missing
// image is a hole on one page, not a reason to stop you seeing the whole thing.
console.error(`\n${missing.length} image(s) missing from public/images/:\n`);
for (const m of missing) {
  console.error(`  ${m.file.padEnd(22)} (${m.note})`);
}
console.error(`
Try "npm run images" once more first, it may just be a flaky connection.

If a file keeps failing with HTTP 404, that photo has been deleted from
Unsplash. Open src/lib/images.js, find that filename, and either:
  - point it at a different photo ID, or
  - save your own image into public/images/ with that exact filename.

Continuing anyway. The site will run, those spots will just be blank.
`);
process.exit(0);
