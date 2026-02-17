import React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { BackdropProps } from "./Backdrop.interface";

export const Backdrop: React.FC<BackdropProps> = ({
  isOpen,
  onClick,
  opacity = 0.7,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          onClick={onClick}
          className="fixed inset-0 bg-black z-40 backdrop-blur-md"
          style={{
            touchAction: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
};
