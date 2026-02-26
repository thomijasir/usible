import { twMerge } from "tailwind-merge";
import type { CardProps } from "./Card.interface";

const baseClasses = "rounded-2xl overflow-hidden transition-all duration-200";

const variantClasses = {
  elevated: "bg-white shadow-sm border border-gray-100",
  outlined: "bg-transparent border border-gray-200",
  filled: "bg-gray-50 border-transparent",
};

export function Card(props: CardProps) {
  const variant = () => props.variant ?? "elevated";
  const clickable = () => props.onClick ? "active:scale-[0.98] cursor-pointer" : "";

  return (
    <div
      class={twMerge(baseClasses, variantClasses[variant()], clickable(), props.class)}
      onClick={props.onClick}>
      {props.children}
    </div>
  );
}
