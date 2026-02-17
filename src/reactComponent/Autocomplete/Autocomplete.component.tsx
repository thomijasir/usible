import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAutocompleteController } from "./Autocomplete.controller";
import type { AutocompleteProps } from "./Autocomplete.interface";
import { Input } from "../Input";
import { Text } from "../Text";
import { TextHighlight } from "../TextHighlight";
import { ChevronDownIcon, SearchIcon } from "~/assets/icons";
import Button from "../Button";

export const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const { actions, state } = useAutocompleteController(props);
  const { label, placeholder, disabled, error, helperText, className, id } =
    props;
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <>
      <div
        onClick={actions.handleOpen}
        className={`${className} cursor-pointer`}>
        <Input
          id={id}
          label={label}
          placeholder={placeholder}
          value={state.selectedItem?.label || ""}
          readOnly
          disabled={disabled}
          error={error}
          helperText={helperText}
          endAdornment={<ChevronDownIcon className="w-5 h-5 text-gray-400" />}
        />
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {state.isOpen && (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-9999 bg-white flex flex-col">
                <div
                  className={`pt-safe pb-4 flex-none bg-white z-10 transition-all duration-200 ${
                    isScrolled ? "shadow-sm border-b border-gray-100" : ""
                  }`}>
                  <div className="flex items-center px-4 pt-4">
                    <div className="flex-1 flex items-center">
                      <Input
                        placeholder="Search..."
                        size="medium"
                        value={state.searchQuery}
                        onChange={actions.handleSearchChange}
                        startAdornment={
                          <SearchIcon className="w-5 h-5 text-gray-400" />
                        }
                        fullWidth
                      />
                      <Button variant="text" onClick={actions.handleClose}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className="pb-safe flex-1 overflow-y-auto overscroll-contain"
                  onScroll={(e) =>
                    setIsScrolled(e.currentTarget.scrollTop > 0)
                  }>
                  <div className="min-h-full">
                    {state.filteredItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                        <Text variant="body1" color="ternary">
                          No results found for "{state.searchQuery}"
                        </Text>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {state.filteredItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => actions.handleSelect(item.id)}
                            className="flex items-center gap-3 p-4 text-left border-b border-gray-50 last:border-0 active:bg-gray-50 transition-all duration-200">
                            {item.iconLeft && (
                              <div className="text-gray-500 shrink-0">
                                {item.iconLeft}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <TextHighlight
                                highlight={state.searchQuery}
                                color="primary">
                                <Text
                                  variant="body1"
                                  className="font-medium truncate block">
                                  {item.label}
                                </Text>
                              </TextHighlight>

                              {item.description && (
                                <Text
                                  variant="caption"
                                  color="ternary"
                                  className="truncate block mt-0.5">
                                  {item.description}
                                </Text>
                              )}
                            </div>
                            {item.iconRight && (
                              <div className="text-gray-500 shrink-0">
                                {item.iconRight}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};
