/**
 * motion.js — Unified Motion System
 * NS SiteCraft Solutions
 *
 * Provides reusable GSAP animation utilities and Framer Motion
 * variants that enforce a coherent motion language across all pages.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Motion constants ──────────────────────────────────────────
export const EASE = {
  out:     'power3.out',
  inOut:   'power3.inOut',
  expo:    'expo.out',
  back:    'back.out(1.4)',
  elastic: 'elastic.out(1, 0.4)',
  smooth:  [0.4, 0, 0.2, 1],
  reveal:  [0.16, 1, 0.3, 1],
};

export const DUR = {
  fast:  0.35,
  base:  0.65,
  slow:  1.0,
  xslow: 1.4,
};

export const STAGGER = {
  tight: 0.05,
  base:  0.10,
  loose: 0.16,
};

// ─── Reduced-motion guard ──────────────────────────────────────
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── GSAP Context factory ─────────────────────────────────────
export const createCtx = (scopeRef) =>
  gsap.context(() => {}, scopeRef);

// ─── Text split reveal ─────────────────────────────────────────
export function splitReveal(els, opts = {}) {
  if (prefersReducedMotion()) return gsap.timeline();

  const {
    trigger,
    start    = 'top 88%',
    stagger  = STAGGER.base,
    delay    = 0,
    duration = DUR.slow,
    y        = 60,
    once     = true,
  } = opts;

  const tl = gsap.timeline({
    scrollTrigger: trigger
      ? { trigger, start, once }
      : undefined,
  });

  const targets = Array.isArray(els) ? els : [els];

  targets.forEach(el => {
    if (!el) return;
    const rawHTML = el.innerHTML;
    const words = rawHTML.split(/(\s+)/);
    el.innerHTML = words
      .map(w =>
        w.trim()
          ? `<span class="sw" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="si" style="display:inline-block">${w}</span></span>`
          : w
      )
      .join('');
    const inners = el.querySelectorAll('.si');
    tl.fromTo(
      inners,
      { y, opacity: 0 },
      { y: 0, opacity: 1, duration, ease: EASE.expo, stagger, delay },
      0
    );
  });

  return tl;
}

// ─── Clip reveal ──────────────────────────────────────────────
export function clipReveal(targets, opts = {}) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1 });
    return;
  }

  const {
    trigger,
    start     = 'top 85%',
    stagger   = STAGGER.tight,
    duration  = DUR.base,
    direction = 'up',
    delay     = 0,
  } = opts;

  const clipFrom = {
    up:    'inset(100% 0% 0% 0%)',
    down:  'inset(0% 0% 100% 0%)',
    left:  'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }[direction];

  return gsap.fromTo(
    targets,
    { clipPath: clipFrom, opacity: 0 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration,
      ease: EASE.expo,
      stagger,
      delay,
      scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
    }
  );
}

// ─── Fade-up stagger ──────────────────────────────────────────
export function fadeUpStagger(targets, opts = {}) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  const {
    trigger,
    start    = 'top 88%',
    stagger  = STAGGER.base,
    y        = 40,
    duration = DUR.base,
    delay    = 0,
    once     = true,
  } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: EASE.out,
      stagger,
      delay,
      scrollTrigger: trigger ? { trigger, start, once } : undefined,
    }
  );
}

// ─── Parallax depth ───────────────────────────────────────────
export function parallaxY(target, distance = 80, opts = {}) {
  if (prefersReducedMotion()) return;
  const { trigger, start = 'top bottom', end = 'bottom top', scrub = 1.5 } = opts;
  return gsap.fromTo(
    target,
    { y: -distance / 2 },
    {
      y: distance / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || target,
        start,
        end,
        scrub,
      },
    }
  );
}

// ─── Counter animation ────────────────────────────────────────
export function countUpGSAP(el, target, opts = {}) {
  const { duration = 1.8, trigger, start = 'top 85%', suffix = '' } = opts;
  if (!el) return;
  if (prefersReducedMotion()) {
    el.textContent = `${target}${suffix}`;
    return;
  }
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${suffix}`;
    },
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  });
}

// ─── Magnetic hover ───────────────────────────────────────────
export function magneticHover(el, strength = 0.35) {
  if (prefersReducedMotion() || !el) return () => {};

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: EASE.out });
  };
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE.elastic });
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
}

// ─── Framer Motion variants ───────────────────────────────────
export const FM = {
  fadeUp: {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.3 } },
  },

  staggerContainer: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  },

  staggerItem: {
    hidden:  { opacity: 0, y: 28, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
  },

  slideLeft: {
    hidden:  { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  },

  slideRight: {
    hidden:  { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  },

  scaleIn: {
    hidden:  { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
  },

  clipUp: {
    hidden:  { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
    visible: { clipPath: 'inset(0% 0% 0% 0%)',   opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },

  pageWipe: {
    initial: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    animate: { clipPath: 'inset(0 0 0% 0)',   opacity: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    exit:    { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  },
};

// ─── Viewport presets ────────────────────────────────────────
export const VP = {
  once:   { once: true, amount: 0.15 },
  repeat: { once: false, amount: 0.15 },
  eager:  { once: true, amount: 0.05 },
};
