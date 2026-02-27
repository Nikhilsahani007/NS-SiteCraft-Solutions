import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './Solutions.module.css';

const Solutions = () => {
    const businessSolutions = [
        {
            problem: 'Manual data entry and paperwork',
            solution: 'Custom software to automate data collection, processing, and reporting',
            icon: '📊'
        },
        {
            problem: 'No professional online presence',
            solution: 'Modern website with SEO optimization and lead generation',
            icon: '🌐'
        },
        {
            problem: 'Inefficient customer communication',
            solution: 'AI chatbots and automated systems for 24/7 support',
            icon: '💬'
        },
        {
            problem: 'Difficulty tracking business metrics',
            solution: 'Custom dashboards with real-time analytics',
            icon: '📈'
        }
    ];

    const collegeSolutions = [
        {
            problem: 'Manual attendance tracking',
            solution: 'Digital attendance system with automated reporting',
            icon: '✅'
        },
        {
            problem: 'Complex fee management',
            solution: 'Integrated fee collection and receipt generation',
            icon: '💰'
        },
        {
            problem: 'Scattered student information',
            solution: 'Centralized student database with role-based access',
            icon: '🎓'
        },
        {
            problem: 'Time-consuming exam processing',
            solution: 'Automated exam scheduling, grading, and result publication',
            icon: '📝'
        },
        {
            problem: 'Poor parent-teacher communication',
            solution: 'Mobile app for instant updates and two-way communication',
            icon: '📱'
        },
        {
            problem: 'Library management challenges',
            solution: 'Digital library system with book tracking and reservations',
            icon: '📚'
        }
    ];

    return (
        <>
            <SEOHead
                title="Business & College Software Solutions"
                description="Practical technology solutions for businesses and educational institutions. From automating manual processes to building college management systems — we solve real operational challenges in Hyderabad."
                canonicalPath="/solutions"
                keywords="business software solutions, college management system India, educational institution software, business automation Hyderabad, student management system"
            />
            <div className={styles.solutions}>
                {/* Business Solutions */}
                <section className={styles.solutionsSection}>
                    <div className="container">
                        <div className={styles.intro}>
                            <h1 className={styles.pageTitle}>Solutions</h1>
                            <p className={styles.pageSubtitle}>
                                Real problems, practical solutions. Built for your workflows.
                            </p>
                        </div>

                        <h2 className={styles.categoryTitle}>For Businesses</h2>
                        <p className={styles.categorySubtitle}>
                            Transform operations with technology-driven solutions
                        </p>
                        <div className={styles.solutionsGrid}>
                            {businessSolutions.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={styles.solutionCard}
                                >
                                    <div className={styles.solutionIcon}>{item.icon}</div>
                                    <div className={styles.solutionContent}>
                                        <div className={styles.problemSection}>
                                            <h3 className={styles.label}>Problem</h3>
                                            <p className={styles.problemText}>{item.problem}</p>
                                        </div>
                                        <div className={styles.arrow}>→</div>
                                        <div className={styles.solutionSection}>
                                            <h3 className={styles.label}>Solution</h3>
                                            <p className={styles.solutionText}>{item.solution}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* College Solutions */}
                <section className={styles.solutionsSection}>
                    <div className="container">
                        <h2 className={styles.categoryTitle}>For Colleges & Institutes</h2>
                        <p className={styles.categorySubtitle}>
                            Streamline educational operations end-to-end
                        </p>
                        <div className={styles.solutionsGrid}>
                            {collegeSolutions.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={styles.solutionCard}
                                >
                                    <div className={styles.solutionIcon}>{item.icon}</div>
                                    <div className={styles.solutionContent}>
                                        <div className={styles.problemSection}>
                                            <h3 className={styles.label}>Problem</h3>
                                            <p className={styles.problemText}>{item.problem}</p>
                                        </div>
                                        <div className={styles.arrow}>→</div>
                                        <div className={styles.solutionSection}>
                                            <h3 className={styles.label}>Solution</h3>
                                            <p className={styles.solutionText}>{item.solution}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>Have a specific challenge?</h2>
                            <p className={styles.ctaSubtitle}>
                                Let's discuss how we can solve it
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

export default Solutions;
