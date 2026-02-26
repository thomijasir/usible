import { createSignal, createMemo } from "solid-js";
import type { AutocompleteProps } from "./Autocomplete.interface";

const ANIMATION_DURATION = 300;

export function createAutocompleteController(props: AutocompleteProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");

  const filteredItems = createMemo(() => {
    const q = searchQuery().toLowerCase();
    if (!q) return props.items;
    return props.items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q),
    );
  });

  const selectedItem = createMemo(() =>
    props.items.find((item) => item.id === props.value),
  );

  const handleOpen = () => {
    if (!props.disabled) {
      setIsVisible(true);
      requestAnimationFrame(() => setIsOpen(true));
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    setTimeout(() => setIsVisible(false), ANIMATION_DURATION);
  };
  const handleSelect = (id: string) => {
    props.onChange(id);
    handleClose();
  };

  return {
    state: { isOpen, isVisible, searchQuery, filteredItems, selectedItem },
    actions: { handleOpen, handleClose, setSearchQuery, handleSelect },
  };
}
