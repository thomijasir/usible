import { Show, For } from "solid-js";
import { Portal } from "solid-js/web";
import { twMerge } from "tailwind-merge";
import { createAutocompleteController } from "./Autocomplete.controller";
import type { AutocompleteProps } from "./Autocomplete.interface";
import { Input } from "../Input";
import { Text } from "../Text";
import { TextHighlight } from "../TextHighlight";
import { Button } from "../Button";
import { ChevronDownIcon, SearchIcon } from "~/assets/icons";

export function Autocomplete(props: AutocompleteProps) {
  const { state, actions } = createAutocompleteController(props);

  return (
    <>
      <div
        onClick={actions.handleOpen}
        class={twMerge("cursor-pointer", props.class)}>
        <Input
          id={props.id}
          label={props.label}
          placeholder={props.placeholder}
          value={state.selectedItem()?.label ?? ""}
          disabled={props.disabled}
          error={props.error}
          helperText={props.helperText}
          endAdornment={
            <ChevronDownIcon class="w-5 h-5 text-foreground-subtle" />
          }
        />
      </div>

      <Show when={state.isVisible()}>
        <Portal>
          <div
            class={twMerge(
              "fixed inset-0 z-999 bg-surface flex flex-col",
              "transition-all duration-300 ease-out",
              state.isOpen()
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0",
            )}>
            <div class="flex-none bg-surface">
              <div class="flex items-center px-4 pt-4 pb-4">
                <div class="flex-1 flex items-center">
                  <Input
                    placeholder="Search..."
                    size="medium"
                    value={state.searchQuery()}
                    onInput={actions.setSearchQuery}
                    startAdornment={
                      <SearchIcon class="w-5 h-5 text-foreground-subtle" />
                    }
                    fullWidth
                  />
                  <Button variant="text" onClick={actions.handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto overscroll-contain">
              <div class="min-h-full">
                <Show
                  when={state.filteredItems().length > 0}
                  fallback={
                    <div class="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <Text variant="body1" color="ternary">
                        No results found for "{state.searchQuery()}"
                      </Text>
                    </div>
                  }>
                  <div class="flex flex-col">
                    <For each={state.filteredItems()}>
                      {(item) => (
                        <button
                          type="button"
                          onClick={() => actions.handleSelect(item.id)}
                          class="flex items-center gap-3 p-4 text-left border-b border-border-muted last:border-0 active:bg-surface-hover transition-all duration-200">
                          <Show when={item.iconLeft}>
                            <div class="text-foreground-muted shrink-0">
                              {item.iconLeft}
                            </div>
                          </Show>
                          <div class="flex-1 min-w-0">
                            <Text
                              variant="body1"
                              class="font-medium truncate block">
                              <TextHighlight
                                highlight={state.searchQuery()}
                                color="primary">
                                {item.label}
                              </TextHighlight>
                            </Text>
                            <Show when={item.description}>
                              <Text
                                variant="caption"
                                color="ternary"
                                class="truncate block mt-0.5">
                                {item.description}
                              </Text>
                            </Show>
                          </div>
                          <Show when={item.iconRight}>
                            <div class="text-foreground-muted shrink-0">
                              {item.iconRight}
                            </div>
                          </Show>
                        </button>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
}
