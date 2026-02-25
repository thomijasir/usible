import { type Component, createSignal } from "solid-js";

interface CodeBlockProps {
  code: string;
  language?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightTSX(code: string): string {
  let result = "";
  let i = 0;
  let inTag = false;

  while (i < code.length) {
    if (!inTag) {
      if (code[i] === "<") {
        // Opening or closing tag — capture '<', optional '/', then tag name
        let j = i + 1;
        if (code[j] === "/") j++;
        while (j < code.length && /[\w.]/.test(code[j])) j++;
        result += `<span class="hl-tag">${escapeHtml(code.slice(i, j))}</span>`;
        i = j;
        inTag = true;
      } else if (code[i] === "{") {
        // JSX expression block
        let j = i + 1;
        let depth = 1;
        while (j < code.length && depth > 0) {
          if (code[j] === "{") depth++;
          else if (code[j] === "}") depth--;
          j++;
        }
        result += `<span class="hl-expr">${escapeHtml(code.slice(i, j))}</span>`;
        i = j;
      } else {
        // Plain text between tags
        let j = i;
        while (j < code.length && code[j] !== "<" && code[j] !== "{") j++;
        result += escapeHtml(code.slice(i, j));
        i = j;
      }
    } else {
      // Inside a tag — handle attrs, strings, expressions, closing punctuation
      if (code[i] === "/" && code[i + 1] === ">") {
        result += `<span class="hl-tag">/&gt;</span>`;
        i += 2;
        inTag = false;
      } else if (code[i] === ">") {
        result += `<span class="hl-tag">&gt;</span>`;
        i++;
        inTag = false;
      } else if (code[i] === '"') {
        // Quoted attribute value
        let j = i + 1;
        while (j < code.length && code[j] !== '"') {
          if (code[j] === "\\") j++;
          j++;
        }
        j++; // consume closing quote
        result += `<span class="hl-str">${escapeHtml(code.slice(i, j))}</span>`;
        i = j;
      } else if (code[i] === "{") {
        // Expression attribute value e.g. onClick={handler}
        let j = i + 1;
        let depth = 1;
        while (j < code.length && depth > 0) {
          if (code[j] === "{") depth++;
          else if (code[j] === "}") depth--;
          j++;
        }
        result += `<span class="hl-expr">${escapeHtml(code.slice(i, j))}</span>`;
        i = j;
      } else if (code[i] === "=") {
        result += "=";
        i++;
      } else if (/\s/.test(code[i])) {
        result += code[i]; // preserve whitespace/newlines as-is
        i++;
      } else if (/[\w-]/.test(code[i])) {
        // Attribute name
        let j = i;
        while (j < code.length && /[\w-:]/.test(code[j])) j++;
        result += `<span class="hl-attr">${escapeHtml(code.slice(i, j))}</span>`;
        i = j;
      } else {
        result += escapeHtml(code[i]);
        i++;
      }
    }
  }

  return result;
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [copied, setCopied] = createSignal(false);

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
        <pre class="p-4 overflow-x-auto text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <code innerHTML={highlightTSX(props.code)} />
        </pre>
      </div>
    </div>
  );
};
