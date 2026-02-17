import type { Component, ComponentProps } from "solid-js";

export const WeChatIcon: Component<ComponentProps<"svg">> = (props) => {
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
      <path d="M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -2 3.47l0 2.03l-1.964 -1.078a6.64 6.64 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5z" />
      <path d="M11.5 14.5c-3.59 0 -6.5 -2.239 -6.5 -5c0 -1.552 .932 -2.939 2.364 -3.856l-.864 -1.644l2.322 1.194c.865 -.194 1.79 -.294 2.678 -.294c3.59 0 6.5 2.239 6.5 5c0 1.552 -.932 2.939 -2.364 3.856" />
    </svg>
  );
};
