/**
 * Color Design Tokens
 * 
 * Comprehensive color system with dark/light modes
 * All colors are WCAG AA compliant for accessibility
 */

export const colors = {
    dark: {
        // Background layers
        background: '#0A0E1A',
        surface: '#151B2E',
        surfaceElevated: '#1E2842',
        surfaceHover: '#252D47',

        // Primary accent (Teal/Cyan)
        primary: '#06B6D4',
        primaryHover: '#22D3EE',
        primaryPressed: '#0891B2',
        primarySubtle: 'rgba(6, 182, 212, 0.1)',
        primaryGlow: 'rgba(6, 182, 212, 0.15)',

        // Text hierarchy
        text: {
            primary: '#F1F5F9',
            secondary: '#CBD5E1',
            tertiary: '#94A3B8',
            disabled: '#64748B',
            inverse: '#0A0E1A',
        },

        // Borders
        border: {
            default: '#1E2842',
            subtle: 'rgba(255, 255, 255, 0.05)',
            strong: '#2D3A5C',
            focus: '#06B6D4',
        },

        // Semantic colors
        success: '#10B981',
        successSubtle: 'rgba(16, 185, 129, 0.1)',
        warning: '#F59E0B',
        warningSubtle: 'rgba(245, 158, 11, 0.1)',
        error: '#EF4444',
        errorSubtle: 'rgba(239, 68, 68, 0.1)',
        info: '#3B82F6',
        infoSubtle: 'rgba(59, 130, 246, 0.1)',
    },

    light: {
        // Background layers
        background: '#FFFFFF',
        surface: '#F8FAFC',
        surfaceElevated: '#F1F5F9',
        surfaceHover: '#E2E8F0',

        // Primary accent (Teal/Cyan)
        primary: '#0891B2',
        primaryHover: '#06B6D4',
        primaryPressed: '#0E7490',
        primarySubtle: 'rgba(8, 145, 178, 0.1)',
        primaryGlow: 'rgba(8, 145, 178, 0.15)',

        // Text hierarchy
        text: {
            primary: '#0F172A',
            secondary: '#475569',
            tertiary: '#64748B',
            disabled: '#94A3B8',
            inverse: '#FFFFFF',
        },

        // Borders
        border: {
            default: '#E2E8F0',
            subtle: 'rgba(0, 0, 0, 0.05)',
            strong: '#CBD5E1',
            focus: '#0891B2',
        },

        // Semantic colors
        success: '#059669',
        successSubtle: 'rgba(5, 150, 105, 0.1)',
        warning: '#D97706',
        warningSubtle: 'rgba(217, 119, 6, 0.1)',
        error: '#DC2626',
        errorSubtle: 'rgba(220, 38, 38, 0.1)',
        info: '#2563EB',
        infoSubtle: 'rgba(37, 99, 235, 0.1)',
    },
};

// Gradient presets
export const gradients = {
    primary: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
    primaryVertical: 'linear-gradient(180deg, #22D3EE 0%, #06B6D4 100%)',
    subtle: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
    mesh: 'radial-gradient(at 40% 20%, rgba(6, 182, 212, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34, 211, 238, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.1) 0px, transparent 50%)',
};

export default colors;
