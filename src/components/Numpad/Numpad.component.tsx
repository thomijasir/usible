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
        "flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none",
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
        container: "bg-gray-900 text-white",
        key: "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white",
        specialKey: "text-white hover:bg-gray-700 active:bg-gray-600",
      };
    }
    return {
      container: "bg-white text-gray-900",
      key: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 shadow-sm",
      specialKey: "text-gray-900 hover:bg-gray-100 active:bg-gray-200",
    };
  };

  return (
    <div
      class={twMerge(
        "flex flex-col items-center gap-6 rounded-xl max-w-xs mx-auto p-6",
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
