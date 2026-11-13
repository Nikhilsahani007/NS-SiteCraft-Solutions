import styles from './HeroStructure.module.css';

/**
 * Static isometric drawing of the same five-layer structure.
 * Shown when WebGL is unavailable or the 3D chunk fails to load.
 */
const layers = [0, 1, 2, 3, 4];

const HeroFallback = () => (
  <div className={styles.fallback} aria-hidden="true">
    <svg viewBox="0 0 520 460" fill="none" role="presentation">
      <line x1="60" y1="92" x2="60" y2="372" stroke="rgba(223,230,243,.16)" />
      <line x1="460" y1="92" x2="460" y2="372" stroke="rgba(223,230,243,.16)" />
      <line x1="260" y1="170" x2="260" y2="450" stroke="rgba(223,230,243,.16)" />
      {layers.map((i) => {
        const y = 300 - i * 62;
        const top = i === 4;
        return (
          <g key={i} transform={`translate(0 ${y})`}>
            <path d="M260 150 60 72 60 62 260 140 460 62 460 72Z" fill="#0b0d13" stroke="rgba(223,230,243,.3)" />
            <path d="M260 140 60 62 260 -16 460 62Z" fill="#10121a" stroke="rgba(223,230,243,.42)" />
            {top && (
              <>
                <path d="M150 62 260 19 300 35 190 78Z" fill="rgba(232,237,247,.9)" />
                <path d="M214 96 250 82 268 89 232 103Z" fill="#3b82f6" />
                <path d="M290 100 370 69 410 85 330 116Z" fill="#1a1d29" stroke="rgba(223,230,243,.25)" />
              </>
            )}
          </g>
        );
      })}
      <circle cx="60" cy="210" r="4" fill="#3b82f6" />
    </svg>
  </div>
);

export default HeroFallback;
