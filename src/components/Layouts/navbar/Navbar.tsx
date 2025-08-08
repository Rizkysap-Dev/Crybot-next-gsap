"use client";

import Container from "@/components/Container";
import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import useIsPhoneBreakpoint from "@/hooks/useIsPhoneBreakpoint";
import NavMenuIsPhone from "./NavMenuIsPhone";

const Navbar = () => {
  const isPhone = useIsPhoneBreakpoint();

  return (
    <div className="md:py-3 py-2 h-[15%] md:h-[30%] ">
      <div className="flex flex-col space-y-2 md:space-y-5 lg:space-y-10">
        <Logo className="" />
        <Container>{isPhone ? <NavMenuIsPhone /> : <NavMenu />}</Container>
      </div>
    </div>
  );
};

export default Navbar;
