import { about, company } from '../../content/site';
import { PageShell, PageHero, CtaBand } from '../../sections/PageShell';
import Founder from '../../sections/Founder';
import { pad } from '../../sections/parts';
import styles from '../../sections/home.module.css';

const seo = {
  title: 'About NS SiteCraft Solutions, a Software Studio in Hyderabad',
  description:
    'NS SiteCraft Solutions is an MSME registered software studio in Hyderabad building custom websites and software for schools, colleges and businesses.',
  canonicalPath: '/about',
  keywords: 'about NS SiteCraft Solutions, software company Hyderabad, MSME registered, web development studio India',
};

const About = () => (
  <PageShell seo={seo}>
    <PageHero
      label="About"
      title={
        <>
          A small studio that <em>builds carefully.</em>
        </>
      }
      lede={`Based in ${company.location}. You work directly with the person who designs and builds your product.`}
    />

    <section className={styles.sectionTight} aria-labelledby="story-title">
      <div className={`${styles.container} ${styles.split}`}>
        <div data-reveal>
          <p className={styles.label}>
            <b>01</b>
            Who we are
          </p>
          <h2 className={styles.srOnly} id="story-title">
            Who we are
          </h2>
        </div>
        <div className={styles.prose} data-reveal style={{ '--i': 1 }}>
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3 className={styles.kicker}>Mission</h3>
          <p>{about.mission}</p>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.paper}`} aria-labelledby="values-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div data-reveal>
            <p className={styles.label}>
              <b>02</b>
              How we work
            </p>
            <h2 className={styles.title} id="values-title">
              Four things we <em>hold to.</em>
            </h2>
          </div>
        </header>
        <ul className={styles.industries}>
          {about.values.map((v, i) => (
            <li className={styles.industry} key={v.name} data-reveal>
              <span className={styles.industryNo} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className={styles.industryName}>{v.name}</h3>
              <p className={styles.industryText}>{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <Founder no="03" />
    <CtaBand />
  </PageShell>
);

export default About;
