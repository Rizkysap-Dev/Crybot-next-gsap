"use client";
import { useState, useEffect } from "react";

export default function useIsPhoneBreakpoint() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsPhone(window.innerWidth <= 568);
    }

    handleResize(); // cek pertama kali
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isPhone;
}
