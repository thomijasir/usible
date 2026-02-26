import React from "react";
import type { LoaderProps } from "./Loader.interface";

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  color = "primary",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  const colorClasses = {
    primary: "border-primary/30 border-t-primary",
    secondary: "border-secondary/30 border-t-secondary",
    white: "border-white/30 border-t-white",
    current: "border-current/30 border-t-current",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      {...props}
    />
  );
};
