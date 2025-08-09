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
    <div className="md:py-1 py-2 h-[10%] md:h-[30%]">
      <div className="flex md:flex-col space-y-0 md:space-y-5 lg:space-y-10 relative py-2 md:py-0">
        <Logo className="" />
        <Container>{isPhone ? <NavMenuIsPhone /> : <NavMenu />}</Container>
      </div>
    </div>
  );
};

export default Navbar;
