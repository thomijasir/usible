import { createUniqueId, For } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { SelectProps } from "./Select.interface";
import { Text } from "../Text";

function ChevronDownIcon(props: { class?: string }) {
  return (
    <svg
      class={props.class}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width={2}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function Select(props: SelectProps) {
  const id = () => props.id ?? createUniqueId();
  const isError = () => !!props.error;
  const errorId = () => `${id()}-error`;
  const helperId = () => `${id()}-helper`;

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    props.onChange?.(target.value);
  };

  const getAriaDescribedBy = () => {
    if (isError() && typeof props.error === "string") return errorId();
    if (props.helperText) return helperId();
    return undefined;
  };

  return (
    <div
      class={twMerge(
        "flex flex-col",
        props.fullWidth !== false ? "w-full" : "",
        props.containerClass,
      )}>
      {props.label && (
        <label
          for={id()}
          class={twMerge(
            "mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200",
            props.disabled ? "opacity-50" : "",
          )}>
          {props.label}
        </label>
      )}

      <div class="relative">
        <div
          class={twMerge(
            "flex items-center w-full rounded-lg border bg-gray-50 dark:bg-gray-800 transition-colors duration-200",
            isError()
              ? "border-error bg-red-50 dark:bg-red-900/10 text-error focus-within:border-error"
              : "border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-primary-light",
            props.disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900"
              : "",
          )}>
          <select
            id={id()}
            value={props.value}
            onChange={handleChange}
            disabled={props.disabled}
            aria-invalid={isError() ? "true" : undefined}
            aria-describedby={getAriaDescribedBy()}
            class={twMerge(
              "w-full bg-transparent py-3 px-3 text-gray-900 dark:text-white appearance-none",
              "focus:outline-none disabled:cursor-not-allowed",
              props.class,
            )}>
            {props.placeholder && (
              <option value="" disabled>
                {props.placeholder}
              </option>
            )}
            <For each={props.options}>
              {(opt) => <option value={opt.value}>{opt.label}</option>}
            </For>
          </select>

          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDownIcon class="w-5 h-5" />
          </div>
        </div>
      </div>

      {(props.helperText || (isError() && typeof props.error === "string")) && (
        <div class="mt-1 text-xs">
          {isError() && typeof props.error === "string" ? (
            <span id={errorId()}>
              <Text variant="caption" color="error">
                {props.error}
              </Text>
            </span>
          ) : props.helperText ? (
            <span id={helperId()}>
              <Text variant="caption" color="ternary">
                {props.helperText}
              </Text>
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
