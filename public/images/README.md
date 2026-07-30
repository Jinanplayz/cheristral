# Site images

Every image the site uses lives in this folder.

## To replace an image

1. Look up the filename you want to replace in `src/lib/images.js`.
2. Save your new image into this folder using that **exact** filename.
3. Done. No code changes, no rebuild step beyond the normal `npm run build`.

## To get the starter images

    npm run images

That downloads all 15, already resized and converted to WebP. Or use the links
in `IMAGE-LINKS.md` in the project root and save them by hand.

## If your file is a .jpg or .png

The filenames here end in `.webp`. If you drop in `hero-home.jpg` instead,
change the extension on that one line in `src/lib/images.js` to match.

## Sizes

Match roughly what's listed in `src/lib/images.js`. Full-screen backgrounds want
about 1920px wide. Small cards want about 800px. Going much bigger is exactly
what made the site slow before, so avoid dropping in 6000px camera originals.
