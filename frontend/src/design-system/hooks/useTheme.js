import { useThemeContext } from '../theme/ThemeContext';

/**
 * useTheme Hook
 * 
 * Provides access to theme state and controls
 * 
 * @returns {Object} Theme context with theme, setTheme, and toggleTheme
 */

export const useTheme = () => {
    return useThemeContext();
};

export default useTheme;
