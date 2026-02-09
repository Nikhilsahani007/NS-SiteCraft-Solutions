import { motion } from 'framer-motion';
import { duration, easing } from '../../design-system/tokens/animations';

/**
 * PageTransition Component
 * 
 * Wraps page content with crossfade transition
 * Duration: 200ms as specified in requirements
 */

const pageVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

const pageTransition = {
    duration: 0.2, // 200ms
    ease: [0.4, 0, 0.2, 1], // cubic-bezier from easing.smooth
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
