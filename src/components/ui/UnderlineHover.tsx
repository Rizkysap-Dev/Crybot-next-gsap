"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UnderlineHover = ({
  children,
  href,
  params,
}: {
  children: React.ReactNode;
  href: string;
  params?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Reset underline hover state saat route berubah agar item sebelumnya tidak tetap aktif
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group h-fit w-fit"
    >
      <Link
        href={href}
        className="relative"
        onClick={() => setOpen(false)}
        onTouchStart={() => setOpen(true)}
        onTouchEnd={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <span className="font-medium h6">{children}</span>
        <span
          style={{
            transform: params ? "scaleX(1)" : open ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.3s ease-out",
            transformOrigin: "left",
          }}
          className="absolute -bottom-1 -left-[1px] -right-[1px] h-[2px] bg-white rounded-full"
        />
      </Link>
    </div>
  );
};

export default UnderlineHover;
