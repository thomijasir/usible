import {
  createSignal,
  createEffect,
  createMemo,
  on,
  For,
  onCleanup,
} from "solid-js";
import { twMerge } from "tailwind-merge";
import type { TimePickerProps } from "./TimePicker.interface";
import { Input } from "../Input";
import { Drawer } from "../Drawer";
import { Text } from "../Text";
import { Button } from "../Button";
import { ClockIcon } from "~/assets/icons";

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

interface ScrollColumnProps {
  items: { value: number | string; label: string }[];
  selectedValue: () => number | string;
  onSelect: (value: number | string) => void;
  label?: string;
}

function ScrollColumn(props: ScrollColumnProps) {
  let containerRef: HTMLDivElement | undefined;
  let isScrolling = false;
  let scrollTimeoutRef: ReturnType<typeof setTimeout> | null = null;

  createEffect(
    on(
      () => props.selectedValue(),
      () => {
        if (containerRef && !isScrolling) {
          const index = props.items.findIndex(
            (item) => item.value === props.selectedValue(),
          );
          if (index !== -1) {
            containerRef.scrollTop = index * ITEM_HEIGHT;
          }
        }
      },
    ),
  );

  const handleScroll = (e: Event) => {
    isScrolling = true;
    const target = e.currentTarget as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, props.items.length - 1));

    if (scrollTimeoutRef) {
      clearTimeout(scrollTimeoutRef);
    }

    scrollTimeoutRef = setTimeout(() => {
      isScrolling = false;
      const selectedItem = props.items[clampedIndex];
      if (selectedItem) {
        props.onSelect(selectedItem.value);
      }
    }, 150);
  };

  onCleanup(() => {
    if (scrollTimeoutRef) {
      clearTimeout(scrollTimeoutRef);
    }
  });

  return (
    <div class="flex-1 flex flex-col items-center relative z-20">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        class="h-55 w-full overflow-y-auto snap-y snap-mandatory relative z-20"
        style={{
          "scroll-behavior": "smooth",
          "scrollbar-width": "none",
          "touch-action": "pan-y",
          "-webkit-overflow-scrolling": "touch",
        }}>
        <div
          style={{ height: `${ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2)}px` }}
        />
        <For each={props.items}>
          {(item) => (
            <div
              onClick={() => props.onSelect(item.value)}
              class={twMerge(
                "flex items-center justify-center snap-center cursor-pointer transition-all duration-200 select-none",
                props.selectedValue() === item.value
                  ? "text-primary font-bold text-xl scale-110"
                  : "text-foreground-subtle text-lg scale-100 opacity-60 hover:opacity-100",
              )}
              style={{ height: `${ITEM_HEIGHT}px` }}>
              {item.label}
            </div>
          )}
        </For>
        <div
          style={{ height: `${ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2)}px` }}
        />
      </div>
      {props.label && (
        <div class="mt-2">
          <Text
            variant="caption"
            class="font-bold text-foreground-subtle tracking-wider text-[10px] uppercase">
            {props.label}
          </Text>
        </div>
      )}
    </div>
  );
}

export function TimePicker(props: TimePickerProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [internalDate, setInternalDate] = createSignal<Date>(
    props.value || new Date(),
  );

  createEffect(
    on(
      () => props.value,
      (value) => {
        if (value) {
          setInternalDate(value);
        }
      },
    ),
  );

  const hours = createMemo(() => {
    if (props.format === "24h") {
      return Array.from({ length: 24 }, (_, i) => ({
        value: i,
        label: i.toString().padStart(2, "0"),
      }));
    }
    return Array.from({ length: 12 }, (_, i) => {
      const h = i === 0 ? 12 : i;
      return { value: h, label: h.toString() };
    });
  });

  const minutes = createMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      value: i,
      label: i.toString().padStart(2, "0"),
    })),
  );

  const periods = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const currentHour24 = () => internalDate().getHours();
  const currentMinute = () => internalDate().getMinutes();
  const currentPeriod = () => (currentHour24() >= 12 ? "PM" : "AM");

  const displayHour = () => {
    if (props.format === "24h") return currentHour24();
    const h = currentHour24() % 12;
    return h === 0 ? 12 : h;
  };

  const handleHourChange = (newHour: number) => {
    const newDate = new Date(internalDate());
    if (props.format === "24h") {
      newDate.setHours(newHour);
    } else {
      let h = newHour;
      if (h === 12) h = 0;
      if (currentPeriod() === "PM") h += 12;
      newDate.setHours(h);
    }
    setInternalDate(newDate);
  };

  const handleMinuteChange = (newMinute: number) => {
    const newDate = new Date(internalDate());
    newDate.setMinutes(newMinute);
    setInternalDate(newDate);
  };

  const handlePeriodChange = (newPeriod: string) => {
    const newDate = new Date(internalDate());
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
    props.onChange?.(internalDate());
    setIsOpen(false);
  };

  const formatDisplayTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: props.format !== "24h",
    });

  const displayValue = () => formatDisplayTime(internalDate());

  return (
    <div class={props.class}>
      <Input
        label={props.label}
        placeholder={props.placeholder ?? "Select Time"}
        value={displayValue()}
        disabled={props.disabled}
        onClick={() => !props.disabled && setIsOpen(true)}
        endAdornment={
          <div
            onClick={() => !props.disabled && setIsOpen(true)}
            class="cursor-pointer p-1 hover:bg-surface-hover rounded-usible-pill transition-colors">
            <ClockIcon class="w-5 h-5 text-foreground-muted" />
          </div>
        }
        containerClass="cursor-pointer"
      />

      <Drawer
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        height="auto"
        showHandle={false}
        disableDrag>
        <div class="flex flex-col h-auto bg-surface rounded-t-usible-xl overflow-hidden">
          {/* Header */}
          <div class="py-4 border-b border-border-muted flex justify-center items-center z-30">
            <Text variant="h6" class="font-bold text-foreground text-lg">
              Select Time
            </Text>
          </div>

          {/* Picker Content */}
          <div class="py-5 w-full max-w-sm mx-auto relative">
            {/* Selection Highlight Bar */}
            <div
              class="absolute left-4 right-4 h-11 bg-surface-muted rounded-usible-lg pointer-events-none z-10"
              style={{
                transform: "translateY(-50%)",
                top: "calc(20px + 110px)",
              }}
            />

            <div class="flex justify-center items-start h-auto relative z-20">
              <ScrollColumn
                items={hours()}
                selectedValue={displayHour}
                onSelect={(v) => handleHourChange(v as number)}
                label="HOUR"
              />

              <div class="h-55 flex items-center justify-center pb-1 z-20 pointer-events-none w-4">
                <Text
                  variant="h4"
                  class="text-foreground-subtle font-light mb-2">
                  :
                </Text>
              </div>

              <ScrollColumn
                items={minutes()}
                selectedValue={currentMinute}
                onSelect={(v) => handleMinuteChange(v as number)}
                label="MINUTE"
              />

              {props.format !== "24h" && (
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
          <div class="px-5 pt-3 pb-6 grid grid-cols-2 gap-4 z-30">
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
}
