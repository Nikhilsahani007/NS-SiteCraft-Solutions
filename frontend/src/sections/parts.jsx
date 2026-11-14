import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';

export const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

/** Scrolls to an in-page section, keeps the URL hash and moves focus for keyboard users. */
export const goTo = (id) => (e) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  window.history.replaceState(null, '', `#${id}`);
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
};

export const SectionHead = ({ no, label, title, lede, id }) => (
  <header className={styles.head}>
    <div data-reveal>
      <p className={styles.label}>
        <b>{no}</b>
        {label}
      </p>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
    </div>
    {lede && (
      <p className={styles.lede} data-reveal style={{ '--i': 1 }}>
        {lede}
      </p>
    )}
  </header>
);

export const pad = (n) => String(n).padStart(2, '0');

/**
 * Link to the enquiry form. Scrolls to it when the form is on the current
 * page (homepage), otherwise goes to the contact page.
 */
export const ContactLink = ({ className, children }) => {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (document.getElementById('contact')) {
      goTo('contact')(e);
      return;
    }
    e.preventDefault();
    navigate('/contact');
  };
  return (
    <a className={className} href="/contact" onClick={onClick}>
      {children}
    </a>
  );
};
