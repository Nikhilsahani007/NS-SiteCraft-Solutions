import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeContext } from './ThemeContext';
import GlobalStyles from './GlobalStyles';
import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';

/**
 * Theme Provider
 * 
 * Manages theme state (dark/light mode) with:
 * - System preference detection
 * - localStorage persistence
 * - No flash of wrong theme (FOUT prevention)
 */

const STORAGE_KEY = 'ns-sitecraft-theme';

const createTheme = (mode) => ({
    mode,
    colors: colors[mode],
    shadows: shadows[mode],
});

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or system preference
    const [theme, setThemeState] = useState(() => {
        // Check localStorage first
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }

        // Fall back to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'dark'; // Default to dark
    });

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // Only update if user hasn't set a preference
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                setThemeState(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Persist theme to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, theme);

        // Update document class for potential CSS usage
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0A0E1A' : '#FFFFFF');
        }
    }, [theme]);

    const setTheme = (newTheme) => {
        if (newTheme === 'dark' || newTheme === 'light') {
            setThemeState(newTheme);
        }
    };

    const toggleTheme = () => {
        setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const contextValue = useMemo(
        () => ({
            theme,
            setTheme,
            toggleTheme,
        }),
        [theme]
    );

    const styledTheme = useMemo(() => createTheme(theme), [theme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <StyledThemeProvider theme={styledTheme}>
                <GlobalStyles />
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
