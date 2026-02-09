const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

/**
 * Initialize Sentry for error tracking and performance monitoring
 * Only initializes if SENTRY_DSN is provided in environment variables
 */
const initializeSentry = () => {
    // Skip Sentry in test environment
    if (process.env.NODE_ENV === 'test') {
        return null;
    }

    // Only initialize if DSN is provided
    if (!process.env.SENTRY_DSN) {
        console.log('Sentry DSN not provided - error tracking disabled');
        return null;
    }

    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',

        // Performance Monitoring
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev

        // Profiling
        profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        integrations: [
            new ProfilingIntegration(),
        ],

        // Release tracking
        release: process.env.npm_package_version || '1.0.0',

        // Error filtering
        beforeSend(event, hint) {
            // Don't send errors in development if you prefer
            if (process.env.NODE_ENV === 'development' && process.env.SENTRY_DISABLE_DEV === 'true') {
                return null;
            }
            return event;
        },

        // Ignore certain errors
        ignoreErrors: [
            'Non-Error promise rejection captured',
            'ResizeObserver loop limit exceeded',
        ],
    });

    console.log('✅ Sentry initialized for error tracking');
    return Sentry;
};

module.exports = { initializeSentry, Sentry };
