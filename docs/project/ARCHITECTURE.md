# Architecture

## Current (audited 2026-11-12)
React 18 + Vite 5 SPA (`frontend/`), deployed to Vercel on every push to `main`. Express/Mongo API (`backend/`) exists but is not deployed or called. Details in CURRENT-STATE-AUDIT.md §3.

## Recommendation: evolve, do not rebuild
Keep React + Vite. The foundation (routing, code splitting, Helmet, CSS Modules, tokens, Vercel config) is sound; the problems are concentrated in a few files and in content, not the stack. A full migration (e.g. to Next.js or Astro) would cost one to two phases without fixing the trust problems. Re-evaluate only if pre-rendering below proves insufficient.

### Target structure
```
frontend/
  api/enquiry.js              # Vercel serverless function (decision D2)
  public/                     # og-image.png, fallback hero image, fonts
  src/
    content/                  # site.js, services.js, projects.js, process.js, tech.js (approved copy only)
    components/               # Button, SectionHeader, Nav, MobileDrawer, Footer, FormField ...
    sections/                 # Hero, Credibility, Services, Expertise, Industries, Work, Process, Tech, Founder, Reviews, Contact
    scenes/HeroScene/         # Three.js scene + static fallback
    motion/                   # gsap setup, reveal helpers, reduced-motion guard
    styles/                   # tokens.css, base.css
    pages/                    # Home (composes sections), Services, Work, About, Contact, Legal, NotFound
```

### Decisions embedded
- **Styling:** CSS Modules + global tokens only. Remove styled-components (fixes the crash class in A1).
- **Motion:** GSAP + ScrollTrigger + CSS. Remove Framer Motion.
- **3D:** vanilla Three.js, lazy-loaded after first paint, with static fallback. Remove unused `@react-three/*`.
- **Content:** all copy and claims in `src/content/*` so they can be reviewed in one place.
- **SEO:** add build-time pre-rendering of routes (e.g. `vite-plugin-prerender`-style static generation or a small Puppeteer/`react-dom/server` script) so content and meta exist without JS. Evaluate in Phase 2; one dependency at most.
- **Enquiry:** see below.

## Enquiry workflow (recommended, decision D2)
```
Browser form ──POST /api/enquiry──▶ Vercel function
  client validation                 ├─ verify Cloudflare Turnstile token
  honeypot field                    ├─ validate + sanitise (same schema as client)
  aria-live status                  ├─ rate limit per IP (in-memory/edge best effort)
                                    ├─ send email via Resend (or SMTP) to approved inbox
                                    └─ return 200 only after the provider accepts
```
Environment variable names (values never committed): `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `VITE_TURNSTILE_SITE_KEY`.

Alternatives considered: EmailJS (already partly wired; no server-side validation, client-exposed IDs, weaker spam control) and the existing Express + Mongo backend (needs separate hosting, a database and maintenance for a single form).

## Backend folder
Not needed for the recommended path. Proposal: move to an `archive/backend` branch or tag and remove from `main` after approval (decision D3). Nothing is deleted from history.
