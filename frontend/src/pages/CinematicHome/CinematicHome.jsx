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
import SEOHead from '../../components/SEOHead/SEOHead';
import {
  FM, VP, EASE, DUR, STAGGER,
  prefersReducedMotion,
  splitReveal,
  clipReveal,
  fadeUpStagger,
  parallaxY,
  countUpGSAP,
  magneticHover,
} from '../../utils/motion';
import styles from './CinematicHome.module.css';

gsap.registerPlugin(ScrollTrigger);

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

/* ─── Sub-Components ─────────────────────────────────────────────── */

// Service card with clip-path reveal + tilt on hover
const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const accentLineRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;

    // Staggered clip reveal from bottom
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          delay: index * 0.12,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        }
      );
    });

    // Accent line expand on scroll into view
    gsap.fromTo(
      accentLineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.12 + 0.4,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        transformOrigin: 'left',
      }
    );

    // Hover tilt
    const onEnter = (e) => {
      const rect = el.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
      gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
      gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.2, ease: 'none', transformPerspective: 800 });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);

    return () => {
      ctx.revert();
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
    };
  }, [index]);

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
      <div ref={accentLineRef} className={styles.serviceAccentLine} />
    </div>
  );
};

// Process step with scroll-progress line
const ProcessStep = ({ step, index, total, progressRef }) => {
  const ref = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Slide in from alternating sides
      gsap.fromTo(
        el,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );

      // Step number scale pop
      gsap.fromTo(
        numRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(2)',
          delay: 0.2,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className={styles.processStep}>
      <div ref={numRef} className={styles.processNum}>{step.num}</div>
      <div className={styles.processContent}>
        <h3 className={styles.processTitle}>{step.title}</h3>
        <p className={styles.processDesc}>{step.description}</p>
      </div>
    </div>
  );
};

// Project card with layered parallax + clip reveal
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Staggered scale + fade with clip
      gsap.fromTo(
        el,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
          delay: index * 0.15,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    });

    // Hover glow follow
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(glowRef.current, {
        x: x - 100,
        y: y - 100,
        duration: 0.4,
        ease: 'none',
      });
    };
    const onEnter = () => {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      ctx.revert();
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [index]);

  return (
    <article ref={ref} className={styles.projectCard}>
      {/* Radial glow that follows cursor */}
      <div ref={glowRef} className={styles.projectGlow} />

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

/* ─── Main Component ─────────────────────────────────────────────── */
const CinematicHome = () => {
  const pointerRef = useRef({ x: 0, y: 0 });
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
  const statsRef = useRef(null);
  const stat0Ref = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);

  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', type: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

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

  // ── Magnetic CTAs ──────────────────────────────────────────────
  useEffect(() => {
    const cleanups = [];
    if (ctaPrimRef.current) cleanups.push(magneticHover(ctaPrimRef.current, 0.3));
    if (ctaSecRef.current)  cleanups.push(magneticHover(ctaSecRef.current, 0.3));
    return () => cleanups.forEach(fn => fn && fn());
  }, []);

  // ── Intro section animations ────────────────────────────────
  useEffect(() => {
    const el = introRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Large quote reveals word by word
      const quote = el.querySelector('[data-quote]');
      if (quote) {
        const words = quote.innerText.split(' ');
        quote.innerHTML = words
          .map(w => `<span class="${styles.quoteWord}"><span class="${styles.quoteInner}">${w}</span></span>`)
          .join(' ');

        gsap.fromTo(
          `[data-quote] .${styles.quoteInner}`,
          { y: '110%' },
          {
            y: '0%',
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.035,
            scrollTrigger: { trigger: quote, start: 'top 80%', once: true },
          }
        );
      }

      // Stats count up
      scrollTriggerStats();

      // Label reveal
      gsap.fromTo(
        el.querySelector('[data-intro-label]'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );

      // Parallax on intro background depth
      parallaxY(el.querySelector('[data-intro-bg]'), 60, { trigger: el });
    }, el);

    return () => ctx.revert();
  }, []);

  const scrollTriggerStats = useCallback(() => {
    if (!statsRef.current || prefersReducedMotion()) return;
    countUpGSAP(stat0Ref.current, 15, { trigger: statsRef.current, suffix: '+' });
    countUpGSAP(stat1Ref.current, 98, { trigger: statsRef.current, suffix: '%' });
    countUpGSAP(stat2Ref.current, 30, { trigger: statsRef.current, suffix: 'd' });
  }, []);

  // ── Services section ──────────────────────────────────────────
  useEffect(() => {
    const el = servicesRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Section header wipe
      gsap.fromTo(
        el.querySelector('[data-section-header]'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── Work section parallax ─────────────────────────────────────
  useEffect(() => {
    const el = workRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Section label reveals
      gsap.fromTo(
        el.querySelector('[data-section-header]'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── Process scroll progress line ────────────────────────────
  useEffect(() => {
    const el = processRef.current;
    const line = processLineRef.current;
    if (!el || !line || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Animated progress line that draws as you scroll
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: el.querySelector('[data-process-steps]'),
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      // Process left content
      gsap.fromTo(
        el.querySelector('[data-process-left]'),
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── About section ────────────────────────────────────────────
  useEffect(() => {
    const el = aboutRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // About title letter stagger (editorial)
      gsap.fromTo(
        el.querySelector('[data-about-title]'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      );

      // Paragraphs stagger
      gsap.fromTo(
        el.querySelectorAll('[data-about-p]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          delay: 0.3,
        }
      );

      // About tags slide in
      gsap.fromTo(
        el.querySelectorAll('[data-about-tag]'),
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          delay: 0.6,
        }
      );

      // Grid cells animate in sequentially
      gsap.fromTo(
        el.querySelectorAll('[data-grid-cell]'),
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          delay: 0.2,
        }
      );

      // Brand mark pop
      gsap.fromTo(
        el.querySelector('[data-brand-mark]'),
        { opacity: 0, scale: 0.5, rotation: -15 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          delay: 0.5,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── FAQ section ──────────────────────────────────────────────
  useEffect(() => {
    const el = faqRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-faq-item]'),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── Contact section ──────────────────────────────────────────
  useEffect(() => {
    const el = contactRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Left column reveals
      gsap.fromTo(
        el.querySelector('[data-contact-left]'),
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      );

      // Right form reveals
      gsap.fromTo(
        el.querySelector('[data-contact-right]'),
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          delay: 0.15,
        }
      );

      // Contact detail links stagger
      gsap.fromTo(
        el.querySelectorAll('[data-contact-detail]'),
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          delay: 0.5,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── Footer reveal ────────────────────────────────────────────
  useEffect(() => {
    const el = footerRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        }
      );

      gsap.fromTo(
        el.querySelectorAll('[data-footer-col]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          delay: 0.3,
        }
      );
    }, el);

    return () => ctx.revert();
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
    await new Promise(r => setTimeout(r, 1600));
    setFormStatus('sent');
    setFormState({ name: '', email: '', type: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 5000);
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
            INTRO — Philosophy + animated quote
        ══════════════════════════════════════════════ */}
        <section className={styles.intro} id="about" ref={introRef}>
          {/* Depth background element */}
          <div className={styles.introBg} data-intro-bg aria-hidden="true" />

          <div className={styles.introInner}>
            <div className={styles.introLabel} data-intro-label>Our Philosophy</div>
            <blockquote className={styles.introStatement}>
              <p data-quote>
                Good digital work is not decoration. It is the precise engineering
                of how a business communicates, operates, and grows — executed
                with enough craft that the engineering disappears entirely.
              </p>
            </blockquote>

            <div className={styles.statsRow} ref={statsRef}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  <span ref={stat0Ref}>0</span>
                </div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  <span ref={stat1Ref}>0</span>
                </div>
                <div className={styles.statLabel}>On-Time Delivery</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  <span ref={stat2Ref}>0</span>
                </div>
                <div className={styles.statLabel}>Post-Launch Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SERVICES — Clip-path reveals + tilt cards
        ══════════════════════════════════════════════ */}
        <section id="services" className={styles.servicesSection} ref={servicesRef}>
          <div className={styles.sectionHeader} data-section-header>
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
            SELECTED WORK — Glow cards + stagger
        ══════════════════════════════════════════════ */}
        <section id="work" className={styles.workSection} ref={workRef}>
          <div className={styles.sectionHeader} data-section-header>
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
            PROCESS — Scroll-progress timeline
        ══════════════════════════════════════════════ */}
        <section id="process" className={styles.processSection} ref={processRef}>
          <div className={styles.processInner}>
            <div className={styles.processLeft} data-process-left>
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
              {/* Animated scroll progress line */}
              <div className={styles.processTrack}>
                <div ref={processLineRef} className={styles.processLine} />
              </div>

              <div data-process-steps>
                {processSteps.map((step, i) => (
                  <ProcessStep key={step.num} step={step} index={i} total={processSteps.length} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ABOUT — Editorial composition
        ══════════════════════════════════════════════ */}
        <section className={styles.aboutSection} ref={aboutRef}>
          <div className={styles.aboutInner}>
            <div className={styles.aboutContent}>
              <div className={styles.sectionLabel}>The Studio</div>
              <h2 className={styles.aboutTitle} data-about-title>
                A focused team. <br />A clear standard.
              </h2>
              <p className={styles.aboutParagraph} data-about-p>
                NS SiteCraft Solutions is a boutique digital studio based in Hyderabad.
                We work with startups and established businesses to design, build, and
                ship digital products that actually perform.
              </p>
              <p className={styles.aboutParagraph} data-about-p>
                MSME registered. Independently operated. Every project is led directly
                by the senior developer — no handoffs to junior teams, no diluted effort.
              </p>
              <div className={styles.aboutTags}>
                <span className={styles.aboutTag} data-about-tag>MSME Registered</span>
                <span className={styles.aboutTag} data-about-tag>Hyderabad, India</span>
                <span className={styles.aboutTag} data-about-tag>Est. 2024</span>
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

        {/* ══════════════════════════════════════════════
            FAQ — Slide-in from left
        ══════════════════════════════════════════════ */}
        <section className={styles.faqSection} ref={faqRef}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Common Questions</div>
            <h2 className={styles.sectionTitle}>Direct Answers</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                data-faq-item
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
              <div className={styles.sectionLabel}>Start a Conversation</div>
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
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 3h3.5l1.5 4-2 1.5a10 10 0 004.5 4.5L12 11l4 1.5V16a1 1 0 01-1 1C6 17 1 12 1 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +91 93909 69461
                </a>
                <span className={styles.contactDetailLink} data-contact-detail style={{ cursor: 'default' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 2C6.24 2 4 4.24 4 7c0 4.24 5 9 5 9s5-4.76 5-9c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  Hyderabad, Telangana, India
                </span>
              </div>
            </div>

            <div className={styles.contactRight} data-contact-right>
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
            FOOTER — Staggered column reveal
        ══════════════════════════════════════════════ */}
        <footer className={styles.footer} ref={footerRef}>
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
