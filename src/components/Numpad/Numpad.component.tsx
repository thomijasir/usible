import { For, type JSX } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { NumpadProps } from "./Numpad.interface";
import { FingerprintIcon, BackspaceIcon } from "~/assets/icons";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function KeyButton(props: {
  children: JSX.Element;
  onClick?: () => void;
  class?: string;
  baseClassName: string;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      class={twMerge(
        "flex h-16 w-16 items-center justify-center rounded-usible-pill text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none",
        props.baseClassName,
        props.class,
      )}>
      {props.children}
    </button>
  );
}

export function Numpad(props: NumpadProps) {
  const theme = () => props.theme ?? "light";

  const themeClasses = () => {
    if (theme() === "dark") {
      return {
        container: "bg-foreground text-inverse",
        key: "bg-surface-subtle hover:bg-surface-hover active:bg-surface-active text-foreground shadow-usible-sm",
        specialKey:
          "text-inverse hover:bg-surface-subtle/20 active:bg-surface-subtle/30",
      };
    }
    return {
      container: "bg-surface text-foreground",
      key: "bg-surface-muted hover:bg-surface-hover active:bg-surface-active text-foreground shadow-usible-sm",
      specialKey:
        "text-foreground hover:bg-surface-hover active:bg-surface-active",
    };
  };

  return (
    <div
      class={twMerge(
        "flex flex-col items-center gap-6 rounded-usible-lg max-w-xs mx-auto p-6",
        themeClasses().container,
        props.class,
      )}>
      <div class="grid grid-cols-3 gap-x-8 gap-y-6">
        <For each={keys}>
          {(key) => (
            <KeyButton
              onClick={() => props.onKeyPress?.(key)}
              baseClassName={themeClasses().key}>
              {key}
            </KeyButton>
          )}
        </For>

        <KeyButton
          onClick={props.onBiometricAuth}
          baseClassName={themeClasses().specialKey}
          class={!props.onBiometricAuth ? "opacity-0 pointer-events-none" : ""}>
          <FingerprintIcon class="w-8 h-8" />
        </KeyButton>

        <KeyButton
          onClick={() => props.onKeyPress?.("0")}
          baseClassName={themeClasses().key}>
          0
        </KeyButton>

        <KeyButton
          onClick={props.onBackspace}
          baseClassName={themeClasses().specialKey}>
          <BackspaceIcon class="w-8 h-8" />
        </KeyButton>
      </div>
    </div>
  );
}
