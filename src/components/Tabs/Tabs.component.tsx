import { createEffect, createSignal, For, on, onCleanup, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { TabsProps } from "./Tabs.interface";

export function Tabs(props: TabsProps) {
  const isControlled = () => props.value !== undefined;
  const [internalValue, setInternalValue] = createSignal<
    string | number | undefined
  >(
    props.value ??
      props.defaultValue ??
      props.tabs.find((t) => t.active)?.value ??
      props.tabs[0]?.value,
  );

  const activeValue = () => {
    if (isControlled()) return props.value;
    return internalValue();
  };

  const orientation = () => props.orientation ?? "horizontal";
  const variant = () => props.variant ?? "standard";
  const isHorizontal = () => orientation() === "horizontal";

  const [visible, setVisible] = createSignal(true);
  const [isFirstRender, setIsFirstRender] = createSignal(true);

  createEffect(
    on(
      activeValue,
      () => {
        if (isFirstRender()) {
          setIsFirstRender(false);
          return;
        }
        setVisible(false);
        const t = setTimeout(() => setVisible(true), 160);
        onCleanup(() => clearTimeout(t));
      },
      { defer: true },
    ),
  );

  const handleClick = (value: string | number, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled()) setInternalValue(value);
    props.onChange?.(value);
  };

  const activeTab = () => props.tabs.find((t) => t.value === activeValue());

  return (
    <div
      class={twMerge(
        "flex w-full",
        isHorizontal() ? "flex-col" : "flex-row gap-4",
        props.class,
      )}>
      {/* Tab bar */}
      <div
        class={twMerge(
          "flex",
          isHorizontal() ? "flex-row" : "flex-col",
          props.centered && isHorizontal() ? "justify-center" : "",
          // Standard
          variant() === "standard" && isHorizontal()
            ? "border-b border-border"
            : "",
          variant() === "standard" && !isHorizontal()
            ? "border-r border-border"
            : "",
          // Filled
          variant() === "filled"
            ? "bg-surface-muted rounded-usible-lg p-1 gap-0.5 border-none"
            : "",
          // Block
          variant() === "block"
            ? "border border-border rounded-usible-lg overflow-hidden bg-surface-muted"
            : "",
        )}>
        <For each={props.tabs}>
          {(tab, index) => {
            const isActive = () => tab.value === activeValue();
            return (
              <button
                disabled={tab.disabled}
                onClick={() => handleClick(tab.value, tab.disabled)}
                class={twMerge(
                  "relative flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  isHorizontal() ? "flex-row" : "flex-row",

                  // --- Standard ---
                  variant() === "standard" && isActive() && isHorizontal()
                    ? "text-primary border-b-2 border-primary -mb-px"
                    : "",
                  variant() === "standard" && isActive() && !isHorizontal()
                    ? "text-primary border-r-2 border-primary -mr-px"
                    : "",
                  variant() === "standard" && !isActive() && !tab.disabled
                    ? "text-foreground-muted hover:text-foreground border-b-2 border-transparent -mb-px"
                    : "",

                  // --- Filled ---
                  variant() === "filled" ? "rounded-usible flex-1" : "",
                  variant() === "filled" && isActive()
                    ? "bg-surface shadow-usible-sm text-primary"
                    : "",
                  variant() === "filled" && !isActive() && !tab.disabled
                    ? "text-foreground-muted hover:text-foreground hover:bg-surface/60"
                    : "",

                  // --- Block ---
                  variant() === "block" ? "flex-1" : "",
                  variant() === "block" && index() > 0
                    ? "border-l border-border"
                    : "",
                  variant() === "block" && isActive()
                    ? "bg-surface text-primary shadow-usible-sm"
                    : "",
                  variant() === "block" && !isActive() && !tab.disabled
                    ? "text-foreground-muted hover:text-foreground hover:bg-surface/70"
                    : "",

                  // Disabled
                  tab.disabled
                    ? "opacity-40 cursor-not-allowed pointer-events-none"
                    : "cursor-pointer",
                )}>
                <Show when={tab.icon}>
                  <span
                    class={twMerge(
                      "text-base leading-none",
                      isActive() ? "text-primary" : "text-foreground-subtle",
                    )}>
                    {tab.icon}
                  </span>
                </Show>
                <span>{tab.label}</span>
              </button>
            );
          }}
        </For>
      </div>

      {/* Tab content */}
      <div
        class={twMerge(
          "w-full transition-all duration-200 ease-out",
          isHorizontal() ? "mt-4" : "mt-0",
          visible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        )}>
        <Show
          when={activeTab()?.content}
          fallback={
            <div class="flex items-center justify-center py-10 text-sm text-foreground-subtle border border-dashed border-border rounded-usible">
              No content available for this tab.
            </div>
          }>
          {activeTab()?.content}
        </Show>
      </div>
    </div>
  );
}
