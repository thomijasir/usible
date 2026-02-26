import React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { DialogProps } from "./Dialog.interface";
import { Backdrop } from "../Backdrop/Backdrop.component";
import { Text } from "../Text";

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  dismissible = true,
  className = "",
}) => {
  const handleBackdropClick = () => {
    if (dismissible) {
      onClose();
    }
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={handleBackdropClick} opacity={0.5} />
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm overflow-hidden pointer-events-auto ${className}`}
              role="dialog"
              aria-modal="true">
              {title && (
                <div className="px-6 pt-6 pb-2">
                  {typeof title === "string" ? (
                    <Text variant="h6" className="text-center">
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                </div>
              )}

              <div className={`px-6 ${title ? "pb-6 pt-2" : "p-6"}`}>
                {typeof children === "string" ? (
                  <Text
                    variant="body2"
                    className="text-center text-gray-500 dark:text-gray-400">
                    {children}
                  </Text>
                ) : (
                  children
                )}
              </div>

              {actions && (
                <div className="border-t border-gray-100 dark:border-gray-700 p-2 flex flex-row justify-end gap-2 bg-gray-50/50 dark:bg-gray-800/50">
                  {actions}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
