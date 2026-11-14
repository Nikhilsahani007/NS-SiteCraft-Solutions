import { Link } from 'react-router-dom';
import { solutions } from '../../content/site';
import { PageShell, PageHero, CtaBand } from '../../sections/PageShell';
import { Arrow, pad } from '../../sections/parts';
import styles from '../../sections/home.module.css';

const seo = {
  title: 'Software Solutions for Businesses, Schools and Colleges',
  description:
    'Common operational problems in businesses, schools and colleges, and the websites and software NS SiteCraft Solutions builds to solve them.',
  canonicalPath: '/solutions',
  keywords:
    'business software solutions, college management system India, school software, business automation Hyderabad, student management system',
};

const Solutions = () => (
  <PageShell seo={seo}>
    <PageHero
      label="Solutions"
      title={
        <>
          Start with the problem, <em>not the technology.</em>
        </>
      }
      lede="Most projects begin with something that takes too long or goes wrong too often. These are the problems we hear most, and what we build for each."
    />

    {solutions.map((group, g) => (
      <section
        key={group.id}
        className={`${styles.section} ${g % 2 ? styles.paper : ''}`}
        aria-labelledby={`${group.id}-title`}
      >
        <div className={styles.container}>
          <header className={styles.head}>
            <div data-reveal>
              <p className={styles.label}>
                <b>{pad(g + 1)}</b>
                {group.audience}
              </p>
              <h2 className={styles.title} id={`${group.id}-title`}>
                {group.title[0]} <em>{group.title[1]}</em>
              </h2>
            </div>
          </header>
          <dl className={styles.pairs}>
            {group.rows.map((row) => (
              <div className={styles.pair} key={row.problem} data-reveal>
                <dt>
                  <span className={styles.kicker}>The problem</span>
                  {row.problem}
                </dt>
                <dd>
                  <span className={styles.kicker}>What we build</span>
                  {row.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    ))}

    <section className={styles.sectionTight}>
      <div className={`${styles.container} ${styles.workFoot}`}>
        <p className={styles.note}>Each of these is delivered as one of our six services.</p>
        <Link className={styles.textLink} to="/services">
          Services in detail
          <Arrow size={14} />
        </Link>
      </div>
    </section>

    <CtaBand
      title={
        <>
          Recognise one of these? <em>Tell us about it.</em>
        </>
      }
    />
  </PageShell>
);

export default Solutions;
