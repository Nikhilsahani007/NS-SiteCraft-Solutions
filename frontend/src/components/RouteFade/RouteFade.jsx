/**
 * RouteFade — a short, soft fade-up each time the route changes.
 * Keyed by pathname from App, so it remounts per page.
 */
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const RouteFade = ({ children }) => {
  const ref = useRef(null);
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(ref.current, { autoAlpha: 0, y: 14 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      clearProps: 'transform,opacity,visibility',
    });
  }, { scope: ref });
  return <div ref={ref}>{children}</div>;
};

export default RouteFade;
