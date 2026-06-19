import { onCLS, onFID, onLCP, onTTFB, onFCP } from 'web-vitals';

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
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
  onFCP(sendToAnalytics);
}