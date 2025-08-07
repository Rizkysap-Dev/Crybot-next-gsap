import Container from "@/components/Container";
import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <div className="py-2 h-[40%]">
      <div className="flex flex-col space-y-10">
        <Logo />
        <Container>
          <NavMenu />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
