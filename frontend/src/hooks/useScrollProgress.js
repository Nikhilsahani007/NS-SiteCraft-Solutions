import { useEffect } from 'react';

/**
 * Calls `onProgress(0..1)` as the element travels through the viewport.
 * `start`/`end` are viewport fractions: progress is 0 when the element's top
 * reaches `start` of the viewport height and 1 when its bottom reaches `end`.
 * With reduced motion it reports 1 once and stops.
 */
export function useScrollProgress(ref, onProgress, { start = 0.85, end = 0.55 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onProgress(1);
      return undefined;
    }

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end;
      const total = rect.height + from - to;
      const p = Math.min(1, Math.max(0, (from - rect.top) / total));
      onProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
