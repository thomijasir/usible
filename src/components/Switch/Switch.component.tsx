import { createUniqueId, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { SwitchProps } from "./Switch.interface";
import { Text } from "../Text";

export function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "checked",
    "onChange",
    "label",
    "id",
    "disabled",
  ]);
  const fallbackId = createUniqueId();
  const id = () => local.id ?? fallbackId;

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!local.disabled) {
      local.onChange?.(target.checked);
    }
  };

  return (
    <div class={twMerge("flex items-center justify-between", local.class)}>
      {local.label && (
        <label
          for={id()}
          class={twMerge(
            "mr-3 select-none flex-1",
            local.disabled
              ? "cursor-not-allowed text-foreground-disabled"
              : "cursor-pointer text-foreground",
          )}>
          <Text variant="body1">{local.label}</Text>
        </label>
      )}
      <div class="relative inline-block w-12 h-7">
        <input
          {...rest}
          type="checkbox"
          id={id()}
          checked={local.checked}
          onChange={handleChange}
          disabled={local.disabled}
          role="switch"
          aria-checked={local.checked}
          class="peer appearance-none w-full h-full rounded-usible-pill bg-surface-subtle transition-colors duration-300 checked:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        />
        <span class="absolute left-1 top-1 w-5 h-5 bg-surface rounded-usible-pill shadow-usible-sm transition-transform duration-300 peer-checked:translate-x-5 pointer-events-none" />
      </div>
    </div>
  );
}
