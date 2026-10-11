import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navigation from './components/Navigation/Navigation';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import CustomCursor from './components/CustomCursor/CustomCursor';

// Route-based code splitting
const CinematicHome = lazy(() => import('./pages/CinematicHome/CinematicHome'));
const Services = lazy(() => import('./pages/Services/Services'));
const Solutions = lazy(() => import('./pages/Solutions/Solutions'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'));

// Minimal loading fallback
const PageLoader = () => (
  <div
    style={{
      minHeight: '100vh',
      background: '#08080c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    role="status"
    aria-label="Loading page"
  >
    <div
      style={{
        width: '32px',
        height: '32px',
        border: '1.5px solid rgba(59,130,246,0.2)',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Inner component to access location for AnimatePresence key
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageLoader />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<CinematicHome />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <CustomCursor />
          <ScrollToTop />
          <Navigation />
          <AnimatedRoutes />
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
