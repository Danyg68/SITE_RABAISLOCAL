// Tracking utilities for analytics

interface TrackingParams {
  [key: string]: any;
}

interface ConversionData extends TrackingParams {
  timestamp?: string;
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: TrackingParams
    ) => void;
  }
}

export function trackPageView(pageName: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
}

export function trackEvent(eventName: string, eventParams: TrackingParams = {}): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

export function trackConversion(conversionData: ConversionData): void {
  trackEvent('conversion', {
    ...conversionData,
    timestamp: new Date().toISOString(),
  });
}
