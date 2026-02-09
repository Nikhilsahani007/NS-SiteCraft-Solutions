import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * useStaggeredReveal Hook
 * 
 * Creates scroll-triggered staggered animations for child elements
 * Uses Framer Motion for animations (already installed)
 * 
 * @param {Object} options - Animation options
 * @param {number} options.delay - Delay between each child animation (ms)
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {boolean} options.once - Whether to animate only once
 * @returns {Object} Ref to attach to container and inView state
 */

export const useStaggeredReveal = ({
    delay = 50,
    threshold = 0.2,
    once = true,
} = {}) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, {
        once,
        margin: '0px 0px -20% 0px', // Trigger when element is 20% from bottom
    });

    useEffect(() => {
        if (!containerRef.current || !isInView) return;

        const children = containerRef.current.children;

        // Apply staggered animation to children
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `opacity 600ms cubic-bezier(0.4, 0, 0.2, 1) ${index * delay}ms, transform 600ms cubic-bezier(0.4, 0, 0.2, 1) ${index * delay}ms`;

            // Trigger animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                });
            });
        });
    }, [isInView, delay]);

    return { containerRef, isInView };
};

export default useStaggeredReveal;
