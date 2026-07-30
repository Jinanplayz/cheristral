#!/usr/bin/env node
/**
 * Recompresses everything in public/images/ to the right size and a better
 * WebP encode.
 *
 *   npm run optimize
 *
 * Two things this fixes:
 *
 * 1. Unsplash's WebP encoder is inefficient. Re-encoding the identical pixels
 *    with sharp cuts most files by about 60%.
 *
 * 2. Several photos arrived portrait (e.g. 1600x2399) but are displayed in
 *    landscape slots, so most of those pixels were cropped away and wasted.
 *    This crops to the dimensions in src/lib/images.js, which match what the
 *    components actually render.
 *
 * Safe to run repeatedly. Already-optimal files are skipped, and anything it
 * would make bigger is left alone. Originals are backed up to
 * public/images/.original/ the first time, so nothing is destroyed.
 *
 * Run this after `npm run images`, and after dropping in your own screenshots.
 */
import sharp from 'sharp';
import { mkdir, readFile, writeFile, stat, access, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGE_MANIFEST } from '../src/lib/images.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'public', 'images');
const BACKUP = join(DIR, '.original');

const QUALITY = 72; // visually indistinguishable from 80 at these sizes
const kb = (n) => Math.round(n / 1024);
const exists = (p) => access(p).then(() => true, () => false);

await mkdir(BACKUP, { recursive: true });

console.log('\nOptimizing public/images/\n');
console.log('  file                     before        after        saved');
console.log('  ' + '-'.repeat(62));

let totalBefore = 0;
let totalAfter = 0;
let skipped = 0;
let missing = 0;

for (const item of IMAGE_MANIFEST) {
  const path = join(DIR, item.file);

  if (!(await exists(path))) {
    console.log(`  ${item.file.padEnd(24)} not found, skipping`);
    missing++;
    continue;
  }

  const input = await readFile(path);
  const meta = await sharp(input).metadata();
  const before = input.length;

  // Keep a pristine copy the first time we touch this file.
  const backupPath = join(BACKUP, item.file);
  if (!(await exists(backupPath))) await copyFile(path, backupPath);

  const output = await sharp(input)
    .resize(item.w, item.h, { fit: 'cover', position: 'center', withoutEnlargement: false })
    .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
    .toBuffer();

  const alreadyRightSize = meta.width === item.w && meta.height === item.h;

  // Never make a file bigger than it already was.
  if (output.length >= before && alreadyRightSize) {
    console.log(`  ${item.file.padEnd(24)} ${String(kb(before) + 'K').padEnd(13)} already optimal`);
    totalBefore += before;
    totalAfter += before;
    skipped++;
    continue;
  }

  await writeFile(path, output);

  const pct = Math.round((1 - output.length / before) * 100);
  const dims = alreadyRightSize ? '' : ` (${meta.width}x${meta.height} -> ${item.w}x${item.h})`;
  console.log(
    `  ${item.file.padEnd(24)}${String(kb(before) + 'K').padEnd(14)}${String(kb(output.length) + 'K').padEnd(13)}${pct}%${dims}`
  );

  totalBefore += before;
  totalAfter += output.length;
}

// A social preview image. Platforms want a landscape JPEG around 1200x630, and
// several still handle WebP badly, so this one stays JPEG.
const ogSource = join(DIR, 'hero-home.webp');
if (await exists(ogSource)) {
  const og = await sharp(await readFile(ogSource))
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(join(ROOT, 'public', 'og-image.jpg'), og);
  console.log(`\n  Wrote public/og-image.jpg (${kb(og.length)}K) for link previews.`);
}

console.log('\n  ' + '-'.repeat(62));
console.log(
  `  TOTAL  ${(totalBefore / 1048576).toFixed(2)} MB  ->  ${(totalAfter / 1048576).toFixed(2)} MB` +
    `   (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`
);
if (skipped) console.log(`  ${skipped} file(s) already optimal.`);
if (missing) console.log(`  ${missing} file(s) missing. Run "npm run images" first.`);
console.log(`\n  Originals backed up in public/images/.original/`);
console.log(`  Happy with the result? Delete that folder, it is not needed.\n`);
