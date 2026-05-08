import { twMerge } from "tailwind-merge";
import type { CardProps } from "./Card.interface";

const baseClasses =
  "rounded-usible-lg overflow-hidden transition-all duration-200";

const variantClasses = {
  elevated: "bg-surface shadow-usible-sm border border-border-muted",
  outlined: "bg-transparent border border-border",
  filled: "bg-surface-muted border-transparent",
};

export function Card(props: CardProps) {
  const variant = () => props.variant ?? "elevated";
  const clickable = () =>
    props.onClick ? "active:scale-[0.98] cursor-pointer" : "";

  return (
    <div
      class={twMerge(
        baseClasses,
        variantClasses[variant()],
        clickable(),
        props.class,
      )}
      onClick={props.onClick}>
      {props.children}
    </div>
  );
}
