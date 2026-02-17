import { Chip } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const ChipStory: Component = () => {
  const propsReference = [
    { name: "label", type: "string", description: "Chip text content" },
    {
      name: "variant",
      type: '"filled" | "outlined"',
      default: '"filled"',
      description: "Visual style",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error"',
      default: '"primary"',
      description: "Color theme",
    },
    {
      name: "size",
      type: '"small" | "medium"',
      default: '"medium"',
      description: "Chip size",
    },
    { name: "icon", type: "JSX.Element", description: "Optional icon" },
    {
      name: "onDelete",
      type: "() => void",
      description: "Delete handler - shows delete button",
    },
    { name: "onClick", type: "() => void", description: "Click handler" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Chips",
      code: `<Chip label="Primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Success" color="success" />`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Chip label="Primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
        </div>
      ),
    },
    {
      title: "Outlined Chips",
      code: `<Chip label="Primary" variant="outlined" />
<Chip label="Error" variant="outlined" color="error" />`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Chip label="Primary" variant="outlined" />
          <Chip label="Error" variant="outlined" color="error" />
        </div>
      ),
    },
    {
      title: "With Delete",
      code: `<Chip label="Tag" onDelete={() => console.log('delete')} />`,
      render: <Chip label="Tag" onDelete={() => console.log("delete")} />,
    },
    {
      title: "Sizes",
      code: `<Chip label="Small" size="small" />
<Chip label="Medium" size="medium" />`,
      render: (
        <div class="flex flex-wrap items-center gap-2">
          <Chip label="Small" size="small" />
          <Chip label="Medium" size="medium" />
        </div>
      ),
    },
    {
      title: "Clickable",
      code: `<Chip label="Click me" onClick={() => console.log('clicked')} />`,
      render: <Chip label="Click me" onClick={() => console.log("clicked")} />,
    },
    {
      title: "All Colors",
      code: `<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Success" color="success" />
<Chip label="Warning" color="warning" />
<Chip label="Error" color="error" />`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Warning" color="warning" />
          <Chip label="Error" color="error" />
        </div>
      ),
    },
    {
      title: " Tag Input",
      code: `<div class="p-4 border rounded-lg max-w-sm">
  <label class="text-sm font-medium mb-2 block">Tags</label>
  <div class="flex flex-wrap gap-2 mb-2">
    <Chip label="React" onDelete={() => {}} />
    <Chip label="TypeScript" onDelete={() => {}} />
    <Chip label="Tailwind" onDelete={() => {}} />
  </div>
  <Input placeholder="Add a tag..." />
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <label class="text-sm font-medium mb-2 block">Tags</label>
          <div class="flex flex-wrap gap-2 mb-2">
            <Chip label="React" onDelete={() => {}} />
            <Chip label="TypeScript" onDelete={() => {}} />
            <Chip label="Tailwind" onDelete={() => {}} />
          </div>
        </div>
      ),
    },
    {
      title: " Status Badges",
      code: `<div class="space-y-2">
  <div class="flex items-center gap-2">
    <span class="text-sm">Order #12345</span>
    <Chip label="Processing" color="primary" size="small" />
  </div>
  <div class="flex items-center gap-2">
    <span class="text-sm">Order #12346</span>
    <Chip label="Shipped" color="success" size="small" />
  </div>
  <div class="flex items-center gap-2">
    <span class="text-sm">Order #12347</span>
    <Chip label="Delayed" color="warning" size="small" />
  </div>
</div>`,
      render: (
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm">Order #12345</span>
            <Chip label="Processing" color="primary" size="small" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm">Order #12346</span>
            <Chip label="Shipped" color="success" size="small" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm">Order #12347</span>
            <Chip label="Delayed" color="warning" size="small" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Chip Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A compact element representing an input, attribute, or action.
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
