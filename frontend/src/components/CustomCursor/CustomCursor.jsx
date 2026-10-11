/**
 * CustomCursor.jsx — Cinematic cursor follower
 * Shows a small dot + large ring that trails the pointer.
 * Morphs on hover over interactive elements.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only on pointer devices, not touch-only
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursor
    dot.style.opacity  = '1';
    ring.style.opacity = '1';

    // Positions
    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows immediately
      gsap.to(dot, { x: mx, y: my, duration: 0.1, ease: 'none' });
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // Ring trails with lag
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      rafId = requestAnimationFrame(tick);
    };
    let rafId = requestAnimationFrame(tick);

    // Hover states
    const scaleUp = (e) => {
      const el = e.currentTarget;
      const cursor = el.dataset.cursor || 'default';
      const isLink = cursor === 'link' || el.tagName === 'A' || el.tagName === 'BUTTON';
      gsap.to(ring, {
        scale: isLink ? 2.2 : 1.5,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const scaleDown = () => {
      gsap.to(ring,  { scale: 1, opacity: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' });
      gsap.to(dot,   { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' });
    };

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', scaleUp);
      el.addEventListener('mouseleave', scaleDown);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll('a:not([data-cursor-init]), button:not([data-cursor-init])');
      newEls.forEach(el => {
        el.dataset.cursorInit = '1';
        el.addEventListener('mouseenter', scaleUp);
        el.addEventListener('mouseleave', scaleDown);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', scaleUp);
        el.removeEventListener('mouseleave', scaleDown);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
