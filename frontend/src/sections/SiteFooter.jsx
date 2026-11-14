import { Link, useLocation } from 'react-router-dom';
import { company } from '../content/site';
import { goTo } from './parts';
import styles from './home.module.css';

const sections = [
  ['services', 'Services'],
  ['work', 'Work'],
  ['process', 'Process'],
  ['about', 'About'],
  ['contact', 'Contact'],
];

const pages = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/projects', 'Work'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

const SiteFooter = () => {
  const isHome = useLocation().pathname === '/';
  return (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          {isHome ? (
            <a className={styles.wordmark} href="#top" onClick={goTo('top')} aria-label={`${company.name}, back to top`}>
              NS SiteCraft <em>Solutions</em>
            </a>
          ) : (
            <Link className={styles.wordmark} to="/" aria-label={`${company.name}, home`}>
              NS SiteCraft <em>Solutions</em>
            </Link>
          )}
          <p className={styles.footerTag}>
            Websites, apps and custom software, designed and built in Hyderabad.
          </p>
        </div>

        <nav className={styles.footerCol} aria-label="Footer sections">
          <h2>Explore</h2>
          <ul>
            {isHome
              ? sections.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={goTo(id)}>
                      {label}
                    </a>
                  </li>
                ))
              : pages.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
          </ul>
        </nav>

        <nav className={styles.footerCol} aria-label="Footer pages">
          <h2>{isHome ? 'Pages' : 'More'}</h2>
          <ul>
            {isHome && (
              <>
                <li>
                  <Link to="/services">Services in detail</Link>
                </li>
                <li>
                  <Link to="/projects">All projects</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/solutions">Solutions</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footerCol}>
          <h2>Contact</h2>
          <ul>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>
          © {new Date().getFullYear()} {company.name}. {company.location}.
        </span>
        <nav aria-label="Legal">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-and-conditions">Terms</Link>
        </nav>
      </div>
    </div>
  </footer>
  );
};

export default SiteFooter;
