# Decision Log

| ID | Date | Decision | Options considered | Recommendation / rationale | Status |
|---|---|---|---|---|---|
| D0 | 2026-11-12 | Work in small PRs on `claude/*` branches; `main` = production | — | Vercel deploys every `main` push | Adopted (from brief) |
| D1 | 2026-11-12 | Ship a hotfix before the redesign? | (a) Hotfix now, (b) wait for Phase 2 | (a): 6 routes crash and the homepage form fakes success on production today | **Approved 2026-11-13** (plan approved, hotfix first) |
| D2 | 2026-11-12 | Enquiry delivery route | (a) Vercel function + Resend + Turnstile, (b) EmailJS, (c) Express + Mongo backend | (a): server-side validation and spam control, no server to host, free tiers; needs owner-created accounts | **Approved 2026-11-13** (with plan); accounts pending |
| D3 | 2026-11-12 | Future of `backend/` | (a) Archive to a branch/tag and remove from `main`, (b) keep and deploy, (c) leave as-is | (a): unused, failing tests, extra hosting; history preserved | **Awaiting owner** |
| D4 | 2026-11-12 | Architecture and libraries | Keep React + Vite with CSS Modules, GSAP, vanilla Three.js; remove styled-components, Framer Motion, R3F, axios, clsx | Smallest change that fixes root causes; one styling and one motion system | **Approved 2026-11-13** (with plan) |
| D5 | 2026-11-12 | Unverified claims | (a) Remove until confirmed, (b) keep | (a): brief non-negotiable | **Awaiting owner** (confirm list in audit A4) |
