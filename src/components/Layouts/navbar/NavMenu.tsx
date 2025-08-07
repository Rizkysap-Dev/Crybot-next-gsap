"use client";

import React from "react";
import UnderlineHover from "@/components/ui/UnderlineHover";
import { usePathname } from "next/navigation";

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

const NavMenu = () => {
  const params = usePathname();

  return (
    <div className="w-screen relative">
      <div className="absolute w-full top-0 left-0 flex flex-col justify-start z-40">
        <div className="flex justify-start items-center space-x-10">
          {NavMenuItems.map((item) => (
            <UnderlineHover
              key={item.id}
              href={item.href}
              params={item.href === params ? true : false}>
              {item.name}
            </UnderlineHover>
          ))}
        </div>
      </div>
      <div className="w-[35%] pr-10 absolute top-0 right-0 flex flex-col justify-start">
        <div className="h4">
          <h4>
            Understand crypto like never before — guided by an AI specialist
            trained to simplify blockchain, bitcoin, and DeFi.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
