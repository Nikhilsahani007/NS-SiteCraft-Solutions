/**
 * Trust sections for the homepage: tech strip, commitments, industries,
 * and (once real ones exist) client names and testimonials.
 * Content lives in src/content/site.js. Nothing here is invented: empty
 * lists render nothing.
 */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../utils/motion';
import { clients, commitments, industries, techStack, testimonials } from '../../content/site';
import styles from './TrustSections.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n) => String(n).padStart(2, '0');

/** Entrances are handled by the page-level motion system ([data-*] hooks). */
const useStaggerReveal = () => useRef(null);

/**
 * Tech strip: an endless GSAP marquee that speeds up briefly with scroll
 * velocity (either direction), then eases back to cruising speed.
 */
export const StackStrip = () => {
  const ref = useRef(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const track = ref.current.querySelector('[data-marquee]');
    const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 36, repeat: -1 });
    const boost = { v: 1 };
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 400);
        if (v > boost.v) boost.v = v;
        gsap.to(boost, {
          v: 1,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => loop.timeScale(boost.v),
        });
      },
    });
    const el = ref.current;
    const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.5, overwrite: true });
    const play = () => gsap.to(loop, { timeScale: 1, duration: 0.5, overwrite: true });
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', play);
    return () => {
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', play);
    };
  }, { scope: ref });

  return (
    <section className={styles.strip} aria-label="Technologies we work with" ref={ref}>
      <p className={styles.stripLabel}>Built with</p>
      <div className={styles.marquee}>
        <ul className={styles.marqueeTrack} data-marquee>
          {[...techStack, ...techStack].map((name, i) => (
            <li key={`${name}-${i}`} aria-hidden={i >= techStack.length ? 'true' : undefined}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const Commitments = () => {
  const ref = useStaggerReveal();
  return (
    <div className={`${styles.section} ${styles.embedded}`} ref={ref} role="region" aria-labelledby="commitments-title">
      <div className={styles.head} data-trust-head>
        <h3 className={styles.title} id="commitments-title">
          Six promises, <em>in writing.</em>
        </h3>
        <p className={styles.sub} data-rise>
          The things clients worry about most when hiring a studio, answered before you ask.
          Each one is backed by our <Link to="/terms-and-conditions">Terms</Link>.
        </p>
      </div>
      <ol className={styles.grid}>
        {commitments.map((c, i) => (
          <li className={styles.card} key={c.title} data-card>
            <span className={styles.cardNo} aria-hidden="true">{pad(i + 1)}</span>
            <svg className={styles.check} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity="0.4" />
              <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <p className={styles.cardText}>{c.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export const Industries = () => {
  const ref = useStaggerReveal();
  return (
    <section className={styles.section} ref={ref} aria-labelledby="industries-title">
      <div className={styles.head} data-trust-head>
        <div className={styles.label} data-rise>Who We Work With</div>
        <h2 className={styles.title} id="industries-title">
          Built for organisations <em>that serve people.</em>
        </h2>
      </div>
      <ul className={styles.industries}>
        {industries.map((ind, i) => (
          <li className={styles.industry} key={ind.name} data-card>
            <span className={styles.industryNo} aria-hidden="true">{pad(i + 1)}</span>
            <h3 className={styles.industryName}>{ind.name}</h3>
            <p className={styles.cardText}>{ind.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

/** Renders only when real testimonials or client names have been added. */
export const Proof = () => {
  const ref = useStaggerReveal();
  if (!testimonials.length && !clients.length) return null;
  return (
    <section className={styles.section} ref={ref} aria-labelledby="proof-title">
      <div className={styles.head} data-trust-head>
        <div className={styles.label} data-rise>Client Voices</div>
        <h2 className={styles.title} id="proof-title">
          In their <em>own words.</em>
        </h2>
      </div>
      {clients.length > 0 && (
        <ul className={styles.clients} aria-label="Clients">
          {clients.map((c) => (
            <li key={c.name} data-card>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a>
              ) : (
                c.name
              )}
            </li>
          ))}
        </ul>
      )}
      {testimonials.length > 0 && (
        <div className={styles.quotes}>
          {testimonials.map((t) => (
            <figure className={styles.quote} key={t.name} data-card>
              <blockquote>
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{[t.role, t.organisation].filter(Boolean).join(', ')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
};
