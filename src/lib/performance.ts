/**
 * Performance monitoring utilities for tracking Web Vitals and custom metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id: string;
  navigationType?: string;
}

/**
 * Web Vitals thresholds based on Google's recommendations
 */
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  LCP: { good: 2500, poor: 4000 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

/**
 * Get rating based on metric value and thresholds
 */
function getRating(
  metricName: keyof typeof THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report Web Vitals metrics
 */
export function reportWebVitals(metric: PerformanceMetric) {
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(
      `${emoji} ${metric.name}: ${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating})`
    );
  }

  // Production analytics (can be extended to send to analytics service)
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to analytics
    // analytics.track('web-vitals', {
    //   metric: metric.name,
    //   value: metric.value,
    //   rating: metric.rating,
    //   id: metric.id,
    // });
  }
}

/**
 * Custom performance mark
 */
export function performanceMark(name: string) {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(name);
  }
}

/**
 * Measure performance between two marks
 */
export function performanceMeasure(
  name: string,
  startMark: string,
  endMark: string
): number | null {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${name}: ${Math.round(measure.duration)}ms`);
      }
      
      return measure.duration;
    } catch (error) {
      console.error('Performance measurement error:', error);
      return null;
    }
  }
  return null;
}

/**
 * Track component render time
 */
export function trackComponentRender(componentName: string) {
  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  
  return {
    start: () => performanceMark(startMark),
    end: () => {
      performanceMark(endMark);
      return performanceMeasure(`${componentName}-render`, startMark, endMark);
    },
  };
}

/**
 * Track API call performance
 */
export function trackAPICall(apiName: string) {
  const startTime = Date.now();
  
  return {
    end: (success: boolean = true) => {
      const duration = Date.now() - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        const emoji = success ? '✅' : '❌';
        console.log(`${emoji} API ${apiName}: ${duration}ms`);
      }
      
      return duration;
    },
  };
}

/**
 * Get current memory usage (if available)
 */
export function getMemoryUsage(): {
  usedJSHeapSize?: number;
  totalJSHeapSize?: number;
  jsHeapSizeLimit?: number;
} | null {
  if (
    typeof window !== 'undefined' &&
    'performance' in window &&
    'memory' in (window.performance as any)
  ) {
    const memory = (window.performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };
  }
  return null;
}

/**
 * Log memory usage in development
 */
export function logMemoryUsage() {
  if (process.env.NODE_ENV === 'development') {
    const memory = getMemoryUsage();
    if (memory) {
      const usedMB = (memory.usedJSHeapSize! / 1048576).toFixed(2);
      const totalMB = (memory.totalJSHeapSize! / 1048576).toFixed(2);
      console.log(`💾 Memory: ${usedMB}MB / ${totalMB}MB`);
    }
  }
}

/**
 * Warn about slow operations in development
 */
export function warnSlowOperation(operationName: string, duration: number, threshold: number = 100) {
  if (process.env.NODE_ENV === 'development' && duration > threshold) {
    console.warn(
      `⚠️ Slow operation detected: ${operationName} took ${Math.round(duration)}ms (threshold: ${threshold}ms)`
    );
  }
}

/**
 * Get navigation timing metrics
 */
export function getNavigationTiming() {
  if (typeof window !== 'undefined' && window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    return {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseStart - timing.requestStart,
      response: timing.responseEnd - timing.responseStart,
      dom: timing.domComplete - timing.domLoading,
      load: timing.loadEventEnd - timing.loadEventStart,
      total: timing.loadEventEnd - timing.navigationStart,
    };
  }
  return null;
}