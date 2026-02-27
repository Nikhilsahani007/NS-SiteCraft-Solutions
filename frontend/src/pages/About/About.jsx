import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './About.module.css';

const About = () => {
    const values = [
        {
            title: 'Custom-Built',
            description: 'Every solution is built specifically for your needs. No templates.',
            icon: '⚙️'
        },
        {
            title: 'Clarity',
            description: 'Transparent communication. Clear roadmaps. No surprises.',
            icon: '💡'
        },
        {
            title: 'Scalability',
            description: 'Systems that grow with you, not against you.',
            icon: '📈'
        },
        {
            title: 'Long-term',
            description: 'We build for the future, not just for launch day.',
            icon: '🎯'
        }
    ];

    return (
        <>
            <SEOHead
                title="About Us - MSME Registered Software Company in Hyderabad"
                description="Learn about NS SiteCraft Solutions — an MSME registered software company in Hyderabad building custom web and software solutions for businesses and colleges. Our mission, values, and approach."
                canonicalPath="/about"
                keywords="about NS SiteCraft Solutions, software company Hyderabad, MSME registered, web development company India, custom software team"
            />
            <div className={styles.about}>
                <section className={styles.storySection}>
                    <div className="container">
                        <div className={styles.intro}>
                            <h1 className={styles.pageTitle}>About</h1>
                            <p className={styles.pageSubtitle}>
                                We build software for people who understand that technology should solve problems, not create them.
                            </p>
                        </div>

                        <div className={styles.storyContent}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={styles.storyText}
                            >
                                <h2 className={styles.sectionTitle}>Who we are</h2>
                                <p className={styles.paragraph}>
                                    NS SiteCraft Solutions is a software company based in Hyderabad. We're MSME registered and focused on building custom solutions for colleges and businesses.
                                </p>
                                <p className={styles.paragraph}>
                                    We don't do templates. We don't do shortcuts. We build software that fits your workflows, not the other way around.
                                </p>
                                <p className={styles.paragraph}>
                                    Our clients range from small businesses establishing their first online presence to educational institutions managing thousands of students. What they have in common: they need software that works.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className={styles.missionSection}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Mission</h2>
                        <p className={styles.missionText}>
                            Build software that solves real problems. Make technology accessible without compromising on quality. Help businesses and institutions operate more efficiently.
                        </p>
                    </div>
                </section>

                <section className={styles.valuesSection}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>How we work</h2>
                        <div className={styles.valuesGrid}>
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={styles.valueCard}
                                >
                                    <div className={styles.valueIcon}>{value.icon}</div>
                                    <h3 className={styles.valueTitle}>{value.title}</h3>
                                    <p className={styles.valueDescription}>{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.approachSection}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Our approach</h2>
                        <div className={styles.approachSteps}>
                            <div className={styles.stepCard}>
                                <div className={styles.stepNumber}>1</div>
                                <h3 className={styles.stepTitle}>Understand</h3>
                                <p className={styles.stepDescription}>
                                    We listen to your challenges and goals
                                </p>
                            </div>
                            <div className={styles.stepCard}>
                                <div className={styles.stepNumber}>2</div>
                                <h3 className={styles.stepTitle}>Design</h3>
                                <p className={styles.stepDescription}>
                                    We create a solution tailored to your workflows
                                </p>
                            </div>
                            <div className={styles.stepCard}>
                                <div className={styles.stepNumber}>3</div>
                                <h3 className={styles.stepTitle}>Build</h3>
                                <p className={styles.stepDescription}>
                                    We develop with quality and scalability in mind
                                </p>
                            </div>
                            <div className={styles.stepCard}>
                                <div className={styles.stepNumber}>4</div>
                                <h3 className={styles.stepTitle}>Support</h3>
                                <p className={styles.stepDescription}>
                                    We provide ongoing maintenance and improvements
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>Ready to start?</h2>
                            <p className={styles.ctaSubtitle}>
                                Let's talk about what you're building
                            </p>
                            <Link to="/contact">
                                <Button size="large">Talk to us</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
