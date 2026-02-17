import type { JSX, Component } from "solid-js";
import { createSignal, Show } from "solid-js";
import { CodeBlock } from "./CodeBlock";

interface ComponentPreviewProps {
  code: string;
  children: JSX.Element;
  title: string;
}

export const ComponentPreview: Component<ComponentPreviewProps> = (
  props: ComponentPreviewProps,
) => {
  const [showCode, setShowCode] = createSignal(false);

  return (
    <div class="my-6 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {props.title || "Preview"}
        </span>
        <Show when={props.code}>
          <button
            type="button"
            onClick={() => setShowCode(!showCode())}
            class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            {showCode() ? "Hide code" : "Show code"}
          </button>
        </Show>
      </div>

      <div class="p-6 bg-white dark:bg-gray-900 flex items-center justify-center min-h-30">
        {props.children}
      </div>

      <Show when={props.code && showCode()}>
        <div class="border-t border-gray-200 dark:border-gray-700">
          <CodeBlock code={props.code} />
        </div>
      </Show>
    </div>
  );
};
