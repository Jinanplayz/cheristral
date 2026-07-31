// ─────────────────────────────────────────────────────────────────────────────
// Contact links
// ─────────────────────────────────────────────────────────────────────────────
// PASTE YOUR LINKS BETWEEN THE QUOTES BELOW. That is the whole setup.
//
// To get a Google Form link: open the form → "Send" → the link (chain) icon.
//
// The buttons degrade in this order, so they are never dead:
//   1. A form link, if you set one
//   2. Otherwise a pre-addressed email using CONTACT_EMAIL
//   3. Only if both are empty does the button disable itself
//
// So the quickest way to get working buttons today is to leave the form URLs
// blank and just set CONTACT_EMAIL.
// ─────────────────────────────────────────────────────────────────────────────

/** Fallback for both buttons. Set this even if you add forms later. */
export const CONTACT_EMAIL = 'ahnafsalequejinan@gmail.com';

/** "Get in touch" button on the About page. */
export const CONTACT_FORM_URL = '';      // e.g. 'https://forms.gle/abc123'

/** "Apply Now" button on every job listing. */
export const APPLICATION_FORM_URL = '';  // e.g. 'https://forms.gle/xyz789'

/** True when a link has actually been filled in. */
export const isConfigured = (url) => typeof url === 'string' && url.trim().length > 0;

/**
 * Build a mailto: link with the subject and body pre-filled.
 *
 * encodeURIComponent matters here: an unencoded space or ampersand in a subject
 * silently truncates the rest of the mail body in most clients.
 */
export const buildMailto = (subject, body = '') => {
  if (!isConfigured(CONTACT_EMAIL)) return '';
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`;
};
