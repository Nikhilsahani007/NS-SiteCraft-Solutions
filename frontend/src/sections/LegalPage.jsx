import { Link } from 'react-router-dom';
import { business, company } from '../content/site';
import { PageShell, PageHero } from './PageShell';
import styles from './home.module.css';

/**
 * Layout shared by the legal pages. Text comes from each page.
 *
 * Section shape: { id, title, content: string[], bullets?: string[],
 *                  list?: {label, detail}[], after?: string[], contact?: bool }
 */
const LegalPage = ({ seo, title, lede, summary, sections, related }) => (
  <PageShell seo={seo}>
    <PageHero label="Legal" title={title} lede={lede}>
      <p className={styles.effective}>
        <span>Last updated</span> {business.legalUpdated}
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
          <button type="button" className={styles.printBtn} onClick={() => window.print()}>
            Print or save as PDF
          </button>
        </nav>

        <div className={styles.legalBody}>
          {summary && (
            <aside className={styles.legalSummary} aria-labelledby="summary-title">
              <h2 id="summary-title">In short</h2>
              <ul>
                {summary.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p>This summary is for convenience. The full text below is what applies.</p>
            </aside>
          )}

          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              {s.content.map((para) => (
                <p key={para}>{para}</p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
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
              {s.after?.map((para) => (
                <p key={para}>{para}</p>
              ))}
              {s.contact && (
                <address>
                  <strong>{business.legalName}</strong>
                  {business.grievanceOfficer && <span>Attention: {business.grievanceOfficer}</span>}
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                  <a href={company.phoneHref}>{company.phone}</a>
                  <span>{company.location}</span>
                  {business.gstin && <span>GSTIN: {business.gstin}</span>}
                </address>
              )}
            </section>
          ))}

          <p className={styles.legalOther}>
            Related:{' '}
            {related.map((r, i) => (
              <span key={r.to}>
                {i > 0 && ' · '}
                <Link to={r.to}>{r.label}</Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  </PageShell>
);

export default LegalPage;
