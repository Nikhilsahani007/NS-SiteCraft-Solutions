import { Link } from 'react-router-dom';
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

const SiteFooter = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <a className={styles.wordmark} href="#top" onClick={goTo('top')} aria-label={`${company.name}, back to top`}>
            NS SiteCraft <em>Solutions</em>
          </a>
          <p className={styles.footerTag}>
            Websites, apps and custom software, designed and built in Hyderabad.
          </p>
        </div>

        <nav className={styles.footerCol} aria-label="Footer sections">
          <h3>Explore</h3>
          <ul>
            {sections.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={goTo(id)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.footerCol} aria-label="Footer pages">
          <h3>Pages</h3>
          <ul>
            <li>
              <Link to="/services">Services in detail</Link>
            </li>
            <li>
              <Link to="/projects">All projects</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footerCol}>
          <h3>Contact</h3>
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

export default SiteFooter;
