import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollTo = (id) => (e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    };

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    {/* Brand Column */}
                    <div className={styles.footerBrand}>
                        <Link to="/" className={styles.footerLogo}>
                            <span className={styles.logoText}>NS SiteCraft</span>
                            <span className={styles.logoSuffix}>Solutions</span>
                        </Link>
                        <p className={styles.footerTagline}>
                            We build websites, web apps, and custom software
                            for startups and small businesses in Hyderabad.
                        </p>
                        <p className={styles.footerMsme}>MSME Registered</p>
                    </div>

                    {/* Services Column */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.footerColumnTitle}>Services</h4>
                        <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Web Design & Development</a>
                        <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Software Development</a>
                        <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Digital Strategy</a>
                    </div>

                    {/* Company Column */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.footerColumnTitle}>Company</h4>
                        <a href="#about" onClick={scrollTo('about')} className={styles.footerLink}>About</a>
                        <a href="#work" onClick={scrollTo('work')} className={styles.footerLink}>Work</a>
                        <a href="#process" onClick={scrollTo('process')} className={styles.footerLink}>Process</a>
                    </div>

                    {/* Contact Column */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.footerColumnTitle}>Contact</h4>
                        <a href="mailto:nssitecraftsolution@gmail.com" className={styles.footerLink}>nssitecraftsolution@gmail.com</a>
                        <a href="tel:+919390969461" className={styles.footerLink}>+91 93909 69461</a>
                        <span className={styles.footerLink} style={{ cursor: 'default' }}>Hyderabad, India</span>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {currentYear} NS SiteCraft Solutions. All rights reserved.
                    </p>
                    <div className={styles.legalLinks}>
                        <a href="#" className={styles.legalLink}>Privacy</a>
                        <span className={styles.separator}>·</span>
                        <a href="#" className={styles.legalLink}>Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
