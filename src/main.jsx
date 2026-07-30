import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import ErrorBoundary from '@/components/ErrorBoundary.jsx';

// Core Web Vitals, dev only.
// The old code shipped web-vitals to production where it did nothing: the
// analytics call was commented out and it only logged when DEV was true. A
// dynamic import inside this guard lets Vite drop it from the production bundle
// entirely. If you later wire up a real analytics endpoint, move this out.
if (import.meta.env.DEV) {
  import('@/lib/performanceMonitoring').then(({ initPerformanceMonitoring }) => {
    initPerformanceMonitoring();
  });
}

// Register the service worker for offline support and asset caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker is a progressive enhancement; ignore registration failures
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
