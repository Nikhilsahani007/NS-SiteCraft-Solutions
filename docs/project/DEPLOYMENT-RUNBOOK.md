# Deployment Runbook

## Current setup (audited)
- **Host:** Vercel project linked to this GitHub repo; every push to `main` creates a Production deployment. Production alias: `ns-sitecraft-solutions.vercel.app`. Custom domain status unknown (needs owner confirmation).
- **Root directory:** `frontend/` (has `vercel.json` with SPA rewrite, cache and security headers).
- **Build:** `npm ci && npm run build` → `frontend/dist`.
- **Backend:** not deployed.

## Environment variables (names only)
| Name | Where | Phase |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | Vercel (currently also committed) | Retire with D2 |
| `VITE_GA_MEASUREMENT_ID` | Vercel (optional) | — |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `VITE_TURNSTILE_SITE_KEY` | Vercel, Production + Preview | Phase 6 |

Never commit values. `.env.production` files are to be removed from tracking (owner approval).

## Release procedure (owner-approved releases only)
1. PR from `claude/*` branch; Vercel builds a Preview URL.
2. Run QA-TEST-PLAN against the preview; attach evidence.
3. Owner reviews preview and approves.
4. Owner merges (or explicitly instructs a merge) → Vercel Production deploy.
5. Smoke test production: all routes, form delivery, console clean.

## Rollback
Vercel dashboard → Deployments → previous Production deployment → "Promote to Production" (instant). Then revert the merge commit on `main` via PR.

## Domain / DNS
No changes without explicit owner approval. If `nssitecraft.com` is to be attached: add domain in Vercel, set records at the registrar per Vercel's instructions, verify HTTPS, update canonical/OG/sitemap URLs in one PR.
