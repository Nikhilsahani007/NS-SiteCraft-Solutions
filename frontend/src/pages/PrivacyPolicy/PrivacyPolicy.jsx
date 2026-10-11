import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './PrivacyPolicy.module.css';

const sections = [
    {
        id: 'introduction',
        title: '1. Introduction',
        content: [
            'NS SiteCraft Solutions ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or engage our services.',
            'If you have any questions or concerns about this policy or our practices, please contact us at nssitecraftsolution@gmail.com.',
        ],
    },
    {
        id: 'information-collected',
        title: '2. Information We Collect',
        content: [
            'We collect information you voluntarily provide to us when you fill out our contact form, send us an email, or engage our services. This may include your name, email address, phone number, business name, and project details.',
            'When you visit our website, we may automatically collect certain technical information such as your browser type, IP address, pages viewed, and time spent on pages. This is done through standard web analytics tools.',
        ],
        list: [
            { label: 'Contact Information', detail: 'Name, email, phone number, business name' },
            { label: 'Project Details', detail: 'Information you share about your project requirements' },
            { label: 'Usage Data', detail: 'Pages visited, browser type, approximate location, device type' },
            { label: 'Communications', detail: 'Emails and messages you send us' },
        ],
    },
    {
        id: 'how-we-use',
        title: '3. How We Use Your Information',
        content: [
            'We use the information we collect to respond to your inquiries, provide and manage our services, send project-related communications, and improve our website and services.',
        ],
        list: [
            { label: 'Service Delivery', detail: 'To provide, maintain, and deliver agreed-upon services' },
            { label: 'Communication', detail: 'To respond to your inquiries and send project updates' },
            { label: 'Improvement', detail: 'To understand how visitors use our site and improve our offerings' },
            { label: 'Legal Compliance', detail: 'To comply with applicable laws and regulations' },
        ],
    },
    {
        id: 'sharing',
        title: '4. Sharing Your Information',
        content: [
            'We do not sell, trade, or rent your personal information to third parties. We may share information only in the following limited circumstances:',
        ],
        list: [
            { label: 'Service Providers', detail: 'Trusted tools (e.g., email, analytics) used to operate our business, bound by confidentiality' },
            { label: 'Legal Requirements', detail: 'If required by law or to protect our rights and property' },
            { label: 'Business Transfers', detail: 'In the event of a merger or acquisition (you will be notified)' },
        ],
    },
    {
        id: 'cookies',
        title: '5. Cookies & Analytics',
        content: [
            'Our website may use cookies or similar tracking technologies to enhance your browsing experience and analyse website traffic. Cookies are small data files stored on your device.',
            'We use analytics tools (such as Google Analytics or Vercel Analytics) to understand how visitors interact with our website. This data is aggregated and anonymised. You can disable cookies through your browser settings without affecting your ability to use our website.',
        ],
    },
    {
        id: 'data-security',
        title: '6. Data Security',
        content: [
            'We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorised access, disclosure, alteration, or destruction.',
            'However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.',
        ],
    },
    {
        id: 'data-retention',
        title: '7. Data Retention',
        content: [
            'We retain your personal information for as long as necessary to fulfil the purposes described in this policy, or as required by law. Client project data is retained for the duration of the project and for a reasonable period thereafter for support and reference purposes.',
            'You may request deletion of your personal information at any time by contacting us, subject to any legal obligations we may have to retain certain records.',
        ],
    },
    {
        id: 'your-rights',
        title: '8. Your Rights',
        content: [
            'Depending on your location, you may have the following rights regarding your personal information:',
        ],
        list: [
            { label: 'Access', detail: 'Request a copy of the personal information we hold about you' },
            { label: 'Correction', detail: 'Request correction of inaccurate or incomplete data' },
            { label: 'Deletion', detail: 'Request deletion of your personal information' },
            { label: 'Opt-out', detail: 'Opt out of any marketing communications at any time' },
        ],
    },
    {
        id: 'third-party',
        title: '9. Third-Party Links',
        content: [
            'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.',
        ],
    },
    {
        id: 'changes',
        title: '10. Changes to This Policy',
        content: [
            'We may update this Privacy Policy from time to time. The updated version will be indicated by a revised effective date. We encourage you to review this policy periodically. Continued use of our services after changes are posted constitutes acceptance of the updated policy.',
        ],
    },
    {
        id: 'contact',
        title: '11. Contact Us',
        content: [
            'If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out to us:',
        ],
        contact: true,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' },
    }),
};

const PrivacyPolicy = () => {
    return (
        <>
            <SEOHead
                title="Privacy Policy - NS SiteCraft Solutions"
                description="Learn how NS SiteCraft Solutions collects, uses, and protects your personal information. Our Privacy Policy is transparent and straightforward."
                canonicalPath="/privacy-policy"
                keywords="privacy policy, NS SiteCraft Solutions privacy, data protection, personal information, GDPR"
            />

            <div className={styles.page}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className="container">
                        <motion.div
                            className={styles.heroContent}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                        >
                            <div className={styles.badge}>Legal</div>
                            <h1 className={styles.heroTitle}>Privacy Policy</h1>
                            <p className={styles.heroSubtitle}>
                                Your privacy matters to us. We are transparent about what we collect and why.
                            </p>
                            <p className={styles.effectiveDate}>
                                <span className={styles.effectiveLabel}>Effective Date:</span> September 29, 2026
                            </p>
                        </motion.div>
                    </div>
                    <div className={styles.heroBg} aria-hidden="true" />
                </section>

                {/* Content */}
                <section className={styles.contentSection}>
                    <div className="container">
                        <div className={styles.layout}>
                            {/* Table of Contents */}
                            <aside className={styles.toc}>
                                <div className={styles.tocCard}>
                                    <h2 className={styles.tocTitle}>Contents</h2>
                                    <nav>
                                        <ul className={styles.tocList}>
                                            {sections.map((s) => (
                                                <li key={s.id}>
                                                    <a href={`#${s.id}`} className={styles.tocLink}>
                                                        {s.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <main className={styles.main}>
                                {sections.map((section, i) => (
                                    <motion.div
                                        key={section.id}
                                        id={section.id}
                                        className={styles.section}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: '-60px' }}
                                    >
                                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                                        {section.content.map((para, j) => (
                                            <p key={j} className={styles.paragraph}>{para}</p>
                                        ))}
                                        {section.list && (
                                            <ul className={styles.detailList}>
                                                {section.list.map((item, k) => (
                                                    <li key={k} className={styles.detailItem}>
                                                        <span className={styles.detailLabel}>{item.label}:</span>
                                                        <span className={styles.detailText}>{item.detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {section.contact && (
                                            <div className={styles.contactBox}>
                                                <div className={styles.contactItem}>
                                                    <span className={styles.contactIcon}>✉️</span>
                                                    <a href="mailto:nssitecraftsolution@gmail.com" className={styles.contactLink}>
                                                        nssitecraftsolution@gmail.com
                                                    </a>
                                                </div>
                                                <div className={styles.contactItem}>
                                                    <span className={styles.contactIcon}>📞</span>
                                                    <a href="tel:+919390969461" className={styles.contactLink}>
                                                        +91 93909 69461
                                                    </a>
                                                </div>
                                                <div className={styles.contactItem}>
                                                    <span className={styles.contactIcon}>📍</span>
                                                    <span className={styles.contactText}>Hyderabad, Telangana, India</span>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Bottom CTA */}
                                <motion.div
                                    className={styles.ctaBox}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.45 }}
                                >
                                    <p className={styles.ctaText}>
                                        Also read our{' '}
                                        <Link to="/terms-and-conditions" className={styles.ctaLink}>
                                            Terms &amp; Conditions
                                        </Link>{' '}
                                        for our service agreement.
                                    </p>
                                </motion.div>
                            </main>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PrivacyPolicy;
