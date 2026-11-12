# Current-State Audit (Phase 0)

- **Audit date:** 2026-11-12
- **Audited commit:** `6b88095` on `main` (same commit as the latest GitHub "Production" deployment, 2026-10-11)
- **Method:** source review of the whole repository, `vite build`, backend `jest` run, and a Playwright/Chromium pass over a local production build (`vite preview`) at 375, 768, 1366, 1920 and 2560 px, plus reduced-motion, keyboard and form checks.
- **Not done:** the live URL (`ns-sitecraft-solutions.vercel.app`) and `nssitecraft.com` could not be reached from the audit environment (network policy), so live findings are inferred from the deployed commit, not observed on the live host. Teckat.com could only be read as extracted text (see section 9).

Status keys used against the handoff brief: **CONFIRMED**, **DIFFERENT**, **NOT FOUND**, **NEEDS OWNER CONFIRMATION**.

---

## 1. Headline findings

| # | Severity | Finding | Evidence |
|---|---|---|---|
| A1 | **Critical** | 6 of 10 routes crash to "Something went wrong": `/services`, `/solutions`, `/pricing`, `/about`, `/contact` and the 404 page. `components/Button/Button.jsx` and `pages/NotFound/NotFound.jsx` use styled-components `theme.*`, but no styled-components `ThemeProvider` is mounted in `App.jsx`. | Browser console: `TypeError: Cannot read properties of undefined (reading 'primary')` at `Button`. Reproduced at mobile and desktop widths. |
| A2 | **Critical** | The homepage contact form fakes success. `handleFormSubmit` in `CinematicHome.jsx` waits 1.6 s with `setTimeout` and shows "We'll review your brief and respond within 24 hours" without sending anything. | Playwright submit: no POST or EmailJS request; success message shown. |
| A3 | **Critical** | The only form wired to a real service (EmailJS on `/contact`) is on a route that crashes (A1), so no enquiry path currently works on the site. | A1 + A2. |
| A4 | **High** | Unverified claims are published: "15+ Projects Delivered", "98% On-Time Delivery", project outcomes such as "40% reduction in average response time", "first-page Google ranking with 95+ Lighthouse score", "Est. 2024", "MSME Registered". | `CinematicHome.jsx` lines ~94-120, 512-514, 1069-1075; `data/projects.js`. |
| A5 | **High** | None of the portfolio projects named in the brief (Sanéa Pret, Siddhartha Group of Schools, AskAI, Stockmate) exist in the repo. The six projects shown have no links, screenshots or demos (`github: null, demo: null`). | `data/projects.js`, `Projects.jsx`. |
| A6 | **High** | The handoff's audited `index (1).html` (light theme, Fraunces, "Websites & software for your digital growth", industries/founder/reviews sections) is **not in this repository or its history**. The repo is a different, darker React build. | `git log -S"digital growth"` and `-S"Fraunces"` return nothing. |
| A7 | **High** | Every push to `main` creates a Vercel Production deployment (19 so far). Merging anything, even docs, redeploys production. | GitHub deployments API. |
| A8 | Medium | `backend/.env.production` and `frontend/.env.production` are committed to a **public** repo. Current values in the backend file are placeholders (Mongo user/password and JWT secret are placeholder text); the frontend file holds EmailJS service/template/public IDs, which are client-visible by design. No live secret was found, but the pattern is unsafe. | `git log --diff-filter=A` (added in `90ae56a`). Values not reproduced here. |
| A9 | Medium | The Express/Mongo backend is not used by the frontend (no API calls), has no deployment, and its tests fail 26/26 (wrong `require('../../../src/app')` path, and no MongoDB). `app.js` calls `Sentry.Handlers.*`, which no longer exists in `@sentry/node` v10. `xss-clean` is unmaintained. | `npx jest`: 4 suites failed. |
| A10 | Medium | Contact details are inconsistent: UI uses `nssitecraftsolution@gmail.com` and `+91 93909 69461`; `index.html` JSON-LD and noscript use `contact@nssitecraft.com`; JSON-LD `sameAs` lists LinkedIn/Twitter URLs that are unverified. | `index.html` lines 70-76, 118. |

## 2. Repository and Git

| Item | Finding |
|---|---|
| Visibility | Public, default branch `main`, homepage set to `https://ns-sitecraft-solutions.vercel.app`. |
| Branches | `main` only (plus this working branch). No stale feature branches. |
| History | 20 commits, 2026-02-10 to 2026-10-12, single author. Last two commits (2026-10-12) added `CinematicHome`, `HeroScene`, `CustomCursor` and the styled-components design-system scaffold. |
| Working tree | Clean. |
| Layout | `frontend/` (React 18 + Vite 5 SPA), `backend/` (Express 4 + Mongoose 8 API), root docs (`README.md`, `DEPLOYMENT.md`, `DEPLOYMENT_GUIDE.md`, `GITIGNORE_GUIDE.md`, `LIGHT_MODE_FIX.md`), `docker-compose.yml`, stray root `favicon.png`, `frontend/Flyer.html`. |

## 3. Architecture as built

- **Frontend:** React 18, Vite 5, React Router 6 with route-level `lazy()` splitting, `react-helmet-async` for per-page meta, CSS Modules for most pages plus a global `index.css` token layer.
- **Styling is mixed:** CSS Modules + CSS custom properties (primary), **and** styled-components (`Button`, `Card`, `Spinner`, `OptimizedImage`, `ThemeToggle`, `NotFound`, `design-system/theme/*`). The styled-components theme is never provided (A1). No Tailwind. **CONFIRMED** compliant with the no-Tailwind rule.
- **Motion:** GSAP 3 + ScrollTrigger (homepage, Services) **and** Framer Motion (route transitions via `AnimatePresence`, most inner pages). Two animation systems overlap.
- **3D:** `HeroScene.jsx` is a hand-written Three.js scene (octahedron core, torus rings, particles, fragments), lazy-loaded, pointer parallax, pixel ratio capped at 1.5, `try/catch` around renderer creation, reduced-motion check. Chunk is **529 kB min / 133 kB gzip**.
- **Unused dependencies:** `@react-three/fiber`, `@react-three/drei`, `axios`, `clsx` (no imports found). `@gsap/react` is installed but unused.
- **Dead code:** `pages/Home/Home.jsx` (1,001 lines) and `Home.module.css`, `components/Header`, `components/Footer`, `components/Card`, `components/ThemeToggle`, `design-system/theme/*` are not routed or imported by live routes.
- **Backend:** Express API with Joi validation, rate limiting, helmet, JWT admin auth, inquiry/content/pricing models, Swagger, Winston, Nodemailer. Not deployed, not called (A9).
- **Hosting:** Vercel (SPA rewrite + security/cache headers in `frontend/vercel.json`). `docker-compose.yml` for local Mongo/API/frontend with development-only credentials.

## 4. Build and test baseline

| Check | Result |
|---|---|
| `npm ci` (frontend, backend) | Pass. |
| `vite build` | **Pass**, 3.7 s. Warning: `HeroScene` chunk > 500 kB. Main `index` chunk 270 kB (94 kB gzip). |
| Backend `jest` | **Fail**: 4/4 suites, 26/26 tests (module path + no DB). |
| Lint / formatting | No ESLint or Prettier configured. |
| Frontend tests | None. |

## 5. Browser audit (local production build of the deployed commit)

| Route | Mobile 375 | Desktop 1920 | Notes |
|---|---|---|---|
| `/` | Renders | Renders | Canvas present; GSAP warnings for missing targets (`[data-reveal="scroll-hint"]`, empty selector); `THREE.Clock` deprecation warning. |
| `/services` `/solutions` `/pricing` `/about` `/contact` | **Crash** | **Crash** | A1. |
| `/projects` | Renders | Renders | No images, links or demos. |
| `/privacy-policy` `/terms-and-conditions` | Renders, **horizontal overflow** (400 px wide at 375 px viewport) | Renders | |
| unknown route (404) | **Crash** | **Crash** | A1. |

Additional checks:
- **Homepage at 768/1366/2560:** no horizontal overflow, no hidden text after scrolling.
- **Reduced motion:** page usable, no hidden text; the WebGL canvas still mounts (static). A true static fallback image would save GPU/battery.
- **Keyboard:** visible default focus outline. The mobile drawer links stay in the tab order while the drawer is closed (focus lands on Services/Work/About/Contact twice). No skip link.
- **Mobile menu:** toggle has `aria-label` and `aria-expanded`; opens correctly.
- **Contrast:** `--color-text-muted` (white at 28 %) and `--color-text-dim` (18 %) on `#08080c` are about 2.3:1 and 1.6:1, below WCAG AA 4.5:1. Used for labels and stat captions.
- **Mobile hero:** the 3D rings sit behind the sub-headline and reduce legibility at 375 px.
- Screenshots are stored outside the repo in the project files folder (`phase-0-audit/screenshots`).

## 6. Homepage content inventory (live route `/`)

| Order | Section | Content | Assessment |
|---|---|---|---|
| 1 | Nav | Logo, Services, Work, About, Contact, "Start a Project" | Keep structure; fix focus order. |
| 2 | Hero | "We turn ambitious ideas into digital experiences." + 3D | Strong visual baseline; copy is generic and does not say what is built or for whom (brief §10 first criterion). |
| 3 | Philosophy + stats | Quote + 15+/98%/30d | Stats unverified (A4). |
| 4 | Services | 4 cards: Web, Custom Software, AI, Digital Strategy | Brief lists 6 services (adds mobile apps, e-commerce as its own). |
| 5 | Selected work | 3 projects with outcome lines | Unverified (A4/A5). |
| 6 | Process | Discover, Design, Develop, Launch | Keep; extend with approvals/handover. |
| 7 | Studio | "A focused team", MSME, Est. 2024 | Needs confirmation. |
| 8 | FAQ | 5 Q&As incl. "30 days free support", "3-4 weeks" | Commitments need owner confirmation. |
| 9 | Contact | Fake form (A2), email, phone | Rebuild. |
| 10 | Footer | Inline in page | Links resolve to in-page anchors and legal pages. |

**Missing vs. brief §5:** Industries, Expertise/capabilities, Technology, Founder, Reviews sections.

## 7. SEO

| Item | Status |
|---|---|
| Per-route titles/descriptions via Helmet | **CONFIRMED** present. |
| Canonical, OG, Twitter tags | Present; `og:image` points to `/og-image.png`, which **does not exist** in `public/` (only `og-image-template.html`). |
| JSON-LD | Organization + WebSite + LocalBusiness. `SearchAction` is invalid (site has no search). `sameAs`, `foundingDate`, `numberOfEmployees` and email need confirmation. |
| Favicon link | `href="public/favicon.png"` (wrong for Vite; should be `/favicon.png`). |
| `robots.txt` / `sitemap.xml` | Present; sitemap lists 7 routes, 5 of which currently crash. |
| SPA rendering | Client-rendered only; crawlers that do not run JS see the `noscript` block. Pre-rendering is recommended (see ARCHITECTURE.md). |
| Google site verification meta | Present. |

## 8. Handoff brief §3 reconciliation

| Brief statement | Status | Repository reality |
|---|---|---|
| Site is a standalone ~50 KB HTML with embedded CSS/JS | **DIFFERENT** | React + Vite SPA with 10 routes plus an unused Express backend. |
| Title "NS SiteCraft Solutions", meta about schools/coaching/small businesses | **DIFFERENT** | Title "Digital Craftsmanship for Ambitious Businesses"; meta targets startups/businesses; education focus survives only in `/solutions` and keywords. |
| Light blue-tinted ground, white hard-shadow cards, navy/teal/amber, Fraunces + Inter | **DIFFERENT** | Obsidian `#08080c`, electric blue `#3b82f6`, DM Serif Display + Inter. Already close to the approved direction. |
| No WebGL/Three.js 3D in hero | **DIFFERENT** | Three.js hero scene exists. |
| IntersectionObserver reveals, no GSAP/ScrollTrigger | **DIFFERENT** | GSAP + ScrollTrigger and Framer Motion both in use. |
| Count-up statistics | **CONFIRMED** (different numbers: 15+/98%/30d instead of 8+/4/24h). |
| Mock browser/typing visual | **NOT FOUND** on the live route (exists only in dead `Home.jsx`). |
| Header scroll state and mobile nav toggle | **CONFIRMED** (`Navigation.jsx`). |
| Reduced-motion CSS support | **CONFIRMED** (CSS + JS checks). |
| Founder section "Nikhil Sahani, Full Stack Developer (MERN & Java)" | **NOT FOUND** on live routes. | 
| Reviews section "collecting our first reviews" | **NOT FOUND**. |
| Google review link points to `#contact` | **NOT FOUND** (no review link exists). |
| Contact email `contact@nssitecraft.com` | **DIFFERENT** — UI uses a Gmail address; `contact@` appears only in JSON-LD. **NEEDS OWNER CONFIRMATION** which is canonical. |
| Contact form is preview-only | **DIFFERENT and worse** — homepage form claims success without sending (A2). |
| 8+ services, 4 industries, 24 h reply claims | **DIFFERENT** — replaced by 15+/98%/30d and "respond within 24 hours". **NEEDS OWNER CONFIRMATION**. |
| MSME/Udyam registration | **NEEDS OWNER CONFIRMATION** (displayed in 4 places). |
| Portfolio: Sanéa Pret, Siddhartha, AskAI, Stockmate | **NOT FOUND** in repo. "Inventory Management System" may be Stockmate. **NEEDS OWNER CONFIRMATION**. |

## 9. Reference site observation (teckat.com)

Only an extracted-text view was available; CSS, scripts and rendering could not be inspected.
- *Observed:* homepage text shows a hero, a second banner, a services list (web/app, social media marketing, e-commerce, UI/UX, workshops, internships) and a footer with office locations and a link to a separate portfolio subdomain. Cloudflare email protection is used.
- *Not observable here:* typography, palette, motion libraries, 3D.
- *Interpretation:* none drawn yet. A visual inspection (screenshots or a browser session) is needed before MOTION-SPEC treats it as a reference.

## 10. What to preserve, redesign, rebuild, remove

| Preserve | Redesign | Rebuild | Remove (with approval) |
|---|---|---|---|
| React + Vite + Router + Helmet; route-level code splitting; CSS Modules + token layer; obsidian/blue palette; `vercel.json` headers; reduced-motion handling; mobile nav ARIA; Three.js hero approach (not R3F); process copy; legal pages; Google verification meta. | Hero copy and composition; services (6, per brief); homepage IA (add industries, expertise, tech, founder, reviews); type scale and contrast; navigation focus handling; project showcase. | Contact/enquiry flow; portfolio data (real projects only); styled-components pieces as CSS Modules; one motion system (GSAP + CSS); SEO assets (OG image, JSON-LD). | Dead `Home`, `Header`, `Footer`, `Card`, `ThemeToggle`, design-system theme; unused deps (`@react-three/*`, `axios`, `clsx`); committed `.env.production` files; unverified stats and outcomes. Backend: retire or archive (decision D3). |
