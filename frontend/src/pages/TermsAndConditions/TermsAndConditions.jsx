import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './TermsAndConditions.module.css';

const sections = [
    {
        id: 'acceptance',
        title: '1. Acceptance of Terms',
        content: [
            'By accessing or using the NS SiteCraft Solutions website and our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access or use our services.',
            'These terms apply to all visitors, clients, and others who access or use our services.',
        ],
    },
    {
        id: 'services',
        title: '2. Services',
        content: [
            'NS SiteCraft Solutions provides custom web design, web application development, software development, and digital strategy services. The scope, timeline, and deliverables for each project are defined in a separate project agreement or proposal shared with you before work begins.',
            'We reserve the right to modify, suspend, or discontinue any service at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of services.',
        ],
    },
    {
        id: 'project-engagement',
        title: '3. Project Engagement & Payments',
        content: [
            'All projects require a written agreement or proposal acceptance before work commences. Payment terms, milestones, and deliverables are defined in the project agreement.',
            'Payments are typically structured in milestones (e.g., advance, mid-project, final). Failure to make timely payments may result in pausing or terminating the project.',
            'Refunds are subject to the terms outlined in the individual project agreement. Generally, completed work and milestones are non-refundable.',
        ],
    },
    {
        id: 'intellectual-property',
        title: '4. Intellectual Property',
        content: [
            'Upon full and final payment for a project, all custom code, designs, and deliverables created specifically for your project will be transferred to you. NS SiteCraft Solutions retains no ownership over the final deliverables once full payment is received.',
            'NS SiteCraft Solutions retains the right to showcase completed projects in our portfolio unless you explicitly request otherwise in writing before project completion.',
            'Third-party libraries, frameworks, and tools used in your project are governed by their respective licenses. We will inform you of any such dependencies.',
        ],
    },
    {
        id: 'client-responsibilities',
        title: '5. Client Responsibilities',
        content: [
            'You are responsible for providing accurate, timely, and complete information, content, and feedback required for the project. Delays caused by late client feedback may affect project timelines.',
            'You warrant that any content (text, images, logos, data) you provide does not infringe on any third-party intellectual property rights, and you indemnify NS SiteCraft Solutions against any claims arising from such content.',
        ],
    },
    {
        id: 'limitation-of-liability',
        title: '6. Limitation of Liability',
        content: [
            'NS SiteCraft Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.',
            'Our total liability to you for any claim arising from our services shall not exceed the total amount paid by you for the specific project giving rise to the claim.',
        ],
    },
    {
        id: 'confidentiality',
        title: '7. Confidentiality',
        content: [
            'Both parties agree to keep confidential any proprietary or sensitive information shared during the course of a project. This includes business processes, technical architecture, and financial details.',
            'This confidentiality obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law.',
        ],
    },
    {
        id: 'governing-law',
        title: '8. Governing Law',
        content: [
            'These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.',
        ],
    },
    {
        id: 'changes',
        title: '9. Changes to Terms',
        content: [
            'We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the new terms.',
        ],
    },
    {
        id: 'contact',
        title: '10. Contact Us',
        content: [
            'If you have any questions about these Terms and Conditions, please contact us:',
        ],
        contact: true,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' },
    }),
};

const TermsAndConditions = () => {
    return (
        <>
            <SEOHead
                title="Terms and Conditions - NS SiteCraft Solutions"
                description="Read the Terms and Conditions governing the use of NS SiteCraft Solutions services. Understand your rights, responsibilities, and our policies."
                canonicalPath="/terms-and-conditions"
                keywords="terms and conditions, NS SiteCraft Solutions terms, web development terms, service agreement"
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
                            <h1 className={styles.heroTitle}>Terms &amp; Conditions</h1>
                            <p className={styles.heroSubtitle}>
                                Please read these terms carefully before using our services.
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
                                        <Link to="/privacy-policy" className={styles.ctaLink}>
                                            Privacy Policy
                                        </Link>{' '}
                                        to understand how we handle your data.
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

export default TermsAndConditions;
