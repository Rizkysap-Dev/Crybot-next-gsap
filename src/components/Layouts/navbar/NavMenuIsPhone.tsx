import CardGlass from "@/components/ui/CardGlass";
import UnderlineHover from "@/components/ui/UnderlineHover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full md:w-[90%] lg:w-full  px-2 pt-2 z-[100]">
      <CardGlass className="flex justify-center items-center">
        <div className="flex justify-center items-center space-x-5">
          {NavMenuItems.map((item) => (
            <UnderlineHover
              key={item.id}
              href={item.href}
              params={item.href === params ? true : false}>
              {item.name}
            </UnderlineHover>
          ))}
        </div>
      </CardGlass>
    </div>
  );
};

export default NavMenuIsPhone;
