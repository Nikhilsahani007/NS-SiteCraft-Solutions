import { useState } from 'react';
import projects, { allTags } from '../../data/projects';
import { PageShell, PageHero, CtaBand } from '../../sections/PageShell';
import { pad } from '../../sections/parts';
import styles from '../../sections/home.module.css';

const seo = {
  title: 'Work: Web Applications, Software and Websites',
  description:
    'A sample of web applications, software systems and websites built by NS SiteCraft Solutions, described by what they do and the technology behind them.',
  canonicalPath: '/projects',
  keywords: 'web application projects, software projects, MERN projects, website portfolio Hyderabad',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Work by NS SiteCraft Solutions',
    url: 'https://ns-sitecraft-solutions.vercel.app/projects',
  },
};

const Projects = () => {
  const [tag, setTag] = useState('All');
  const shown = tag === 'All' ? projects : projects.filter((p) => p.tags.includes(tag));

  return (
    <PageShell seo={seo}>
      <PageHero
        label="Work"
        title={
          <>
            Things we have <em>built.</em>
          </>
        }
        lede="Systems and products, described by what they do. Full case studies with screenshots and live links are being prepared. Ask us for a walkthrough of any project in the meantime."
      />

      <section className={styles.sectionTight} aria-labelledby="projects-title">
        <div className={styles.container}>
          <h2 className={styles.srOnly} id="projects-title">
            Projects
          </h2>
          <div className={styles.filters} role="group" aria-label="Filter projects by type">
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                className={styles.filter}
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <p className={styles.srOnly} role="status">
            Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
          </p>

          <ol className={styles.work}>
            {shown.map((p, i) => (
              <li className={styles.project} key={p.id}>
                <span className={styles.projectNo} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div>
                  <span className={styles.projectKind}>{p.category}</span>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                </div>
                <div className={styles.projectBody}>
                  <p className={styles.projectText}>{p.description}</p>
                  <ul className={styles.projectStack} aria-label="Technologies">
                    {p.techStack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {(p.demo || p.github) && (
                    <p className={styles.projectLinks}>
                      {p.demo && (
                        <a className={styles.textLink} href={p.demo} target="_blank" rel="noopener noreferrer">
                          Live site
                        </a>
                      )}
                      {p.github && (
                        <a className={styles.textLink} href={p.github} target="_blank" rel="noopener noreferrer">
                          Source code
                        </a>
                      )}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {shown.length === 0 && <p className={styles.note}>No projects match this filter yet.</p>}
        </div>
      </section>

      <CtaBand
        title={
          <>
            Want something like this <em>for your organisation?</em>
          </>
        }
      />
    </PageShell>
  );
};

export default Projects;
