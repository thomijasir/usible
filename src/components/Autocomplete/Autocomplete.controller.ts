import { createSignal, createMemo, onCleanup } from "solid-js";
import type { AutocompleteProps } from "./Autocomplete.interface";

const ANIMATION_DURATION = 300;

export function createAutocompleteController(props: AutocompleteProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");
  let closeTimeout: ReturnType<typeof setTimeout> | undefined;
  let openFrame: number | undefined;

  const clearPendingTransitions = () => {
    if (closeTimeout !== undefined) {
      clearTimeout(closeTimeout);
      closeTimeout = undefined;
    }
    if (openFrame !== undefined) {
      cancelAnimationFrame(openFrame);
      openFrame = undefined;
    }
  };

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
      clearPendingTransitions();
      setIsVisible(true);
      openFrame = requestAnimationFrame(() => {
        openFrame = undefined;
        setIsOpen(true);
      });
    }
  };
  const handleClose = () => {
    clearPendingTransitions();
    setIsOpen(false);
    setSearchQuery("");
    closeTimeout = setTimeout(() => {
      closeTimeout = undefined;
      setIsVisible(false);
    }, ANIMATION_DURATION);
  };
  const handleSelect = (id: string) => {
    props.onChange(id);
    handleClose();
  };

  onCleanup(clearPendingTransitions);

  return {
    state: { isOpen, isVisible, searchQuery, filteredItems, selectedItem },
    actions: { handleOpen, handleClose, setSearchQuery, handleSelect },
  };
}
