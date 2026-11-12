# Project Charter

**Project:** NS SiteCraft Solutions website transformation
**Owner / approver:** Nikhil Sahani
**Delivery lead:** Claude (analyst, project manager, engineer, design and QA roles)
**Started:** 2026-11-12 · **Status:** Phase 0 complete, awaiting approval

## Goal
A premium, cinematic, interactive and professionally engineered website that makes potential customers confident enough to contact NS SiteCraft Solutions. Trust and clarity outrank spectacle.

## Business context
NS SiteCraft Solutions is a Hyderabad-based technology studio building websites, web apps, mobile apps, e-commerce, custom software and AI integrations for schools, colleges, coaching institutes, startups, healthcare providers, retailers and growing businesses. The conversion goal is qualified project enquiries and discovery calls.

## In scope
- Every section in the brief §5: navigation, hero, credibility, services, expertise, industries, selected work, process, technology, founder, reviews, contact, footer, plus existing inner pages and legal pages.
- A working, secure enquiry workflow.
- Design system, motion system, selective 3D hero with fallback.
- Accessibility (WCAG 2.1 AA), SEO, performance, cross-browser QA.
- Project documentation in `docs/project/`.

## Out of scope (unless approved)
- Admin dashboard, CMS, blog, client portal, payments.
- Paid services, domain purchases, DNS changes.
- Fabricated content of any kind.

## Success criteria
See REQUIREMENTS.md §4 (definition of done). Headline: a visitor understands what NS SiteCraft does, who it serves and how to start a project within the first screen, and every claim on the site is true.

## Approval gates
Owner approval is required at the end of every phase, and always before: merging to `main` (which deploys production on Vercel), deploying, DNS or domain changes, purchases or new paid accounts, deleting code or data, publishing any claim, project or testimonial.

## Constraints
No Tailwind CSS. No fabricated clients, reviews, statistics, credentials or outcomes. No secrets in source, chat or docs. Small, reviewable pull requests with clean history.
