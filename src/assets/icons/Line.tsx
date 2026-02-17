import type { Component, ComponentProps } from "solid-js";

export const LineIcon: Component<ComponentProps<"svg">> = (props) => {
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
      <path d="M21 10.64c0-4.22-4.03-7.64-9-7.64S3 6.42 3 10.64c0 3.74 3.13 6.88 7.34 7.51.29.06.68.19.78.43.09.21.06.54.03.75-.08.47-.5 1.96-.55 2.13-.16.56-.73 2.19 1.05 1.19 1.78-1 9.58-5.64 9.58-5.64 3.3-1.82 4.77-4.17 4.77-6.37z" />
    </svg>
  );
};
