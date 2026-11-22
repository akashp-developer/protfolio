# Akash P · Developer portfolio

A Next.js App Router portfolio with a twelve-section homepage, service and skill pages, a searchable project archive, three case studies, education, about, résumé, and contact pages.

## Local development

Use Node.js 24 and npm.

```bash
npm ci
npm run dev
```

The content lives under `src/data`, with separate modules for the profile, projects, skills, education, experience, and social links. The bundled PDF is a byte-for-byte copy of the supplied résumé. The cover art is an original illustration of each project’s subject. Case studies support approved screenshots and optional source and demo links. The supplied LinkedIn URL opens a general feed. The résumé establishes no employment, certifications, project metrics, or public project links, so those entries are absent from the site.

To enable the contact form locally, copy `.env.example` to `.env.local`, set `RESEND_API_KEY`, `CONTACT_FROM`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN`, then restart the dev server. Submissions go to the profile email in `src/data/profile.ts`. Replies go to the visitor’s address.

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

Copy the variable names from `.env.example` into Vercel’s environment settings. Use a sender on a Resend-verified domain and a shared Upstash Redis database. The contact endpoint enforces a per-address limit of four attempts per fifteen minutes and a total limit of fifty attempts per hour. Cloud limits depend on the Vercel-provided client IP header. The form offers the email link when the integrations are unavailable.

## Design and implementation

The 2:15 reference recording informed the homepage sequence, chapter rail, sticky service index, editorial rows, Geist typography, and mobile menu. The project uses custom design tokens, Tailwind utilities, and a CSS-driven adaptation of the React Bits LogoLoop. GSAP handles entrance and scroll reveals. Motion handles navigation, service numbering, process detail, and form feedback. Anchor navigation uses native browser scrolling and respects reduced-motion preferences.

The upstream React Bits license is included beside the component in `src/components/react-bits`.

See [REFERENCE_ANALYSIS.md](REFERENCE_ANALYSIS.md) for frame timings and measured reference styles and [VISUAL_QA.md](VISUAL_QA.md) for comparison notes and verification.
