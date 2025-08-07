import React from "react";

interface CardGlassProps {
  children: React.ReactNode;
  className?: string;
}

const CardGlass = ({ children, className }: CardGlassProps) => {
  return (
    <div className={`liquidGlass-wrapper menu ${className}`}>
      <div className="liquidGlass-effect"></div>
      <div className="liquidGlass-tint"></div>
      <div className="liquidGlass-shine"></div>
      <div className="liquidGlass-text">{children}</div>
    </div>
  );
};

export default CardGlass;
