import { useState, useMemo } from "react";
import { AutocompleteProps } from "./Autocomplete.interface";

export const useAutocompleteController = (props: AutocompleteProps) => {
  const { items, onChange, value, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const lowerQuery = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery),
    );
  }, [items, searchQuery]);

  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === value);
  }, [items, value]);

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelect = (id: string) => {
    onChange(id);
    handleClose();
  };

  return {
    state: {
      isOpen,
      searchQuery,
      filteredItems,
      selectedItem,
    },
    actions: {
      handleOpen,
      handleClose,
      handleSearchChange,
      handleSelect,
    },
  };
};
