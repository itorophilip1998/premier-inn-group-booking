"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
}

export function PerformanceMonitor() {
  const t = useTranslations("performance");
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // First Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          setMetrics((prev) => ({
            ...prev,
            fcp: Math.round(entries[0].startTime),
          }));
        }
      }).observe({ entryTypes: ["paint"] });

      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          setMetrics((prev) => ({
            ...prev,
            lcp: Math.round(entries[entries.length - 1].startTime),
          }));
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          setMetrics((prev) => ({
            ...prev,
            fid: Math.round(entries[0].duration),
          }));
        }
      }).observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1] as LayoutShiftEntry;
          setMetrics((prev) => ({
            ...prev,
            cls: Math.round(lastEntry.value * 1000) / 1000,
          }));
        }
      }).observe({ entryTypes: ["layout-shift"] });
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg text-sm">
      <h3 className="font-semibold mb-2">{t("title")}</h3>
      <div className="space-y-1">
        <div>
          <span className="font-medium">FCP:</span> {metrics.fcp}ms
        </div>
        <div>
          <span className="font-medium">LCP:</span> {metrics.lcp}ms
        </div>
        <div>
          <span className="font-medium">FID:</span> {metrics.fid}ms
        </div>
        <div>
          <span className="font-medium">CLS:</span> {metrics.cls}
        </div>
      </div>
    </div>
  );
}
