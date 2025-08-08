import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <h1 className="h1">CrytoBot Pro</h1>
    </div>
  );
};

export default Logo;
