# Project Status

**Updated:** 2026-11-13 · **Overall:** 🟠 Amber — hotfix ready for review; production stays broken until the owner merges it.

**Current phase:** 0.5 Hotfix — ready for owner review. Phase 0 approved 2026-11-13.

## Completed
- Read the handoff brief and README.
- Audited repo, history, deployments, dependencies, env var names, docs.
- `vite build` (pass), backend `jest` (0/26 pass), Playwright pass at 5 widths + reduced motion + keyboard + form.
- Created the 12 project documents in `docs/project/`.

## Phase 0.5 hotfix (2026-11-13)
- Mounted a static styled-components theme in `App.jsx`: all 10 routes render with no console errors at 375 and 1920 px (Playwright, local production build).
- Homepage form now validates, has a honeypot, sends via the existing EmailJS template, and shows success only when EmailJS accepts; failures show an error with the email address. Tested: validation, blocked-network failure, mocked success, honeypot.
- Removed the 15+/98%/30d stats and project outcome claims.
- Fixed horizontal overflow on `/contact` at 375 px.
- Known, not fixed here: `/services` cards overflow briefly during their slide-in at 375 px; several inner pages have no `<h1>`; EmailJS delivery itself could not be tested from the sandbox.

## Homepage rebuild, first cinematic slice (2026-11-13)
Owner instruction: park email/backend, build the 3D and cinematic frontend now.
- New homepage at `/` (`pages/HomePage`), composed from `src/sections/*`, content in `src/content/site.js`, tokens scoped in `sections/home.module.css`. The old `CinematicHome` is no longer routed but is kept in the repo.
- New hero scene `scenes/HeroStructure`: a five-layer architectural model of a product (infrastructure to experience), assembles on load, follows the pointer, separates on scroll, pauses off-screen. Static SVG fallback without WebGL or with data saver; single static frame with reduced motion. 3D chunk 134 kB gzip, loaded after first paint.
- Sections: services (6), expertise and stack, industries, selected work, process (6 steps), founder, honest reviews note, contact, footer. No GSAP or Framer Motion on the homepage; motion is CSS plus two small scroll hooks.
- Navigation: Process link, skip link, closed drawer is `inert`, Esc closes and returns focus.
- Evidence (Playwright, local production build): no horizontal overflow and no hidden content at 320/375/768/1024/1366/1920/2560; axe-core WCAG 2.1 AA: 0 violations on `/`; reduced motion and no-WebGL paths checked; all 10 routes render; form validation, failure, success and honeypot paths pass.
- Not done yet: inner pages (`/services`, `/projects`, `/about`, `/contact`, legal) still use the old design, styled-components and Framer Motion; real project screenshots and case studies; founder photo; FAQ removed pending confirmed terms; Safari/Firefox not yet tested.
- Content needing owner confirmation: founder quote (shortened from the handoff HTML), "MSME registered", "clients across India", and the four projects shown.

## Inner pages in the new design (2026-11-14)
- Services, Solutions, Pricing, Work (/projects), About, Contact, Privacy Policy, Terms and the 404 page now use the homepage design system through a shared shell (`src/sections/PageShell.jsx`, `LegalPage.jsx`) and the styles in `src/sections/home.module.css`. No page imports styled-components or Framer Motion any more; only the app shell does.
- Content kept from the old pages, with unverified claims removed: "We'll respond within 24 hours", "clients managing thousands of students", the "Recommended" pricing badge and the first-person portfolio copy on /projects. Pricing figures, support periods and package features are unchanged and still need owner confirmation (D5).
- Verified on a local production build: 10 routes at 320, 390, 768, 1024, 1440 and 2560 px with no horizontal overflow, one h1 and one main landmark each, no console errors; axe-core WCAG A/AA plus best-practice 0 violations on all nine inner routes at 390 and 1440; scroll reveals all complete with motion on; project filter, footer and CTA navigation, legal contents links, skip link, and the contact form validation and honest failure path.
- Not verified: Firefox, Safari, real devices, real email delivery (still parked).
- Left in place, unused, pending approval to delete: the old per-page CSS modules, `components/Button`, `PageTransition`, `pages/Home`, `pages/CinematicHome`.

## Next
1. Owner reviews and merges the hotfix.
2. Phase 1: content inventory and design spec.
3. Collect owner inputs Q1–Q4.

## Decisions needed
D3 backend archive, D5 claims list. D1, D2, D4 approved. See DECISION-LOG.md.

## Owner inputs needed
- Q1. The handoff's `index (1).html` (not in the repo) — is it newer than the repo?
- Q2. Portfolio: URLs, screenshots and permission for Sanéa Pret, Siddhartha Group of Schools, AskAI, Stockmate; is "Inventory Management System" Stockmate?
- Q3. Which email is canonical (Gmail vs `contact@nssitecraft.com`), phone/WhatsApp, social links.
- Q4. Which claims are true: MSME/Udyam wording, Est. 2024, project count, on-time %, 30-day support, 24 h reply, pricing "starting from" figures.

## Blockers
None for Phase 1 drafting. Phase 5–6 blocked on Q2/Q3 and D2 accounts.
