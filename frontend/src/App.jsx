import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './design-system';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Spinner from './components/Spinner/Spinner';
import styled from 'styled-components';
import { spacing } from './design-system/tokens/spacing';

// Route-based code splitting with lazy loading
const Home = lazy(() => import('./pages/Home/Home'));
const Services = lazy(() => import('./pages/Services/Services'));
const Solutions = lazy(() => import('./pages/Solutions/Solutions'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));


// Loading fallback component
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${spacing[8]};
`;

const LoadingFallback = () => (
    <LoadingContainer>
        <Spinner size="32px" />
    </LoadingContainer>
);

function App() {
    return (
        <ThemeProvider>
            <ErrorBoundary>
                <Router>
                    <ScrollToTop />
                    <div className="app">
                        <Header />
                        <main>
                            <Suspense fallback={<LoadingFallback />}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/services" element={<Services />} />
                                    <Route path="/solutions" element={<Solutions />} />
                                    <Route path="/pricing" element={<Pricing />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/projects" element={<Projects />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;

