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
      className={`absolute top-0 left-0 z-40 h-full w-full flex justify-center items-center transition-opacity duration-500 ${
        hasShown
          ? "visible pointer-events-auto"
          : "invisible pointer-events-none"
      }`}>
      <div className="w-[25%] h-[80%]">
        <div className="h-full flex flex-col justify-between items-center border border-white rounded-4xl px-10 py-5 bg-transparent">
          <div className="flex flex-col space-y-10 items-center w-full">
            <div className="h-8 w-[35%] bg-white rounded-full" />
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
              className="text-[14px] font-semibold bg-white text-black rounded-4xl py-3 w-full opacity-0">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mockup;
