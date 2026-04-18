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
    const [formStatus, setFormStatus] = useState('idle');

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => {
            setFormStatus('sent');
            setFormData({ name: '', email: '', projectType: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 4000);
        }, 1500);
    };

    const scrollTo = (id) => (e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    };

    // ── DATA ──────────────────────────────────────────

    const benefits = [
        {
            icon: '🎯',
            title: 'A website that actually brings you customers',
            description: 'Not just a pretty page. A fast, clean, search-friendly website designed to turn visitors into paying clients.',
        },
        {
            icon: '⚡',
            title: 'Go from idea to live website in weeks, not months',
            description: 'We move fast without cutting corners. You get a finished, polished product — not an endless "work in progress."',
        },
        {
            icon: '🧘',
            title: 'Zero tech headaches — we handle everything',
            description: 'You focus on your business. We take care of design, development, hosting, and all the technical details.',
        },
        {
            icon: '📈',
            title: 'A digital presence that grows with your business',
            description: 'Built to scale. As your business evolves, your website evolves with it — no starting over from scratch.',
        },
    ];

    const processSteps = [
        {
            num: '01',
            title: 'Tell us your idea',
            description: 'We hop on a quick call. You share your vision, your goals, your timeline. We listen, ask the right questions, and figure out exactly what you need.',
        },
        {
            num: '02',
            title: 'We design & build it',
            description: 'We get to work — designing, developing, and keeping you in the loop at every step. No disappearing acts. You see real progress every week.',
        },
        {
            num: '03',
            title: 'Launch & grow',
            description: 'We launch your website, make sure everything runs smoothly, and stick around for support. Your success is our success.',
        },
    ];

    const whyPoints = [
        {
            icon: '💬',
            title: 'We communicate like humans',
            description: 'No jargon. No confusing emails. Just clear, honest updates so you always know what\'s happening.',
        },
        {
            icon: '🚀',
            title: 'We deliver fast — and we mean it',
            description: 'Most projects go live in 3–6 weeks. We respect your time and your deadlines.',
        },
        {
            icon: '🎨',
            title: 'Design that looks premium, not templated',
            description: 'Every website is custom-built. No cookie-cutter templates. Your brand deserves better.',
        },
        {
            icon: '🤝',
            title: 'We don\'t vanish after launch',
            description: 'Need a tweak? Have a question? We\'re here. Post-launch support is part of the deal.',
        },
    ];

    const testimonials = [
        {
            quote: 'I had a rough idea and a tight budget. NS SiteCraft turned it into a website I\'m genuinely proud of. They explained everything in simple terms and delivered exactly what they promised.',
            name: 'Arjun Mehta',
            role: 'Founder, FreshCart Groceries',
        },
        {
            quote: 'Working with NS SiteCraft felt different from every other developer I\'ve tried. They actually listened, kept me updated, and launched on time. That\'s rare.',
            name: 'Priya Sharma',
            role: 'Owner, Bloom Studio',
        },
        {
            quote: 'I don\'t understand tech at all, and that was never a problem. They handled everything — from design to going live. My business has gotten more leads in the last month than the past quarter.',
            name: 'Rahul Desai',
            role: 'Director, Nexus Consulting',
        },
    ];

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'NS SiteCraft Solutions',
        description: 'We build clean, modern websites and digital products for startups, small businesses, and individuals.',
        url: 'https://ns-sitecraft-solutions.vercel.app',
        logo: 'https://ns-sitecraft-solutions.vercel.app/favicon.svg',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            addressCountry: 'IN',
        },
        priceRange: '₹₹',
    };

    return (
        <PageTransition>
            <SEOHead
                title="NS SiteCraft Solutions — Your Idea, Built Right"
                description="We build clean, modern websites for startups and small businesses. From idea to live product — fast, affordable, and built to grow."
                canonicalPath="/"
                keywords="website development, startup website, small business website, web design, affordable web development, custom website"
                structuredData={[localBusinessSchema]}
            />

            <div className={styles.home}>
                {/* ═══════════════════════════════════════════
                    SECTION 1: HERO
                ═══════════════════════════════════════════ */}
                <section className={styles.hero} id="home">
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
                                You have an idea.
                                <br />
                                <span className={styles.heroTitleAccent}>We'll build it.</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                NS SiteCraft Solutions helps startups, small businesses, and individuals
                                turn ideas into clean, modern websites — fast, affordable, and without the tech headaches.
                            </p>
                            <div className={styles.heroCta}>
                                <a href="#contact" className={styles.btnPrimary} onClick={scrollTo('contact')}>
                                    Start Your Project →
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
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
                    SECTION 2: WHAT YOU GET (Benefits)
                ═══════════════════════════════════════════ */}
                <section className={styles.benefitsSection} id="benefits">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>WHAT YOU GET</span>
                            <h2 className={styles.sectionTitle}>
                                It's not about the website.
                                <br />It's about what the website does for you.
                            </h2>
                        </motion.div>

                        <motion.div
                            className={styles.benefitsGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                        >
                            {benefits.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.benefitCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className={styles.benefitIcon}>{item.icon}</span>
                                    <div>
                                        <h3 className={styles.benefitTitle}>{item.title}</h3>
                                        <p className={styles.benefitDesc}>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 3: HOW IT WORKS (3 Steps)
                ═══════════════════════════════════════════ */}
                <section className={styles.processSection} id="process">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>HOW IT WORKS</span>
                            <h2 className={styles.sectionTitleLight}>
                                Three steps. That's it.
                            </h2>
                            <p className={styles.sectionSubtitleLight}>
                                No complicated processes. No confusing timelines. Just a clear path from your idea to a live product.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.stepsGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                        >
                            {processSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.stepCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className={styles.stepNumber}>{step.num}</span>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>{step.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className={styles.sectionCta}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <a href="#contact" className={styles.btnPrimaryLight} onClick={scrollTo('contact')}>
                                Book a Free Call →
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 4: SHOWCASE / WORK
                ═══════════════════════════════════════════ */}
                <section className={styles.workSection} id="work">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>OUR WORK</span>
                            <h2 className={styles.sectionTitle}>
                                Built with care. Shipped with confidence.
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Every project started as an idea. Here's what they became.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.projectsGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                        >
                            {featuredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    className={styles.projectCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <div className={styles.projectHeader}>
                                        <span className={styles.projectCategory}>{project.category}</span>
                                    </div>
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
                    SECTION 5: WHY CHOOSE US
                ═══════════════════════════════════════════ */}
                <section className={styles.whySection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>WHY US</span>
                            <h2 className={styles.sectionTitleLight}>
                                There are thousands of developers.
                                <br />Here's why people choose us.
                            </h2>
                        </motion.div>

                        <motion.div
                            className={styles.whyGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                        >
                            {whyPoints.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.whyCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className={styles.whyIcon}>{item.icon}</span>
                                    <h3 className={styles.whyTitle}>{item.title}</h3>
                                    <p className={styles.whyDesc}>{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 6: TESTIMONIALS
                ═══════════════════════════════════════════ */}
                <section className={styles.testimonialsSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>WHAT PEOPLE SAY</span>
                            <h2 className={styles.sectionTitle}>
                                Don't take our word for it.
                            </h2>
                        </motion.div>

                        <motion.div
                            className={styles.testimonialsGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                        >
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.testimonialCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className={styles.testimonialStars}>★★★★★</div>
                                    <blockquote className={styles.testimonialQuote}>
                                        "{t.quote}"
                                    </blockquote>
                                    <div className={styles.testimonialAuthor}>
                                        <div className={styles.testimonialAvatar}>
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className={styles.testimonialName}>{t.name}</p>
                                            <p className={styles.testimonialRole}>{t.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 7: FINAL CTA
                ═══════════════════════════════════════════ */}
                <section className={styles.finalCtaSection}>
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className={styles.finalCtaContent}
                        >
                            <h2 className={styles.finalCtaTitle}>
                                You've scrolled this far.
                                <br />That means you're serious.
                            </h2>
                            <p className={styles.finalCtaSubtitle}>
                                Let's stop thinking about it and start building it. One quick conversation is all it takes to get started.
                            </p>
                            <a href="#contact" className={styles.btnPrimaryLarge} onClick={scrollTo('contact')}>
                                Start Your Project →
                            </a>
                            <p className={styles.finalCtaMicro}>
                                Free consultation · No commitment · Response within 24 hours
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 8: CONTACT
                ═══════════════════════════════════════════ */}
                <section className={styles.contactSection} id="contact">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabel}>LET'S TALK</span>
                            <h2 className={styles.sectionTitle}>
                                Ready? Let's make it happen.
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Tell us a little about your project. We'll get back to you within 24 hours.
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
                            <form className={styles.contactForm} onSubmit={handleSubmit}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.formLabel}>Name</label>
                                        <input
                                            type="text" id="name" name="name"
                                            value={formData.name} onChange={handleInputChange}
                                            placeholder="Your name" className={styles.formInput} required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.formLabel}>Email</label>
                                        <input
                                            type="email" id="email" name="email"
                                            value={formData.email} onChange={handleInputChange}
                                            placeholder="you@email.com" className={styles.formInput} required
                                        />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="projectType" className={styles.formLabel}>What do you need?</label>
                                    <select
                                        id="projectType" name="projectType"
                                        value={formData.projectType} onChange={handleInputChange}
                                        className={styles.formSelect} required
                                    >
                                        <option value="" disabled>Choose one</option>
                                        <option value="website">A website</option>
                                        <option value="web-app">A web application</option>
                                        <option value="redesign">A redesign of my existing site</option>
                                        <option value="not-sure">Not sure yet — help me figure it out</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.formLabel}>Tell us more (optional)</label>
                                    <textarea
                                        id="message" name="message"
                                        value={formData.message} onChange={handleInputChange}
                                        placeholder="What's the idea? What's the goal? Any timeline in mind?"
                                        className={styles.formTextarea} rows={4}
                                    />
                                </div>
                                <button
                                    type="submit" className={styles.formSubmit}
                                    disabled={formStatus === 'sending'}
                                >
                                    {formStatus === 'sending' ? 'Sending...' :
                                     formStatus === 'sent' ? '✓ Sent! We\'ll be in touch.' :
                                     'Send Message →'}
                                </button>
                            </form>

                            <div className={styles.contactInfo}>
                                <div className={styles.contactInfoCard}>
                                    <h3 className={styles.contactInfoHeading}>Prefer to reach out directly?</h3>
                                    <div className={styles.contactInfoItem}>
                                        <span className={styles.contactInfoIcon}>📧</span>
                                        <a href="mailto:nssitecraftsolution@gmail.com" className={styles.contactInfoValue}>
                                            nssitecraftsolution@gmail.com
                                        </a>
                                    </div>
                                    <div className={styles.contactInfoItem}>
                                        <span className={styles.contactInfoIcon}>📱</span>
                                        <a href="tel:+919390969461" className={styles.contactInfoValue}>
                                            +91 93909 69461
                                        </a>
                                    </div>
                                    <div className={styles.contactInfoItem}>
                                        <span className={styles.contactInfoIcon}>📍</span>
                                        <span className={styles.contactInfoValue}>Hyderabad, India</span>
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
