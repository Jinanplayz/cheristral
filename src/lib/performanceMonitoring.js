// onFID was removed from web-vitals v4: Google replaced First Input Delay with
// Interaction to Next Paint (INP) in March 2024.
import { onCLS, onINP, onLCP, onTTFB, onFCP } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  // In a real app, you might send this to an analytics endpoint
  // navigator.sendBeacon('/analytics', body);
  
  // Use Vite's import.meta.env instead of Node's process.env for browser compatibility
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
  }
}

export function initPerformanceMonitoring() {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
  onFCP(sendToAnalytics);
}