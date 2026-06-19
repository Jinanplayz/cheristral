import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { initPerformanceMonitoring } from '@/lib/performanceMonitoring';
import ErrorBoundary from '@/components/ErrorBoundary.jsx';

// Track Core Web Vitals (no-op in production unless you wire up an endpoint)
initPerformanceMonitoring();

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
