import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';

/**
 * Static styled-components theme for the live (dark, obsidian + electric blue) site.
 *
 * Hotfix: Button and NotFound read `theme.colors.*`, but no styled-components
 * ThemeProvider was mounted, so every route that rendered them crashed.
 * This theme reuses the dark token set and aligns the accent and surfaces with
 * the CSS custom properties in index.css. Planned to be removed in Phase 2 when
 * styled-components is replaced by CSS Modules.
 */
export const siteTheme = {
    mode: 'dark',
    colors: {
        ...colors.dark,
        background: '#08080c',
        surface: '#0f1015',
        surfaceElevated: '#14151e',
        surfaceHover: '#1a1b26',
        primary: '#3b82f6',
        primaryHover: '#60a5fa',
        primaryPressed: '#1d4ed8',
        primarySubtle: 'rgba(59, 130, 246, 0.1)',
        primaryGlow: 'rgba(59, 130, 246, 0.15)',
        text: { ...colors.dark.text, inverse: '#08080c' },
        border: { ...colors.dark.border, focus: '#3b82f6' },
    },
    shadows: shadows.dark,
};

export default siteTheme;
