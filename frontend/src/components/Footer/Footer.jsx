import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <Link to="/" className={styles.footerLogo}>
                            <span className={styles.logoText}>NS SiteCraft</span>
                            <span className={styles.logoSuffix}>Solutions</span>
                        </Link>
                    </div>

                    <div className={styles.footerLinks}>
                        <Link to="/services" className={styles.footerLink}>Services</Link>
                        <Link to="/projects" className={styles.footerLink}>Projects</Link>
                        <Link to="/about" className={styles.footerLink}>About</Link>
                        <Link to="/contact" className={styles.footerLink}>Contact</Link>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {currentYear} NS SiteCraft Solutions. Built with conviction.
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
