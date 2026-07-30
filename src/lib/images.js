/**
 * Every image the site uses.
 *
 * `w` and `h` are the exact pixel dimensions each image is stored at, chosen to
 * match how the component actually displays it. Getting these wrong is what
 * made the site slow: portrait photos were being downloaded for landscape slots,
 * so most of the pixels were cropped away and thrown out.
 *
 * Files live in  public/images/
 * The site loads them from  /images/<filename>
 *
 * TO REPLACE AN IMAGE: drop your file into public/images/ using the exact
 * filename below. Nothing else to change. If your file is a .jpg or .png
 * instead of .webp, just change the extension in the `file` field here.
 *
 * This same list drives scripts/download-images.mjs, so filenames and download
 * sizes can never drift apart.
 *
 * `width` is the pixel width to download at. Full-screen backgrounds need 1920.
 * Small cards do not, and downloading them large is what made the old site
 * slow.
 */
export const IMAGE_MANIFEST = [
  // ---- Full-screen page backgrounds ----
  { key: 'heroHome',     file: 'hero-home.webp',       w: 1920, h: 1280, unsplash: 'photo-1603810524593-4b55fa902ad6', note: 'Home page hero' },
  { key: 'heroProjects', file: 'hero-projects.webp',   w: 1920, h: 1280, unsplash: 'photo-1519241047957-be31d7379a5d', note: 'Projects page hero' },
  { key: 'heroAbout',    file: 'hero-about.webp',      w: 1920, h: 1280, unsplash: 'photo-1589241062313-35890684416a', note: 'About page hero' },
  { key: 'heroCareers',  file: 'hero-careers.webp',    w: 1920, h: 1280, unsplash: 'photo-1672754091891-b58ed53665e6', note: 'Careers page hero' },
  { key: 'heroTeam',     file: 'hero-team.webp',       w: 1920, h: 1280, unsplash: 'photo-1683496865103-263bd91872b6', note: 'Team page hero, also the default hero' },

  // ---- Game covers. Shown full width on the detail page and as cards. ----
  { key: 'game01',       file: 'game-01.webp',         w: 1600, h:  900, unsplash: 'photo-1505635552518-3448ff116af3', note: 'Game 1 cover + card' },
  { key: 'game02',       file: 'game-02.webp',         w: 1600, h:  900, unsplash: 'photo-1519074069444-1ba4fff66d16', note: 'Game 2 cover + card. Original photo was deleted from Unsplash, this is a stand-in.' },

  // ---- Cards only, so they never need to be large ----
  { key: 'game03',       file: 'game-03.webp',         w:  800, h:  450, unsplash: 'photo-1698325653756-dcf62eca9fc1', note: 'Game 3 card' },
  { key: 'game04',       file: 'game-04.webp',         w:  800, h:  450, unsplash: 'photo-1629867578529-7f5a9f984c78', note: 'Game 4 card' },

  // ---- Gallery screenshots, shown 16:9 ----
  { key: 'shot01',       file: 'game-01-shot-1.webp',  w: 1280, h:  720, unsplash: 'photo-1549500379-1938ee1fc6a8', note: 'Gallery. Original photo was deleted from Unsplash, this is a stand-in.' },
  { key: 'shot02',       file: 'game-01-shot-2.webp',  w: 1280, h:  720, unsplash: 'photo-1504253163759-c23fccaebb55', note: 'Gallery' },
  { key: 'shot03',       file: 'game-01-shot-3.webp',  w: 1280, h:  720, unsplash: 'photo-1519074069444-1ba4fff66d16', note: 'Gallery' },
  { key: 'shot04',       file: 'game-02-shot-1.webp',  w: 1280, h:  720, unsplash: 'photo-1518709268805-4e9042af9f23', note: 'Gallery' },

  // ---- Misc ----
  { key: 'texture',      file: 'texture-bg.webp',      w: 1280, h:  720, unsplash: 'photo-1550745165-9bc0b252726f',    note: 'Faint background texture + gallery' },
  { key: 'cardFallback', file: 'card-fallback.webp',   w:  800, h:  450, unsplash: 'photo-1549500379-1938ee1fc6a8',    note: 'Shown if a project image fails to load' },
];

/** { heroHome: '/images/hero-home.webp', ... } */
export const IMAGES = Object.fromEntries(
  IMAGE_MANIFEST.map((i) => [i.key, `/images/${i.file}`])
);

// Named groups, so pages read clearly instead of using raw strings.

export const heroes = {
  home: IMAGES.heroHome,
  projects: IMAGES.heroProjects,
  about: IMAGES.heroAbout,
  careers: IMAGES.heroCareers,
  team: IMAGES.heroTeam,
  texture: IMAGES.texture,
};

export const cards = {
  fallback: IMAGES.cardFallback,
  game01: IMAGES.game01,
  game02: IMAGES.game02,
  game03: IMAGES.game03,
  game04: IMAGES.game04,
};

export const galleries = {
  game01: [IMAGES.shot01, IMAGES.shot02, IMAGES.shot03, IMAGES.texture],
  game02: [IMAGES.game01, IMAGES.shot04, IMAGES.shot02, IMAGES.texture],
};
