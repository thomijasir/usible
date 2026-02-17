import type { Component, ComponentProps } from "solid-js";

export const ZaloIcon: Component<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M7 16V8h2l3 5V8h2v8h-2l-3-5v5H7z" />
    </svg>
  );
};
