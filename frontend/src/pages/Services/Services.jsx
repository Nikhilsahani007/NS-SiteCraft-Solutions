import { Link } from 'react-router-dom';
import { services } from '../../content/site';
import { PageShell, PageHero, CtaBand } from '../../sections/PageShell';
import { Expertise } from '../../sections/Services';
import Process from '../../sections/Process';
import { Arrow, pad } from '../../sections/parts';
import styles from '../../sections/home.module.css';

const seo = {
  title: 'Services: Websites, Apps, E-commerce and Custom Software',
  description:
    'What NS SiteCraft Solutions builds: business websites, web and mobile applications, e-commerce platforms, custom software and AI integrations, and what each one includes.',
  canonicalPath: '/services',
  keywords:
    'web development services Hyderabad, custom software development, web application, mobile app, e-commerce, AI integration',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services by NS SiteCraft Solutions',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Service', name: s.title, description: s.summary },
    })),
  },
};

const Services = () => (
  <PageShell seo={seo}>
    <PageHero
      label="Services"
      title={
        <>
          What we build, and <em>what is included.</em>
        </>
      }
      lede="Six kinds of work, each planned, designed, built and handed over by one studio. If your project sits between two of them, that is normal. Tell us the problem and we will shape the scope around it."
    />

    <section className={styles.sectionTight} aria-label="Services in detail">
      <div className={styles.container}>
        <ol className={styles.detail}>
          {services.map((s, i) => (
            <li className={styles.detailRow} key={s.title} data-reveal>
              <span className={styles.projectNo} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <div>
                <h2 className={styles.projectTitle}>{s.title}</h2>
                <p className={styles.detailSummary}>{s.summary}</p>
              </div>
              <div className={styles.detailBody}>
                <h3 className={styles.kicker}>Good fit for</h3>
                <p className={styles.projectText}>{s.fit}</p>
                <h3 className={styles.kicker}>Typically includes</h3>
                <ul className={styles.tags}>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.workFoot}>
          <p className={styles.note}>
            Not sure which of these you need? See common problems and what we build for them.
          </p>
          <Link className={styles.textLink} to="/solutions">
            Solutions by problem
            <Arrow size={14} />
          </Link>
        </div>
      </div>
    </section>

    <Expertise no="02" />
    <Process no="03" />
    <CtaBand />
  </PageShell>
);

export default Services;
