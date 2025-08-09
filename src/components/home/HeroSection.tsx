"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaCircleArrowDown } from "react-icons/fa6";
// hover-based animation; no breakpoint-specific transforms needed

const HeroSection = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const descriptionWrapRef = useRef<HTMLDivElement>(null);
  const oneLineHeightRef = useRef<number>(0);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);
  const [mounted, setMounted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  // removed breakpoint-based behavior to keep initial view consistent

  const description =
    "An advanced AI robotic instructor. Built to help you explore. Understand the complex world of digital currency with ease.";

  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Animasi elemen kiri/kanan saat mount
  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    setMounted(true);

    const tl = gsap.timeline();

    tl.set([left, right], { opacity: 0, y: -100, visibility: "hidden" })
      .to(left, {
        y: 0,
        opacity: 1,
        visibility: "visible",
        duration: 1,
        ease: "power3.out",
        delay: 2,
      })
      .to(right, {
        y: 0,
        opacity: 1,
        visibility: "visible",
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });
  }, []);

  // Set initial state: hanya kalimat pertama terlihat, wrapper dikunci setinggi 1 baris (px)
  useEffect(() => {
    const container = descriptionRef.current;
    if (!container) return;
    const spans = container.querySelectorAll("[data-sentence]");
    spans.forEach((el, index) => {
      if (index === 0) {
        gsap.set(el, { opacity: 1, y: 0 });
      } else {
        gsap.set(el, { opacity: 0, y: 6 });
      }
    });
    // Ukur tinggi 1 baris dari kalimat pertama untuk menghindari bleed
    const first = container.querySelector(
      "[data-sentence]"
    ) as HTMLElement | null;
    if (first && descriptionWrapRef.current) {
      oneLineHeightRef.current = first.offsetHeight || 0;
      descriptionWrapRef.current.style.maxHeight = `${oneLineHeightRef.current}px`;
      descriptionWrapRef.current.style.overflow = "hidden";
    }
    setRevealedCount(1);
  }, [sentences.length]);

  const handleHover = () => {
    const container = descriptionRef.current;
    if (!container) return;
    const spans = container.querySelectorAll("[data-sentence]");

    // Hentikan timeline sebelumnya jika ada
    hoverTlRef.current?.kill();
    setRevealedCount(1);

    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.out" },
    });
    // Buka kunci tinggi wrapper untuk menampilkan semua kalimat
    if (descriptionWrapRef.current && descriptionRef.current) {
      const fullHeight = descriptionRef.current.scrollHeight;
      tl.to(
        descriptionWrapRef.current,
        { maxHeight: fullHeight, duration: 0.25, ease: "power1.out" },
        0
      );
    }
    spans.forEach((el, index) => {
      if (index === 0) return; // kalimat pertama sudah terlihat
      tl.to(
        el,
        {
          opacity: 1,
          y: 0,
          onStart: () => setRevealedCount(index + 1),
        },
        index * 0.18
      );
    });

    hoverTlRef.current = tl;
  };

  const handleMouseLeave = () => {
    const container = descriptionRef.current;
    if (!container) return;
    const spans = container.querySelectorAll("[data-sentence]");

    hoverTlRef.current?.kill();
    const tl = gsap.timeline({
      defaults: { duration: 0.25, ease: "power3.in" },
    });
    spans.forEach((el, index) => {
      if (index === 0) return;
      tl.to(el, { opacity: 0, y: 6 }, 0);
    });
    tl.eventCallback("onComplete", () => {
      // Kunci kembali tinggi wrapper ke 1 baris
      if (descriptionWrapRef.current && oneLineHeightRef.current) {
        descriptionWrapRef.current.style.maxHeight = `${oneLineHeightRef.current}px`;
      }
      setRevealedCount(1);
    });
  };

  return (
    <div className="relative">
      <div>
        {/* KIRI */}
        <div
          ref={leftRef}
          className={`absolute z-40 top-0 left-0 w-[50%] md:w-[30%] ${
            mounted ? "opacity-0 invisible" : ""
          }`}
        >
          {/* Judul */}
          <div className="h3 leading-none m-0 p-0">CrytoBot Pro is</div>
          {/* Deskripsi */}
          <div className="m-0 p-0">
            <div ref={descriptionWrapRef} className="overflow-hidden">
              <div
                ref={descriptionRef}
                className="h7 leading-relaxed md:leading-relaxed whitespace-normal break-words m-0 p-0 cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleHover();
                }}
                onTouchEnd={handleMouseLeave}
                onTouchCancel={handleMouseLeave}
                onFocus={handleHover}
                onBlur={handleMouseLeave}
                tabIndex={0}
              >
                {sentences.map((sentence, index) => (
                  <span
                    key={index}
                    data-sentence
                    style={{ display: "block", marginRight: "0px" }}
                  >
                    {sentence}
                  </span>
                ))}
              </div>
            </div>
            <div className="h8 text-[10px] md:text-xs opacity-80 mt-1 select-none">
              {revealedCount}/{sentences.length} shown
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div
          ref={rightRef}
          className={`absolute top-0 right-0 pl-1 md:pl-50 pt-8 md:pt-14 flex flex-col justify-end items-center ${
            mounted ? "opacity-0 invisible" : ""
          }`}
        >
          <h3 className="md:h3 h5">Current $ to € rate:</h3>
          <h5>0.94 (17.06.2024)</h5>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
