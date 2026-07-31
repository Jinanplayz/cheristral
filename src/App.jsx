import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import { Toaster } from 'sonner';

// Lazy load pages for route-based code splitting
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const GameDetailPage = lazy(() => import('./pages/GameDetailPage.jsx'));
const TeamPage = lazy(() => import('./pages/TeamPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const CareersPage = lazy(() => import('./pages/CareersPage.jsx'));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage.jsx'));
// Unlisted. Nothing links here, and lazy loading means its code is only
// downloaded by someone who actually visits /ceo.
const CeoPage = lazy(() => import('./pages/CeoPage.jsx'));

// Optimized fallback spinner that prevents layout shifts
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-opacity duration-300">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin will-change-transform"></div>
    <span className="sr-only">Loading content...</span>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:gameId" element={<GameDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:jobId" element={<JobDetailPage />} />

          <Route path="/ceo" element={<CeoPage />} />
          
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
              <h1 className="text-7xl font-black text-primary mb-4 text-glow">404</h1>
              <p className="text-2xl font-bold uppercase tracking-wider mb-8">Signal Lost</p>
              <a href="/" className="px-8 py-3 min-h-[44px] flex items-center bg-primary text-white font-bold uppercase tracking-widest rounded shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] transition-all gpu-accelerated">
                Return to Base
              </a>
            </div>
          } />
        </Routes>
      </Suspense>
      <Toaster theme="dark" position="bottom-right" className="uppercase font-bold tracking-wider" />
    </Router>
  );
}

export default App;