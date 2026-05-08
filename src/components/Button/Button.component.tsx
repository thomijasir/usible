import { twMerge } from "tailwind-merge";
import type {
  ButtonProps,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
} from "./Button.interface";
import { Loader } from "../Loader";

const baseClasses =
  "select-none inline-flex items-center justify-center rounded-usible font-semibold focus:outline-none transition-colors duration-200 relative overflow-hidden";

const variantClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: {
    primary:
      "bg-primary text-inverse hover:bg-primary-dark active:bg-primary-dark",
    secondary:
      "bg-secondary text-inverse hover:bg-secondary-dark active:bg-secondary-dark",
    ternary:
      "bg-ternary text-inverse hover:bg-ternary-dark active:bg-ternary-dark",
    success:
      "bg-success text-inverse hover:bg-success-dark active:bg-success-dark",
    warning:
      "bg-warning text-inverse hover:bg-warning-dark active:bg-warning-dark",
    error: "bg-error text-inverse hover:bg-error-dark active:bg-error-dark",
    transparent:
      "bg-transparent text-current hover:opacity-80 active:opacity-70",
  },
  outlined: {
    primary:
      "border border-primary text-primary hover:bg-primary hover:text-inverse active:bg-primary active:text-inverse",
    secondary:
      "border border-secondary text-secondary hover:bg-secondary hover:text-inverse active:bg-secondary active:text-inverse",
    ternary:
      "border border-ternary text-ternary hover:bg-ternary hover:text-inverse active:bg-ternary active:text-inverse",
    success:
      "border border-success text-success hover:bg-success hover:text-inverse active:bg-success active:text-inverse",
    warning:
      "border border-warning text-warning hover:bg-warning hover:text-inverse active:bg-warning active:text-inverse",
    error:
      "border border-error text-error hover:bg-error hover:text-inverse active:bg-error active:text-inverse",
    transparent:
      "border border-current text-current hover:opacity-80 active:opacity-70",
  },
  text: {
    primary: "text-primary hover:bg-primary-light",
    secondary: "text-secondary hover:bg-secondary-light",
    ternary: "text-ternary hover:bg-ternary-light",
    success: "text-success hover:bg-success-light",
    warning: "text-warning hover:bg-warning-light",
    error: "text-error hover:bg-error-light",
    transparent: "text-current hover:opacity-80",
  },
  icon: {
    primary: "text-primary hover:bg-primary-50 rounded-usible-pill",
    secondary: "text-secondary hover:bg-secondary-50 rounded-usible-pill",
    ternary: "text-ternary hover:bg-ternary-50 rounded-usible-pill",
    success: "text-success hover:bg-success-50 rounded-usible-pill",
    warning: "text-warning hover:bg-warning-50 rounded-usible-pill",
    error: "text-error hover:bg-error-50 rounded-usible-pill",
    transparent: "text-current hover:opacity-80 rounded-usible-pill",
  },
  iconOutline: {
    primary:
      "border border-primary text-primary hover:bg-primary hover:text-inverse active:bg-primary active:text-inverse rounded-usible-pill",
    secondary:
      "border border-secondary text-secondary hover:bg-secondary hover:text-inverse active:bg-secondary active:text-inverse rounded-usible-pill",
    ternary:
      "border border-ternary text-ternary hover:bg-ternary hover:text-inverse active:bg-ternary active:text-inverse rounded-usible-pill",
    success:
      "border border-success text-success hover:bg-success hover:text-inverse active:bg-success active:text-inverse rounded-usible-pill",
    warning:
      "border border-warning text-warning hover:bg-warning hover:text-inverse active:bg-warning active:text-inverse rounded-usible-pill",
    error:
      "border border-error text-error hover:bg-error hover:text-inverse active:bg-error active:text-inverse rounded-usible-pill",
    transparent:
      "border border-current text-current hover:opacity-80 active:opacity-70 rounded-usible-pill",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-4 py-2.5 text-sm",
  medium: "px-5 py-3 text-base",
  large: "px-6 py-4 text-lg",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  small: "p-1.5 aspect-square",
  medium: "p-2 aspect-square",
  large: "p-3 aspect-square",
};

const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

const loaderColorMap: Record<
  ButtonColor,
  "primary" | "secondary" | "white" | "current"
> = {
  primary: "white",
  secondary: "white",
  ternary: "white",
  success: "white",
  warning: "white",
  error: "white",
  transparent: "current",
};

export function Button(props: ButtonProps) {
  const variant = () => props.variant ?? "filled";
  const color = () => props.color ?? "primary";
  const size = () => props.size ?? "medium";
  const isDisabled = () => props.disabled || props.loading;
  const isIcon = () => variant() === "icon" || variant() === "iconOutline";

  const classes = () =>
    twMerge(
      baseClasses,
      variantClasses[variant()][color()],
      isIcon() ? iconSizeClasses[size()] : sizeClasses[size()],
      props.block ? "w-full" : "",
      isDisabled() ? disabledClasses : "",
      isDisabled()
        ? ""
        : "active:scale-98 active:opacity-90 transform transition-all duration-150",
      props.class,
    );

  const loaderColor = () =>
    variant() === "filled" ? loaderColorMap[color()] : "current";

  const loaderSize = () => (size() === "large" ? "medium" : "small");

  return (
    <button
      class={classes()}
      onClick={props.onClick}
      disabled={isDisabled()}
      type={props.type ?? "button"}
      aria-busy={props.loading}
      style={{ "-webkit-tap-highlight-color": "transparent" }}>
      {props.loading && (
        <span class="inline-flex items-center mr-2">
          <Loader size={loaderSize()} color={loaderColor()} />
        </span>
      )}
      {props.children}
    </button>
  );
}
