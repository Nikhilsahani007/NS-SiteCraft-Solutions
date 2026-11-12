# Design System (Draft — Phase 1 will finalise)

Status: **draft for approval**. Built on the existing token layer in `frontend/src/index.css`, which already matches the approved obsidian / warm white / electric blue direction.

## Principles
1. Trust first: hierarchy, legibility and evidence before effect.
2. Every visual element has a job. No decorative blobs, generic gradients or default glassmorphism.
3. Editorial composition: strong grid, generous space, asymmetric where it helps reading.
4. Mixed surfaces: dark obsidian for cinematic moments, warm off-white bands for reading-heavy sections (work detail, process, founder).

## Colour tokens (proposed)
| Token | Value | Use |
|---|---|---|
| `--obsidian-950` | `#08080c` | Page ground (existing) |
| `--obsidian-900` | `#0f1015` | Surfaces (existing) |
| `--obsidian-800` | `#14151e` | Elevated (existing) |
| `--paper-50` | `#f6f4ef` | Warm white reading surface (new) |
| `--ink-900` | `#111216` | Text on paper |
| `--text-strong` | `#f8fafc` | Primary text on dark |
| `--text-body` | `rgba(248,250,252,.72)` | Body on dark (≥ 7:1) |
| `--text-muted` | `rgba(248,250,252,.56)` | Labels (replaces .28 / .18, ≥ 4.5:1) |
| `--accent` | `#3b82f6` | Electric blue, used sparingly: CTAs, focus, key lines |
| `--accent-strong` | `#60a5fa` | Accent text on dark (contrast) |
| `--focus` | `#93c5fd` | Focus ring |

Rule: accent covers less than ~5 % of any screen.

## Typography
- Current: DM Serif Display (display) + Inter (text), via Google Fonts.
- Proposal: keep Inter for text; evaluate a modern editorial sans display (Manrope or a licensed alternative) against the current serif in Phase 1 mock-ups. Self-host with `font-display: swap` and subset to Latin.
- Fluid scale with `clamp()`: display 56–112 px, h2 36–64 px, h3 22–28 px, body 16–18 px, label 12–13 px uppercase tracking .14em.

## Layout
12-column grid, max content width 1280 px (1440 px for showcase), gutters 16 px mobile / 24 px tablet / 32 px desktop. Section spacing `clamp(96px, 14vw, 200px)`.

## Components (to build as CSS Modules)
Button (primary, secondary, text), Link-arrow, SectionHeader (label + title + lede), ServiceItem, ProjectShowcase, ProcessStep, TechList, FounderCard, FormField (input, select, textarea, error), StatusMessage, Nav, MobileDrawer, Footer.

## Imagery
Real project screenshots in device-agnostic frames; genuine founder portrait. No stock people, no AI-generated people.
