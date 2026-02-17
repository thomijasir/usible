import React from "react";
import type { ScrollToTopProps } from "./ScrollToTop.interface";

export const ScrollToTop: React.FC<ScrollToTopProps> = (props) => {
  React.useEffect(() => {
    if (props.mode === "smooth") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth", // Optional: makes it slide up nicely
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [props.mode]);

  return null;
};
