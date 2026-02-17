import { createUniqueId } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { CheckboxProps, CheckboxSize } from "./Checkbox.interface";
import { Text } from "../Text";

const sizeClasses: Record<CheckboxSize, string> = {
  small: "h-5 w-5",
  medium: "h-6 w-6",
  large: "h-7 w-7",
};

const checkmarkSizeClasses: Record<CheckboxSize, string> = {
  small: "w-3 h-3",
  medium: "w-4 h-4",
  large: "w-5 h-5",
};

function CheckIcon(props: { class?: string }) {
  return (
    <svg
      class={props.class}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width={3}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Checkbox(props: CheckboxProps) {
  const id = () => props.id ?? createUniqueId();
  const size = () => props.size ?? "medium";
  const isError = () => !!props.error;
  const errorId = () => `${id()}-error`;

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    props.onChange?.(target.checked);
  };

  return (
    <div
      class={twMerge(
        "relative flex items-center",
        props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        props.containerClass,
      )}>
      <div class="relative flex items-center">
        <input
          type="checkbox"
          id={id()}
          checked={props.checked}
          onChange={handleChange}
          disabled={props.disabled}
          aria-invalid={isError() ? "true" : undefined}
          aria-describedby={isError() ? errorId() : undefined}
          class={twMerge(
            "peer appearance-none rounded border-2 transition-colors duration-200",
            "checked:bg-primary checked:border-primary",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "disabled:bg-gray-100 disabled:border-gray-200",
            isError() ? "border-error" : "border-gray-300 dark:border-gray-600",
            sizeClasses[size()],
            props.class,
          )}
        />
        <div
          class={twMerge(
            "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 flex items-center justify-center",
            checkmarkSizeClasses[size()],
          )}>
          <CheckIcon />
        </div>
      </div>

      {props.label && (
        <label
          for={id()}
          class={twMerge(
            "ml-3 select-none",
            props.disabled
              ? "cursor-not-allowed text-gray-400"
              : "cursor-pointer text-gray-900 dark:text-gray-100",
          )}>
          {typeof props.label === "string" ? (
            <Text variant="body2">{props.label}</Text>
          ) : (
            props.label
          )}
        </label>
      )}

      {isError() && typeof props.error === "string" && (
        <div id={errorId()} class="sr-only">
          {props.error}
        </div>
      )}
    </div>
  );
}
