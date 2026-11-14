import { Link } from 'react-router-dom';
import { company } from '../content/site';
import { PageShell, PageHero } from './PageShell';
import styles from './home.module.css';

/** Layout shared by the Privacy Policy and Terms pages. Text comes from each page. */
const LegalPage = ({ seo, title, lede, effective, sections, other }) => (
  <PageShell seo={seo}>
    <PageHero label="Legal" title={title} lede={lede}>
      <p className={styles.effective}>
        <span>Effective date</span> {effective}
      </p>
    </PageHero>

    <section className={`${styles.section} ${styles.paper}`}>
      <div className={`${styles.container} ${styles.legal}`}>
        <nav className={styles.toc} aria-label="Contents">
          <h2 className={styles.kicker}>Contents</h2>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title.replace(/^\d+\.\s*/, '')}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.legalBody}>
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              {s.content.map((para) => (
                <p key={para}>{para}</p>
              ))}
              {s.list && (
                <dl>
                  {s.list.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {s.contact && (
                <address>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                  <a href={company.phoneHref}>{company.phone}</a>
                  <span>{company.location}</span>
                </address>
              )}
            </section>
          ))}
          <p className={styles.legalOther}>
            Also read our <Link to={other.to}>{other.label}</Link> {other.text}
          </p>
        </div>
      </div>
    </section>
  </PageShell>
);

export default LegalPage;
