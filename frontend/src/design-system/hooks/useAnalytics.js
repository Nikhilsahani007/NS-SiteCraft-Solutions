import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../utils/analytics';

/**
 * useAnalytics Hook
 * 
 * Automatically tracks page views on route changes
 * 
 * @returns {Object} Analytics tracking functions
 */

export const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Track page view on route change
        const path = location.pathname + location.search;
        const title = document.title;

        trackPageView(path, title);
    }, [location]);

    return null;
};

export default useAnalytics;
