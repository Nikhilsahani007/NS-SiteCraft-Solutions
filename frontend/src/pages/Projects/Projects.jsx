import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead/SEOHead';
import projects, { allTags } from '../../data/projects';
import styles from './Projects.module.css';

const Projects = () => {
    const [activeTag, setActiveTag] = useState('All');

    const filtered = activeTag === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(activeTag));

    const projectsSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Projects by Nikhil Sahani',
        'description': 'Full-stack, machine learning, and AI projects built by Nikhil Sahani.',
        'url': 'https://ns-sitecraft-solutions.vercel.app/projects',
    };

    return (
        <>
            <SEOHead
                title="Projects - Full Stack, AI & Machine Learning"
                description="Explore projects built by Nikhil Sahani — AI chatbots, ML recommendation engines, cyber attack detection, stock management, and more. Full Stack, MERN, Java, and Machine Learning."
                canonicalPath="/projects"
                keywords="developer projects, full stack projects, machine learning projects, MERN projects, AI projects, Nikhil Sahani portfolio"
                structuredData={projectsSchema}
            />

            <div className={styles.projects}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className={styles.heroContent}
                        >
                            <h1 className={styles.heroTitle}>
                                Building Intelligent Systems &<br />
                                <span className="text-gradient">Scalable Applications</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Full-stack applications, machine learning models, and AI-powered systems — each project
                                built to solve real problems with clean architecture and production-ready code.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filter Tags */}
                <section className={styles.filterSection}>
                    <div className="container">
                        <div className={styles.filterBar}>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`${styles.filterTag} ${activeTag === tag ? styles.filterTagActive : ''}`}
                                    onClick={() => setActiveTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className={styles.gridSection}>
                    <div className="container">
                        <motion.div className={styles.grid} layout>
                            <AnimatePresence mode="popLayout">
                                {filtered.map(project => (
                                    <motion.article
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.92 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        className={`${styles.card} ${project.featured ? styles.cardFeatured : ''}`}
                                    >
                                        {project.featured && (
                                            <span className={styles.featuredBadge}>★ Featured</span>
                                        )}

                                        <div className={styles.cardCategory}>{project.category}</div>
                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                        <p className={styles.cardImpact}>{project.impact}</p>
                                        <p className={styles.cardDescription}>{project.description}</p>

                                        {/* Tech stack */}
                                        <div className={styles.techStack}>
                                            {project.techStack.map(tech => (
                                                <span key={tech} className={styles.techBadge}>{tech}</span>
                                            ))}
                                        </div>

                                        {/* Tags */}
                                        <div className={styles.cardTags}>
                                            {project.tags.map(tag => (
                                                <span key={tag} className={styles.cardTag}>{tag}</span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className={styles.cardActions}>
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.btnGithub}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                    </svg>
                                                    GitHub
                                                </a>
                                            )}
                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.btnDemo}
                                                >
                                                    Live Demo →
                                                </a>
                                            )}
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filtered.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>No projects match this filter. Try a different tag.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={styles.ctaContent}
                        >
                            <h2 className={styles.ctaTitle}>Interested in working together?</h2>
                            <p className={styles.ctaSubtitle}>
                                I'm always open to discussing new projects and opportunities.
                            </p>
                            <Link to="/contact" className={styles.ctaButton}>
                                Let's Connect
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Projects;
