/**
 * Analytics Utilities
 * 
 * Centralized analytics tracking for:
 * - Page views
 * - Conversion events
 * - Web Vitals reporting
 * - Error tracking
 */

/**
 * Track page view
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
    if (typeof window === 'undefined') return;

    // Google Analytics 4
    if (window.gtag) {
        window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID', {
            page_path: path,
            page_title: title,
        });
    }

    // Plausible Analytics (privacy-focused alternative)
    if (window.plausible) {
        window.plausible('pageview', {
            props: {
                path,
                title,
            },
        });
    }
};

/**
 * Track custom event
 * @param {string} eventName - Event name
 * @param {Object} eventParams - Event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
    if (typeof window === 'undefined') return;

    // Google Analytics 4
    if (window.gtag) {
        window.gtag('event', eventName, eventParams);
    }

    // Plausible Analytics
    if (window.plausible) {
        window.plausible(eventName, { props: eventParams });
    }

    // Console log in development
    if (import.meta.env.DEV) {
        console.log('[Analytics]', eventName, eventParams);
    }
};

/**
 * Track conversion event
 * @param {string} conversionType - Type of conversion (e.g., 'form_submit', 'demo_request')
 * @param {Object} metadata - Additional metadata
 */
export const trackConversion = (conversionType, metadata = {}) => {
    trackEvent('conversion', {
        conversion_type: conversionType,
        ...metadata,
    });
};

/**
 * Track Web Vitals
 * @param {Object} metric - Web Vitals metric
 */
export const trackWebVital = (metric) => {
    if (typeof window === 'undefined') return;

    const { name, value, id, rating } = metric;

    // Google Analytics 4
    if (window.gtag) {
        window.gtag('event', name, {
            value: Math.round(name === 'CLS' ? value * 1000 : value),
            event_label: id,
            event_category: 'Web Vitals',
            non_interaction: true,
            metric_rating: rating,
        });
    }

    // Console log in development
    if (import.meta.env.DEV) {
        console.log('[Web Vitals]', name, {
            value: Math.round(name === 'CLS' ? value * 1000 : value),
            rating,
        });
    }
};

/**
 * Track error
 * @param {Error} error - Error object
 * @param {Object} errorInfo - Additional error information
 */
export const trackError = (error, errorInfo = {}) => {
    if (typeof window === 'undefined') return;

    const errorData = {
        error_message: error.message,
        error_stack: error.stack,
        ...errorInfo,
    };

    // Google Analytics 4
    if (window.gtag) {
        window.gtag('event', 'exception', {
            description: error.message,
            fatal: errorInfo.fatal || false,
        });
    }

    // Console error in development
    if (import.meta.env.DEV) {
        console.error('[Error Tracking]', errorData);
    }

    // In production, you would send to error tracking service
    // e.g., Sentry, LogRocket, etc.
};

/**
 * Initialize analytics
 */
export const initializeAnalytics = () => {
    if (typeof window === 'undefined') return;

    // Set up global error handler
    window.addEventListener('error', (event) => {
        trackError(event.error, {
            fatal: true,
            source: 'window.error',
        });
    });

    // Set up unhandled rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        trackError(new Error(event.reason), {
            fatal: false,
            source: 'unhandledrejection',
        });
    });

    if (import.meta.env.DEV) {
        console.log('[Analytics] Initialized');
    }
};

export default {
    trackPageView,
    trackEvent,
    trackConversion,
    trackWebVital,
    trackError,
    initializeAnalytics,
};
