import { useEffect } from 'react';

/**
 * Adds `data-in="true"` to every `[data-reveal]` element inside `scopeRef`
 * when it scrolls into view. Styling lives in CSS, so content stays visible
 * if this never runs, and reduced-motion users get the final state at once.
 */
export function useReveal(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;
    const targets = scope.querySelectorAll('[data-reveal]');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-in', 'true'));
      return undefined;
    }

    scope.setAttribute('data-reveal-ready', 'true');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-in', 'true');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scopeRef]);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
