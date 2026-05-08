import { twMerge } from "tailwind-merge";
import type { MenuListProps, MenuItemProps } from "./MenuList.interface";

function ChevronRightIcon(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width={2}
      stroke="currentColor"
      class={props.class}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export function MenuItem(props: MenuItemProps) {
  const showChevron = () => props.showChevron ?? true;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      props.onClick?.();
    }
  };

  return (
    <div
      onClick={props.onClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={0}
      class={twMerge(
        "flex items-center p-4 bg-surface active:bg-surface-hover cursor-pointer transition-colors duration-200 focus:bg-surface-hover focus:outline-none",
        props.class,
      )}>
      {props.leftIcon && (
        <div class="mr-4 text-foreground-muted">{props.leftIcon}</div>
      )}
      <div class="flex-1 min-w-0">
        <div class="text-base font-medium text-foreground truncate">
          {props.label}
        </div>
        {props.description && (
          <div class="text-sm text-foreground-muted mt-0.5 truncate">
            {props.description}
          </div>
        )}
      </div>
      {(props.rightIcon || showChevron()) && (
        <div class="ml-4 text-foreground-subtle shrink-0">
          {props.rightIcon ? (
            props.rightIcon
          ) : (
            <ChevronRightIcon class="w-5 h-5" />
          )}
        </div>
      )}
    </div>
  );
}

export function MenuList(props: MenuListProps) {
  const variant = () => props.variant ?? "standard";

  const containerClasses = () =>
    variant() === "rounded"
      ? "rounded-usible-lg overflow-hidden shadow-usible-sm border border-border-muted mx-4"
      : "border-y border-border-muted w-full";

  const titleClasses = () =>
    variant() === "rounded"
      ? "px-4 pb-2 mx-4 text-sm font-semibold text-foreground-muted uppercase tracking-wider"
      : "px-4 pb-2 text-sm font-semibold text-foreground-muted uppercase tracking-wider";

  return (
    <div class={twMerge("w-full", props.class)}>
      {props.title && <div class={titleClasses()}>{props.title}</div>}
      <div
        role="menu"
        class={twMerge(
          "bg-surface divide-y divide-border-muted",
          containerClasses(),
        )}>
        {props.children}
      </div>
    </div>
  );
}
