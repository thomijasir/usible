import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { AccordionProps } from "./Accordion.interface";
import { Text } from "../Text";
import { ChevronDownIcon } from "~/assets/icons";

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultExpandedId,
  allowMultiple = false,
  className = "",
}) => {
  const [expandedIds, setExpandedIds] = useState<(string | number)[]>(
    defaultExpandedId ? [defaultExpandedId] : [],
  );

  const toggleItem = (id: string | number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((existingId) => existingId !== id));
    } else {
      if (allowMultiple) {
        setExpandedIds([...expandedIds, id]);
      } else {
        setExpandedIds([id]);
      }
    }
  };

  return (
    <div
      className={`flex flex-col divide-y divide-gray-100 dark:divide-gray-800 border-t border-b border-gray-100 dark:border-gray-800 ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        const isDisabled = item.disabled;

        return (
          <div key={item.id} className="bg-white dark:bg-gray-900">
            <button
              onClick={() => !isDisabled && toggleItem(item.id)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer active:bg-gray-50 dark:active:bg-gray-800"
              }`}
              aria-expanded={isExpanded}>
              <div className="flex-1 pr-4">
                {typeof item.title === "string" ? (
                  <Text variant="subtitle1" className="font-medium">
                    {item.title}
                  </Text>
                ) : (
                  item.title
                )}
              </div>

              <motion.div
                initial={false}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 shrink-0">
                <ChevronDownIcon className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
                    {typeof item.content === "string" ? (
                      <Text variant="body2">{item.content}</Text>
                    ) : (
                      item.content
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
