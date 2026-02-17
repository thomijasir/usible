import { createUniqueId } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { TextAreaProps, TextAreaSize } from "./TextArea.interface";
import { Text } from "../Text";

const sizeClasses: Record<TextAreaSize, string> = {
  small: "py-2 px-3 text-sm",
  medium: "py-3 px-3 text-base",
  large: "py-4 px-4 text-lg",
};

export function TextArea(props: TextAreaProps) {
  const id = () => props.id ?? createUniqueId();
  const size = () => props.size ?? "medium";
  const isError = () => !!props.error;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    props.onInput?.(target.value);
  };

  return (
    <div
      class={twMerge(
        "flex flex-col",
        props.fullWidth !== false ? "w-full" : "",
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
            "flex items-start w-full rounded-lg border bg-gray-100 dark:bg-gray-800 transition-colors duration-200",
            isError()
              ? "border-error bg-red-50 dark:bg-red-900/10 text-error focus-within:border-error"
              : "border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-primary-light",
            props.disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900"
              : "",
          )}>
          <textarea
            id={id()}
            value={props.value}
            onInput={handleInput}
            disabled={props.disabled}
            rows={props.rows ?? 4}
            placeholder={props.placeholder}
            class={twMerge(
              "w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed resize-none",
              sizeClasses[size()],
              props.class,
            )}
          />
        </div>
      </div>

      {(props.helperText || (isError() && typeof props.error === "string")) && (
        <div class="mt-1 text-xs">
          {isError() && typeof props.error === "string" ? (
            <Text variant="caption" color="error">
              {props.error}
            </Text>
          ) : props.helperText ? (
            <Text variant="caption" color="ternary">
              {props.helperText}
            </Text>
          ) : null}
        </div>
      )}
    </div>
  );
}
