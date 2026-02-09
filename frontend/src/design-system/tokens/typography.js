/**
 * Typography Design Tokens
 * 
 * Type scale based on modular scale (1.25 ratio)
 * Font families, weights, and line heights
 */

export const typography = {
    // Font families
    fontFamily: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
        mono: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
    },

    // Font weights
    fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    // Type scale (modular scale with 1.25 ratio)
    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
    },

    // Line heights
    lineHeight: {
        none: 1,
        tight: 1.2,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 1.75,
    },

    // Letter spacing
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
};

// Preset text styles for common use cases
export const textStyles = {
    // Display styles
    displayLarge: {
        fontSize: typography.fontSize['7xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
    },
    displayMedium: {
        fontSize: typography.fontSize['6xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
    },
    displaySmall: {
        fontSize: typography.fontSize['5xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
    },

    // Heading styles
    h1: {
        fontSize: typography.fontSize['5xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
    },
    h4: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
    },
    h5: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
    },
    h6: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.medium,
        lineHeight: typography.lineHeight.normal,
    },

    // Body styles
    bodyLarge: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.relaxed,
    },
    body: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.relaxed,
    },
    bodySmall: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },

    // Utility styles
    caption: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },
    overline: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
        letterSpacing: typography.letterSpacing.wider,
        textTransform: 'uppercase',
    },
    code: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },
};

// Responsive typography adjustments
export const responsiveTypography = {
    mobile: {
        fontSize: {
            '7xl': '2.5rem',   // 40px
            '6xl': '2rem',     // 32px
            '5xl': '1.75rem',  // 28px
            '4xl': '1.5rem',   // 24px
            '3xl': '1.375rem', // 22px
        },
    },
    tablet: {
        fontSize: {
            '7xl': '3.5rem',   // 56px
            '6xl': '3rem',     // 48px
            '5xl': '2.5rem',   // 40px
            '4xl': '2rem',     // 32px
            '3xl': '1.75rem',  // 28px
        },
    },
};

export default typography;
