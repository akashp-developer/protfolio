# Akash P · Developer portfolio

A Next.js App Router portfolio with a twelve-section homepage, service and skill pages, a searchable project archive, three case studies, education, about, résumé, and contact pages.

## Local development

Use Node.js 24 and npm.

```bash
npm ci
npm run dev
```

The content lives in `src/data/portfolio.ts`. The bundled PDF is a byte-for-byte copy of the supplied résumé. The cover art is an original illustration of each project’s subject. Case studies support approved screenshots and optional source and demo links. The supplied LinkedIn URL opens a general feed. The résumé establishes no employment, certifications, project metrics, or public project links, so those entries are absent from the site.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Set `PLAYWRIGHT_CHANNEL=msedge` to use installed Edge for the Chromium tests. Tests intercept contact submissions to exercise success and error feedback. The route tests check validation, origin handling, payload limits, and the honeypot without sending email.

## Vercel

Import the repository in Vercel, select the Next.js framework preset and Node.js 24, and use the default build and output settings. Set `SITE_URL` to the deployment’s canonical origin to enable indexing and sitemap entries. Deployments with this setting omitted remain non-indexable.

Copy the variable names from `.env.example` into Vercel’s environment settings. Add a verified sender in Resend, a delivery inbox, and a shared Upstash Redis database. The contact endpoint enforces a per-address limit of four attempts per fifteen minutes and a total limit of fifty attempts per hour. Cloud limits depend on the Vercel-provided client IP header. The form offers the email link when the integrations are unavailable.

## Design and implementation

The reference informed the homepage sequence, editorial case studies, skill expansions, and separate archive. The project uses custom design tokens, Tailwind utilities, a React Bits LogoLoop ticker, and accessible control patterns. GSAP handles entrance and scroll reveals, while Motion handles navigation, process detail, and form feedback. Anchor navigation uses native browser scrolling and respects reduced-motion preferences.

The upstream React Bits license is included beside the component in `src/components/react-bits`.
