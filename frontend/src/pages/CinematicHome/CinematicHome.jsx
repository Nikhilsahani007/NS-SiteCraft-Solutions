/**
 * CinematicHome.jsx — NS SiteCraft Solutions
 * Full cinematic one-page experience with 3D hero, scroll-driven storytelling,
 * editorial typography and deliberate composition.
 */

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './CinematicHome.module.css';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the 3D scene to prevent main-thread blocking
const HeroScene = lazy(() => import('../../components/HeroScene/HeroScene'));

/* ─── Data ─────────────────────────────────────────────────────────── */
const services = [
  {
    index: '01',
    title: 'Web Design & Development',
    description: 'Structured, high-performance websites built to convert. Every layout decision is intentional — from information hierarchy to conversion flow.',
    details: ['Business Websites', 'Landing Pages', 'E-Commerce', 'Redesigns'],
    accent: '#3b82f6',
  },
  {
    index: '02',
    title: 'Custom Software',
    description: 'Web applications and backend systems engineered precisely for your workflow. No bloated templates, no compromise on architecture.',
    details: ['Web Applications', 'Management Systems', 'API Development', 'Automation'],
    accent: '#0ea5e9',
  },
  {
    index: '03',
    title: 'AI-Powered Solutions',
    description: 'Intelligent features and automation that give your business a measurable technical edge — from recommendation engines to smart dashboards.',
    details: ['AI Integration', 'Data Dashboards', 'Process Automation', 'Analytics'],
    accent: '#6366f1',
  },
  {
    index: '04',
    title: 'Digital Strategy',
    description: 'Technical consulting that aligns your digital investment with your business goals. We help you decide what to build, when, and why.',
    details: ['SEO Architecture', 'Performance Audit', 'Tech Stack Advisory', 'Analytics'],
    accent: '#8b5cf6',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Discover',
    description: 'A focused conversation to understand your goals, audience, constraints, and timeline. The output is a clear, agreed-upon project brief.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Wireframes and visual direction before a single line of code. Nothing moves forward until you are confident in the direction.',
  },
  {
    num: '03',
    title: 'Develop',
    description: 'Clean, documented code. Weekly progress updates. You see real deliverables throughout — not a final reveal at the end.',
  },
  {
    num: '04',
    title: 'Launch',
    description: 'Rigorous testing, performance optimization, and a smooth deployment. Followed by 30 days of complimentary post-launch support.',
  },
];

const projects = [
  {
    id: 1,
    label: 'Web Application',
    title: 'Smart Customer Support Platform',
    description: 'Real-time customer support platform with AI-ready chat interface, session management, and structured conversation workflows designed for scale.',
    tech: ['React', 'Node.js', 'MongoDB'],
    result: '40% reduction in average response time',
    featured: true,
  },
  {
    id: 2,
    label: 'AI Solution',
    title: 'E-Commerce Recommendation Engine',
    description: 'Behavioral analysis system that surfaces personalized product recommendations — increasing average order value across connected stores.',
    tech: ['Python', 'Scikit-learn', 'REST API'],
    result: 'Measurable uplift in cross-sell revenue',
    featured: true,
  },
  {
    id: 3,
    label: 'Security System',
    title: 'Network Security Dashboard',
    description: 'Real-time network threat detection and classification system with intelligent monitoring for connected business environments.',
    tech: ['Python', 'TensorFlow', 'Dashboard UI'],
    result: 'Proactive threat response capability',
    featured: true,
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most website and small business projects launch within 3 to 4 weeks. Custom web applications typically take 4 to 6 weeks. We provide a milestone timeline immediately after the discovery call.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Fixed, transparent quotes based on scope — not vague hourly billing. You know the cost before we begin. No hidden fees, no surprise invoices.',
  },
  {
    q: 'Do I own all the code and assets?',
    a: 'Yes, entirely. Once delivered and paid for, you own 100% of the code, design files, accounts, and intellectual property. No vendor lock-in.',
  },
  {
    q: 'What support is available after launch?',
    a: 'Every project includes 30 days of complimentary post-launch support. We also offer ongoing technical maintenance for teams that prefer a managed approach.',
  },
  {
    q: 'Can you redesign an existing website without hurting SEO?',
    a: 'Yes. We preserve URL structures, transfer existing authority signals, and implement proper redirects where needed. Performance typically improves.',
  },
];

/* ─── Hooks ──────────────────────────────────────────────────────────── */
const useCountUp = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  const elRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const progress = Math.min((Date.now() - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, elRef];
};

/* ─── Sub-Components ─────────────────────────────────────────────────── */
const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
        },
      }
    );
  }, []);

  return (
    <div ref={cardRef} className={styles.serviceCard} style={{ '--accent': service.accent }}>
      <div className={styles.serviceIndex}>{service.index}</div>
      <div className={styles.serviceBody}>
        <h3 className={styles.serviceTitle}>{service.title}</h3>
        <p className={styles.serviceDesc}>{service.description}</p>
        <ul className={styles.serviceList}>
          {service.details.map(d => (
            <li key={d} className={styles.serviceItem}>{d}</li>
          ))}
        </ul>
      </div>
      <div className={styles.serviceAccentLine} />
    </div>
  );
};

const ProcessStep = ({ step, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(el,
      { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    );
  }, [index]);

  return (
    <div ref={ref} className={styles.processStep}>
      <div className={styles.processNum}>{step.num}</div>
      <div className={styles.processContent}>
        <h3 className={styles.processTitle}>{step.title}</h3>
        <p className={styles.processDesc}>{step.description}</p>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(el,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: index * 0.12,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }
    );
  }, [index]);

  return (
    <article ref={ref} className={styles.projectCard}>
      <div className={styles.projectMeta}>
        <span className={styles.projectLabel}>{project.label}</span>
        <div className={styles.projectIndex}>0{project.id}</div>
      </div>
      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectDesc}>{project.description}</p>
      <div className={styles.projectTech}>
        {project.tech.map(t => <span key={t} className={styles.techBadge}>{t}</span>)}
      </div>
      {project.result && (
        <div className={styles.projectResult}>
          <span className={styles.resultDot} />
          <span className={styles.resultText}>{project.result}</span>
        </div>
      )}
    </article>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────── */
const CinematicHome = () => {
  const pointerRef = useRef({ x: 0, y: 0 });
  const heroTextRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', type: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  // Pointer tracking for 3D parallax
  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Hero text reveal animation
  useEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lines = el.querySelectorAll('[data-reveal]');
    gsap.fromTo(lines,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.2,
      }
    );
  }, []);

  const scrollTo = useCallback((id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  }, []);

  const handleFormChange = (e) => {
    setFormState(s => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate submission (replace with EmailJS or backend call)
    await new Promise(r => setTimeout(r, 1600));
    setFormStatus('sent');
    setFormState({ name: '', email: '', type: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  // Stats
  const [s0, r0] = useCountUp(15);
  const [s1, r1] = useCountUp(98);
  const [s2, r2] = useCountUp(30);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'NS SiteCraft Solutions',
    description: 'Custom web development, software solutions, and AI-powered automation for businesses in Hyderabad.',
    url: 'https://ns-sitecraft-solutions.vercel.app',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    priceRange: '₹₹',
  };

  return (
    <>
      <SEOHead
        title="NS SiteCraft Solutions — Digital Craftsmanship for Ambitious Businesses"
        description="We design and build custom websites, web applications, and intelligent software for startups and businesses in Hyderabad. Thoughtfully engineered, built to perform."
        canonicalPath="/"
        keywords="web development Hyderabad, custom software, web application, AI solutions, business website, digital product studio"
        structuredData={[localBusinessSchema]}
      />

      <main className={styles.main}>
        {/* ══════════════════════════════════════════════
            HERO — 3D + Editorial Typography
        ══════════════════════════════════════════════ */}
        <section id="hero" className={styles.hero}>
          {/* 3D Canvas */}
          <div className={styles.heroCanvas} aria-hidden="true">
            <Suspense fallback={<div className={styles.canvasLoader} />}>
              <HeroScene pointerRef={pointerRef} />
            </Suspense>
          </div>

          {/* Noise grain overlay */}
          <div className={styles.heroNoise} aria-hidden="true" />

          {/* Text composition */}
          <div className={styles.heroContent} ref={heroTextRef}>
            <div className={styles.heroEyebrow} data-reveal="">
              <span className={styles.eyebrowDot} />
              Digital Studio · Hyderabad
            </div>

            <h1 className={styles.heroHeadline}>
              <span data-reveal="" className={styles.headlineRow}>
                We turn
              </span>
              <span data-reveal="" className={`${styles.headlineRow} ${styles.headlineAccent}`}>
                ambitious ideas
              </span>
              <span data-reveal="" className={styles.headlineRow}>
                into digital experiences.
              </span>
            </h1>

            <p className={styles.heroSub} data-reveal="">
              Thoughtfully designed websites, intelligent software, and digital
              products built to move businesses forward.
            </p>

            <div className={styles.heroCtas} data-reveal="">
              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className={styles.ctaPrimary}
                id="hero-cta-start"
              >
                Start a Project
              </a>
              <a
                href="#work"
                onClick={scrollTo('work')}
                className={styles.ctaSecondary}
                id="hero-cta-explore"
              >
                Explore Our Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={styles.scrollHint} aria-hidden="true">
            <div className={styles.scrollLine} />
            <span>Scroll</span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            INTRO — Philosophy statement
        ══════════════════════════════════════════════ */}
        <section className={styles.intro} id="about">
          <div className={styles.introInner}>
            <div className={styles.introLabel}>Our Philosophy</div>
            <blockquote className={styles.introStatement}>
              <p>
                Good digital work is not decoration. It is the precise engineering
                of how a business communicates, operates, and grows — executed
                with enough craft that the engineering disappears entirely.
              </p>
            </blockquote>

            <div className={styles.statsRow}>
              <div className={styles.statItem} ref={r0}>
                <div className={styles.statValue}>{s0}<span>+</span></div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem} ref={r1}>
                <div className={styles.statValue}>{s1}<span>%</span></div>
                <div className={styles.statLabel}>On-Time Delivery</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem} ref={r2}>
                <div className={styles.statValue}>{s2}<span>d</span></div>
                <div className={styles.statLabel}>Post-Launch Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SERVICES
        ══════════════════════════════════════════════ */}
        <section id="services" className={styles.servicesSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>What We Build</div>
            <h2 className={styles.sectionTitle}>
              Capabilities
            </h2>
            <p className={styles.sectionSub}>
              Four disciplines, deeply practised.
              Each one part of a coherent studio practice.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, i) => (
              <ServiceCard key={service.index} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SELECTED WORK
        ══════════════════════════════════════════════ */}
        <section id="work" className={styles.workSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Selected Work</div>
            <h2 className={styles.sectionTitle}>
              Projects That Moved the Needle
            </h2>
            <p className={styles.sectionSub}>
              A selection of recent engagements — each one solving a specific
              business problem through thoughtful engineering.
            </p>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>

          <div className={styles.workCta}>
            <Link to="/projects" className={styles.textLink}>
              View all projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PROCESS / APPROACH
        ══════════════════════════════════════════════ */}
        <section id="process" className={styles.processSection}>
          <div className={styles.processInner}>
            <div className={styles.processLeft}>
              <div className={styles.sectionLabel}>How We Work</div>
              <h2 className={styles.sectionTitle}>
                A process built for clarity, not comfort.
              </h2>
              <p className={styles.processParagraph}>
                Four phases. No unnecessary complexity. Clear milestones at
                every stage so you always know where your project stands.
              </p>
              <a href="#contact" onClick={scrollTo('contact')} className={styles.processCtaLink}>
                Discuss your project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className={styles.processRight}>
              {processSteps.map((step, i) => (
                <ProcessStep key={step.num} step={step} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════════ */}
        <section className={styles.aboutSection}>
          <div className={styles.aboutInner}>
            <div className={styles.aboutContent}>
              <div className={styles.sectionLabel}>The Studio</div>
              <h2 className={styles.aboutTitle}>
                A focused team. <br />A clear standard.
              </h2>
              <p className={styles.aboutParagraph}>
                NS SiteCraft Solutions is a boutique digital studio based in Hyderabad.
                We work with startups and established businesses to design, build, and
                ship digital products that actually perform.
              </p>
              <p className={styles.aboutParagraph}>
                MSME registered. Independently operated. Every project is led directly
                by the senior developer — no handoffs to junior teams, no diluted effort.
              </p>
              <div className={styles.aboutTags}>
                <span className={styles.aboutTag}>MSME Registered</span>
                <span className={styles.aboutTag}>Hyderabad, India</span>
                <span className={styles.aboutTag}>Est. 2024</span>
              </div>
            </div>
            <div className={styles.aboutVisual} aria-hidden="true">
              <div className={styles.aboutGrid}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={styles.aboutGridCell} style={{ '--delay': `${i * 0.06}s` }} />
                ))}
              </div>
              <div className={styles.aboutBrand}>
                <span className={styles.aboutBrandMark}>NS</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════ */}
        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Common Questions</div>
            <h2 className={styles.sectionTitle}>Direct Answers</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  id={`faq-btn-${i}`}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon} aria-hidden="true">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={styles.faqAnswer}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={openFaq !== i}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════════ */}
        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactInner}>
            <div className={styles.contactLeft}>
              <div className={styles.sectionLabel}>Start a Conversation</div>
              <h2 className={styles.contactTitle}>
                Let's build something worth building.
              </h2>
              <p className={styles.contactParagraph}>
                Tell us about your project. We'll review the brief, ask the right questions,
                and come back with a clear plan and a fixed quote — usually within 24 hours.
              </p>
              <div className={styles.contactDetails}>
                <a href="mailto:nssitecraftsolution@gmail.com" className={styles.contactDetailLink}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M2 4h14v10H2V4zm0 0l7 6 7-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  nssitecraftsolution@gmail.com
                </a>
                <a href="tel:+919390969461" className={styles.contactDetailLink}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 3h3.5l1.5 4-2 1.5a10 10 0 004.5 4.5L12 11l4 1.5V16a1 1 0 01-1 1C6 17 1 12 1 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +91 93909 69461
                </a>
                <span className={styles.contactDetailLink} style={{ cursor: 'default' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 2C6.24 2 4 4.24 4 7c0 4.24 5 9 5 9s5-4.76 5-9c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  Hyderabad, Telangana, India
                </span>
              </div>
            </div>

            <div className={styles.contactRight}>
              {formStatus === 'sent' ? (
                <div className={styles.formSuccess} role="status">
                  <div className={styles.formSuccessIcon}>✓</div>
                  <h3>Message received.</h3>
                  <p>We'll review your brief and respond within 24 hours.</p>
                </div>
              ) : (
                <form
                  className={styles.contactForm}
                  onSubmit={handleFormSubmit}
                  noValidate
                  aria-label="Project inquiry form"
                >
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-name" className={styles.formLabel}>Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className={styles.formInput}
                        value={formState.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-email" className={styles.formLabel}>Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className={styles.formInput}
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="you@company.com"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-type" className={styles.formLabel}>Project Type</label>
                    <select
                      id="contact-type"
                      name="type"
                      className={styles.formSelect}
                      value={formState.type}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="website">Business Website</option>
                      <option value="webapp">Web Application</option>
                      <option value="software">Custom Software</option>
                      <option value="ai">AI / Automation</option>
                      <option value="strategy">Digital Strategy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message" className={styles.formLabel}>Project Brief</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className={styles.formTextarea}
                      value={formState.message}
                      onChange={handleFormChange}
                      placeholder="Describe your project, goals, timeline, and any relevant context..."
                      rows={5}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.formSubmit}
                    disabled={formStatus === 'sending'}
                    id="contact-submit-btn"
                  >
                    {formStatus === 'sending' ? (
                      <span className={styles.sendingState}>Sending<span className={styles.sendingDots} /></span>
                    ) : (
                      'Send Project Brief'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════ */}
        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link to="/" className={styles.footerLogo}>
                <span className={styles.footerLogoMark}>NS</span>
                <span className={styles.footerLogoName}>SiteCraft Solutions</span>
              </Link>
              <p className={styles.footerTagline}>
                Turning ambitious ideas into digital experiences.<br />
                Hyderabad, India.
              </p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Services</h4>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Web Development</a>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Custom Software</a>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>AI Solutions</a>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Digital Strategy</a>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Studio</h4>
                <a href="#about" onClick={scrollTo('about')} className={styles.footerLink}>About</a>
                <a href="#work" onClick={scrollTo('work')} className={styles.footerLink}>Work</a>
                <a href="#process" onClick={scrollTo('process')} className={styles.footerLink}>Process</a>
                <Link to="/projects" className={styles.footerLink}>All Projects</Link>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Contact</h4>
                <a href="mailto:nssitecraftsolution@gmail.com" className={styles.footerLink}>Email Us</a>
                <a href="tel:+919390969461" className={styles.footerLink}>+91 93909 69461</a>
                <span className={styles.footerLink}>Hyderabad, India</span>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>
              © {new Date().getFullYear()} NS SiteCraft Solutions. MSME Registered.
            </p>
            <div className={styles.footerLegal}>
              <Link to="/privacy-policy" className={styles.footerLegalLink}>Privacy</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms-and-conditions" className={styles.footerLegalLink}>Terms</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default CinematicHome;
