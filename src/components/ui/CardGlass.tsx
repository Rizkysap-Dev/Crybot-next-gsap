import React from "react";

interface CardGlassProps {
  children: React.ReactNode;
  className?: string;
}

const CardGlass = ({ children, className }: CardGlassProps) => {
  return (
    <div
      className={`liquidGlass-wrapper menu ${className}`}
      style={{ height: "100%" }}
    >
      <div className="liquidGlass-effect"></div>
      <div className="liquidGlass-tint"></div>
      <div className="liquidGlass-shine"></div>
      <div className="liquidGlass-text w-full">{children}</div>
    </div>
  );
};

export default CardGlass;
