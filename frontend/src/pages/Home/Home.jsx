import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './Home.module.css';

const Home = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const services = [
        {
            title: 'Website Development',
            description: 'We design and develop fast, modern, responsive websites that convert visitors into customers. Every site is custom-built with SEO best practices, optimized performance, and mobile-first design to ensure your business stands out online.',
            icon: '🌐',
            forWho: 'For businesses and institutions',
            link: '/services'
        },
        {
            title: 'Custom Software Development',
            description: 'Our team builds tailor-made software applications designed specifically for your unique business workflows. From inventory management to CRM systems, we create solutions that eliminate manual processes and boost productivity.',
            icon: '💻',
            forWho: 'For growing teams',
            link: '/services'
        },
        {
            title: 'College Management Systems',
            description: 'Complete end-to-end management systems for educational institutions. Student information systems, attendance tracking, fee management, examination portals, and faculty dashboards — all built specifically for Indian colleges and universities.',
            icon: '🎓',
            forWho: 'For educational institutions',
            link: '/solutions'
        },
        {
            title: 'AI & Process Automation',
            description: 'Leverage artificial intelligence and intelligent automation to reduce repetitive manual work. We integrate AI-powered chatbots, automated workflows, data processing pipelines, and smart analytics into your existing systems.',
            icon: '🤖',
            forWho: 'For efficiency-focused teams',
            link: '/services'
        }
    ];

    const problems = [
        {
            title: 'Manual Processes',
            description: 'Spending hours on repetitive tasks that could be automated — from data entry to report generation'
        },
        {
            title: 'Outdated Systems',
            description: 'Legacy software holding your team back with slow performance, poor UX, and no mobile support'
        },
        {
            title: 'No Online Presence',
            description: 'Missing out on potential customers because your business has no professional website or digital footprint'
        },
        {
            title: 'Disconnected Tools',
            description: 'Using multiple siloed tools that don\'t talk to each other, causing data inconsistency and wasted time'
        }
    ];

    const whyChooseUs = [
        {
            title: 'Custom-Built Solutions',
            description: 'No templates or one-size-fits-all approaches. Every project is built from scratch to match your exact requirements, workflows, and business goals.',
            icon: '⚙️'
        },
        {
            title: 'Scalable Architecture',
            description: 'Our solutions are designed to grow with your business. Whether you have 10 users today or 10,000 tomorrow, your software will perform flawlessly.',
            icon: '📈'
        },
        {
            title: 'Hyderabad-Based Team',
            description: 'Work with a local team that understands your market. We combine Hyderabad\'s tech expertise with global development standards and best practices.',
            icon: '📍'
        },
        {
            title: 'MSME Registered',
            description: 'Officially recognized by the Government of India as a Micro, Small and Medium Enterprise. Trusted, reliable, and fully compliant with Indian business regulations.',
            icon: '✓'
        }
    ];

    const capabilities = [
        { name: 'AI Integration', icon: '🤖', description: 'Smart chatbots, document processing, and predictive analytics' },
        { name: 'Process Automation', icon: '⚡', description: 'Workflow automation, scheduled tasks, and event-driven systems' },
        { name: 'Custom Dashboards', icon: '📊', description: 'Real-time business intelligence dashboards with interactive charts' },
        { name: 'Real-time Analytics', icon: '📈', description: 'Live data tracking, performance monitoring, and actionable insights' }
    ];

    const processSteps = [
        {
            step: 1,
            title: 'Discovery & Consultation',
            description: 'We start with a free consultation to understand your business, challenges, and goals. No jargon — just a clear conversation about what you need.'
        },
        {
            step: 2,
            title: 'Planning & Architecture',
            description: 'We design the technical architecture and create detailed wireframes. You approve every detail before development begins.'
        },
        {
            step: 3,
            title: 'Development & Testing',
            description: 'Our engineers build your solution using modern technologies, with regular progress demos so you always know where things stand.'
        },
        {
            step: 4,
            title: 'Launch & Ongoing Support',
            description: 'We deploy your solution, provide thorough training, and offer ongoing maintenance and support to keep everything running smoothly.'
        }
    ];

    const faqs = [
        {
            question: 'What types of businesses does NS SiteCraft Solutions work with?',
            answer: 'We work with small to medium-sized businesses (SMBs), startups, educational institutions (colleges and universities), and enterprises across Hyderabad and India. Our clients range from local businesses needing a professional website to colleges requiring complete management systems handling thousands of students.'
        },
        {
            question: 'How much does custom web development cost in Hyderabad?',
            answer: 'Our web development projects start from affordable packages tailored to your scope. A basic business website typically ranges from ₹15,000 to ₹50,000, while custom web applications and software solutions are quoted based on complexity. We offer a free consultation to provide an accurate estimate for your specific project.'
        },
        {
            question: 'How long does it take to build a custom website or software?',
            answer: 'A standard business website takes 2-4 weeks. Custom web applications take 4-8 weeks depending on features. Complex software solutions like college management systems take 8-16 weeks. We provide detailed timelines during our planning phase and keep you updated with regular progress demos.'
        },
        {
            question: 'Do you provide website maintenance and support after launch?',
            answer: 'Yes, we offer comprehensive post-launch support including bug fixes, security updates, performance monitoring, feature enhancements, and hosting management. We believe in long-term partnerships — our job doesn\'t end at launch. We offer flexible maintenance plans to suit your needs.'
        },
        {
            question: 'What technologies do you use for web and software development?',
            answer: 'We use modern, battle-tested technologies including React, Node.js, Python, PostgreSQL, and MongoDB for development. For AI features, we integrate OpenAI APIs, TensorFlow, and custom machine learning models. Our infrastructure runs on cloud platforms like AWS and Vercel for reliability and scalability.'
        },
        {
            question: 'Is NS SiteCraft Solutions a registered company?',
            answer: 'Yes, NS SiteCraft Solutions is officially registered as a Micro, Small and Medium Enterprise (MSME) with the Government of India. We are based in Hyderabad, Telangana, and fully comply with Indian business regulations. Our MSME registration ensures accountability, transparency, and trust.'
        }
    ];

    // JSON-LD schemas
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'NS SiteCraft Solutions',
        'description': 'Custom web development, software solutions, college management systems, and AI-powered automation for businesses in Hyderabad, India.',
        'url': 'https://ns-sitecraft-solutions.vercel.app',
        'logo': 'https://ns-sitecraft-solutions.vercel.app/favicon.svg',
        'image': 'https://ns-sitecraft-solutions.vercel.app/og-image.png',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Hyderabad',
            'addressRegion': 'Telangana',
            'addressCountry': 'IN'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '17.385044',
            'longitude': '78.486671'
        },
        'areaServed': [
            { '@type': 'City', 'name': 'Hyderabad' },
            { '@type': 'Country', 'name': 'India' }
        ],
        'priceRange': '₹₹',
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:00',
            'closes': '18:00'
        },
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Software Development Services',
            'itemListElement': [
                {
                    '@type': 'Offer',
                    'itemOffered': { '@type': 'Service', 'name': 'Custom Web Development', 'description': 'Responsive business websites and web applications' }
                },
                {
                    '@type': 'Offer',
                    'itemOffered': { '@type': 'Service', 'name': 'Custom Software Development', 'description': 'Tailor-made software for business operations' }
                },
                {
                    '@type': 'Offer',
                    'itemOffered': { '@type': 'Service', 'name': 'College Management Systems', 'description': 'End-to-end management for educational institutions' }
                },
                {
                    '@type': 'Offer',
                    'itemOffered': { '@type': 'Service', 'name': 'AI & Process Automation', 'description': 'AI integration and workflow automation' }
                }
            ]
        }
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
            }
        }))
    };

    // Animation variants
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
            <SEOHead
                title="Custom Web Development & Software Solutions in Hyderabad"
                description="NS SiteCraft Solutions builds custom websites, software applications, college management systems, and AI-powered automation for businesses in Hyderabad. MSME registered. Free consultation available."
                canonicalPath="/"
                keywords="web development Hyderabad, custom software development Hyderabad, college management system, AI solutions India, business automation, website design Hyderabad, software company Hyderabad, MSME registered"
                structuredData={[localBusinessSchema, faqSchema]}
            />

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
                                Custom Web & Software Development in <span className="text-gradient">Hyderabad</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                We build custom websites, software applications, college management systems, and AI-powered
                                automation solutions for businesses and educational institutions. MSME registered company
                                delivering scalable technology that solves real problems.
                            </p>
                            <div className={styles.heroCta}>
                                <Link to="/contact">
                                    <Button size="large">Get Free Consultation</Button>
                                </Link>
                                <Link to="/services">
                                    <Button variant="secondary" size="large">Explore Our Services</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Problems Section */}
                <section className={styles.problemsSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Business Challenges We Solve Every Day
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Whether you're a growing business or an educational institution, these common technology
                                challenges are holding you back. We've helped dozens of organizations overcome them.
                            </p>
                        </motion.div>
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
                                    <div>
                                        <h3 className={styles.problemTitle}>{problem.title}</h3>
                                        <p>{problem.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Overview */}
                <section className={styles.servicesSection} id="services-overview">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Web Development & Software Services We Offer
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                From professional business websites to complex enterprise software, we deliver
                                end-to-end technology solutions tailored to your specific needs and budget.
                            </p>
                        </motion.div>
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
                                    <Link to={service.link} className={styles.serviceLink}>
                                        Learn more →
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className={styles.servicesCtaContainer}>
                            <Link to="/services">
                                <Button variant="outline" size="large">View All Services & Pricing</Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How We Work — Process Section */}
                <section className={styles.processSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h2 className={styles.sectionTitle}>
                                How We Build Your Software — Our Development Process
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                A transparent, collaborative process that keeps you informed and in control at every stage.
                                No surprises. No hidden costs. Just clear communication and quality delivery.
                            </p>
                        </motion.div>
                        <div className={styles.processGrid}>
                            {processSteps.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-50px' }}
                                    variants={fadeUpVariants}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.12,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className={styles.processCard}
                                >
                                    <div className={styles.processStep}>{item.step}</div>
                                    <h3 className={styles.processTitle}>{item.title}</h3>
                                    <p className={styles.processDescription}>{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capabilities */}
                <section className={styles.capabilitiesSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Technology Capabilities & Expertise
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                We leverage cutting-edge technologies to build solutions that are fast, secure, and future-proof.
                            </p>
                        </motion.div>
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
                                    <div>
                                        <span className={styles.capabilityName}>{capability.name}</span>
                                        <p className={styles.capabilityDescription}>{capability.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className={styles.whySection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Why Businesses Choose NS SiteCraft Solutions
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                We're not just another web development agency. We're your technology partner
                                committed to building solutions that deliver real business results.
                            </p>
                        </motion.div>
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

                {/* FAQ Section */}
                <section className={styles.faqSection} id="faq">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Frequently Asked Questions About Our Services
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Have questions about custom web development, pricing, or our process?
                                Here are answers to the most common questions we receive.
                            </p>
                        </motion.div>
                        <div className={styles.faqList}>
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-30px' }}
                                    variants={fadeUpVariants}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.08,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}
                                >
                                    <button
                                        className={styles.faqQuestion}
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        aria-expanded={openFaq === index}
                                    >
                                        <h3>{faq.question}</h3>
                                        <span className={styles.faqToggle}>
                                            {openFaq === index ? '−' : '+'}
                                        </span>
                                    </button>
                                    <div
                                        className={styles.faqAnswer}
                                        style={{
                                            maxHeight: openFaq === index ? '500px' : '0',
                                            opacity: openFaq === index ? 1 : 0
                                        }}
                                    >
                                        <p>{faq.answer}</p>
                                    </div>
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
                            <h2 className={styles.ctaTitle}>Ready to Transform Your Business with Technology?</h2>
                            <p className={styles.ctaSubtitle}>
                                Get a free, no-obligation consultation. We'll discuss your challenges,
                                explore solutions, and give you a clear roadmap — no pressure, no jargon,
                                just honest advice from experienced developers.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link to="/contact">
                                    <Button size="large">Schedule Free Consultation</Button>
                                </Link>
                                <Link to="/pricing">
                                    <Button variant="secondary" size="large">View Pricing Plans</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;
