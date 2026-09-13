export type AnalyticsEventParameters = Record<string, string | number | boolean | undefined>;

type Gtag = (command: "event", eventName: string, parameters?: AnalyticsEventParameters) => void;

export function trackEvent(eventName: string, parameters?: AnalyticsEventParameters) {
  if (typeof window === "undefined") return;

  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  gtag?.("event", eventName, parameters);
}
