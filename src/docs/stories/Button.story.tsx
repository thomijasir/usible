import { Button } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const ButtonStory: Component = () => {
  const propsReference = [
    { name: "children", type: "JSX.Element", description: "Button content" },
    {
      name: "variant",
      type: '"filled" | "outlined" | "text" | "icon" | "iconOutline"',
      default: '"filled"',
      description: "Visual style variant",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error" | "transparent"',
      default: '"primary"',
      description: "Color theme",
    },
    {
      name: "size",
      type: '"small" | "medium" | "large"',
      default: '"medium"',
      description: "Button size",
    },
    { name: "block", type: "boolean", description: "Full width button" },
    { name: "disabled", type: "boolean", description: "Disable the button" },
    { name: "loading", type: "boolean", description: "Show loading spinner" },
    { name: "onClick", type: "() => void", description: "Click handler" },
    {
      name: "type",
      type: '"button" | "submit" | "reset"',
      default: '"button"',
      description: "Button type attribute",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Filled Buttons",
      code: `<Button>Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
        </div>
      ),
    },
    {
      title: "Outlined Buttons",
      code: `<Button variant="outlined">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Button variant="outlined">Primary</Button>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
        </div>
      ),
    },
    {
      title: "Text Buttons",
      code: `<Button variant="text">Primary</Button>
<Button variant="text" color="secondary">Secondary</Button>`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Button variant="text">Primary</Button>
          <Button variant="text" color="secondary">
            Secondary
          </Button>
        </div>
      ),
    },
    {
      title: "Icon Buttons",
      code: `<Button variant="icon">★</Button>
<Button variant="icon" color="secondary">★</Button>`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Button variant="icon">★</Button>
          <Button variant="icon" color="secondary">
            ★
          </Button>
        </div>
      ),
    },
    {
      title: "Icon Outline Buttons",
      code: `<Button variant="iconOutline">★</Button>
<Button variant="iconOutline" color="secondary">★</Button>`,
      render: (
        <div class="flex flex-wrap gap-2">
          <Button variant="iconOutline">★</Button>
          <Button variant="iconOutline" color="secondary">
            ★
          </Button>
        </div>
      ),
    },
    {
      title: "Button Sizes",
      code: `<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`,
      render: (
        <div class="flex flex-wrap items-center gap-2">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      ),
    },
    {
      title: "Loading State",
      code: `<Button loading>Loading</Button>`,
      render: <Button loading>Loading</Button>,
    },
    {
      title: "Disabled State",
      code: `<Button disabled>Disabled</Button>`,
      render: <Button disabled>Disabled</Button>,
    },
    {
      title: "Block Button",
      code: `<Button block>Full Width</Button>`,
      render: <Button block>Full Width</Button>,
    },
    {
      title: " Form Actions",
      code: `<div class="flex gap-2 justify-end">
  <Button variant="outlined">Cancel</Button>
  <Button type="submit">Save Changes</Button>
</div>`,
      render: (
        <div class="flex gap-2 justify-end">
          <Button variant="outlined">Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      ),
    },
    {
      title: " Card Actions",
      code: `<div class="p-4 border rounded-lg max-w-sm">
  <h3 class="font-semibold mb-2">Delete Account</h3>
  <p class="text-gray-500 text-sm mb-4">This action is permanent and cannot be undone.</p>
  <div class="flex gap-2">
    <Button variant="outlined" size="small">Keep Account</Button>
    <Button color="error" size="small">Delete</Button>
  </div>
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <h3 class="font-semibold mb-2">Delete Account</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
            This action is permanent and cannot be undone.
          </p>
          <div class="flex gap-2">
            <Button variant="outlined" size="small">
              Keep Account
            </Button>
            <Button color="error" size="small">
              Delete
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Button Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A versatile button component with multiple variants, colors, and
          sizes.
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
