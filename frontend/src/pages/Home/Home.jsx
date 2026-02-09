import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import PageTransition from '../../components/PageTransition/PageTransition';
import styles from './Home.module.css';

const Home = () => {
    const services = [
        {
            title: 'Website Development',
            description: 'Fast, modern websites that convert visitors into customers',
            icon: '🌐',
            forWho: 'For businesses and institutions'
        },
        {
            title: 'Custom Software',
            description: 'Built specifically for your workflows and requirements',
            icon: '💻',
            forWho: 'For growing teams'
        },
        {
            title: 'College Management',
            description: 'Complete systems to streamline educational operations',
            icon: '🎓',
            forWho: 'For educational institutions'
        },
        {
            title: 'AI & Automation',
            description: 'Reduce manual work with intelligent automation',
            icon: '🤖',
            forWho: 'For efficiency-focused teams'
        }
    ];

    const problems = [
        'Manual processes eating up your time',
        'Outdated systems holding you back',
        'No professional online presence',
        'Repetitive tasks that could be automated'
    ];

    const whyChooseUs = [
        {
            title: 'Custom-Built',
            description: 'No templates. Built for your specific needs.',
            icon: '⚙️'
        },
        {
            title: 'Scalable',
            description: 'Grows with your business or institution.',
            icon: '📈'
        },
        {
            title: 'Hyderabad-Based',
            description: 'Local team, global standards.',
            icon: '📍'
        },
        {
            title: 'MSME Registered',
            description: 'Officially recognized and trusted.',
            icon: '✓'
        }
    ];

    const capabilities = [
        { name: 'AI Integration', icon: '🤖' },
        { name: 'Process Automation', icon: '⚡' },
        { name: 'Custom Dashboards', icon: '📊' },
        { name: 'Real-time Analytics', icon: '📈' }
    ];

    // Animation variants using design system tokens
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const scaleInVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <PageTransition>
            <div className={styles.home}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUpVariants}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.heroContent}
                        >
                            <h1 className={styles.heroTitle}>
                                Software that solves <span className="text-gradient">real problems</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                We build custom web and software solutions for colleges and businesses that need clarity, efficiency, and long-term scalability.
                            </p>
                            <div className={styles.heroCta}>
                                <Link to="/contact">
                                    <Button size="large">Talk to us</Button>
                                </Link>
                                <Link to="/services">
                                    <Button variant="secondary" size="large">View services</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Problems Section */}
                <section className={styles.problemsSection}>
                    <div className="container">
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.sectionTitle}
                        >
                            Common challenges we solve
                        </motion.h2>
                        <div className={styles.problemsGrid}>
                            {problems.map((problem, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-50px' }}
                                    variants={fadeUpVariants}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className={styles.problemCard}
                                >
                                    <span className={styles.problemIcon}>→</span>
                                    <p>{problem}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Overview */}
                <section className={styles.servicesSection}>
                    <div className="container">
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.sectionTitle}
                        >
                            What we build
                        </motion.h2>
                        <div className={styles.servicesGrid}>
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-50px' }}
                                    variants={scaleInVariants}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    whileHover={{
                                        y: -4,
                                        transition: { duration: 0.2 }
                                    }}
                                    className={styles.serviceCard}
                                >
                                    <div className={styles.serviceIcon}>{service.icon}</div>
                                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                                    <p className={styles.serviceDescription}>{service.description}</p>
                                    <span className={styles.serviceFor}>{service.forWho}</span>
                                </motion.div>
                            ))}
                        </div>
                        <div className={styles.servicesCtaContainer}>
                            <Link to="/services">
                                <Button variant="outline" size="large">View all services</Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Capabilities */}
                <section className={styles.capabilitiesSection}>
                    <div className="container">
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.sectionTitle}
                        >
                            Selected capabilities
                        </motion.h2>
                        <div className={styles.capabilitiesGrid}>
                            {capabilities.map((capability, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-50px' }}
                                    variants={scaleInVariants}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.08,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                    className={styles.capabilityCard}
                                >
                                    <span className={styles.capabilityIcon}>{capability.icon}</span>
                                    <span className={styles.capabilityName}>{capability.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className={styles.whySection}>
                    <div className="container">
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.sectionTitle}
                        >
                            Why NS SiteCraft
                        </motion.h2>
                        <div className={styles.whyGrid}>
                            {whyChooseUs.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-50px' }}
                                    variants={fadeUpVariants}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className={styles.whyCard}
                                >
                                    <span className={styles.whyIcon}>{item.icon}</span>
                                    <h3 className={styles.whyTitle}>{item.title}</h3>
                                    <p className={styles.whyDescription}>{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
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
                            <h2 className={styles.ctaTitle}>Let's talk about your project</h2>
                            <p className={styles.ctaSubtitle}>
                                Free consultation. No pressure. Just clarity.
                            </p>
                            <Link to="/contact">
                                <Button size="large">Schedule a call</Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;
