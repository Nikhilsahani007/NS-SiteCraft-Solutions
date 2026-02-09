import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/solutions', label: 'Solutions' },
        { path: '/pricing', label: 'Pricing' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link to="/" className={styles.logo}>
                        <span className={styles.logoText}>NS SiteCraft</span>
                        <span className={styles.logoTagline}>Smart Web & Software Solutions</span>
                    </Link>

                    <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className={styles.headerActions}>
                        <ThemeToggle />
                        <button
                            className={styles.mobileMenuButton}
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
