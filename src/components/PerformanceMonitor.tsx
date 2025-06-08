"use client";

import { useReportWebVitals } from "next/web-vitals";

export function PerformanceMonitor() {
  useReportWebVitals((metric) => {
    // Send metrics to your analytics service
    console.log(metric);
    // Example: sendToAnalytics(metric);
  });

  return null;
}
