# Risk Register

Scale: L/M/H. Owner: N = Nikhil, C = Claude.

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| R1 | Production currently crashes on 6 routes and fakes form success; leads and trust lost daily | H (happening) | H | Hotfix PR (Phase 0.5) | C/N | **Open** |
| R2 | Any merge to `main` redeploys production | H | H | Feature branches + Vercel preview URLs; owner merges | C | Open |
| R3 | Handoff HTML not in repo; its content may be newer than the repo | M | M | Owner supplies the file; content is merged into Phase 1 inventory | N | Open |
| R4 | Unverified claims (stats, outcomes, MSME, Est. 2024) | H | H | Remove until confirmed (D5) | N/C | Open |
| R5 | Portfolio assets/permissions unavailable | M | H | Request early; status labels; ship with fewer, real projects | N | Open |
| R6 | Email/domain not verified (`contact@nssitecraft.com` vs Gmail) | M | H | Owner confirms inbox; end-to-end delivery test | N | Open |
| R7 | 3D hurts mobile performance | M | M | Budget, lazy load, device heuristics, static fallback | C | Open |
| R8 | `.env.production` files committed to public repo | M | M | Remove from tracking, rely on Vercel env vars; owner rotates anything that was ever real | C/N | Open |
| R9 | SPA content invisible to non-JS crawlers | M | M | Pre-render in Phase 2 | C | Open |
| R10 | Font/image licensing | L | M | Use OFL fonts, self-host; owner-owned screenshots only | C | Open |
| R11 | Reference site inspection limited | M | L | Owner shares screenshots/Reel; direction rests on brief | N | Open |
| R12 | Scope creep from "cinematic everything" | M | M | 60/25/15 trust/motion/3D weighting; approval per phase | C | Open |
