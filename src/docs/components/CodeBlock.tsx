import {
  type Component,
  createSignal,
  createResource,
  Suspense,
} from "solid-js";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const [highlightedCode] = createResource(
    () => ({ code: props.code, lang: props.language || "tsx" }),
    async ({ code, lang }) => {
      return await codeToHtml(code, {
        lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
    },
  );

  const copyCode = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class="relative group">
      <button
        type="button"
        onClick={copyCode}
        class="absolute right-2 top-2 z-10 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied() ? "Copied!" : "Copy"}
      </button>
      <div class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
        <Suspense
          fallback={
            <pre class="p-4 overflow-x-auto text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <code>{props.code}</code>
            </pre>
          }>
          <div
            class="p-4 overflow-x-auto text-sm bg-white dark:bg-[#0d1117] [&>pre]:bg-transparent! [&>pre]:m-0! [&>pre]:w-fit [&_span]:!bg-transparent"
            innerHTML={highlightedCode()}
          />
        </Suspense>
      </div>
    </div>
  );
};
