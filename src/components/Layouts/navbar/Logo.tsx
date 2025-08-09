import Container from "@/components/Container";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Container>
        <h1 className="h1">CrytoBot Pro</h1>
      </Container>
    </div>
  );
};

export default Logo;
