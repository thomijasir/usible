import React, {
  useState,
  useEffect,
  useRef,
  Children,
  isValidElement,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";
import type { TabProps, TabsProps } from "./Tabs.interface";

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="w-full h-full">{children}</div>;
};

Tab.displayName = "Tab";

export const Tabs: React.FC<TabsProps> = ({
  children,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = "standard",
  orientation = "horizontal",
  className,
  centered = false,
}) => {
  const [internalValue, setInternalValue] = useState<
    string | number | undefined
  >(controlledValue ?? defaultValue);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    width?: number;
    height?: number;
    left?: number;
    top?: number;
  }>({});

  const tabRefs = useRef<Map<string | number, HTMLButtonElement>>(new Map());
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  // Extract tabs from children - memoized to prevent unnecessary recalculations
  const tabs = useMemo(
    () =>
      Children.toArray(children).filter((child) => {
        if (!isValidElement(child)) return false;
        // Check both the type and displayName for more reliable filtering
        return (
          child.type === Tab ||
          (child.type as { displayName?: string })?.displayName === "Tab" ||
          (typeof child.type === "function" && child.type.name === "Tab")
        );
      }) as React.ReactElement<TabProps>[],
    [children],
  );

  // Set initial value if not set
  useEffect(() => {
    if (activeValue === undefined && tabs.length > 0 && !isControlled) {
      const firstTab = tabs[0];
      if (firstTab) {
        setInternalValue(firstTab.props.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.length]); // Re-run when tabs are detected

  // Update indicator position
  useEffect(() => {
    const activeTab =
      activeValue !== undefined ? tabRefs.current.get(activeValue) : undefined;
    if (activeTab && tabsContainerRef.current) {
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      if (orientation === "horizontal") {
        setIndicatorStyle({
          width: tabRect.width,
          left: tabRect.left - containerRect.left,
        });
      } else {
        setIndicatorStyle({
          height: tabRect.height,
          top: tabRect.top - containerRect.top,
        });
      }
    }
  }, [activeValue, orientation]); // Remove tabs from dependency

  const handleTabClick = (value: string | number, disabled?: boolean) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  const activeTab = tabs.find((tab) => tab.props.value === activeValue);

  const isHorizontal = orientation === "horizontal";

  return (
    <div className={twMerge("flex flex-col w-full", className)}>
      {/* Tab Headers */}
      <div
        ref={tabsContainerRef}
        className={twMerge(
          "relative flex",
          isHorizontal ? "flex-row border-b border-gray-200" : "flex-col",
          centered && isHorizontal && "justify-center",
          variant === "filled" && "bg-gray-100 rounded-lg p-1",
        )}>
        {tabs.map((tab) => {
          const { label, value, icon, disabled } = tab.props;
          const isActive = value === activeValue;

          return (
            <button
              key={value}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(value, el);
                } else {
                  tabRefs.current.delete(value);
                }
              }}
              onClick={() => handleTabClick(value, disabled)}
              disabled={disabled}
              className={twMerge(
                "relative flex items-center justify-center gap-2 px-4 py-3 font-medium text-sm transition-all duration-200 whitespace-nowrap",
                isHorizontal ? "flex-row" : "flex-col",
                variant === "block" && "flex-1",
                variant === "filled" && "rounded-md",
                isActive &&
                  (variant === "standard" || variant === "block") &&
                  "text-primary",
                isActive &&
                  variant === "filled" &&
                  "bg-white shadow-sm text-primary",
                !isActive && !disabled && "text-gray-600 hover:text-gray-900",
                !isActive &&
                  variant === "filled" &&
                  !disabled &&
                  "hover:bg-gray-50",
                disabled && "opacity-40 cursor-not-allowed",
              )}>
              {icon && (
                <span
                  className={twMerge(
                    "transition-colors duration-200",
                    isActive ? "text-primary" : "text-gray-500",
                  )}>
                  {icon}
                </span>
              )}
              <span>{label}</span>
            </button>
          );
        })}

        {/* Animated Indicator */}
        {(variant === "standard" || variant === "block") &&
          activeValue !== undefined && (
            <div
              className="absolute bg-primary transition-all duration-300 ease-out"
              style={
                isHorizontal
                  ? {
                      bottom: 0,
                      height: "2px",
                      width: indicatorStyle.width,
                      left: indicatorStyle.left,
                    }
                  : {
                      left: 0,
                      width: "2px",
                      height: indicatorStyle.height,
                      top: indicatorStyle.top,
                    }
              }
            />
          )}
      </div>

      {/* Tab Content with Fade Animation */}
      <div className="relative w-full mt-4">
        <div
          key={activeValue}
          className="animate-fadeIn"
          style={{
            animation: "fadeIn 0.2s ease-in-out",
          }}>
          {activeTab?.props.children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
