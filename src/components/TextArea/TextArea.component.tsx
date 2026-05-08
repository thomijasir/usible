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
  const fallbackId = createUniqueId();
  const id = () => props.id ?? fallbackId;
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
            "mb-1.5 text-sm font-medium text-foreground",
            props.disabled ? "opacity-50" : "",
          )}>
          {props.label}
        </label>
      )}

      <div class="relative">
        <div
          class={twMerge(
            "flex items-start w-full rounded-usible border bg-surface-muted transition-colors duration-200",
            isError()
              ? "border-error bg-error-50 text-error focus-within:border-error"
              : "border-transparent focus-within:bg-surface focus-within:border-primary-light",
            props.disabled
              ? "opacity-50 cursor-not-allowed bg-surface-disabled"
              : "",
          )}>
          <textarea
            id={id()}
            value={props.value ?? ""}
            onInput={handleInput}
            disabled={props.disabled}
            rows={props.rows ?? 4}
            placeholder={props.placeholder}
            class={twMerge(
              "w-full bg-transparent text-foreground placeholder-placeholder focus:outline-none disabled:cursor-not-allowed resize-none",
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
