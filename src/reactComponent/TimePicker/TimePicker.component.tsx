import React, { useState, useEffect, useRef, useMemo } from "react";
import { TimePickerProps } from "./TimePicker.interface";
import { Input } from "../Input/Input.component";
import { Drawer } from "../Drawer/Drawer.component";
import { Text } from "../Text/Text.component";
import { Button } from "../Button/Button.component";
import { twMerge } from "tailwind-merge";
import { ClockIcon } from "~/assets/icons";

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5; // Must be odd to have a center item

const ScrollColumn = ({
  items,
  selectedValue,
  onSelect,
  label,
}: {
  items: { value: number | string; label: string }[];
  selectedValue: number | string;
  onSelect: (value: number | string) => void;
  label?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (containerRef.current && !isScrolling.current) {
      const index = items.findIndex((item) => item.value === selectedValue);
      if (index !== -1) {
        containerRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    }
  }, [selectedValue, items]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    isScrolling.current = true;
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

    if (containerRef.current?.getAttribute("data-scrolling") !== "true") {
      containerRef.current?.setAttribute("data-scrolling", "true");
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrolling.current = false;
      containerRef.current?.setAttribute("data-scrolling", "false");
      const selectedItem = items[clampedIndex];
      if (selectedItem) {
        onSelect(selectedItem.value);
      }
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col items-center relative z-20">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[220px] w-full overflow-y-auto snap-y snap-mandatory no-scrollbar relative z-20"
        style={{ scrollBehavior: "smooth" }}>
        <div style={{ height: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) }} />
        {items.map((item) => (
          <div
            key={item.value}
            onClick={() => {
              onSelect(item.value);
            }}
            className={twMerge(
              "flex items-center justify-center snap-center cursor-pointer transition-all duration-200 select-none",
              selectedValue === item.value
                ? "text-primary font-bold text-xl scale-110"
                : "text-gray-400 text-lg scale-100 opacity-60 hover:opacity-100",
            )}
            style={{ height: ITEM_HEIGHT }}>
            {item.label}
          </div>
        ))}
        <div style={{ height: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) }} />
      </div>
      {label && (
        <div className="mt-2">
          <Text
            variant="caption"
            className="font-bold text-gray-400 tracking-wider text-[10px] uppercase">
            {label}
          </Text>
        </div>
      )}
    </div>
  );
};

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  format = "12h",
  label = "",
  placeholder = "Select Time",
  disabled,
  className,
  ...inputProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>(value || new Date());

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      setInternalDate(value);
    }
  }

  const hours = useMemo(() => {
    if (format === "24h") {
      return Array.from({ length: 24 }, (_, i) => ({
        value: i,
        label: i.toString().padStart(2, "0"),
      }));
    }
    return Array.from({ length: 12 }, (_, i) => {
      const h = i === 0 ? 12 : i;
      return { value: h, label: h.toString() };
    });
  }, [format]);

  const minutes = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      value: i,
      label: i.toString().padStart(2, "0"),
    }));
  }, []);

  const periods = useMemo(() => {
    return [
      { value: "AM", label: "AM" },
      { value: "PM", label: "PM" },
    ];
  }, []);

  const currentHour24 = internalDate.getHours();
  const currentMinute = internalDate.getMinutes();

  const currentPeriod = currentHour24 >= 12 ? "PM" : "AM";

  let displayHour = currentHour24;
  if (format === "12h") {
    displayHour = currentHour24 % 12;
    displayHour = displayHour === 0 ? 12 : displayHour;
  }

  const handleHourChange = (newHour: number) => {
    const newDate = new Date(internalDate);
    if (format === "24h") {
      newDate.setHours(newHour);
    } else {
      let h = newHour;
      if (h === 12) h = 0;
      if (currentPeriod === "PM") h += 12;
      newDate.setHours(h);
    }
    setInternalDate(newDate);
  };

  const handleMinuteChange = (newMinute: number) => {
    const newDate = new Date(internalDate);
    newDate.setMinutes(newMinute);
    setInternalDate(newDate);
  };

  const handlePeriodChange = (newPeriod: string) => {
    const newDate = new Date(internalDate);
    let h = newDate.getHours();

    if (newPeriod === "AM" && h >= 12) {
      h -= 12;
    } else if (newPeriod === "PM" && h < 12) {
      h += 12;
    }
    newDate.setHours(h);
    setInternalDate(newDate);
  };

  const handleConfirm = () => {
    if (onChange) {
      onChange(internalDate);
    }
    setIsOpen(false);
  };

  const formatDisplayTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: format === "12h",
    });
  };

  return (
    <div className={className}>
      <Input
        {...inputProps}
        label={label}
        placeholder={placeholder}
        value={value || internalDate ? formatDisplayTime(internalDate) : ""}
        readOnly
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        endAdornment={
          <div
            onClick={() => !disabled && setIsOpen(true)}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ClockIcon className="w-5 h-5 text-gray-500" />
          </div>
        }
        containerClassName="cursor-pointer"
      />

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        height="auto"
        showHandle={false}>
        <div className="flex flex-col h-auto bg-white rounded-t-3xl overflow-hidden">
          {/* Header */}
          <div className="py-4 border-b border-gray-100 flex justify-center items-center bg-white z-30">
            <Text variant="h6" className="font-bold text-gray-900 text-lg">
              Select Time
            </Text>
          </div>

          {/* Picker Content */}
          <div className="py-5 w-full max-w-sm mx-auto relative bg-white">
            {/* Selection Highlight Bar */}
            <div
              className="absolute left-4 right-4 h-[44px] bg-gray-50 rounded-xl pointer-events-none z-10"
              style={{
                transform: "translateY(-50%)",
                // The container is 220px + padding.
                // The scroll view is 220px. Center is 110px from top of scrollview.
                // With py-5 (20px), center is 20 + 110 = 130px from top of this div.
                top: "calc(20px + 110px)",
              }}
            />

            <div className="flex justify-center items-start h-auto relative z-20">
              <ScrollColumn
                items={hours}
                selectedValue={displayHour}
                onSelect={(v) => handleHourChange(v as number)}
                label="HOUR"
              />

              <div className="h-[220px] flex items-center justify-center pb-1 z-20 pointer-events-none w-4">
                <Text variant="h4" className="text-gray-300 font-light mb-2">
                  :
                </Text>
              </div>

              <ScrollColumn
                items={minutes}
                selectedValue={currentMinute}
                onSelect={(v) => handleMinuteChange(v as number)}
                label="MINUTE"
              />

              {format === "12h" && (
                <ScrollColumn
                  items={periods}
                  selectedValue={currentPeriod}
                  onSelect={(v) => handlePeriodChange(v as string)}
                  label="MERIDIEM"
                />
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-5 pt-3 pb-6 grid grid-cols-2 gap-4 bg-white z-30">
            <Button
              variant="text"
              color="secondary"
              size="medium"
              onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="filled"
              color="primary"
              size="medium"
              onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
