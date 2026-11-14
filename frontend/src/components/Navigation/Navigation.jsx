import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks.map(l => l.id);
    const observers = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // Closed drawer must not be reachable by keyboard or assistive tech.
  const drawerRef = useRef(null);
  const burgerRef = useRef(null);
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return undefined;
    if (!menuOpen) {
      drawer.setAttribute('inert', '');
      return undefined;
    }
    drawer.removeAttribute('inert');
    drawer.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const scrollTo = useCallback((e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <a className={styles.skip} href="#main">Skip to content</a>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="NS SiteCraft Solutions — Home">
          <span className={styles.logoMark}>NS</span>
          <span className={styles.logoName}>SiteCraft</span>
          <span className={styles.logoDivider}>/</span>
          <span className={styles.logoSub}>Solutions</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Primary navigation">
          {isHome ? (
            navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                onClick={e => scrollTo(e, link.id)}
              >
                {link.label}
              </a>
            ))
          ) : (
            <>
              <Link to="/" className={styles.navLink}>Home</Link>
              <Link to="/services" className={`${styles.navLink} ${location.pathname === '/services' ? styles.active : ''}`}>Services</Link>
              <Link to="/projects" className={`${styles.navLink} ${location.pathname === '/projects' ? styles.active : ''}`}>Work</Link>
              <Link to="/about" className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}>About</Link>
              <Link to="/contact" className={`${styles.navLink} ${location.pathname === '/contact' ? styles.active : ''}`}>Contact</Link>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          {isHome ? (
            <a href="#contact" className={styles.cta} onClick={e => scrollTo(e, 'contact')}>
              Start a Project
            </a>
          ) : (
            <Link to="/contact" className={styles.cta}>Start a Project</Link>
          )}

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            ref={burgerRef}
            onClick={() => setMenuOpen(v => !v)}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={drawerRef} className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        {isHome ? (
          navLinks.map(link => (
            <a key={link.id} href={`#${link.id}`} className={styles.drawerLink} onClick={e => scrollTo(e, link.id)}>
              {link.label}
            </a>
          ))
        ) : (
          <>
            <Link to="/" className={styles.drawerLink}>Home</Link>
            <Link to="/services" className={styles.drawerLink}>Services</Link>
            <Link to="/projects" className={styles.drawerLink}>Work</Link>
            <Link to="/about" className={styles.drawerLink}>About</Link>
            <Link to="/contact" className={styles.drawerLink}>Contact</Link>
          </>
        )}
        {isHome ? (
          <a href="#contact" className={styles.drawerCta} onClick={e => scrollTo(e, 'contact')}>Start a Project</a>
        ) : (
          <Link to="/contact" className={styles.drawerCta}>Start a Project</Link>
        )}
      </div>
    </header>
  );
};

export default Navigation;
