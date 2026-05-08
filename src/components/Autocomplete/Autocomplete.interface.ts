import type { JSX } from "solid-js";

/**
 * Option item rendered by the autocomplete dropdown.
 */
export interface AutocompleteItem {
  /** Unique option identifier returned by `onChange`. */
  id: string;
  /** Optional icon displayed before the label. */
  iconLeft?: JSX.Element;
  /** Optional icon displayed after the label. */
  iconRight?: JSX.Element;
  /** Primary option label. */
  label: string;
  /** Secondary option description text. */
  description?: string;
}

/**
 * Props for the `Autocomplete` component.
 */
export interface AutocompleteProps {
  /** List of selectable options. */
  items: AutocompleteItem[];
  /** Controlled selected option id. */
  value?: string;
  /** Called when the selected option changes. */
  onChange: (id: string) => void;
  /** Field label shown above the input. */
  label?: string;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Disables text input and option selection. */
  disabled?: boolean;
  /** Error state or helper error message. */
  error?: string | boolean;
  /** Supporting text shown below the field. */
  helperText?: string;
  /** Additional class names for the root element. */
  class?: string;
  /** Optional id used for input and accessibility attributes. */
  id?: string;
}
