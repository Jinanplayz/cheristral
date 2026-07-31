import { useEffect } from 'react';

/**
 * Drop-in replacement for react-helmet.
 *
 * react-helmet was 60 KB of the bundle, is unmaintained since 2020, and uses
 * React lifecycle methods that log warnings on React 18. All the site needed it
 * for was a title and a description, which is what this does, plus the Open
 * Graph tags so shared links get a real preview.
 *
 * Renders nothing. Use it exactly where <Helmet> used to sit:
 *
 *   <PageMeta title="Projects - Cheristral Studio" description="..." />
 *
 * Pass noIndex to keep a page out of search results.
 */

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export default function PageMeta({ title, description, image, noIndex = false }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta('property', 'og:title', title);
      setMeta('name', 'twitter:title', title);
    }

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    // Absolute URL required: relative paths are ignored by most crawlers.
    if (image) {
      const absolute = new URL(image, window.location.origin).href;
      setMeta('property', 'og:image', absolute);
      setMeta('name', 'twitter:image', absolute);
    }

    setMeta('property', 'og:url', window.location.href);

    // Ask search engines not to list this page. Only meaningful for pages that
    // are unlisted rather than secret: anyone with the URL can still open it.
    if (noIndex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, image, noIndex]);

  return null;
}
