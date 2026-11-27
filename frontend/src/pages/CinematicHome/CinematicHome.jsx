/**
 * CinematicHome.jsx — NS SiteCraft Solutions
 * Full cinematic one-page experience with:
 * - 3D scroll-driven hero
 * - Split-text word reveals on headings
 * - Clip-path image/block reveals
 * - Staggered grid entrances (varied per section)
 * - Parallax depth layers
 * - Scroll-progress process timeline
 * - Magnetic CTA buttons
 * - Animated footer reveal
 */

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import SEOHead from '../../components/SEOHead/SEOHead';
import {
  FM, VP, EASE, DUR, STAGGER,
  prefersReducedMotion,
  splitReveal,
  clipReveal,
  fadeUpStagger,
  parallaxY,
  magneticHover,
} from '../../utils/motion';
import styles from './CinematicHome.module.css';
import { sendEnquiry, validateEnquiry } from '../../utils/sendEnquiry';
import { business, homeFaqs } from '../../content/site';
import { StackStrip, Commitments, Industries, Proof } from './TrustSections';
import ProjectDemo from './ProjectDemo';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Lazy-load the 3D scene
const HeroScene = lazy(() => import('../../components/HeroScene/HeroScene'));

/* ─── Data ─────────────────────────────────────────────────────── */
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
    description: 'Rigorous testing, performance optimization, and a smooth deployment. Followed by a post-launch support period stated in your proposal.',
  },
];

const projects = [
  {
    id: 1,
    label: 'Web Application',
    title: 'Smart Customer Support Platform',
    description: 'Real-time customer support platform with AI-ready chat interface, session management, and structured conversation workflows designed for scale.',
    tech: ['React', 'Node.js', 'MongoDB'],
    featured: true,
  },
  {
    id: 2,
    label: 'AI Solution',
    title: 'E-Commerce Recommendation Engine',
    description: 'Behavioral analysis system that surfaces personalized product recommendations from browsing and purchase patterns.',
    tech: ['Python', 'Scikit-learn', 'REST API'],
    featured: true,
  },
  {
    id: 3,
    label: 'Security System',
    title: 'Network Security Dashboard',
    description: 'Real-time network threat detection and classification system with intelligent monitoring for connected business environments.',
    tech: ['Python', 'TensorFlow', 'Dashboard UI'],
    featured: true,
  },
];

const faqs = homeFaqs;

/* ─── Sub-Components ─────────────────────────────────────────────── */
// Entrances live in the page-level motion system (see useGSAP below); hover
// glow is CSS, driven by --mx/--my set from one delegated pointer listener.

const ServiceCard = ({ service }) => (
  <div className={styles.serviceCard} style={{ '--accent': service.accent }} data-card>
    <div className={styles.serviceIndex}>{service.index}</div>
    <div className={styles.serviceBody}>
      <h3 className={styles.serviceTitle}>{service.title}</h3>
      <p className={styles.serviceDesc}>{service.description}</p>
      <ul className={styles.serviceList}>
        {service.details.map((d) => (
          <li key={d} className={styles.serviceItem}>{d}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ProcessStep = ({ step }) => (
  <div className={styles.processStep} data-step>
    <div className={styles.processNum}>{step.num}</div>
    <div className={styles.processContent}>
      <h3 className={styles.processTitle}>{step.title}</h3>
      <p className={styles.processDesc}>{step.description}</p>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <article className={styles.projectCard} data-card>
    <div className={styles.projectMeta}>
      <span className={styles.projectLabel}>{project.label}</span>
      <div className={styles.projectIndex}>0{project.id}</div>
    </div>
    <h3 className={styles.projectTitle}>{project.title}</h3>
    <p className={styles.projectDesc}>{project.description}</p>
    <div className={styles.projectTech}>
      {project.tech.map((t) => <span key={t} className={styles.techBadge}>{t}</span>)}
    </div>
    {project.result && (
      <div className={styles.projectResult}>
        <span className={styles.resultDot} />
        <span className={styles.resultText}>{project.result}</span>
      </div>
    )}
  </article>
);

/* ─── Main Component ─────────────────────────────────────────────── */
// Light page with a dark hero is the default (owner's choice, 2026-11-27).
// ?theme=dark still shows the all-dark version for comparison.
const getTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return new URLSearchParams(window.location.search).get('theme') === 'dark' ? 'dark' : 'light';
};

const CinematicHome = () => {
  const [theme] = useState(getTheme);
  const pointerRef = useRef({ x: 0, y: 0 });
  const mainRef = useRef(null);
  const heroTextRef = useRef(null);
  const introRef = useRef(null);
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const processRef = useRef(null);
  const aboutRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const ctaPrimRef = useRef(null);
  const ctaSecRef = useRef(null);
  const processLineRef = useRef(null);

  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', type: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formErrors, setFormErrors] = useState({});
  const [honeypot, setHoneypot] = useState('');

  // Pointer tracking
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

  // Card spotlight: one listener feeds --mx/--my to the card under the pointer.
  useEffect(() => {
    const root = mainRef.current;
    if (!root || !window.matchMedia('(hover: hover)').matches) return undefined;
    const onMove = (e) => {
      const card = e.target.closest?.('[data-card]');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    root.addEventListener('pointermove', onMove, { passive: true });
    return () => root.removeEventListener('pointermove', onMove);
  }, []);

  // ── Hero text reveal ───────────────────────────────────────────
  useEffect(() => {
    const el = heroTextRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Eyebrow slides in from left
      tl.fromTo(
        '[data-reveal="eyebrow"]',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' }
      );

      // Headline lines wipe up sequentially
      tl.fromTo(
        '[data-reveal="line"]',
        { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 10 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.18 },
        '-=0.5'
      );

      // Sub fades up
      tl.fromTo(
        '[data-reveal="sub"]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // CTAs scale in
      tl.fromTo(
        '[data-reveal="cta"]',
        { opacity: 0, scale: 0.9, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.1 },
        '-=0.4'
      );

      // Scroll hint slides up
      tl.fromTo(
        '[data-reveal="scroll-hint"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── Magnetic buttons: hero CTAs pull harder, the rest gently ──
  useEffect(() => {
    const cleanups = [];
    if (ctaPrimRef.current) cleanups.push(magneticHover(ctaPrimRef.current, 0.3));
    if (ctaSecRef.current) cleanups.push(magneticHover(ctaSecRef.current, 0.3));
    mainRef.current?.querySelectorAll('[data-magnetic]').forEach((el) => {
      cleanups.push(magneticHover(el, 0.18));
    });
    return () => cleanups.forEach((fn) => fn && fn());
  }, []);

  // ── Page motion (one system, GSAP + useGSAP, scoped to <main>) ──
  // Headlines rise in line by line, supporting text follows, cards arrive in
  // a soft wave, the process timeline fills as you scroll. Everything is
  // reverted automatically on unmount, and skipped for reduced motion.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const root = mainRef.current;
    if (!root) return;

    // 1. Headlines: masked line reveal (re-splits on resize / font load).
    root.querySelectorAll('section:not(#hero) h2, [data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }),
      });
    });

    // 2. Labels, ledes and short copy: a quiet fade-up.
    const rise = gsap.utils.toArray('[data-rise]', root);
    gsap.set(rise, { autoAlpha: 0, y: 18 });
    ScrollTrigger.batch(rise, {
      start: 'top 90%',
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
    });

    // 3. Cards: a soft wave as each row enters.
    const cards = gsap.utils.toArray('[data-card]', root);
    gsap.set(cards, { autoAlpha: 0, y: 44 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      interval: 0.12,
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true }),
    });

    // 4. Process: the line fills with scroll and each step lights up.
    const line = processLineRef.current;
    const steps = root.querySelector('[data-process-steps]');
    if (line && steps) {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: { trigger: steps, start: 'top 70%', end: 'bottom 60%', scrub: 0.8 },
      });
      steps.querySelectorAll('[data-step]').forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 62%',
          // Stay lit once reached; switch off only when scrolling back above.
          onEnter: () => step.classList.add(styles.stepActive),
          onLeaveBack: () => step.classList.remove(styles.stepActive),
        });
      });
    }

    // 5. Footer columns.
    const footer = footerRef.current;
    if (footer) {
      gsap.from(footer.querySelectorAll('[data-footer-col]'), {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: footer, start: 'top 92%', once: true },
      });
    }
  }, { scope: mainRef });

  const scrollTo = useCallback((id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(s => ({ ...s, [name]: value }));
    if (formErrors[name]) setFormErrors(errs => ({ ...errs, [name]: undefined }));
  };

  // Success is shown only after the email service accepts the message.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === 'sending') return;

    const errors = validateEnquiry(formState);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      const firstField = document.getElementById(`contact-${Object.keys(errors)[0]}`);
      firstField?.focus();
      return;
    }

    // Bots fill hidden fields; drop silently without contacting the service.
    if (honeypot) return;

    setFormStatus('sending');
    try {
      const typeLabel = e.target.querySelector('#contact-type option:checked')?.textContent || formState.type;
      await sendEnquiry({
        name: formState.name.trim(),
        email: formState.email.trim(),
        message: `Project type: ${typeLabel}\n\n${formState.message.trim()}`,
        sourcePage: 'home',
      });
      setFormStatus('sent');
      setFormState({ name: '', email: '', type: '', message: '' });
    } catch (err) {
      console.error('Enquiry failed to send', err);
      setFormStatus('error');
    }
  };

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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <SEOHead
        title="NS SiteCraft Solutions — Digital Craftsmanship for Ambitious Businesses"
        description="We design and build custom websites, web applications, and intelligent software for startups and businesses in Hyderabad. Thoughtfully engineered, built to perform."
        canonicalPath="/"
        keywords="web development Hyderabad, custom software, web application, AI solutions, business website, digital product studio"
        structuredData={[localBusinessSchema, faqSchema]}
      />

      <main id="main" ref={mainRef} className={styles.main} data-theme={theme} data-nav-dark={theme === 'dark' ? '' : undefined}>

        {/* ══════════════════════════════════════════════
            HERO — 3D + Editorial Typography
        ══════════════════════════════════════════════ */}
        <section id="hero" className={styles.hero} data-nav-dark>
          {/* 3D Canvas */}
          <div className={styles.heroCanvas} aria-hidden="true">
            <Suspense fallback={<div className={styles.canvasLoader} />}>
              <HeroScene pointerRef={pointerRef} />
            </Suspense>
          </div>

          {/* Noise grain overlay */}
          <div className={styles.heroNoise} aria-hidden="true" />

          {/* Radial vignette overlay */}
          <div className={styles.heroVignette} aria-hidden="true" />

          {/* Text composition */}
          <div className={styles.heroContent} ref={heroTextRef}>
            <div className={styles.heroEyebrow} data-reveal="eyebrow">
              <span className={styles.eyebrowDot} />
              Digital Studio · Hyderabad
            </div>

            <h1 className={styles.heroHeadline}>
              <span data-reveal="line" className={styles.headlineRow}>
                We turn
              </span>
              <span data-reveal="line" className={`${styles.headlineRow} ${styles.headlineAccent}`}>
                ambitious ideas
              </span>
              <span data-reveal="line" className={styles.headlineRow}>
                into digital experiences.
              </span>
            </h1>

            <p className={styles.heroSub} data-reveal="sub">
              Thoughtfully designed websites, intelligent software, and digital
              products built to move businesses forward.
            </p>

            <div className={styles.heroCtas}>
              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className={styles.ctaPrimary}
                id="hero-cta-start"
                ref={ctaPrimRef}
                data-reveal="cta"
              >
                Start a Project
              </a>
              <a
                href="#work"
                onClick={scrollTo('work')}
                className={styles.ctaSecondary}
                id="hero-cta-explore"
                ref={ctaSecRef}
                data-reveal="cta"
              >
                Explore Our Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={styles.scrollHint} data-reveal="scroll-hint" aria-hidden="true">
            <div className={styles.scrollLine} />
            <span>Scroll</span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SERVICES — Clip-path reveals + tilt cards
        ══════════════════════════════════════════════ */}
        <section id="services" className={styles.servicesSection} ref={servicesRef}>
          <div className={styles.sectionHeader} data-section-header>
            <div className={styles.sectionLabel} data-rise>What We Build</div>
            <h2 className={styles.sectionTitle}>
              Four things, <em>done properly.</em>
            </h2>
            <p className={styles.sectionSub} data-rise>
              Websites, software, AI features and the strategy that ties them
              together. One small team, start to finish.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, i) => (
              <ServiceCard key={service.index} service={service} />
            ))}
          </div>
          <StackStrip />
        </section>

        {/* ══════════════════════════════════════════════
            SELECTED WORK — Glow cards + stagger
        ══════════════════════════════════════════════ */}
        <section id="work" className={styles.workSection} ref={workRef}>
          <div className={styles.sectionHeader} data-section-header>
            <div className={styles.sectionLabel} data-rise>Selected Work</div>
            <h2 className={styles.sectionTitle}>
              Recent <em>builds.</em>
            </h2>
            <p className={styles.sectionSub} data-rise>
              A few recent projects, each one solving a specific problem.
            </p>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          <div className={styles.workCta} data-rise>
            <Link to="/projects" className={styles.textLink} data-magnetic>
              View all projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PROCESS — Scroll-progress timeline
        ══════════════════════════════════════════════ */}
        <section id="process" className={styles.processSection} ref={processRef}>
          <div className={styles.processInner}>
            <div className={styles.processLeft} data-process-left>
              <div className={styles.sectionLabel} data-rise>How We Work</div>
              <h2 className={styles.sectionTitle}>
                Four steps. <em>No surprises.</em>
              </h2>
              <p className={styles.processParagraph} data-rise>
                Clear milestones at every stage, so you always know where your
                project stands.
              </p>
              <div data-rise><ProjectDemo /></div>
              <a href="#contact" onClick={scrollTo('contact')} className={styles.processCtaLink} data-magnetic>
                Discuss your project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className={styles.processRight}>
              {/* Animated scroll progress line */}
              <div className={styles.processTrack}>
                <div ref={processLineRef} className={styles.processLine} />
              </div>

              <div data-process-steps>
                {processSteps.map((step, i) => (
                  <ProcessStep key={step.num} step={step} />
                ))}
              </div>
            </div>
          </div>
          <Commitments />
        </section>

        <Industries />

        {/* ══════════════════════════════════════════════
            ABOUT — Editorial composition
        ══════════════════════════════════════════════ */}
        <section id="about" className={styles.aboutSection} ref={aboutRef}>
          <div className={styles.aboutInner}>
            <div className={styles.aboutContent}>
              <div className={styles.sectionLabel} data-rise>The Studio</div>
              <h2 className={styles.aboutTitle} data-about-title>
                A focused team. <br />A clear standard.
              </h2>
              <p className={styles.aboutParagraph} data-about-p data-rise>
                NS SiteCraft Solutions is a boutique digital studio based in Hyderabad.
                We work with startups and established businesses to design, build, and
                ship digital products that actually perform.
              </p>
              <p className={styles.aboutParagraph} data-about-p data-rise>
                MSME registered. Independently operated. Every project is led directly
                by the senior developer — no handoffs to junior teams, no diluted effort.
              </p>
              <div className={styles.aboutTags}>
                <span className={styles.aboutTag} data-about-tag data-rise>MSME Registered</span>
                <span className={styles.aboutTag} data-about-tag data-rise>Hyderabad, India</span>
                <span className={styles.aboutTag} data-about-tag data-rise>Est. 2024</span>
              </div>
            </div>
            <div className={styles.aboutVisual} aria-hidden="true">
              <div className={styles.aboutGrid}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} data-grid-cell className={styles.aboutGridCell} style={{ '--delay': `${i * 0.06}s` }} />
                ))}
              </div>
              <div className={styles.aboutBrand}>
                <span className={styles.aboutBrandMark} data-brand-mark>NS</span>
              </div>
            </div>
          </div>
        </section>

        <Proof />

        {/* ══════════════════════════════════════════════
            FAQ — Slide-in from left
        ══════════════════════════════════════════════ */}
        <section className={styles.faqSection} ref={faqRef}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel} data-rise>Common Questions</div>
            <h2 className={styles.sectionTitle}>Straight <em>answers.</em></h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                data-faq-item
                data-rise
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
            CONTACT — Dual-column animated reveal
        ══════════════════════════════════════════════ */}
        <section id="contact" className={styles.contactSection} ref={contactRef}>
          <div className={styles.contactInner}>
            <div className={styles.contactLeft} data-contact-left>
              <div className={styles.sectionLabel} data-rise>Start a Conversation</div>
              <h2 className={styles.contactTitle}>
                Let's build something worth building.
              </h2>
              <p className={styles.contactParagraph}>
                Tell us about your project. We'll review the brief, ask the right questions,
                and come back with a clear plan and a fixed quote — usually within 24 hours.
              </p>
              <div className={styles.contactDetails}>
                <a
                  href="mailto:nssitecraftsolution@gmail.com"
                  className={styles.contactDetailLink}
                  data-contact-detail
                  data-rise
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M2 4h14v10H2V4zm0 0l7 6 7-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  nssitecraftsolution@gmail.com
                </a>
                <a
                  href="tel:+919390969461"
                  className={styles.contactDetailLink}
                  data-contact-detail
                  data-rise
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 3h3.5l1.5 4-2 1.5a10 10 0 004.5 4.5L12 11l4 1.5V16a1 1 0 01-1 1C6 17 1 12 1 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +91 93909 69461
                </a>
                <span className={styles.contactDetailLink} data-contact-detail data-rise style={{ cursor: 'default' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 2C6.24 2 4 4.24 4 7c0 4.24 5 9 5 9s5-4.76 5-9c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  Hyderabad, Telangana, India
                </span>
              </div>
            </div>

            <div className={styles.contactRight} data-contact-right data-rise>
              {formStatus === 'sent' ? (
                <div className={styles.formSuccess} role="status">
                  <div className={styles.formSuccessIcon}>✓</div>
                  <h3>Message sent.</h3>
                  <p>Thank you. We'll review your brief and reply by email with next steps.</p>
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
                        aria-invalid={formErrors.name ? 'true' : undefined}
                        aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                      />
                      {formErrors.name && <p id="contact-name-error" className={styles.formError}>{formErrors.name}</p>}
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
                        aria-invalid={formErrors.email ? 'true' : undefined}
                        aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                      />
                      {formErrors.email && <p id="contact-email-error" className={styles.formError}>{formErrors.email}</p>}
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
                      aria-invalid={formErrors.type ? 'true' : undefined}
                      aria-describedby={formErrors.type ? 'contact-type-error' : undefined}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="website">Business Website</option>
                      <option value="webapp">Web Application</option>
                      <option value="software">Custom Software</option>
                      <option value="ai">AI / Automation</option>
                      <option value="strategy">Digital Strategy</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.type && <p id="contact-type-error" className={styles.formError}>{formErrors.type}</p>}
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
                      aria-invalid={formErrors.message ? 'true' : undefined}
                      aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                    />
                    {formErrors.message && <p id="contact-message-error" className={styles.formError}>{formErrors.message}</p>}
                  </div>

                  {/* Honeypot: hidden from people and assistive tech */}
                  <div className={styles.formHoneypot} aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className={styles.formErrorBanner} role="alert">
                      Sorry, your message could not be sent. Please try again, or email us at{' '}
                      <a href="mailto:nssitecraftsolution@gmail.com">nssitecraftsolution@gmail.com</a>.
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.formSubmit}
                    disabled={formStatus === 'sending'}
                    id="contact-submit-btn"
                    data-magnetic
                  >
                    {formStatus === 'sending' ? (
                      <span className={styles.sendingState}>Sending<span className={styles.sendingDots} /></span>
                    ) : (
                      'Send Project Brief'
                    )}
                  </button>
                  <p className={styles.formNote}>
                    We use your details only to reply to this enquiry. See our{' '}
                    <Link to="/privacy-policy">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FOOTER — Staggered column reveal
        ══════════════════════════════════════════════ */}
        <footer className={styles.footer} ref={footerRef} data-nav-dark>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand} data-footer-col>
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
              <div className={styles.footerCol} data-footer-col>
                <h4 className={styles.footerColTitle}>Services</h4>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Web Development</a>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Custom Software</a>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>AI Solutions</a>
                <a href="#services" onClick={scrollTo('services')} className={styles.footerLink}>Digital Strategy</a>
              </div>

              <div className={styles.footerCol} data-footer-col>
                <h4 className={styles.footerColTitle}>Studio</h4>
                <a href="#about" onClick={scrollTo('about')} className={styles.footerLink}>About</a>
                <a href="#work" onClick={scrollTo('work')} className={styles.footerLink}>Work</a>
                <a href="#process" onClick={scrollTo('process')} className={styles.footerLink}>Process</a>
                <Link to="/projects" className={styles.footerLink}>All Projects</Link>
              </div>

              <div className={styles.footerCol} data-footer-col>
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
              {business.udyam && <> Udyam: {business.udyam}.</>}
              {business.gstin && <> GSTIN: {business.gstin}.</>}
            </p>
            <div className={styles.footerLegal}>
              <Link to="/privacy-policy" className={styles.footerLegalLink}>Privacy</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms-and-conditions" className={styles.footerLegalLink}>Terms</Link>
              <span aria-hidden="true">·</span>
              <Link to="/refund-policy" className={styles.footerLegalLink}>Refunds</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default CinematicHome;
