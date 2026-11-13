import { useRef } from 'react';
import { statement } from '../content/site';
import { useScrollProgress } from '../hooks/useScrollProgress';
import styles from './home.module.css';

const words = statement.split(' ');

/** A single sentence that lights up word by word as it is scrolled through. */
const Statement = () => {
  const ref = useRef(null);

  useScrollProgress(
    ref,
    (p) => {
      const lit = Math.round(p * words.length);
      ref.current?.querySelectorAll('span').forEach((span, i) => {
        span.dataset.lit = i < lit ? 'true' : 'false';
      });
    },
    { start: 0.82, end: 0.42 }
  );

  return (
    <section className={styles.statement} aria-label="Our approach">
      <div className={styles.container}>
        {/* The full sentence is always in the DOM and readable; only the tint changes. */}
        <p className={styles.statementText} ref={ref}>
          {words.map((word, i) => (
            <span key={`${word}-${i}`} data-lit="true">
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Statement;
