import { twMerge } from "tailwind-merge";
import type { LoaderProps, LoaderSize, LoaderColor } from "./Loader.interface";

const sizeClasses: Record<LoaderSize, string> = {
  small: "w-4 h-4 border-2",
  medium: "w-8 h-8 border-3",
  large: "w-12 h-12 border-4",
};

const colorClasses: Record<LoaderColor, string> = {
  primary: "border-primary/30 border-t-primary",
  secondary: "border-secondary/30 border-t-secondary",
  white: "border-white/30 border-t-white",
  current: "border-current/30 border-t-current",
};

export function Loader(props: LoaderProps) {
  const size = () => props.size ?? "medium";
  const color = () => props.color ?? "primary";

  const classes = () =>
    twMerge(
      "inline-block rounded-full animate-spin",
      sizeClasses[size()],
      colorClasses[color()],
      props.class,
    );

  return <div role="status" aria-label="Loading" class={classes()} />;
}
