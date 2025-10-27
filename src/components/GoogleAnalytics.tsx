"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export function GoogleAnalytics() {
  useEffect(() => {
    // Firebase Analyticsが利用可能かチェック
    if (typeof window !== "undefined" && analytics) {
      // ページビューを記録
      logEvent(analytics, "page_view", {
        page_path: window.location.pathname,
        page_title: document.title,
      });
    }
  }, []);

  return null;
}
