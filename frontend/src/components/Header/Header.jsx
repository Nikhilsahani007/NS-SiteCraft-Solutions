import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for active section tracking on homepage
    useEffect(() => {
        if (!isHomePage) return;

        const sectionIds = ['benefits', 'work', 'process', 'contact'];
        const observers = [];

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observerOptions = {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0,
        };

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                const observer = new IntersectionObserver(handleIntersect, observerOptions);
                observer.observe(el);
                observers.push(observer);
            }
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, [isHomePage]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const handleSmoothScroll = useCallback((e, sectionId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const el = document.getElementById(sectionId);
        if (el) {
            const headerOffset = 80;
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth',
            });
        }
    }, []);

    // Navigation links for homepage (smooth scroll) vs other pages
    const homeNavLinks = [
        { id: 'benefits', label: 'Benefits' },
        { id: 'work', label: 'Work' },
        { id: 'process', label: 'Process' },
        { id: 'contact', label: 'Contact' },
    ];

    const pageNavLinks = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/projects', label: 'Projects' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link to="/" className={styles.logo}>
                        <span className={styles.logoText}>NS SiteCraft</span>
                        <span className={styles.logoTagline}>Solutions</span>
                    </Link>

                    <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
                        {isHomePage
                            ? homeNavLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleSmoothScroll(e, link.id)}
                                    className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                                >
                                    {link.label}
                                </a>
                            ))
                            : pageNavLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                                >
                                    {link.label}
                                </Link>
                            ))
                        }
                    </nav>

                    <div className={styles.headerActions}>
                        {isHomePage ? (
                            <a
                                href="#contact"
                                onClick={(e) => handleSmoothScroll(e, 'contact')}
                                className={styles.ctaButton}
                            >
                                Start Project →
                            </a>
                        ) : (
                            <Link to="/contact" className={styles.ctaButton}>
                                Start Project →
                            </Link>
                        )}
                        <button
                            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={styles.hamburger}></span>
                            <span className={styles.hamburger}></span>
                            <span className={styles.hamburger}></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
