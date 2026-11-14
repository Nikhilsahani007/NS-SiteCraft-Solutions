# Implementation Roadmap

Effort bands: **S** ≤ 1 day, **M** 2–3 days, **L** 4–6 days of agent work, excluding owner review time. Every phase ends at an approval gate; nothing merges to `main` (production) without owner approval.

| Phase | Objective | Key tasks | Depends on | Deliverables | Risks | Testing | Exit gate | Effort |
|---|---|---|---|---|---|---|---|---|
| **0 Takeover** ✅ | Understand reality | Audit repo, build, browser pass, docs | — | `docs/project/*` | — | Build + browser evidence | Owner approves findings + decisions D1–D5 | S |
| **0.5 Hotfix** (proposed) | Stop production harm now | Fix route crash (provide theme or convert Button/NotFound), make homepage form honest (route to working path or mailto until Phase 6), hide unverified stats/outcomes | D1 | Small PR | Merge redeploys prod | Playwright smoke all routes | Owner merges | S |
| **1 Product & design foundation** | Agree what the site says and looks like | IA per brief §5, content inventory with truth status, copy drafts, design tokens, type evaluation, section-by-section spec, hero 3D concept sketches | Owner content inputs (Q1–Q4) | Approved DESIGN-SYSTEM, MOTION-SPEC, content files draft, mock-ups | Content inputs late | Contrast checks on tokens | Owner approves spec + mock-ups | M |
| **2 Technical foundation** | Clean base | Remove styled-components/Framer/unused deps, restructure folders, tokens.css, motion utilities, ESLint, Playwright smoke suite, pre-render spike, delete dead code (approved) | 1 | Responsive shell, CI-able tests | Regressions | Build, smoke, axe | Clean build, shell approved | M |
| **3 Hero & navigation** | First impression | Nav + drawer (focus trap), hero copy/CTA, new 3D scene, static fallback, device heuristics | 2 | Hero + nav | 3D perf on mobile | Lighthouse mobile, reduced motion, WebGL-off | Owner approves hero | M–L |
| **4 Core sections** | Explain the business | Credibility, Services (6), Expertise, Industries, Process, Technology, Footer | 2, content | Sections | Over-animation | Responsive, keyboard, axe | All sections approved | L |
| **5 Portfolio & founder** | Prove capability | Real project showcases + case-study pages, status labels, founder, reviews (honest) | Q2 assets + permissions | Work pages | Missing assets/permission | Content truth check | Claims/assets approved | M |
| **6 Conversion** | Enquiries arrive | `/api/enquiry`, Turnstile, provider, states, privacy copy | D2, accounts + env vars | Working form | Deliverability | End-to-end delivery test to real inbox | Verified delivery | M |
| **7 QA & optimisation** | Ship-ready | Cross-browser, 5 widths, a11y, SEO (OG, JSON-LD, sitemap), perf budgets, link check | 3–6 | QA report | — | Full QA-TEST-PLAN | Critical defects closed | M |
| **8 Release & handover** | Go live | Preview sign-off, merge, smoke, domain (if approved), runbook | 7, owner approval | Live site, handover | DNS | Production smoke | Owner approves release | S |
