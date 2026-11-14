import { capabilities, industries, services } from '../content/site';
import { SectionHead, pad } from './parts';
import styles from './home.module.css';

export const Services = () => (
  <section className={styles.section} id="services" aria-labelledby="services-title">
    <div className={styles.container}>
      <SectionHead
        no="01"
        label="Services"
        id="services-title"
        title={
          <>
            Six things we build, <em>end to end.</em>
          </>
        }
        lede="From a first website to software your whole team depends on. One studio plans it, designs it, builds it and hands it over."
      />
      <ul className={styles.services}>
        {services.map((s, i) => (
          <li className={styles.service} key={s.title} data-reveal style={{ '--i': i % 2 }}>
            <span className={styles.serviceNo} aria-hidden="true">
              {pad(i + 1)}
            </span>
            <h3 className={styles.serviceTitle}>{s.title}</h3>
            <p className={styles.serviceText}>{s.summary}</p>
            <ul className={styles.tags} aria-label={`${s.title} includes`}>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const Expertise = ({ no = '02' }) => (
  <section className={`${styles.section} ${styles.surface}`} id="expertise" aria-labelledby="expertise-title">
    <div className={styles.container}>
      <SectionHead
        no={no}
        label="Expertise and stack"
        id="expertise-title"
        title={
          <>
            Every layer, <em>one team.</em>
          </>
        }
        lede="Proven tools, chosen so your product stays fast and easy to maintain. These are the technologies we work in."
      />
      <ul className={styles.capabilities}>
        {capabilities.map((c, i) => (
          <li className={styles.capability} key={c.area} data-reveal style={{ '--i': i }}>
            <h3 className={styles.capabilityArea}>{c.area}</h3>
            <p className={styles.capabilityText}>{c.text}</p>
            <ul className={styles.stack} aria-label={`${c.area} technologies`}>
              {c.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const Industries = () => (
  <section className={`${styles.section} ${styles.paper}`} id="industries" aria-labelledby="industries-title">
    <div className={styles.container}>
      <SectionHead
        no="03"
        label="Who we build for"
        id="industries-title"
        title={
          <>
            Built for organisations <em>like yours.</em>
          </>
        }
        lede="We focus on the kinds of organisations whose needs we understand best."
      />
      <ul className={styles.industries}>
        {industries.map((ind, i) => (
          <li className={styles.industry} key={ind.name} data-reveal>
            <span className={styles.industryNo} aria-hidden="true">
              {pad(i + 1)}
            </span>
            <h3 className={styles.industryName}>{ind.name}</h3>
            <p className={styles.industryText}>{ind.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
