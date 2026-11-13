import { lazy, Suspense, useEffect, useState } from 'react';
import { hero, services } from '../content/site';
import HeroFallback from '../scenes/HeroStructure/HeroFallback';
import { Arrow, goTo } from './parts';
import styles from './home.module.css';

const HeroStructure = lazy(() => import('../scenes/HeroStructure/HeroStructure'));

const canUseWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

const Hero = () => {
  // 'pending' until we know; '3d' loads the scene after first paint; 'static' shows the drawing.
  const [mode, setMode] = useState('pending');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saveData = navigator.connection?.saveData === true;
    if (saveData || !canUseWebGL()) {
      setMode('static');
      setReady(true);
      return undefined;
    }
    // Let the headline paint first; the 3D chunk is not needed for LCP.
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setMode('3d'));
    return () => cancel(id);
  }, []);

  const fail = () => {
    setMode('static');
    setReady(true);
  };

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.heroGrid} aria-hidden="true" />

      <div className={`${styles.container} ${styles.heroInner}`}>
        <p className={styles.eyebrow}>
          <i aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 className={styles.headline} id="hero-title">
          {hero.headline.map((line, i) => (
            <span key={line} className={`${styles.line} ${i === hero.accentLine ? styles.lineAccent : ''}`}>
              <span style={{ '--i': i }}>{line}</span>
            </span>
          ))}
        </h1>

        <p className={styles.heroSub}>{hero.sub}</p>

        <div className={styles.heroCtas}>
          <a className={styles.btn} href={`#${hero.primaryCta.target}`} onClick={goTo(hero.primaryCta.target)}>
            {hero.primaryCta.label}
            <Arrow />
          </a>
          <a className={styles.textLink} href={`#${hero.secondaryCta.target}`} onClick={goTo(hero.secondaryCta.target)}>
            {hero.secondaryCta.label}
            <Arrow size={14} />
          </a>
        </div>

        <div className={styles.heroStage} data-ready={ready} aria-hidden="true">
          {mode === 'static' && <HeroFallback />}
          {mode === '3d' && (
            <Suspense fallback={null}>
              <HeroStructure labels={hero.layers} onReady={() => setReady(true)} onFail={fail} />
            </Suspense>
          )}
        </div>
      </div>

      <div className={styles.heroRail}>
        <div className={styles.container}>
          <ul aria-label="What we build">
            {services.map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
