/**
 * Animation Design Tokens
 * 
 * Easing curves, duration scales, and animation presets
 * All animations respect prefers-reduced-motion
 */

// Easing curves (cubic-bezier)
export const easing = {
    // Standard easings
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Custom easings
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

    // Spring-like easings
    spring: {
        gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        wobbly: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        stiff: 'cubic-bezier(0.36, 0.66, 0.04, 1)',
    },
};

// Duration scale
export const duration = {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    moderate: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '600ms',
};

// Semantic durations for specific interactions
export const semanticDuration = {
    // Micro-interactions
    hover: duration.fast,          // 100ms
    press: duration.fast,          // 100ms
    ripple: duration.moderate,     // 300ms

    // Component transitions
    fade: duration.normal,         // 200ms
    slide: duration.moderate,      // 300ms
    scale: duration.normal,        // 200ms

    // Page transitions
    pageEnter: duration.moderate,  // 300ms
    pageExit: duration.normal,     // 200ms

    // Loading states
    skeleton: '1500ms',
    spinner: '800ms',
};

// Animation presets
export const animations = {
    // Fade animations
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
    },

    // Slide animations
    slideUp: {
        from: { transform: 'translateY(20px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideDown: {
        from: { transform: 'translateY(-20px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideLeft: {
        from: { transform: 'translateX(20px)', opacity: 0 },
        to: { transform: 'translateX(0)', opacity: 1 },
    },
    slideRight: {
        from: { transform: 'translateX(-20px)', opacity: 0 },
        to: { transform: 'translateX(0)', opacity: 1 },
    },

    // Scale animations
    scaleIn: {
        from: { transform: 'scale(0.95)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
    },
    scaleOut: {
        from: { transform: 'scale(1)', opacity: 1 },
        to: { transform: 'scale(0.95)', opacity: 0 },
    },

    // Hover lift
    hoverLift: {
        from: { transform: 'translateY(0)' },
        to: { transform: 'translateY(-2px)' },
    },

    // Press down
    pressDown: {
        from: { transform: 'scale(1)' },
        to: { transform: 'scale(0.98)' },
    },

    // Spin (for loaders)
    spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },

    // Pulse (for loading states)
    pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
    },

    // Shimmer (for skeleton loading)
    shimmer: {
        '0%': { backgroundPosition: '-1000px 0' },
        '100%': { backgroundPosition: '1000px 0' },
    },
};

// Keyframe definitions for styled-components
export const keyframes = {
    fadeIn: `
    from { opacity: 0; }
    to { opacity: 1; }
  `,
    fadeOut: `
    from { opacity: 1; }
    to { opacity: 0; }
  `,
    slideUp: `
    from { 
      transform: translateY(20px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  `,
    slideDown: `
    from { 
      transform: translateY(-20px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  `,
    scaleIn: `
    from { 
      transform: scale(0.95);
      opacity: 0;
    }
    to { 
      transform: scale(1);
      opacity: 1;
    }
  `,
    spin: `
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,
    pulse: `
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `,
    shimmer: `
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  `,
};

// Stagger configuration
export const stagger = {
    children: {
        delay: 50,  // ms between each child
        duration: duration.moderate,
        easing: easing.easeOut,
    },
};

export default {
    easing,
    duration,
    semanticDuration,
    animations,
    keyframes,
    stagger,
};
