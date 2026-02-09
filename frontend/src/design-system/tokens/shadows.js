/**
 * Shadow Design Tokens
 * 
 * Layered elevation system with depth-1 through depth-5
 * Includes glow effects for accent elements
 */

export const shadows = {
    // Elevation shadows (dark mode optimized)
    dark: {
        none: 'none',
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',

        // Glow effects
        glow: {
            primary: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.15)',
            primarySubtle: '0 0 15px rgba(6, 182, 212, 0.2)',
            success: '0 0 20px rgba(16, 185, 129, 0.3)',
            warning: '0 0 20px rgba(245, 158, 11, 0.3)',
            error: '0 0 20px rgba(239, 68, 68, 0.3)',
        },

        // Inner shadows
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },

    // Elevation shadows (light mode)
    light: {
        none: 'none',
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

        // Glow effects
        glow: {
            primary: '0 0 20px rgba(8, 145, 178, 0.3), 0 0 40px rgba(8, 145, 178, 0.15)',
            primarySubtle: '0 0 15px rgba(8, 145, 178, 0.2)',
            success: '0 0 20px rgba(5, 150, 105, 0.3)',
            warning: '0 0 20px rgba(217, 119, 6, 0.3)',
            error: '0 0 20px rgba(220, 38, 38, 0.3)',
        },

        // Inner shadows
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
};

// Semantic shadow mapping for components
export const componentShadows = {
    // Card elevations
    card: {
        resting: 'sm',
        hover: 'md',
        active: 'lg',
    },

    // Button elevations
    button: {
        resting: 'none',
        hover: 'sm',
        active: 'none',
    },

    // Modal/Dialog
    modal: 'xl',

    // Dropdown/Menu
    dropdown: 'lg',

    // Tooltip/Popover
    tooltip: 'md',

    // Focus ring (not a shadow, but related)
    focusRing: '0 0 0 2px var(--color-primary), 0 0 0 4px rgba(6, 182, 212, 0.2)',
};

export default shadows;
