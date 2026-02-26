import { createSignal, createMemo } from "solid-js";
import type { AutocompleteProps } from "./Autocomplete.interface";

export function createAutocompleteController(props: AutocompleteProps) {
  const [isOpen, setIsOpen] = createSignal(false);
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
    if (!props.disabled) setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };
  const handleSelect = (id: string) => {
    props.onChange(id);
    handleClose();
  };

  return {
    state: { isOpen, searchQuery, filteredItems, selectedItem },
    actions: { handleOpen, handleClose, setSearchQuery, handleSelect },
  };
}
