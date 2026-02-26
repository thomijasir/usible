import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, PanInfo } from "motion/react";
import type { DrawerProps } from "./Drawer.interface";
import { Backdrop } from "../Backdrop/Backdrop.component";

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  height = "auto",
  showHandle = true,
}) => {
  const y = useMotionValue(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_event: PointerEvent, info: PanInfo) => {
    const shouldClose = info.velocity.y > 500 || info.offset.y > 150;
    if (shouldClose) {
      onClose();
    }
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              damping: 30,
              stiffness: 300,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            style={{
              y,
              height: typeof height === "number" ? `${height}px` : height,
              touchAction: "none",
            }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden">
            {/* Drag Handle */}
            {showHandle && (
              <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-full pb-safe">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
