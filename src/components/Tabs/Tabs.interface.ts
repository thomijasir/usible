import type { JSX } from "solid-js";

export interface TabItem {
  label: string;
  value: string | number;
  icon?: JSX.Element;
  disabled?: boolean;
  content: JSX.Element;
}

export interface TabsProps {
  tabs: TabItem[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  variant?: "standard" | "filled" | "block";
  orientation?: "horizontal" | "vertical";
  class?: string;
  centered?: boolean;
}
