import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './Pricing.module.css';

const Pricing = () => {
    const packages = [
        {
            name: 'Basic',
            price: 'Starting from ₹25,000',
            description: 'For small businesses and startups',
            features: [
                'Responsive website (up to 5 pages)',
                'Basic SEO optimization',
                'Contact form integration',
                'Mobile-friendly design',
                '3 months support',
                'Basic analytics setup'
            ],
            popular: false
        },
        {
            name: 'Standard',
            price: 'Starting from ₹75,000',
            description: 'For growing businesses and institutions',
            features: [
                'Custom web application',
                'Advanced SEO & performance',
                'CMS integration',
                'API development',
                '6 months support',
                'Advanced analytics',
                'Database integration',
                'User authentication'
            ],
            popular: true
        },
        {
            name: 'Advanced',
            price: 'Starting from ₹1,50,000',
            description: 'For complex, enterprise-grade needs',
            features: [
                'Full-stack custom software',
                'AI/ML integration',
                'Multi-platform deployment',
                'Advanced automation',
                '12 months support',
                'Dedicated project manager',
                'Custom integrations',
                'Scalable architecture',
                'Security audit'
            ],
            popular: false
        }
    ];

    return (
        <>
            <SEOHead
                title="Pricing Plans - Web Development & Software"
                description="Transparent pricing for custom web development, software solutions, and AI integration. Starting from ₹25,000. No hidden costs. Get a free quote for your project in Hyderabad."
                canonicalPath="/pricing"
                keywords="web development pricing Hyderabad, software development cost India, website design pricing, custom software pricing, affordable web development"
            />
            <div className={styles.pricing}>
                <section className={styles.pricingSection}>
                    <div className="container">

                        <div className={styles.pricingGrid}>
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`${styles.pricingCard} ${pkg.popular ? styles.popular : ''}`}
                                >
                                    {pkg.popular && <div className={styles.popularBadge}>Recommended</div>}
                                    <h2 className={styles.packageName}>{pkg.name}</h2>
                                    <div className={styles.price}>{pkg.price}</div>
                                    <p className={styles.packageDescription}>{pkg.description}</p>
                                    <ul className={styles.featuresList}>
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className={styles.featureItem}>
                                                <span className={styles.checkIcon}>✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/contact">
                                        <Button
                                            variant={pkg.popular ? 'primary' : 'outline'}
                                            size="large"
                                            fullWidth
                                        >
                                            Get started
                                        </Button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className={styles.disclaimer}>
                            <p className={styles.disclaimerText}>
                                Final pricing depends on project requirements. These are starting ranges.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>Need a custom quote?</h2>
                            <p className={styles.ctaSubtitle}>
                                Every project is different. Let's discuss yours.
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

export default Pricing;
