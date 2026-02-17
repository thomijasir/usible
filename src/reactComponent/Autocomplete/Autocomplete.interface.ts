import { ReactNode } from "react";
import { InputProps } from "../Input/Input.interface";

/**
 * Represents an individual item in the Autocomplete component.
 */
export interface AutocompleteItem {
  /**
   * A unique identifier for the autocomplete item.
   */
  id: string;
  /**
   * Optional ReactNode to display on the left side of the item.
   */
  iconLeft?: ReactNode;
  /**
   * Optional ReactNode to display on the right side of the item.
   */
  iconRight?: ReactNode;
  /**
   * The primary text to display for the autocomplete item.
   */
  label: string;
  /**
   * Optional secondary text or description for the autocomplete item.
   */
  description?: string;
}

/**
 * Props for the Autocomplete component.
 */
export interface AutocompleteProps extends Omit<
  InputProps,
  "onChange" | "value"
> {
  /**
   * An array of AutocompleteItem objects to display in the dropdown.
   */
  items: AutocompleteItem[];
  /**
   * The current value of the autocomplete input.
   */
  value?: string;
  /**
   * Callback function triggered when an item is selected or the input value changes.
   * @param id The id of the selected item.
   */
  onChange: (id: string) => void;
  /**
   * Placeholder text for the autocomplete input.
   */
  placeholder?: string;
}
