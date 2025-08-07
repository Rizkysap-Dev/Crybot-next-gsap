import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`px-1 mx-auto sm:px-4 lg:px-7 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
