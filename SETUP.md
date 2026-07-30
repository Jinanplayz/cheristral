# Setup

## Run it locally

```
npm install
npm start
```

Opens at http://localhost:3000. `Ctrl+C` to stop.

**On Windows: use Command Prompt, not PowerShell.** PowerShell blocks npm by
default. In VS Code, click the `v` next to the `+` in the terminal panel and pick
Command Prompt. (Or type `npm.cmd` instead of `npm`.)

## Your logo

Save it as `public/logo.png`. Square, 96x96 or bigger. Until then the header
shows a "C". Nothing else is affected.

## Publish

```
git add -A
git commit -m "Optimize images, bundle and SEO"
git push
```

---

# Replacing an image

1. Find the filename in `src/lib/images.js`.
2. Save your file into `public/images/` using that exact filename.
3. Run `npm run optimize` to crop and compress it correctly.

Step 3 matters. It resizes to the dimensions listed in the manifest and
re-encodes the WebP. Without it, a phone camera photo will be several megabytes.

If your file is a `.jpg` or `.png`, change the extension on that one line in
`src/lib/images.js`.

---

# Commands

| Command | What it does |
|---|---|
| `npm start` | Download any missing images, then run the site |
| `npm run optimize` | Crop and compress everything in `public/images/` |
| `npm run images` | Just download missing images |
| `npm run dev` | Just run the site |
| `npm run build` | Build for production into `dist/` |
| `npm run lint` | Check for code errors |

---

# What was fixed

Measured against the repo as it was:

|  | Before | After | Saved |
|---|---|---|---|
| JavaScript | 493 KB | 472 KB | 4% |
| Images | 3.59 MB | 942 KB | 74% |
| **Total** | **4.07 MB** | **1.38 MB** | **66%** |

## Images (the big one)

**Wrong aspect ratios.** Several photos were portrait but displayed in landscape
slots. `game-02.webp` was 1600x2399 for a 16:9 card, so most of those pixels were
downloaded and then cropped away. Everything is now stored at the dimensions it
is actually rendered at.

**Unsplash's WebP encoder is inefficient.** Re-encoding the identical pixels with
sharp cut most files by 60% or more on its own.

## JavaScript

**Removed react-helmet.** 60 KB, unmaintained since 2020, uses React lifecycle
methods that warn on React 18. All it did here was set a title and a description.
`src/components/PageMeta.jsx` replaces it in about 40 lines and also emits Open
Graph tags.

**Fixed the chunking.** Rollup was folding 38 KB of Radix Dialog (the mobile nav
drawer) into a chunk it named "Footer", so editing the footer invalidated the
Radix cache for every visitor. It is now a separate `ui-vendor` chunk. Footer
went from 63.6 KB to 11.3 KB.

**web-vitals is dev-only now.** It was shipping to production and doing nothing:
the analytics call was commented out and it only logged when DEV was true. Also
swapped `onFID` for `onINP`, since Google retired First Input Delay in 2024.

## Fonts

**Rajdhani has no 800 weight.** It ships 300/400/500/600/700. `index.html` was
requesting 800 and the CSS set `h1`/`h2` to 800, so the browser was faking it with
synthetic bold, which looks smeared. Now requesting real weights, and the
headings use 700.

**`font-semibold` was never loading.** Used in three places, weight 600, but 600
was not in the font request. Space Grotesk now loads it.

**Note on `font-black`:** used in 36 places, which is weight 900. Neither Rajdhani
nor Space Grotesk has a 900, so those are still synthesised. Left alone because
changing them alters the look of the whole site. If you want a genuinely heavy
display face, you would need to swap Rajdhani for something like Chakra Petch or
Orbitron.

## SEO and sharing

Added Open Graph and Twitter card tags, a canonical URL, `robots.txt`,
`sitemap.xml`, and a generated `public/og-image.jpg`. Before this, sharing a link
on Discord, WhatsApp or Twitter showed a bare URL with no title or picture.

**Update the domain.** These files use `https://cheristral.pages.dev/`. Search
for that string in `index.html`, `public/robots.txt` and `public/sitemap.xml` and
replace it with your real domain.

---

# Optional, not done

**framer-motion is 116 KB**, the largest single item left. Switching to
`LazyMotion` with the `domAnimation` feature set would roughly halve it, but it
means changing all 62 `motion.div` usages to `m.div`. Mechanical, but it touches
a lot of files and animation bugs are easy to miss without clicking through every
page. Worth doing if you care about the last 20 KB.

**The mobile nav drawer** loads 38 KB of Radix on desktop too, where it can never
be opened. Lazy-loading it would save that for most visitors.
