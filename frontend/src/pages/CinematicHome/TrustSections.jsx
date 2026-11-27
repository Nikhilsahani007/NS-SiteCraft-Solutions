/**
 * Trust sections for the homepage: tech strip, commitments, industries,
 * and (once real ones exist) client names and testimonials.
 * Content lives in src/content/site.js. Nothing here is invented: empty
 * lists render nothing.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../utils/motion';
import { clients, commitments, industries, techStack, testimonials } from '../../content/site';
import styles from './TrustSections.module.css';

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, '0');

/** Staggered fade-up for every [data-trust-item] inside the section. */
const useStaggerReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-trust-head]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
      );
      gsap.fromTo(
        el.querySelectorAll('[data-trust-item]'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 72%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
};

export const StackStrip = () => (
  <section className={styles.strip} aria-label="Technologies we work with">
    <p className={styles.stripLabel}>Built with</p>
    <div className={styles.marquee}>
      <ul className={styles.marqueeTrack}>
        {[...techStack, ...techStack].map((name, i) => (
          <li key={`${name}-${i}`} aria-hidden={i >= techStack.length ? 'true' : undefined}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const Commitments = () => {
  const ref = useStaggerReveal();
  return (
    <div className={`${styles.section} ${styles.embedded}`} ref={ref} role="region" aria-labelledby="commitments-title">
      <div className={styles.head} data-trust-head>
        <h3 className={styles.title} id="commitments-title">
          Six promises, <em>in writing.</em>
        </h3>
        <p className={styles.sub}>
          The things clients worry about most when hiring a studio, answered before you ask.
          Each one is backed by our <Link to="/terms-and-conditions">Terms</Link>.
        </p>
      </div>
      <ol className={styles.grid}>
        {commitments.map((c, i) => (
          <li className={styles.card} key={c.title} data-trust-item>
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
        <div className={styles.label}>Who We Work With</div>
        <h2 className={styles.title} id="industries-title">
          Built for organisations <em>that serve people.</em>
        </h2>
      </div>
      <ul className={styles.industries}>
        {industries.map((ind, i) => (
          <li className={styles.industry} key={ind.name} data-trust-item>
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
        <div className={styles.label}>Client Voices</div>
        <h2 className={styles.title} id="proof-title">
          In their <em>own words.</em>
        </h2>
      </div>
      {clients.length > 0 && (
        <ul className={styles.clients} aria-label="Clients">
          {clients.map((c) => (
            <li key={c.name} data-trust-item>
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
            <figure className={styles.quote} key={t.name} data-trust-item>
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
