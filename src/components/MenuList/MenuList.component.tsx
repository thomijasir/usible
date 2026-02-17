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
        "flex items-center p-4 bg-white active:bg-gray-50 cursor-pointer transition-colors duration-200 focus:bg-gray-50 focus:outline-none",
        props.class,
      )}>
      {props.leftIcon && <div class="mr-4 text-gray-500">{props.leftIcon}</div>}
      <div class="flex-1 min-w-0">
        <div class="text-base font-medium text-gray-900 truncate">
          {props.label}
        </div>
        {props.description && (
          <div class="text-sm text-gray-500 mt-0.5 truncate">
            {props.description}
          </div>
        )}
      </div>
      {(props.rightIcon || showChevron()) && (
        <div class="ml-4 text-gray-400 shrink-0">
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
      ? "rounded-2xl overflow-hidden shadow-sm border border-gray-100 mx-4"
      : "border-y border-gray-100 w-full";

  const titleClasses = () =>
    variant() === "rounded"
      ? "px-4 pb-2 mx-4 text-sm font-semibold text-gray-500 uppercase tracking-wider"
      : "px-4 pb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div class={twMerge("w-full", props.class)}>
      {props.title && <div class={titleClasses()}>{props.title}</div>}
      <div
        role="menu"
        class={twMerge(
          "bg-white divide-y divide-gray-100",
          containerClasses(),
        )}>
        {props.children}
      </div>
    </div>
  );
}
