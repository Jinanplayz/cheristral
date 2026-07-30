# Setup

## The only command you need

```
npm start
```

Downloads any missing images, then starts the site at http://localhost:3000.
Press `Ctrl+C` in the terminal to stop it.

If you have never run `npm install` in this folder, do that once first.

**On Windows: use Command Prompt, not PowerShell.** PowerShell blocks npm by
default. In VS Code, click the `v` dropdown next to the `+` in the terminal
panel and pick Command Prompt. (Or type `npm.cmd` instead of `npm`.)

## Your logo

Save your logo as `public/logo.png`. Square, 96x96 or bigger.

Until you do, the header shows a "C". Nothing else is affected.

## Publishing

```
git add -A
git commit -m "Fix images"
git push
```

---

# Replacing an image

1. Find the filename in `src/lib/images.js`.
2. Save your file into `public/images/` using that exact filename.
3. Done. No code changes.

If your file is a `.jpg` or `.png` rather than `.webp`, change the extension on
that one line in `src/lib/images.js`.

Keep sizes near what the list says. Full-screen backgrounds want about 1920px
wide, cards about 800px. A 6000px camera original is exactly what made the site
slow before.

---

# Commands

| Command | What it does |
|---|---|
| `npm start` | Download missing images, then run the site locally |
| `npm run images` | Just download missing images |
| `npm run dev` | Just run the site locally |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview a production build (run `npm run build` first) |
| `npm run lint` | Check the code for errors |

---

# What was wrong

**Images had no size limit.** The URLs were missing a width parameter, so
Unsplash served full 4000 to 6000px originals, several megabytes each, into
slots a few hundred pixels wide. Every image is now stored at the size it is
actually displayed at. Total image weight went from roughly 15 MB to about
3.5 MB, and no single page loads all of it.

**The hero image waited for JavaScript.** It was a CSS background applied inside
a `useEffect`, so the download could not start until the whole JS bundle had
arrived and React had mounted. It is now a real `<img>` with
`fetchpriority="high"`, plus a preload hint in `index.html`.

**Two photos were dead links.** `photo-1605806616949-1e87b487cb2a` and
`photo-1629853909748-0382e21b7ceb` return HTTP 404, because they have been
deleted from Unsplash. These were in the original code, so those two images were
already broken on the live site and it had nothing to do with speed. A dead
hotlink just silently shows a broken box, which is why it was easy to miss. Both
now point at working stand-ins.

**A URL building bug.** The old code did `` `${url}&fm=webp` ``, assuming every
URL already had a `?`. One did not, which produced a 404. There are no URLs to
build now.

**The logo was broken.** It pointed at a Hostinger builder CDN. It now points at
`/logo.png` and falls back to a "C" rather than a broken-image icon.

**Also:** removed the unused `useImagePreload` hook and dead `bg-image-stable`
CSS, added a `.gitignore` (there was none, so `node_modules` was commitable),
added cache headers for `/images/*`, and bumped the service worker cache to v3
so returning visitors drop the old multi-megabyte cached copies.

## Known tradeoff

Every visitor gets the same file, so phones download the desktop-sized hero. At
150 to 250 KB that is fine. If it ever matters, that is the point to add
responsive sizes, and not before.
