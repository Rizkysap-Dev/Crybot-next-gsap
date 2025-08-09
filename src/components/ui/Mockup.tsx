"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import CardGlassItem from "./CardGlassItem";

const Mockup = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hasShown, setHasShown] = useState(false); // untuk menghilangkan secara visual

  useEffect(() => {
    const mockup = mockupRef.current;
    const button = buttonRef.current;

    if (!mockup || !button) return;

    const timeline = gsap.timeline();

    // Mulai 7 detik setelah load
    const showTimeout = setTimeout(() => {
      // Set visible dulu
      setHasShown(true);

      // Animasi masuk dari bawah
      timeline
        .set(mockup, { y: 300, opacity: 0 })
        .to(mockup, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        })

        // Tombol muncul 1 detik setelah mockup masuk
        .fromTo(
          button,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "+=0.5"
        );
    }, 5000);

    // Hilangkan setelah total 10 detik (3 detik setelah muncul)
    const hideTimeout = setTimeout(() => {
      if (!mockup) return;

      gsap.to(mockup, {
        y: 300,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          setHasShown(false);
        },
      });
    }, 8000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
      ref={mockupRef}
      className={`hidden absolute inset-x-0 top-6 bottom-6 z-40 w-full md:flex justify-center items-center px-4 sm:px-6 md:px-10 transition-opacity duration-500 ${
        hasShown
          ? "visible pointer-events-auto"
          : "invisible pointer-events-none"
      }`}
    >
      <div className="mx-auto w-[92%] sm:w-[80%] md:w-[55%] lg:w-[38%] xl:w-[32%] 2xl:w-[26%] max-w-[640px]">
        <div className="aspect-[9/19] w-full flex flex-col justify-between items-center border border-white rounded-4xl px-6 md:px-8 lg:px-10 py-4 md:py-5 bg-transparent">
          <div className="flex flex-col space-y-8 md:space-y-10 items-center w-full">
            <div className="h-6 md:h-8 w-[35%] bg-white rounded-full" />
            <div className="flex justify-start items-center w-full space-x-2">
              <Image
                className="h-10 w-10 rounded-full"
                src="/photoRobot.png"
                alt="mockup"
                width={100}
                height={100}
              />
              <CardGlassItem className="w-full">
                <p className="text-[8px] text-white">Crypto Explorer</p>
              </CardGlassItem>
            </div>
          </div>
          <div className="flex justify-center items-center pb-5 w-full">
            <button
              ref={buttonRef}
              className="text-sm md:text-[14px] font-semibold bg-white text-black rounded-4xl py-2.5 md:py-3 w-full opacity-0"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mockup;
