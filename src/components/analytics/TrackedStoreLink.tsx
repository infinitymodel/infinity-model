"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { trackEvent, type AnalyticsEventParameters } from "@/lib/analytics";

interface TrackedStoreLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName?: string;
  eventParameters?: AnalyticsEventParameters;
}

export default function TrackedStoreLink({
  eventName = "select_item",
  eventParameters,
  onClick,
  ...props
}: TrackedStoreLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (!event.defaultPrevented) {
      trackEvent(eventName, eventParameters);
    }
  }

  return <a {...props} onClick={handleClick} />;
}
