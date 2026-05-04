import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/hooks/useTrack";

export function AnalyticsTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    void trackEvent("page_view", { path: pathname });
  }, [pathname]);
  return null;
}
