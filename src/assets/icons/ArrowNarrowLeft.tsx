import type { Component, ComponentProps } from "solid-js";

export const ArrowNarrowLeftIcon: Component<ComponentProps<"svg">> = (
  props,
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M5 12H19M5 12L9 16M5 12L9 8"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
