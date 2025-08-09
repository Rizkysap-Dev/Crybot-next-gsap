"use client";

import { useEffect } from "react";

// Sets --vh to the real innerHeight so 100 * var(--vh) equals the visible viewport height
const ViewportHeightFix = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh, { passive: true });
    window.addEventListener("orientationchange", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  return null;
};

export default ViewportHeightFix;
