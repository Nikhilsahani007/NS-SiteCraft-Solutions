import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './Services.module.css';

const Services = () => {
    const services = [
        {
            title: 'Website Development',
            icon: '🌐',
            what: 'Modern, responsive websites built with the latest technologies',
            whoFor: 'Businesses and institutions that need a professional online presence',
            outcome: 'A fast, SEO-optimized website that converts visitors into customers',
            features: [
                'Responsive design for all devices',
                'SEO-optimized structure',
                'Fast loading speeds',
                'Custom CMS integration',
                'E-commerce capabilities',
                'Ongoing maintenance & support'
            ]
        },
        {
            title: 'Custom Software Development',
            icon: '💻',
            what: 'Tailored software solutions built for your specific workflows',
            whoFor: 'Growing teams that need tools built around their processes',
            outcome: 'Software that fits your business, not the other way around',
            features: [
                'Scalable architecture',
                'User-friendly interfaces',
                'API integrations',
                'Cloud deployment',
                'Regular updates & patches',
                'Technical documentation'
            ]
        },
        {
            title: 'College & Institute Management Systems',
            icon: '🎓',
            what: 'Complete management systems for educational institutions',
            whoFor: 'Colleges and institutes looking to streamline operations',
            outcome: 'Centralized system that reduces manual work and improves efficiency',
            features: [
                'Student information management',
                'Attendance tracking',
                'Fee management',
                'Exam & result processing',
                'Library management',
                'Parent-teacher communication'
            ]
        },
        {
            title: 'AI & Automation Solutions',
            icon: '🤖',
            what: 'Intelligent automation to reduce manual, repetitive work',
            whoFor: 'Teams spending too much time on tasks that could be automated',
            outcome: 'More time for strategic work, less time on repetitive tasks',
            features: [
                'Process automation',
                'Chatbot integration',
                'Data analysis & insights',
                'Predictive analytics',
                'Document processing',
                'Workflow optimization'
            ]
        }
    ];

    // Animation variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const scaleInVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1 }
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': services.map((service, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'Service',
                'name': service.title,
                'description': service.what,
                'provider': {
                    '@type': 'Organization',
                    'name': 'NS SiteCraft Solutions'
                }
            }
        }))
    };

    return (
        <PageTransition>
            <SEOHead
                title="Web Development & Software Services"
                description="Professional web development, custom software, college management systems, and AI automation services in Hyderabad. View our full service offerings, features, and what you get."
                canonicalPath="/services"
                keywords="web development services Hyderabad, custom software development, college management system, AI automation, website design services, software company services"
                structuredData={serviceSchema}
            />
            <div className={styles.services}>
                <section className={styles.servicesSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUpVariants}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.intro}
                        >
                            <h1 className={styles.pageTitle}>Services</h1>
                            <p className={styles.pageSubtitle}>
                                We build software that solves real problems. No templates, no shortcuts.
                            </p>
                        </motion.div>

                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-80px' }}
                                variants={scaleInVariants}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                className={styles.serviceCard}
                            >
                                <div className={styles.serviceHeader}>
                                    <div className={styles.serviceIcon}>{service.icon}</div>
                                    <div className={styles.serviceHeaderContent}>
                                        <h2 className={styles.serviceTitle}>{service.title}</h2>
                                        <p className={styles.serviceWhat}>{service.what}</p>
                                    </div>
                                </div>

                                <div className={styles.serviceDetails}>
                                    <div className={styles.serviceDetail}>
                                        <h3 className={styles.detailLabel}>Who it's for</h3>
                                        <p className={styles.detailText}>{service.whoFor}</p>
                                    </div>

                                    <div className={styles.serviceDetail}>
                                        <h3 className={styles.detailLabel}>What you get</h3>
                                        <p className={styles.detailText}>{service.outcome}</p>
                                    </div>
                                </div>

                                <div className={styles.featuresSection}>
                                    <h3 className={styles.featuresTitle}>Key features</h3>
                                    <ul className={styles.featuresList}>
                                        {service.features.map((feature, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: idx * 0.05,
                                                    ease: [0.4, 0, 0.2, 1]
                                                }}
                                                className={styles.featureItem}
                                            >
                                                <span className={styles.checkIcon}>✓</span>
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={scaleInVariants}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.ctaContent}
                        >
                            <h2 className={styles.ctaTitle}>Not sure which service you need?</h2>
                            <p className={styles.ctaSubtitle}>
                                Let's talk about your specific requirements
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link to="/contact">
                                    <Button size="large">Talk to us</Button>
                                </Link>
                                <Link to="/pricing">
                                    <Button variant="secondary" size="large">View pricing</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Services;
