import { twMerge } from "tailwind-merge";
import type {
  SkeletonProps,
  SkeletonVariant,
  SkeletonAnimation,
} from "./Skeleton.interface";

const variantClasses: Record<SkeletonVariant, string> = {
  text: "rounded mt-1 mb-1 h-4 w-full",
  rectangular: "rounded",
  circular: "rounded-usible-pill",
};

const animationClasses: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  none: "",
};

export function Skeleton(props: SkeletonProps) {
  const variant = () => props.variant ?? "text";
  const animation = () => props.animation ?? "pulse";

  const classes = () =>
    twMerge(
      "bg-surface-subtle",
      variantClasses[variant()],
      animationClasses[animation()],
      props.class,
    );

  const style = () => {
    const s: Record<string, string | number | undefined> = {};
    if (props.width !== undefined)
      s.width =
        typeof props.width === "number" ? `${props.width}px` : props.width;
    if (props.height !== undefined)
      s.height =
        typeof props.height === "number" ? `${props.height}px` : props.height;
    return s;
  };

  return <div class={classes()} style={style()} />;
}
