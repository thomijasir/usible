import React from "react";
import type { TimelineProps } from "./Timeline.interface";
import { Text } from "../Text";

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className = "",
  variant = "default",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 relative pb-8 last:pb-0">
          {/* Vertical Line */}
          {index !== items.length - 1 && (
            <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200" />
          )}

          {/* Icon/Status Circle */}
          <div
            className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 bg-white ${
              item.status === "completed"
                ? "border-success text-success"
                : item.status === "failed"
                  ? "border-error text-error"
                  : "border-gray-300 text-gray-400"
            }`}>
            {variant === "numbered" ? (
              <Text
                variant="subtitle2"
                className={
                  item.status === "completed"
                    ? "text-success"
                    : item.status === "failed"
                      ? "text-error"
                      : "text-gray-500"
                }>
                {index + 1}
              </Text>
            ) : (
              item.icon || (
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.status === "completed"
                      ? "bg-success"
                      : item.status === "failed"
                        ? "bg-error"
                        : "bg-gray-400"
                  }`}
                />
              )
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col pt-1">
            <Text variant="subtitle1" className="font-semibold text-gray-900">
              {item.title}
            </Text>
            {item.description && (
              <Text variant="body2" className="text-gray-500 mt-1">
                {item.description}
              </Text>
            )}
            {item.date && (
              <Text variant="caption" className="text-gray-400 mt-1">
                {item.date}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
