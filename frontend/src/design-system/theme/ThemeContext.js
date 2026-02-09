import { createContext, useContext } from 'react';

/**
 * Theme Context
 * 
 * Provides theme state (dark/light mode) throughout the application
 */

export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { },
    setTheme: () => { },
});

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within ThemeProvider');
    }
    return context;
};

export default ThemeContext;
