import { createUniqueId } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { InputProps, InputSize } from "./Input.interface";
import { Text } from "../Text";

const sizeClasses: Record<InputSize, string> = {
  small: "py-2 px-3 text-sm",
  medium: "py-3 px-3 text-base",
  large: "py-4 px-4 text-lg",
};

export function Input(props: InputProps) {
  const fallbackId = createUniqueId();
  const id = () => props.id ?? fallbackId;
  const size = () => props.size ?? "medium";
  const isError = () => !!props.error;
  const errorId = () => `${id()}-error`;
  const helperId = () => `${id()}-helper`;

  const applyTextCase = (value: string): string => {
    const textCase = props.textCase ?? "normal";
    if (textCase === "uppercase") return value.toUpperCase();
    if (textCase === "lowercase") return value.toLowerCase();
    return value;
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = applyTextCase(target.value);
    target.value = value;
    props.onInput?.(value);
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    props.onChange?.(applyTextCase(target.value));
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
            "mb-1.5 text-sm font-medium text-foreground",
            props.disabled ? "opacity-50" : "",
          )}>
          {props.label}
        </label>
      )}

      <div class="relative">
        <div
          class={twMerge(
            "flex items-center w-full rounded-usible border bg-surface-muted transition-colors duration-200",
            isError()
              ? "border-error bg-error-50 text-error focus-within:border-error"
              : "border-transparent focus-within:bg-surface focus-within:border-primary-light",
            props.disabled
              ? "opacity-50 cursor-not-allowed bg-surface-disabled"
              : "",
            props.onClick ? "cursor-pointer" : "",
          )}
          onClick={props.onClick}>
          {props.startAdornment && (
            <div class="pl-3 text-foreground-muted flex items-center justify-center">
              {props.startAdornment}
            </div>
          )}

          <input
            ref={props.ref}
            id={id()}
            type={props.type ?? "text"}
            value={props.value ?? ""}
            onInput={handleInput}
            onChange={handleChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            disabled={props.disabled}
            placeholder={props.placeholder}
            aria-invalid={isError() ? "true" : undefined}
            aria-describedby={getAriaDescribedBy()}
            class={twMerge(
              "w-full bg-transparent text-foreground placeholder-placeholder focus:outline-none disabled:cursor-not-allowed",
              sizeClasses[size()],
              props.startAdornment ? "pl-2" : "",
              props.endAdornment ? "pr-2" : "",
              props.class,
            )}
          />

          {props.endAdornment && (
            <div class="pr-3 text-foreground-muted flex items-center justify-center">
              {props.endAdornment}
            </div>
          )}
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
