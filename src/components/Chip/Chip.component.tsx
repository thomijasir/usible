import { twMerge } from "tailwind-merge";
import type {
  ChipProps,
  ChipVariant,
  ChipColor,
  ChipSize,
} from "./Chip.interface";

const sizeClasses: Record<ChipSize, string> = {
  small: "px-2.5 py-0.5 text-xs h-6",
  medium: "px-3 py-1 text-sm h-8",
};

const colorClasses: Record<ChipVariant, Record<ChipColor, string>> = {
  filled: {
    default: "bg-surface-subtle text-foreground hover:bg-surface-active",
    primary: "bg-primary-light text-primary-dark hover:bg-primary-active",
    secondary:
      "bg-secondary-light text-secondary-dark hover:bg-secondary-active",
    ternary: "bg-ternary-light text-ternary-dark hover:bg-ternary-active",
    success: "bg-success-light text-success-dark hover:bg-success-active",
    warning: "bg-warning-light text-warning-dark hover:bg-warning-active",
    error: "bg-error-light text-error-dark hover:bg-error-active",
  },
  outlined: {
    default:
      "border border-border-strong text-foreground hover:bg-surface-hover",
    primary: "border border-primary text-primary hover:bg-primary-light/10",
    secondary:
      "border border-secondary text-secondary hover:bg-secondary-light/10",
    ternary: "border border-ternary text-ternary hover:bg-ternary-light/10",
    success: "border border-success text-success hover:bg-success-light/10",
    warning: "border border-warning text-warning hover:bg-warning-light/10",
    error: "border border-error text-error hover:bg-error-light/10",
  },
};

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Chip(props: ChipProps) {
  const variant = () => props.variant ?? "filled";
  const color = () => props.color ?? "default";
  const size = () => props.size ?? "medium";

  const baseClasses =
    "inline-flex items-center justify-center rounded-usible-pill font-medium transition-colors duration-200";

  const disabledClasses = () =>
    props.disabled
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : props.onClick
        ? "cursor-pointer active:scale-95"
        : "cursor-default";

  const handleClick = () => {
    if (!props.disabled && props.onClick) {
      props.onClick();
    }
  };

  const handleDelete = (e: Event) => {
    e.stopPropagation();
    if (!props.disabled && props.onDelete) {
      props.onDelete();
    }
  };

  return (
    <div
      class={twMerge(
        baseClasses,
        sizeClasses[size()],
        colorClasses[variant()][color()],
        disabledClasses(),
        props.class,
      )}
      onClick={handleClick}>
      {props.icon && (
        <span class="mr-1.5 -ml-0.5 flex items-center">{props.icon}</span>
      )}
      <span>{props.label}</span>
      {props.onDelete && !props.disabled && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleDelete}
          class="ml-1.5 -mr-1 p-0.5 rounded-usible-pill hover:bg-surface-active cursor-pointer">
          <CloseIcon />
        </div>
      )}
    </div>
  );
}
