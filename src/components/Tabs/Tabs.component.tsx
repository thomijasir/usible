import { createSignal, For, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { TabsProps } from "./Tabs.interface";

export function Tabs(props: TabsProps) {
  const isControlled = () => props.value !== undefined;
  const [internalValue, setInternalValue] = createSignal<string | number | undefined>(
    props.value ?? props.defaultValue ?? props.tabs[0]?.value,
  );

  const activeValue = () => (isControlled() ? props.value : internalValue());
  const orientation = () => props.orientation ?? "horizontal";
  const variant = () => props.variant ?? "standard";
  const isHorizontal = () => orientation() === "horizontal";

  const handleClick = (value: string | number, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled()) setInternalValue(value);
    props.onChange?.(value);
  };

  const activeTab = () => props.tabs.find((t) => t.value === activeValue());

  return (
    <div class={twMerge("flex flex-col w-full", props.class)}>
      <div
        class={twMerge(
          "relative flex",
          isHorizontal() ? "flex-row border-b border-gray-200" : "flex-col",
          props.centered && isHorizontal() ? "justify-center" : "",
          variant() === "filled" ? "bg-gray-100 rounded-lg p-1" : "",
        )}>
        <For each={props.tabs}>
          {(tab) => {
            const isActive = () => tab.value === activeValue();
            return (
              <button
                disabled={tab.disabled}
                onClick={() => handleClick(tab.value, tab.disabled)}
                class={twMerge(
                  "relative flex items-center justify-center gap-2 px-4 py-3 font-medium text-sm transition-all duration-200 whitespace-nowrap",
                  isHorizontal() ? "flex-row" : "flex-col",
                  variant() === "block" ? "flex-1" : "",
                  variant() === "filled" ? "rounded-md" : "",
                  isActive() && (variant() === "standard" || variant() === "block") ? "text-primary" : "",
                  isActive() && variant() === "filled" ? "bg-white shadow-sm text-primary" : "",
                  !isActive() && !tab.disabled ? "text-gray-600 hover:text-gray-900" : "",
                  tab.disabled ? "opacity-40 cursor-not-allowed" : "",
                )}>
                <Show when={tab.icon}>
                  <span class={isActive() ? "text-primary" : "text-gray-500"}>
                    {tab.icon}
                  </span>
                </Show>
                <span>{tab.label}</span>
              </button>
            );
          }}
        </For>
        <Show when={(variant() === "standard" || variant() === "block") && activeValue() !== undefined}>
          <div class="absolute bg-primary transition-all duration-300 ease-out"
            style={isHorizontal()
              ? { bottom: "0", height: "2px", left: "0", right: "0" }
              : { left: "0", width: "2px", top: "0", bottom: "0" }}
          />
        </Show>
      </div>
      <div class="relative w-full mt-4">
        {activeTab()?.content}
      </div>
    </div>
  );
}
