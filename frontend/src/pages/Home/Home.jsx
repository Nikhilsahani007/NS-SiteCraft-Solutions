import { useState, useEffect, useRef } from 'react';
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

    // ── Animated Stats Counter ──
    const useCountUp = (end, duration = 2000) => {
        const [count, setCount] = useState(0);
        const ref = useRef(null);
        const counted = useRef(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !counted.current) {
                        counted.current = true;
                        const startTime = Date.now();
                        const animate = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            setCount(Math.floor(eased * end));
                            if (progress < 1) requestAnimationFrame(animate);
                        };
                        requestAnimationFrame(animate);
                    }
                },
                { threshold: 0.3 }
            );
            if (ref.current) observer.observe(ref.current);
            return () => observer.disconnect();
        }, [end, duration]);

        return [count, ref];
    };

    // ── DATA ──────────────────────────────────────────

    const services = [
        {
            icon: '🌐',
            title: 'Web Design & Development',
            description: 'Professional websites that look great, load fast, and convert visitors into customers.',
            items: ['Business Websites', 'Landing Pages', 'E-Commerce Stores', 'Website Redesigns'],
        },
        {
            icon: '⚙️',
            title: 'Software Development',
            description: 'Custom-built web applications and backend systems tailored to your specific business needs.',
            items: ['Custom Web Apps', 'Management Systems', 'API & Backend Development', 'Process Automation'],
        },
        {
            icon: '📊',
            title: 'Digital Strategy',
            description: 'Technical consulting to help you make smart decisions about your digital presence and infrastructure.',
            items: ['SEO Foundation', 'Performance Optimization', 'Analytics Setup', 'Technical Consulting'],
        },
    ];

    const processSteps = [
        {
            num: '01',
            title: 'Discover',
            description: 'We start with a conversation. You share your goals, your audience, and your timeline. We ask the right questions to build a clear project brief.',
        },
        {
            num: '02',
            title: 'Design',
            description: 'You see wireframes and visual mockups before we write a single line of code. Nothing moves forward until you approve the direction.',
        },
        {
            num: '03',
            title: 'Develop',
            description: 'We build with clean, modern code — keeping you updated with weekly progress. No disappearing acts. You see real results every step of the way.',
        },
        {
            num: '04',
            title: 'Deploy',
            description: 'We launch your project, run final tests, optimize performance, and provide hands-on support. Your success doesn\'t end at deployment.',
        },
    ];

    const benefits = [
        {
            icon: '🎯',
            title: 'A website that generates leads',
            description: 'Not just a pretty page. A fast, search-optimized, mobile-ready website designed to turn visitors into paying clients — with clear CTAs and conversion-focused structure.',
        },
        {
            icon: '⚡',
            title: 'Launch-ready in 3–6 weeks',
            description: 'We move fast without cutting corners. Most projects go from first call to live launch within 3–6 weeks. You get a finished product, not an endless "work in progress."',
        },
        {
            icon: '🔑',
            title: 'Full ownership of everything',
            description: 'Your code, your domain, your hosting — it\'s all yours. No vendor lock-in, no hidden dependencies. You own 100% of what we build for you.',
        },
        {
            icon: '🤝',
            title: 'A partner, not a vendor',
            description: 'We don\'t disappear after launch. Need a tweak? Have a question? Want to add a feature? Post-launch support and guidance is part of every engagement.',
        },
    ];

    const testimonials = [
        {
            quote: 'I had a rough idea and a tight budget. NS SiteCraft turned it into a website I\'m genuinely proud of. They explained everything in simple terms and delivered exactly what they promised.',
            name: 'Arjun Mehta',
            role: 'Founder, FreshCart Groceries',
            context: 'E-commerce website',
        },
        {
            quote: 'Working with NS SiteCraft felt different from every other developer I\'ve tried. They actually listened, kept me updated, and launched on time. That\'s rare.',
            name: 'Priya Sharma',
            role: 'Owner, Bloom Studio',
            context: 'Business website',
        },
        {
            quote: 'I don\'t understand tech at all, and that was never a problem. They handled everything — from design to going live. My business has gotten more inquiries in the last month than the past quarter.',
            name: 'Rahul Desai',
            role: 'Director, Nexus Consulting',
            context: 'Corporate website + SEO',
        },
    ];

    const stats = [
        { value: 15, suffix: '+', label: 'Projects Delivered' },
        { value: 98, suffix: '%', label: 'On-Time Delivery' },
        { value: 4, suffix: ' weeks', label: 'Avg. Turnaround' },
        { value: 24, suffix: 'hr', label: 'Response Time' },
    ];

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'NS SiteCraft Solutions',
        description: 'We build websites, web applications, and custom software for startups and small businesses in Hyderabad.',
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

    // Stats counter hooks
    const [stat0, stat0Ref] = useCountUp(stats[0].value);
    const [stat1, stat1Ref] = useCountUp(stats[1].value);
    const [stat2, stat2Ref] = useCountUp(stats[2].value);
    const [stat3, stat3Ref] = useCountUp(stats[3].value);
    const statValues = [stat0, stat1, stat2, stat3];
    const statRefs = [stat0Ref, stat1Ref, stat2Ref, stat3Ref];

    return (
        <PageTransition>
            <SEOHead
                title="NS SiteCraft Solutions — Digital Solutions That Help Your Business Grow"
                description="We design and build websites, web applications, and custom software for startups and small businesses ready to establish a strong digital presence. Based in Hyderabad."
                canonicalPath="/"
                keywords="website development, startup website, small business website, web design Hyderabad, custom software development, web application development"
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
                            <span className={styles.heroBadge}>
                                🚀 MSME Registered · Based in Hyderabad
                            </span>
                            <h1 className={styles.heroTitle}>
                                Digital Solutions That Help
                                <br />
                                <span className={styles.heroTitleAccent}>Your Business Grow</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                We design and build websites, web applications, and custom software
                                for startups and small businesses ready to establish a strong digital presence.
                            </p>
                            <div className={styles.heroCta}>
                                <a href="#contact" className={styles.btnPrimary} onClick={scrollTo('contact')}>
                                    Start Your Project →
                                </a>
                                <a href="#work" className={styles.btnSecondary} onClick={scrollTo('work')}>
                                    See Our Work
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
                                <span className={styles.trustItem}>✓ MSME Registered</span>
                                <span className={styles.trustDivider} />
                                <span className={styles.trustItem}>✓ 15+ Projects Delivered</span>
                                <span className={styles.trustDivider} />
                                <span className={styles.trustItem}>✓ Based in Hyderabad, India</span>
                                <span className={styles.trustDivider} />
                                <span className={styles.trustItem}>✓ End-to-End Development</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 2: ABOUT
                ═══════════════════════════════════════════ */}
                <section className={styles.aboutSection} id="about">
                    <div className="container">
                        <motion.div
                            className={styles.aboutGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.aboutContent}>
                                <span className={styles.sectionLabel}>WHO WE ARE</span>
                                <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>
                                    A Small Team Solving
                                    <br />Real Business Problems
                                </h2>
                                <p className={styles.aboutText}>
                                    NS SiteCraft Solutions is a Hyderabad-based digital agency founded with one
                                    clear belief: every business deserves a professional digital presence — regardless
                                    of size or budget.
                                </p>
                                <p className={styles.aboutText}>
                                    We're a focused team of developers and designers who build digital products that
                                    solve real problems. No over-promising. No enterprise jargon. Just honest work
                                    that helps your business grow online.
                                </p>
                            </div>
                            <div className={styles.aboutValues}>
                                <div className={styles.aboutValueCard}>
                                    <span className={styles.aboutValueIcon}>🎯</span>
                                    <div>
                                        <h4 className={styles.aboutValueTitle}>Outcome-Focused</h4>
                                        <p className={styles.aboutValueDesc}>We measure success by your results, not just deliverables.</p>
                                    </div>
                                </div>
                                <div className={styles.aboutValueCard}>
                                    <span className={styles.aboutValueIcon}>💬</span>
                                    <div>
                                        <h4 className={styles.aboutValueTitle}>Transparent Process</h4>
                                        <p className={styles.aboutValueDesc}>Weekly updates, clear timelines, no surprises.</p>
                                    </div>
                                </div>
                                <div className={styles.aboutValueCard}>
                                    <span className={styles.aboutValueIcon}>⚡</span>
                                    <div>
                                        <h4 className={styles.aboutValueTitle}>Fast Execution</h4>
                                        <p className={styles.aboutValueDesc}>Most projects go live within 3–6 weeks.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 3: SERVICES (NatSoft-inspired grid)
                ═══════════════════════════════════════════ */}
                <section className={styles.servicesSection} id="services">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.sectionLabelLight}>WHAT WE DO</span>
                            <h2 className={styles.sectionTitleLight}>
                                Services Built Around
                                <br />Your Business Needs
                            </h2>
                            <p className={styles.sectionSubtitleLight}>
                                We don't do everything. We do three things really well — and we make sure
                                each one directly impacts your bottom line.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.servicesGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                        >
                            {services.map((service, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.serviceCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className={styles.serviceIcon}>{service.icon}</span>
                                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                                    <p className={styles.serviceDesc}>{service.description}</p>
                                    <ul className={styles.serviceList}>
                                        {service.items.map((item, j) => (
                                            <li key={j} className={styles.serviceListItem}>
                                                <span className={styles.serviceListBullet}>→</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
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
                                Discuss Your Project →
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 4: PROCESS (4-Step Workflow)
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
                            <span className={styles.sectionLabel}>HOW WE WORK</span>
                            <h2 className={styles.sectionTitle}>
                                A Clear Process. No Guesswork.
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Every project follows the same proven workflow — so you always know
                                what's happening, what's next, and when it'll be done.
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
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 5: SOLUTIONS / BENEFITS
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
                            <span className={styles.sectionLabelLight}>WHAT YOU GET</span>
                            <h2 className={styles.sectionTitleLight}>
                                Real Outcomes,
                                <br />Not Just Deliverables
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
                    SECTION 6: PORTFOLIO / WORK
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
                                Projects We've Built
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Real solutions for real businesses. Here's a look at the work
                                we've shipped and the outcomes we've delivered.
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
                    SECTION 7: TESTIMONIALS
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
                            <span className={styles.sectionLabelLight}>CLIENT FEEDBACK</span>
                            <h2 className={styles.sectionTitleLight}>
                                What Our Clients Say
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
                                    <div className={styles.testimonialFooter}>
                                        <div className={styles.testimonialAuthor}>
                                            <div className={styles.testimonialAvatar}>
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className={styles.testimonialName}>{t.name}</p>
                                                <p className={styles.testimonialRole}>{t.role}</p>
                                            </div>
                                        </div>
                                        <span className={styles.testimonialContext}>{t.context}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 8: STATS
                ═══════════════════════════════════════════ */}
                <section className={styles.statsSection}>
                    <div className="container">
                        <motion.div
                            className={styles.statsGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.statCard}
                                    variants={fadeUp}
                                    transition={{ duration: 0.4 }}
                                    ref={statRefs[i]}
                                >
                                    <span className={styles.statValue}>
                                        {statValues[i]}{stat.suffix}
                                    </span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 9: FINAL CTA
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
                                Ready to Build
                                <br />Something Real?
                            </h2>
                            <p className={styles.finalCtaSubtitle}>
                                Every great project starts with a conversation. Tell us about your idea —
                                we'll respond within 24 hours with a clear plan and honest estimate.
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
                    SECTION 10: CONTACT
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
                            <span className={styles.sectionLabel}>GET IN TOUCH</span>
                            <h2 className={styles.sectionTitle}>
                                Let's Make It Happen
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Tell us about your project. We'll get back to you within 24 hours
                                with a clear next step.
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
                                        <option value="website">A business website</option>
                                        <option value="web-app">A web application</option>
                                        <option value="software">Custom software / backend</option>
                                        <option value="redesign">A redesign of my existing site</option>
                                        <option value="consulting">Technical consulting</option>
                                        <option value="not-sure">Not sure yet — help me figure it out</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.formLabel}>Tell us more (optional)</label>
                                    <textarea
                                        id="message" name="message"
                                        value={formData.message} onChange={handleInputChange}
                                        placeholder="What's the idea? Who's it for? Any timeline in mind?"
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
                                    <div className={styles.contactInfoDivider} />
                                    <p className={styles.contactInfoNote}>
                                        We typically respond within 24 hours. For urgent projects,
                                        call us directly.
                                    </p>
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
