import React from "react";

const CardGlassItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`liquidGlass-wrapper-card-item card-item ${className}`}>
      <div className="liquidGlass-effect-item"></div>
      <div className="liquidGlass-tint-item"></div>
      <div className="liquidGlass-shine-item"></div>
      <div className="liquidGlass-text-item">{children}</div>
    </div>
  );
};

export default CardGlassItem;
