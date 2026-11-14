# Motion and 3D Specification (Draft)

## Motion vocabulary
| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` (expo-out) | Reveals, entrances |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Transitions, nav |
| `--dur-fast` | 160 ms | Hover, press, focus |
| `--dur-base` | 420 ms | Component reveals |
| `--dur-slow` | 900 ms | Headline lines, section transitions |
| Stagger | 60–90 ms | Lists, headline lines |

## Systems
- **GSAP + ScrollTrigger** for scroll-linked timelines and the hero sequence (already installed). Use `@gsap/react`'s `useGSAP` for cleanup.
- **CSS transitions** for hover/focus/press.
- **Framer Motion: retire** (overlaps GSAP; removes ~33 kB gzip). Route transitions move to a small GSAP/CSS helper. Decision D4.
- **No smooth-scroll library** by default; native scrolling keeps anchors, history and accessibility intact.

## Behaviours
| Area | Behaviour | Guardrail |
|---|---|---|
| Hero | Headline line reveals (≤ 1.2 s total), 3D centerpiece fades in after LCP, gentle cursor parallax (desktop pointer only), slow scroll-linked rotation as hero leaves | Copy readable instantly without JS; no loader |
| Sections | Header wipe + content rise on enter, once | No content hidden if JS fails (start visible, enhance) |
| Work | Project panels with image scale/clip transitions on hover/focus; one pinned showcase moment on desktop only | Links and detail always reachable; no pin on touch |
| Process | Progress line fills as steps enter | |
| Nav | Header condenses on scroll; drawer slides with focus trap | Esc closes; focus returns to toggle |
| Form | Field focus, inline validation, loading/success/error states | Status announced via `aria-live` |
| Cursor | Custom cursor only for fine pointers; never hides the native cursor for text | Off for touch and reduced motion |

## 3D scope
- One scene only: the hero. Existing Three.js scene is the starting point; direction is an engineered, architectural form (precision lattice / modular structure) rather than generic orbits.
- Budget: ≤ 150 kB gzip, ≤ 30k triangles, DPR cap 1.5 (1.25 on mobile), pause when off-screen or tab hidden.
- Fallback: static pre-rendered image (AVIF/WebP) when WebGL fails, `prefers-reduced-motion`, `saveData`, or low-end device heuristics (`deviceMemory ≤ 4` or `hardwareConcurrency ≤ 4`).

## Reduced motion
All scroll choreography off; content displayed in final state; 3D replaced by the static image; hover changes limited to colour/opacity.
