import type { JSX } from "solid-js";

export interface AutocompleteItem {
  id: string;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  label: string;
  description?: string;
}

export interface AutocompleteProps {
  items: AutocompleteItem[];
  value?: string;
  onChange: (id: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string | boolean;
  helperText?: string;
  class?: string;
  id?: string;
}
