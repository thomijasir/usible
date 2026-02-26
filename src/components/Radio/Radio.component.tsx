import { twMerge } from "tailwind-merge";
import type { RadioProps } from "./Radio.interface";
import { Text } from "../Text";

let idCounter = 0;

export function Radio(props: RadioProps) {
  const radioId = props.id ?? `radio-${++idCounter}`;
  const isBoxed = () => (props.variant ?? "boxed") === "boxed";

  const inputEl = (addMarginRight = false) => (
    <div class={`relative flex items-center h-6 ${addMarginRight ? "mr-4" : ""}`}>
      <input
        type="radio"
        id={radioId}
        disabled={props.disabled}
        checked={props.checked}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange?.(e.currentTarget.checked)}
        class={twMerge(
          "peer h-5 w-5 appearance-none rounded-full border-2 border-gray-300",
          "checked:border-primary checked:bg-primary",
          "focus:outline-none",
          "disabled:border-gray-200 disabled:bg-gray-100",
          props.class,
        )}
      />
      <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block">
        <div class="w-2 h-2 rounded-full bg-white" />
      </div>
    </div>
  );

  const contentEl = (addMarginRight = false) => (
    <div class={`flex-1 ${addMarginRight ? "mr-4" : ""}`}>
      {props.label && (
        <label
          for={radioId}
          class={`block font-medium text-gray-900 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
          {props.label}
        </label>
      )}
      {props.description && (
        <Text variant="caption" class="mt-1 text-gray-500 block">
          {props.description}
        </Text>
      )}
    </div>
  );

  const iconEl = (addMarginRight = false) =>
    props.icon && (
      <div class={`${addMarginRight ? "mr-4" : ""} ${isBoxed() ? "mt-0.5" : ""} text-gray-500`}>
        {props.icon}
      </div>
    );

  const boxedClasses = () =>
    `items-start p-4 rounded-xl border shadow-sm ${
      props.checked ? "bg-blue-50 border-primary" : "bg-white border-gray-200"
    }`;
  const plainClasses = "items-center p-0 border-0 bg-transparent";

  return (
    <div
      class={twMerge(
        "relative flex transition-all duration-200",
        isBoxed() ? boxedClasses() : plainClasses,
        props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        props.error ? "border-error bg-red-50" : "",
        props.containerClass,
      )}
      onClick={() => !props.disabled && document.getElementById(radioId)?.click()}>
      {(props.inputPosition ?? "right") === "left" ? (
        <>{inputEl(true)}{iconEl(true)}{contentEl()}</>
      ) : (
        <>{iconEl(true)}{contentEl(true)}{inputEl()}</>
      )}
    </div>
  );
}
