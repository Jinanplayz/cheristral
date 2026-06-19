// ─────────────────────────────────────────────────────────────────────────────
// Google Form links
// ─────────────────────────────────────────────────────────────────────────────
// Replace these placeholder URLs with your real Google Form share links.
// Find a link in Google Forms via the "Send" button → the link (chain) icon.
//
// • CONTACT_FORM_URL   → general "Get in touch" / contact inquiries
// • APPLICATION_FORM_URL → job applications (used on every careers listing)
//
// Until you paste real links, the buttons point at "#" and show a small
// "coming soon" note instead of opening a broken tab.
// ─────────────────────────────────────────────────────────────────────────────

export const CONTACT_FORM_URL = '';      // e.g. 'https://forms.gle/your-contact-form'
export const APPLICATION_FORM_URL = '';  // e.g. 'https://forms.gle/your-application-form'

// Helper: is a given link configured yet?
export const isConfigured = (url) => typeof url === 'string' && url.trim().length > 0;
