import { twMerge } from "tailwind-merge";
import type { RadioProps } from "./Radio.interface";
import { Text } from "../Text";

let idCounter = 0;

export function Radio(props: RadioProps) {
  const radioId = props.id ?? `radio-${++idCounter}`;
  const isBoxed = () => (props.variant ?? "boxed") === "boxed";

  const inputEl = (addMarginRight = false) => (
    <div
      class={`relative flex items-center h-6 ${addMarginRight ? "mr-4" : ""}`}>
      <input
        type="radio"
        id={radioId}
        disabled={props.disabled}
        checked={props.checked}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange?.(e.currentTarget.checked)}
        class={twMerge(
          "peer h-5 w-5 appearance-none rounded-usible-pill border-2 border-border-strong",
          "checked:border-primary checked:bg-primary",
          "focus:outline-none",
          "disabled:border-border disabled:bg-surface-disabled",
          props.class,
        )}
      />
      <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block">
        <div class="w-2 h-2 rounded-usible-pill bg-inverse" />
      </div>
    </div>
  );

  const contentEl = (addMarginRight = false) => (
    <div class={`flex-1 ${addMarginRight ? "mr-4" : ""}`}>
      {props.label && (
        <label
          for={radioId}
          class={`block font-medium text-foreground ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
          {props.label}
        </label>
      )}
      {props.description && (
        <Text variant="caption" class="mt-1 text-foreground-muted block">
          {props.description}
        </Text>
      )}
    </div>
  );

  const iconEl = (addMarginRight = false) =>
    props.icon && (
      <div
        class={`${addMarginRight ? "mr-4" : ""} ${isBoxed() ? "mt-0.5" : ""} text-foreground-muted`}>
        {props.icon}
      </div>
    );

  const boxedClasses = () =>
    `items-start p-4 rounded-usible-lg border shadow-usible-sm ${
      props.checked
        ? "bg-primary-50 border-primary"
        : "bg-surface border-border"
    }`;
  const plainClasses = "items-center p-0 border-0 bg-transparent";

  return (
    <div
      class={twMerge(
        "relative flex transition-all duration-200",
        isBoxed() ? boxedClasses() : plainClasses,
        props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        props.error ? "border-error bg-error-50" : "",
        props.containerClass,
      )}
      onClick={() =>
        !props.disabled && document.getElementById(radioId)?.click()
      }>
      {(props.inputPosition ?? "right") === "left" ? (
        <>
          {inputEl(true)}
          {iconEl(true)}
          {contentEl()}
        </>
      ) : (
        <>
          {iconEl(true)}
          {contentEl(true)}
          {inputEl()}
        </>
      )}
    </div>
  );
}
