/**
 * Services.jsx — NS SiteCraft Solutions
 * Animated services page with GSAP + Framer Motion
 */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/Button/Button';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEOHead from '../../components/SEOHead/SEOHead';
import { FM, VP, prefersReducedMotion } from '../../utils/motion';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Website Development',
    icon: '🌐',
    accent: '#3b82f6',
    what: 'Modern, responsive websites built with the latest technologies',
    whoFor: 'Businesses and institutions that need a professional online presence',
    outcome: 'A fast, SEO-optimized website that converts visitors into customers',
    features: [
      'Responsive design for all devices',
      'SEO-optimized structure',
      'Fast loading speeds',
      'Custom CMS integration',
      'E-commerce capabilities',
      'Ongoing maintenance & support',
    ],
  },
  {
    title: 'Custom Software Development',
    icon: '💻',
    accent: '#0ea5e9',
    what: 'Tailored software solutions built for your specific workflows',
    whoFor: 'Growing teams that need tools built around their processes',
    outcome: 'Software that fits your business, not the other way around',
    features: [
      'Scalable architecture',
      'User-friendly interfaces',
      'API integrations',
      'Cloud deployment',
      'Regular updates & patches',
      'Technical documentation',
    ],
  },
  {
    title: 'College & Institute Management Systems',
    icon: '🎓',
    accent: '#6366f1',
    what: 'Complete management systems for educational institutions',
    whoFor: 'Colleges and institutes looking to streamline operations',
    outcome: 'Centralized system that reduces manual work and improves efficiency',
    features: [
      'Student information management',
      'Attendance tracking',
      'Fee management',
      'Exam & result processing',
      'Library management',
      'Parent-teacher communication',
    ],
  },
  {
    title: 'AI & Automation Solutions',
    icon: '🤖',
    accent: '#8b5cf6',
    what: 'Intelligent automation to reduce manual, repetitive work',
    whoFor: 'Teams spending too much time on tasks that could be automated',
    outcome: 'More time for strategic work, less time on repetitive tasks',
    features: [
      'Process automation',
      'Chatbot integration',
      'Data analysis & insights',
      'Predictive analytics',
      'Document processing',
      'Workflow optimization',
    ],
  },
];

// Animated service card with distinctive entrance per index
const ServiceBlock = ({ service, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Alternating reveal: odd from right, even from left
      const xFrom = index % 2 === 0 ? -60 : 60;

      gsap.fromTo(
        el,
        { opacity: 0, x: xFrom, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );

      // Features list items cascade in
      const items = el.querySelectorAll('[data-feature-item]');
      gsap.fromTo(
        items,
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.07,
          delay: 0.4,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );

      // Icon bounces in
      gsap.fromTo(
        el.querySelector('[data-service-icon]'),
        { scale: 0, rotation: -30 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'back.out(2)',
          delay: 0.15,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );

      // Accent bar at top grows in
      gsap.fromTo(
        el.querySelector('[data-accent-bar]'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          transformOrigin: 'left',
        }
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className={styles.serviceCard}
      style={{ '--accent': service.accent }}
    >
      {/* Colored accent bar */}
      <div
        data-accent-bar
        className={styles.accentBar}
        style={{ background: service.accent }}
      />

      <div className={styles.serviceHeader}>
        <div
          className={styles.serviceIcon}
          data-service-icon
        >
          {service.icon}
        </div>
        <div className={styles.serviceHeaderContent}>
          <h2 className={styles.serviceTitle}>{service.title}</h2>
          <p className={styles.serviceWhat}>{service.what}</p>
        </div>
      </div>

      <div className={styles.serviceDetails}>
        <div className={styles.serviceDetail}>
          <h3 className={styles.detailLabel}>Who it's for</h3>
          <p className={styles.detailText}>{service.whoFor}</p>
        </div>
        <div className={styles.serviceDetail}>
          <h3 className={styles.detailLabel}>What you get</h3>
          <p className={styles.detailText}>{service.outcome}</p>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h3 className={styles.featuresTitle}>Key features</h3>
        <ul className={styles.featuresList}>
          {service.features.map((feature, idx) => (
            <li
              key={idx}
              data-feature-item
              className={styles.featureItem}
            >
              <span className={styles.checkIcon}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Services = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Page hero word-by-word reveal
      gsap.fromTo(
        el.querySelectorAll('[data-hero-line]'),
        { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 10 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.15,
          delay: 0.2,
        }
      );

      gsap.fromTo(
        el.querySelector('[data-hero-sub]'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.what,
        provider: {
          '@type': 'Organization',
          name: 'NS SiteCraft Solutions',
        },
      },
    })),
  };

  return (
    <PageTransition>
      <SEOHead
        title="Web Development & Software Services"
        description="Professional web development, custom software, college management systems, and AI automation services in Hyderabad. View our full service offerings, features, and what you get."
        canonicalPath="/services"
        keywords="web development services Hyderabad, custom software development, college management system, AI automation, website design services, software company services"
        structuredData={serviceSchema}
      />
      <div className={styles.services}>

        {/* Hero */}
        <section className={styles.heroSection} ref={heroRef}>
          <div className={styles.heroInner}>
            <div className={styles.heroLabel}>What We Build</div>
            <h1 className={styles.heroTitle}>
              <span data-hero-line className={styles.heroLine}>Professional Services</span>
              <span data-hero-line className={`${styles.heroLine} ${styles.heroLineAccent}`}>Built to Perform</span>
            </h1>
            <p className={styles.heroSub} data-hero-sub>
              Four disciplines, deeply practised. Each one part of a coherent studio practice
              built for ambitious businesses and institutions.
            </p>
          </div>
        </section>

        {/* Services list */}
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            {services.map((service, index) => (
              <ServiceBlock key={index} service={service} index={index} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className={styles.ctaSection}
          initial="hidden"
          whileInView="visible"
          viewport={VP.once}
          variants={FM.scaleIn}
        >
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Not sure which service you need?</h2>
              <p className={styles.ctaSubtitle}>
                Let's talk about your specific requirements
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/contact">
                  <Button size="large">Talk to us</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="large">View pricing</Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </PageTransition>
  );
};

export default Services;
