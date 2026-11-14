# QA Test Plan

## Environments
Local production build (`vite build && vite preview`) and Vercel preview deployments per PR. Production smoke test only after an approved merge.

## Matrix
| Dimension | Values |
|---|---|
| Widths | 320, 375, 768, 1024, 1366, 1920, 2560 px |
| Browsers | Chromium, Firefox, WebKit (Playwright); real Safari iOS spot check by owner |
| Modes | default, `prefers-reduced-motion`, WebGL disabled, JS disabled (pre-rendered content), slow 4G |

## Automated (added in Phase 2)
- Playwright smoke: every route renders, no console errors, no horizontal overflow, h1 present.
- Link check: all internal links and anchors resolve; external links return 2xx/3xx.
- axe-core per route: 0 serious/critical.
- Lighthouse CI (mobile): budgets from REQUIREMENTS N1.
- Form: client validation, server validation (bad payloads rejected), honeypot, Turnstile failure path, provider failure path shows error, success only on 200.

## Manual
- Keyboard-only run of every page (skip link, focus order, drawer focus trap, Esc).
- Screen reader spot check (VoiceOver/NVDA) on nav, hero, form.
- Content truth review: every claim matched to an entry in DECISION-LOG.
- Visual review against approved mock-ups.

## Evidence
Each phase PR lists commands run, results, and screenshots. Nothing is marked complete without it.

## Phase 0 baseline
See CURRENT-STATE-AUDIT.md §4–5: build passes; backend tests 0/26; 6 routes crash; homepage form fakes success; legal pages overflow at 375 px; muted text contrast below AA.
