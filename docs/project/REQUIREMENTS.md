# Requirements

Priority: **M** must, **S** should, **C** could. Status: baseline as of the Phase 0 audit.

## 1. Functional

| ID | Requirement | Pri | Acceptance criteria | Baseline |
|---|---|---|---|---|
| F1 | Every route renders without runtime errors | M | Zero uncaught errors on all routes at 375/768/1366/1920/2560 px | **Fails** (6 routes crash) |
| F2 | Navigation: Services, Work, Process, About, Contact + project CTA | M | Links reach correct targets; active state; keyboard operable; closed drawer not focusable | Partial |
| F3 | Hero states what is built and for whom within one screen | M | Copy names services and audience; primary + secondary CTA visible without scrolling at 375×667 | Partial |
| F4 | Services: websites, web apps, mobile apps, e-commerce, custom software, AI integrations | M | 6 services with audience, deliverables and CTA | 4 of 6 |
| F5 | Expertise, Industries, Technology sections | M | Only verified technologies and served industries | Missing |
| F6 | Selected work uses real projects only | M | Each item has status label (completed / in progress / prototype / concept), real screenshot, role, stack, link if public, owner-approved text | **Fails** |
| F7 | Founder/about with approved bio and photo | S | Owner-approved copy and image | Missing |
| F8 | Reviews: only genuine, permissioned feedback | M | Either real reviews with source, or an honest "collecting reviews" note, or section omitted | Missing |
| F9 | Enquiry form delivers submissions | M | Server-side validation; spam protection (honeypot + challenge); rate limit; loading/success/error states; delivery verified end-to-end to the approved inbox; no success shown unless delivered | **Fails** (fake success) |
| F10 | Contact details consistent everywhere | M | One approved email/phone across UI, JSON-LD, legal pages | Inconsistent |
| F11 | Footer links all resolve | M | Link checker: 0 broken | Unknown on inner routes |
| F12 | 404 page | M | Renders and links home | **Fails** |

## 2. Non-functional

| ID | Requirement | Target |
|---|---|---|
| N1 | Performance (mobile, throttled 4G, mid-range device) | LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms; initial JS ≤ 200 kB gzip excluding the lazy 3D chunk; 3D chunk ≤ 150 kB gzip and never blocks LCP |
| N2 | Accessibility | WCAG 2.1 AA: contrast ≥ 4.5:1 body / 3:1 large; skip link; visible focus; labelled forms; alt text; axe-core 0 serious/critical |
| N3 | Reduced motion | `prefers-reduced-motion` disables scroll choreography and swaps 3D for a static image |
| N4 | Responsive | No horizontal overflow 320–2560 px; touch targets ≥ 44 px |
| N5 | SEO | Unique title/description per route; valid JSON-LD; OG image exists; sitemap only lists live routes; content available without JS (pre-rendered) |
| N6 | Security | No secrets in repo or client; server-side validation and sanitisation; rate limiting; security headers kept |
| N7 | Browsers | Current Chromium, Firefox, WebKit/Safari |
| N8 | Maintainability | One styling approach (CSS Modules + tokens), one motion system, content in data files, ESLint configured |

## 3. Content truth rules
Every number, badge, project outcome, testimonial and registration claim needs owner confirmation recorded in DECISION-LOG.md before it ships. Unconfirmed items are removed, not softened.

## 4. Definition of done
Brief §10 is adopted in full and tracked in QA-TEST-PLAN.md.
