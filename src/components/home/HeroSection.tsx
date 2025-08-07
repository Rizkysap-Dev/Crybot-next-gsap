"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const description =
    "An advanced AI robotic instructor built to help you explore and understand the complex world of digital currency with ease.";

  const words = description.split(" ");

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

  const handleHover = () => {
    const spans = descriptionRef.current?.querySelectorAll("span");
    if (!spans) return;

    gsap.to(spans, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const spans = descriptionRef.current?.querySelectorAll("span");
    if (!spans) return;

    gsap.to(spans, {
      opacity: 0.3,
      y: 5,
      stagger: {
        each: 0.03,
        from: "end",
      },
      duration: 0.4,
      ease: "power3.in",
    });
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-4">
        {/* KIRI */}
        <div
          ref={leftRef}
          className={`absolute z-40 top-0 left-0 w-[30%] ${
            mounted ? "opacity-0 invisible" : ""
          }`}>
          <div className="h3">Crybot Pro is</div>

          <div
            ref={descriptionRef}
            className="max-h-[29px] h7 overflow-hidden hover:max-h-[500px] transition-[max-height] duration-700 ease-in-out cursor-pointer"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}>
            {words.map((word, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  marginRight: "4px",
                  opacity: 0.3,
                  transform: "translateY(5px)",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* KANAN */}
        <div
          ref={rightRef}
          className={`absolute top-0 right-0 pl-50 pt-14 flex flex-col justify-end items-center ${
            mounted ? "opacity-0 invisible" : ""
          }`}>
          <h3>Current $ to € rate:</h3>
          <h5>0.94 (17.06.2024)</h5>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
