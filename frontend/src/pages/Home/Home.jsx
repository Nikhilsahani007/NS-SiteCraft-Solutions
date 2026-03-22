import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEOHead from '../../components/SEOHead/SEOHead';
import { featuredProjects } from '../../data/projects';
import styles from './Home.module.css';

const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1 },
        },
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        // Simulate form submission
        setTimeout(() => {
            setFormStatus('sent');
            setFormData({ name: '', email: '', projectType: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 4000);
        }, 1500);
    };

    // Data
    const painPoints = [
        {
            icon: '💸',
            text: "You've already wasted money on freelancers who ghosted you.",
        },
        {
            icon: '😵',
            text: "You don't know if you need a website, an app, or both — and no one explains it clearly.",
        },
        {
            icon: '⏳',
            text: "Your competitor launched 6 months ago. You're still stuck at 'idea stage.'",
        },
        {
            icon: '🤷',
            text: 'You want someone who just handles it — without the jargon and the runaround.',
        },
    ];

    const services = [
        {
            icon: '🌐',
            title: 'Websites That Convert',
            description:
                'Beautiful, fast, SEO-optimized websites that turn visitors into customers. Not just a digital brochure — a revenue engine.',
        },
        {
            icon: '📱',
            title: 'Apps That People Actually Use',
            description:
                'Mobile and web applications designed around your users. Intuitive, reliable, and built to retain.',
        },
        {
            icon: '⚙️',
            title: 'Custom Software That Saves You Time',
            description:
                'Automate the repetitive. Streamline the complex. Get custom tools that do the heavy lifting so your team can focus on growth.',
        },
    ];

    const processSteps = [
        {
            step: '01',
            title: 'Discovery Call',
            description:
                "We listen. You tell us your idea, your goals, and your budget. We tell you exactly what's possible — no pressure, no jargon.",
        },
        {
            step: '02',
            title: 'Design & Build',
            description:
                'We design, develop, and keep you in the loop at every milestone. You see progress weekly. No vanishing acts.',
        },
        {
            step: '03',
            title: 'Launch & Support',
            description:
                'We launch your product, make sure everything works perfectly, and stay available for ongoing support and growth.',
        },
    ];

    const advantages = [
        {
            icon: '🎯',
            title: 'Outcome-Obsessed',
            description: 'We measure success by your business results — not just deliverables.',
        },
        {
            icon: '💬',
            title: 'Transparent Communication',
            description: 'Weekly updates, open timelines, honest conversations. Always.',
        },
        {
            icon: '🚀',
            title: 'Fast, Focused Delivery',
            description: 'Most projects launch in 4–8 weeks. No scope creep, no delays.',
        },
        {
            icon: '🔧',
            title: 'Full-Service',
            description: 'Design, development, deployment, support. One team. One point of contact.',
        },
        {
            icon: '🤝',
            title: 'Founder-Friendly',
            description: 'We speak your language — business, not code.',
        },
        {
            icon: '🛡️',
            title: 'Post-Launch Support',
            description: "We don't disappear after launch. Your success is our reputation.",
        },
    ];

    // SEO Structured Data
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'NS SiteCraft Solutions',
        description:
            'We turn bold ideas into digital products that drive real revenue. Custom websites, apps, and software for startups and businesses.',
        url: 'https://ns-sitecraft-solutions.vercel.app',
        logo: 'https://ns-sitecraft-solutions.vercel.app/favicon.svg',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            addressCountry: 'IN',
        },
        areaServed: [
            { '@type': 'City', name: 'Hyderabad' },
            { '@type': 'Country', name: 'India' },
        ],
        priceRange: '₹₹',
    };

    return (
        <PageTransition>
            <SEOHead
                title="NS SiteCraft Solutions — We Turn Bold Ideas Into Digital Products"
                description="NS SiteCraft Solutions helps startups, businesses, and ambitious founders launch websites, apps, and custom software — on time, on budget, and built to grow."
                canonicalPath="/"
                keywords="web development, custom software, mobile app development, startup technology partner, business website, digital products"
                structuredData={[localBusinessSchema]}
            />

            <div className={styles.home}>
                {/* ═══════════════════════════════════════════
                    SECTION 1: HERO
                ═══════════════════════════════════════════ */}
                <section className={styles.hero}>
                    <div className={styles.heroGlow} />
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className={styles.heroContent}
                        >
                            <h1 className={styles.heroTitle}>
                                We Turn Bold Ideas Into Digital Products
                                <br />
                                <span className={styles.heroTitleAccent}>That Drive Real Revenue.</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                NS SiteCraft Solutions helps startups, businesses, and ambitious founders
                                launch websites, apps, and custom software — on time, on budget, and built to grow.
                            </p>
                            <div className={styles.heroCta}>
                                <a
                                    href="#contact"
                                    className={styles.btnPrimary}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                >
                                    Start Your Project →
                                </a>
                                <a
                                    href="#projects"
                                    className={styles.btnSecondary}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                >
                                    See Our Work ↓
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Trust Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={styles.trustBar}
                    >
                        <div className="container">
                            <div className={styles.trustBarInner}>
                                <span className={styles.trustItem}>✓ 50+ Projects Delivered</span>
                                <span className={styles.trustDivider} />
                                <span className={styles.trustItem}>✓ Trusted by Startups & SMBs</span>
                                <span className={styles.trustDivider} />
                                <span className={styles.trustItem}>✓ End-to-End Development</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 2: PROBLEM — Make Them Feel Understood
                ═══════════════════════════════════════════ */}
                <section className={styles.problemSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>THE CHALLENGE</span>
                            <h2 className={styles.sectionTitle}>
                                You Have the Vision. But Turning It Into
                                <br />Reality Feels Impossible.
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                You're not a developer. You don't speak "tech." And every agency you've talked to
                                either over-promises, over-charges, or disappears mid-project.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.painGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={staggerContainer}
                        >
                            {painPoints.map((pain, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.painCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className={styles.painIcon}>{pain.icon}</span>
                                    <p className={styles.painText}>{pain.text}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 3: SERVICES — Outcome-Based
                ═══════════════════════════════════════════ */}
                <section className={styles.servicesSection} id="services">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>WHAT WE BUILD</span>
                            <h2 className={styles.sectionTitleLight}>
                                Digital Products Designed to Make You Money.
                            </h2>
                            <p className={styles.sectionSubtitleLight}>
                                We don't just write code — we build business tools that attract customers,
                                automate workflows, and scale with you.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.servicesGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={staggerContainer}
                        >
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.serviceCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                >
                                    <span className={styles.serviceIcon}>{service.icon}</span>
                                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                                    <p className={styles.serviceDescription}>{service.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className={styles.sectionCta}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <a
                                href="#contact"
                                className={styles.btnPrimary}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Let's Talk About Your Idea →
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 4: PROJECTS / PROOF
                ═══════════════════════════════════════════ */}
                <section className={styles.projectsSection} id="projects">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>OUR WORK</span>
                            <h2 className={styles.sectionTitle}>Real Products. Real Results.</h2>
                            <p className={styles.sectionSubtitle}>
                                Every project is a partnership. Here's what we've built — and the impact it made.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.projectsGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={staggerContainer}
                        >
                            {featuredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    className={styles.projectCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <span className={styles.projectCategory}>{project.category}</span>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectImpact}>{project.impact}</p>
                                    <div className={styles.projectTags}>
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className={styles.projectTag}>{tech}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 5: HOW IT WORKS — 3 Steps
                ═══════════════════════════════════════════ */}
                <section className={styles.processSection} id="process">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>HOW IT WORKS</span>
                            <h2 className={styles.sectionTitleLight}>
                                From First Call to Launch — In Three Clear Steps.
                            </h2>
                            <p className={styles.sectionSubtitleLight}>
                                No confusing processes. No surprises. Just a clear path from your idea to a product you're proud of.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.stepsGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={staggerContainer}
                        >
                            {processSteps.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.stepCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className={styles.stepNumber}>{item.step}</span>
                                    <h3 className={styles.stepTitle}>{item.title}</h3>
                                    <p className={styles.stepDescription}>{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className={styles.sectionCta}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <a
                                href="#contact"
                                className={styles.btnPrimaryLight}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Book Your Free Discovery Call →
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 6: WHY CHOOSE US
                ═══════════════════════════════════════════ */}
                <section className={styles.whySection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>WHY NS SITECRAFT</span>
                            <h2 className={styles.sectionTitle}>
                                We're Not Just Developers. We're Your Growth Partner.
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Here's what working with us actually looks like.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.advantagesGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={staggerContainer}
                        >
                            {advantages.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.advantageCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                                >
                                    <span className={styles.advantageIcon}>{item.icon}</span>
                                    <h3 className={styles.advantageTitle}>{item.title}</h3>
                                    <p className={styles.advantageDescription}>{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 7: FINAL CTA — Emotional Push
                ═══════════════════════════════════════════ */}
                <section className={styles.finalCtaSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className={styles.finalCtaContent}
                        >
                            <h2 className={styles.finalCtaTitle}>
                                Your Idea Deserves More Than a "Maybe."
                            </h2>
                            <p className={styles.finalCtaSubtitle}>
                                Every week you wait, someone else is launching the product you're still
                                thinking about. Let's change that — starting today.
                            </p>
                            <a
                                href="#contact"
                                className={styles.btnPrimaryLarge}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Start Your Project →
                            </a>
                            <p className={styles.finalCtaMicro}>
                                Free discovery call · No commitment · Response within 24 hours
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 8: CONTACT — Frictionless
                ═══════════════════════════════════════════ */}
                <section className={styles.contactSection} id="contact">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>GET IN TOUCH</span>
                            <h2 className={styles.sectionTitle}>
                                Let's Build Something Great Together.
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Fill out the form below and we'll get back to you within 24 hours.
                                Or just email us directly.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.contactGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {/* Contact Form */}
                            <form className={styles.contactForm} onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.formLabel}>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your full name"
                                        className={styles.formInput}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@company.com"
                                        className={styles.formInput}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="projectType" className={styles.formLabel}>Project Type</label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleInputChange}
                                        className={styles.formSelect}
                                        required
                                    >
                                        <option value="" disabled>Select a project type</option>
                                        <option value="website">Website</option>
                                        <option value="mobile-app">Mobile App</option>
                                        <option value="custom-software">Custom Software</option>
                                        <option value="not-sure">Not Sure Yet</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.formLabel}>Brief Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell us briefly about your project..."
                                        className={styles.formTextarea}
                                        rows={3}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={styles.formSubmit}
                                    disabled={formStatus === 'sending'}
                                >
                                    {formStatus === 'sending' ? 'Sending...' :
                                        formStatus === 'sent' ? '✓ Message Sent!' :
                                            'Send Message →'}
                                </button>
                            </form>

                            {/* Contact Info */}
                            <div className={styles.contactInfo}>
                                <div className={styles.contactInfoItem}>
                                    <span className={styles.contactInfoIcon}>📧</span>
                                    <div>
                                        <p className={styles.contactInfoLabel}>Email us directly</p>
                                        <a href="mailto:nssitecraftsolution@gmail.com" className={styles.contactInfoValue}>
                                            nssitecraftsolution@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <span className={styles.contactInfoIcon}>📱</span>
                                    <div>
                                        <p className={styles.contactInfoLabel}>Call us</p>
                                        <a href="tel:+919390969461" className={styles.contactInfoValue}>
                                            +91 93909 69461
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <span className={styles.contactInfoIcon}>📍</span>
                                    <div>
                                        <p className={styles.contactInfoLabel}>Based in</p>
                                        <p className={styles.contactInfoValue}>Hyderabad, India</p>
                                    </div>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <span className={styles.contactInfoIcon}>⏱️</span>
                                    <div>
                                        <p className={styles.contactInfoLabel}>Response time</p>
                                        <p className={styles.contactInfoValue}>Within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;
