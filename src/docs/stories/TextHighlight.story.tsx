import { TextHighlight } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const TextHighlightStory: Component = () => {
  const propsReference = [
    {
      name: "children",
      type: "string",
      description: "Text to search within",
    },
    { name: "highlight", type: "string", description: "Text to highlight" },
    {
      name: "color",
      type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error"',
      default: '"primary"',
      description: "Highlight color",
    },
  ];
  const example = [
    {
      title: "Basic Highlight",
      code: `<TextHighlight highlight="world">Hello world, welcome to the world</TextHighlight>`,
      render: (
        <TextHighlight highlight="world">
          Hello world, welcome to the world
        </TextHighlight>
      ),
    },
    {
      title: "Different Colors",
      code: `<TextHighlight highlight="important" color="error">This is important information</TextHighlight>
<TextHighlight highlight="success" color="success">This is a success message</TextHighlight>`,
      render: (
        <div class="flex flex-col gap-2">
          <TextHighlight highlight="important" color="error">
            This is important information
          </TextHighlight>
          <TextHighlight highlight="success" color="success">
            This is a success message
          </TextHighlight>
        </div>
      ),
    },
    {
      title: "Case Insensitive",
      code: `<TextHighlight highlight="solid">Solid.js is SOLID and solid for building UIs</TextHighlight>`,
      render: (
        <TextHighlight highlight="solid">
          Solid.js is SOLID and solid for building UIs
        </TextHighlight>
      ),
    },
    {
      title: "Search Result",
      code: `<TextHighlight highlight="react">Solid.js offers similar patterns to React but with different reactivity</TextHighlight>`,
      render: (
        <TextHighlight highlight="react">
          Solid.js offers similar patterns to React but with different
          reactivity
        </TextHighlight>
      ),
    },
    {
      title: " Search Results",
      code: `<div class="space-y-3 max-w-md">
  <div class="p-3 border rounded-lg">
    <h4 class="font-medium"><TextHighlight highlight="solid">Solid.js Documentation</TextHighlight></h4>
    <p class="text-sm text-gray-500"><TextHighlight highlight="solid">Solid</TextHighlight> is a reactive UI library...</p>
  </div>
  <div class="p-3 border rounded-lg">
    <h4 class="font-medium"><TextHighlight highlight="solid">Getting Started with Solid</TextHighlight></h4>
    <p class="text-sm text-gray-500">Learn how to build apps with <TextHighlight highlight="solid">Solid</TextHighlight>...</p>
  </div>
</div>`,
      render: (
        <div class="space-y-3 max-w-md">
          <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="font-medium">
              <TextHighlight highlight="solid">
                Solid.js Documentation
              </TextHighlight>
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <TextHighlight highlight="solid">Solid</TextHighlight> is a
              reactive UI library...
            </p>
          </div>
          <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="font-medium">
              <TextHighlight highlight="solid">
                Getting Started with Solid
              </TextHighlight>
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Learn how to build apps with{" "}
              <TextHighlight highlight="solid">Solid</TextHighlight>...
            </p>
          </div>
        </div>
      ),
    },
    {
      title: " Filter Highlight",
      code: `<div class="p-4 border rounded-lg max-w-sm">
  <Input placeholder="Search..." value="error" />
  <div class="mt-4 space-y-2">
    <TextHighlight highlight="error" color="error">TypeError: Cannot read property</TextHighlight>
    <TextHighlight highlight="error" color="error">ReferenceError: Variable not defined</TextHighlight>
    <TextHighlight highlight="error" color="error">SyntaxError: Unexpected token</TextHighlight>
  </div>
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <div class="mb-2 text-sm font-medium">Log Filter</div>
          <div class="mt-4 space-y-2">
            <TextHighlight highlight="error" color="error">
              TypeError: Cannot read property
            </TextHighlight>
            <TextHighlight highlight="error" color="error">
              ReferenceError: Variable not defined
            </TextHighlight>
            <TextHighlight highlight="error" color="error">
              SyntaxError: Unexpected token
            </TextHighlight>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          TextHighlight Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Highlights matching text within a string.
        </p>
      </div>

      <section>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Examples:
        </h2>
        <For each={example}>
          {(item) => (
            <ComponentPreview title={item.title} code={item.code}>
              {item.render}
            </ComponentPreview>
          )}
        </For>
      </section>

      <section>
        <PropsTable props={propsReference} />
      </section>
    </div>
  );
};
