# Cheristral Studio

React + Vite single-page site. Fully static — no backend required. Ready to deploy to Cloudflare Pages.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build    # outputs to ./dist
npm run preview  # preview the production build locally
```

## Deploying to Cloudflare Pages

1. Push this folder to a GitHub/GitLab repo.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Framework preset:** Vite (or "None")
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy.

SPA routing and caching are handled by `public/_redirects` and `public/_headers`,
which Cloudflare picks up automatically from the build output.

## Forms (Google Forms)

The contact and job-application buttons open external Google Forms in a new tab —
there's no backend to set up. Right now they're placeholders.

To wire up your real forms, edit **one file**: `src/lib/formLinks.js`

```js
export const CONTACT_FORM_URL = 'https://forms.gle/your-contact-form';
export const APPLICATION_FORM_URL = 'https://forms.gle/your-application-form';
```

- `CONTACT_FORM_URL` — the "Get in touch" button on the About page.
- `APPLICATION_FORM_URL` — the "Apply Now" button on every job listing.

Get a link from Google Forms via **Send → link (chain) icon**. Until you add a
real link, the button shows a disabled "Form link coming soon" state instead of
opening a broken tab.

### Tip: pre-filling the job title

If you want each job's "Apply Now" to tell you which role it's for, create a Google
Form with a "Position" field, use **Get pre-filled link** to capture that field in
the URL, and you can extend `formLinks.js` / `FormCTAButton` to append it. Not
required — the basic setup works as-is.
