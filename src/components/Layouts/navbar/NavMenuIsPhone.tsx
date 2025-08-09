"use client";

import CardGlass from "@/components/ui/CardGlass";
import UnderlineHover from "@/components/ui/UnderlineHover";
import { usePathname } from "next/navigation";
import React from "react";
import gsap from "gsap";
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";

const NavMenuItems = [
  {
    id: 1,
    name: "What’s New",
    href: "/",
  },
  {
    id: 2,
    name: "Learn Crypto",
    href: "/learn-crypto",
  },
  {
    id: 3,
    name: "Download",
    href: "/download",
  },
];

const NavMenuIsPhone = () => {
  const params = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);
  const cardWrapRef = React.useRef<HTMLDivElement>(null);
  const closedWidthRef = React.useRef<number>(0);

  React.useEffect(() => {
    const list = listRef.current;
    const wrap = cardWrapRef.current;
    if (!list || !wrap) return;
    // List muncul dari kanan ke kiri (geser ke kiri saat buka)
    gsap.set(list, { width: 0, opacity: 0, x: 8, overflow: "hidden" });
    // Ukur dan kunci lebar awal (ukuran tombol saja)
    requestAnimationFrame(() => {
      closedWidthRef.current = wrap.offsetWidth;
      wrap.style.width = `${closedWidthRef.current}px`;
      // Jangan ubah posisi toggle; biarkan parent (container) yang menentukan right alignment
    });
  }, []);

  const openMenu = () => {
    const list = listRef.current;
    const wrap = cardWrapRef.current;
    if (!list || !wrap) return;

    const parentWidth = wrap.parentElement?.clientWidth || 0;
    const gapAndPaddingPx = 24; // kira-kira padding + gap
    const targetWidth = Math.max(
      0,
      parentWidth - closedWidthRef.current - gapAndPaddingPx
    );
    tlRef.current?.kill();
    const tl = gsap.timeline();
    // Perbesar kartu ke lebar penuh nav (melebar ke kiri dari toggle kanan)
    tl.to(wrap, { width: parentWidth, duration: 0.3, ease: "power2.out" }, 0);
    // List slide dari kanan ke kiri sembari melebar
    tl.fromTo(
      list,
      { width: 0, opacity: 0, x: 8 },
      {
        width: targetWidth,
        opacity: 1,
        x: 0,
        duration: 0.35,
        ease: "power2.out",
      },
      0
    );

    const links = list.querySelectorAll("a, span[data-underline]");
    tl.fromTo(
      links,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.25, stagger: 0.06, ease: "power2.out" },
      "<10%"
    );
    tlRef.current = tl;
  };

  const closeMenu = () => {
    const list = listRef.current;
    const wrap = cardWrapRef.current;
    if (!list || !wrap) return;
    tlRef.current?.kill();
    const currentWidth = list.offsetWidth || 0;
    const tl = gsap.timeline();
    tl.fromTo(
      list,
      { width: currentWidth, opacity: 1, x: 0 },
      { width: 0, opacity: 0, x: 8, duration: 0.25, ease: "power2.in" }
    );
    // Kembalikan lebar kartu ke ukuran tombol
    tl.to(
      wrap,
      { width: closedWidthRef.current, duration: 0.25, ease: "power2.in" },
      0
    );
    tlRef.current = tl;
  };

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) openMenu();
      else closeMenu();
      return next;
    });
  };

  // Tutup menu saat route berubah
  React.useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      closeMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="w-full px-2 absolute top-0 right-0 z-50 flex justify-end">
      <div ref={cardWrapRef} className="inline-block align-top">
        <CardGlass className="py-1 px-5">
          <div className="flex items-center justify-end space-x-2 h-9">
            {/* List (row) */}
            <div
              ref={listRef}
              className="overflow-x-hidden overflow-y-visible h-full flex items-center"
            >
              <div className="flex items-center space-x-4">
                {NavMenuItems.map((item) => (
                  <UnderlineHover
                    key={item.id}
                    href={item.href}
                    params={item.href === params}
                  >
                    {item.name}
                  </UnderlineHover>
                ))}
              </div>
            </div>

            {/* Toggle at end */}
            <button
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="p-1 items-center"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <RiMenuFold2Line size={20} />
              ) : (
                <RiMenuFoldLine size={20} />
              )}
            </button>
          </div>
        </CardGlass>
      </div>
    </div>
  );
};

export default NavMenuIsPhone;
