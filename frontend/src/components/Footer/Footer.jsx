import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    {/* Column 1: Brand & Trust */}
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>NS SiteCraft Solutions</h3>
                        <p className={styles.footerTagline}>
                            We build software that works for colleges and businesses.
                        </p>
                        <div className={styles.trustBadge}>
                            <span className={styles.badgeIcon}>✓</span>
                            <div>
                                <p className={styles.badgeText}>Hyderabad, India</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Quick Links</h4>
                        <nav className={styles.footerNav}>
                            <Link to="/services" className={styles.footerLink}>Services</Link>
                            <Link to="/solutions" className={styles.footerLink}>Solutions</Link>
                            <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
                            <Link to="/about" className={styles.footerLink}>About</Link>
                            <Link to="/contact" className={styles.footerLink}>Contact</Link>
                        </nav>
                    </div>

                    {/* Column 3: Contact + CTA */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Get in Touch</h4>
                        <div className={styles.contactInfo}>
                            <p className={styles.contactItem}>
                                <span className={styles.contactIcon}>📧</span>
                                nssitecraftsolution@gmail.com
                            </p>
                            <p className={styles.contactItem}>
                                <span className={styles.contactIcon}>📱</span>
                                +91 93909 69461
                            </p>
                            <p className={styles.contactItem}>
                                <span className={styles.contactIcon}>📍</span>
                                Hyderabad, India
                            </p>
                        </div>
                        <div className={styles.ctaSection}>
                            <p className={styles.ctaText}>Ready to start?</p>
                            <Link to="/contact" className={styles.ctaLink}>Let's talk →</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {currentYear} NS SiteCraft Solutions. All rights reserved.
                    </p>
                    <div className={styles.legalLinks}>
                        <a href="#" className={styles.legalLink}>Privacy Policy</a>
                        <span className={styles.separator}>|</span>
                        <a href="#" className={styles.legalLink}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
