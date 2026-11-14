import { Link } from 'react-router-dom';
import projects from '../data/projects';
import { Arrow, SectionHead, pad } from './parts';
import styles from './home.module.css';

const shown = projects.slice(0, 4);

const Work = () => (
  <section className={styles.section} id="work" aria-labelledby="work-title">
    <div className={styles.container}>
      <SectionHead
        no="04"
        label="Selected work"
        id="work-title"
        title={
          <>
            Things we have <em>built.</em>
          </>
        }
        lede="A sample of systems and products, described by what they do."
      />
      <ol className={styles.work}>
        {shown.map((p, i) => (
          <li className={styles.project} key={p.id} data-reveal>
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
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.workFoot}>
        <p className={styles.note}>
          Full case studies with screenshots and live links are being prepared. Ask us for a walkthrough of any
          project in the meantime.
        </p>
        <Link className={styles.textLink} to="/projects">
          All projects
          <Arrow size={14} />
        </Link>
      </div>
    </div>
  </section>
);

export default Work;
