import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead/SEOHead';
import { useReveal } from '../hooks/useReveal';
import SiteFooter from './SiteFooter';
import { Arrow } from './parts';
import styles from './home.module.css';

/** Frame shared by every inner page: tokens, SEO, main landmark, footer. */
export const PageShell = ({ seo, children }) => {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div className={styles.page} ref={ref}>
      <SEOHead {...seo} />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
};

/** Opening band of an inner page. `title` may contain <em> for the serif accent. */
export const PageHero = ({ label, title, lede, children }) => (
  <section className={styles.pageHero} aria-labelledby="page-title">
    <div className={styles.pageHeroGrid} aria-hidden="true" />
    <div className={styles.container}>
      <p className={styles.eyebrow}>
        <i aria-hidden="true" />
        {label}
      </p>
      <h1 className={styles.pageTitle} id="page-title">
        {title}
      </h1>
      {lede && <p className={styles.pageLede}>{lede}</p>}
      {children}
    </div>
  </section>
);

/** Closing call to action that leads to the contact page. */
export const CtaBand = ({
  title = (
    <>
      Have something in mind? <em>Let’s talk it through.</em>
    </>
  ),
  text = 'Tell us what you need. We reply with clear next steps and a written quote.',
}) => (
  <section className={`${styles.section} ${styles.surface} ${styles.cta}`} aria-labelledby="cta-title">
    <div className={`${styles.container} ${styles.ctaInner}`} data-reveal>
      <div>
        <h2 className={styles.title} id="cta-title">
          {title}
        </h2>
        <p className={styles.lede}>{text}</p>
      </div>
      <Link className={styles.btn} to="/contact">
        Start a project
        <Arrow />
      </Link>
    </div>
  </section>
);
