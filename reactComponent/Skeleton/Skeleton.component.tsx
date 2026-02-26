import React from "react";
import type { SkeletonProps } from "./Skeleton.interface";

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  animation = "pulse",
  className = "",
  style,
  ...rest
}) => {
  const baseClasses = "bg-gray-200 dark:bg-gray-700";
  const animationClass = animation === "pulse" ? "animate-pulse" : "";

  const variantClasses = {
    text: "rounded mt-1 mb-1 h-4 w-full",
    rectangular: "rounded",
    circular: "rounded-full",
  };

  // Handle styles for width and height
  const styles: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <div
      className={`${baseClasses} ${animationClass} ${variantClasses[variant]} ${className}`}
      style={styles}
      {...rest}
    />
  );
};
