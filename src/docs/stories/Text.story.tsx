import { Text } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const TextStory: Component = () => {
  const propsReference = [
    { name: "children", type: "JSX.Element", description: "Text content" },
    {
      name: "variant",
      type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption"',
      default: '"body1"',
      description: "Typography variant",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Text",
      code: `<Text>Basic Text</Text>`,
      render: <Text class="dark:text-gray-300">Basic Text</Text>,
    },

    {
      title: "Headings",
      code: `<Text variant="h1">Heading 1</Text><Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>`,
      render: (
        <div class="flex flex-col gap-2">
          <Text variant="h1" class="dark:text-gray-300">
            Heading 1
          </Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
        </div>
      ),
    },
    {
      title: "Body Text",
      code: `<Text variant="body1">Body 1 text</Text>
<Text variant="body2">Body 2 text</Text>
<Text variant="caption">Caption text</Text>`,
      render: (
        <div class="flex flex-col gap-2">
          <Text variant="body1">Body 1 text</Text>
          <Text variant="body2">Body 2 text</Text>
          <Text variant="caption">Caption text</Text>
        </div>
      ),
    },
    {
      title: "Text Colors",
      code: `<Text class="text-blue-600 dark:text-blue-400">Primary Color</Text>
<Text class="text-red-600 dark:text-red-400">Error Color</Text>
<Text class="text-green-600 dark:text-green-400">Success Color</Text>
<Text class="text-gray-500 dark:text-gray-400">Muted Color</Text>`,
      render: (
        <div class="flex flex-col gap-2">
          <Text class="text-blue-600 dark:text-blue-400">Primary Color</Text>
          <Text class="text-red-600 dark:text-red-400">Error Color</Text>
          <Text class="text-green-600 dark:text-green-400">Success Color</Text>
          <Text class="text-gray-500 dark:text-gray-400">Muted Color</Text>
        </div>
      ),
    },
    {
      title: "Info Card",
      code: `<div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
  <Text variant="h6" class="mb-1">Order Summary</Text>
  <Text variant="body2" class="text-gray-600 dark:text-gray-300 mb-3">
    Your order has been shipped and is on its way to you.
  </Text>
  <Text variant="caption" class="text-gray-500">
    Tracking ID: #123456789
  </Text>
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <Text variant="h6" class="mb-1">
            Order Summary
          </Text>
          <Text variant="body2" class="text-gray-600 dark:text-gray-300 mb-3">
            Your order has been shipped and is on its way to you.
          </Text>
          <Text variant="caption" class="text-gray-500">
            Tracking ID: #123456789
          </Text>
        </div>
      ),
    },
    {
      title: "Page Header",
      code: `<div class="border-b border-gray-200 dark:border-gray-700 pb-4">
  <Text variant="h3" class="mb-2">Dashboard</Text>
  <Text variant="subtitle1" class="text-gray-500 dark:text-gray-400">
    Welcome back, here is what's happening with your projects today.
  </Text>
</div>`,
      render: (
        <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
          <Text variant="h3" class="mb-2">
            Dashboard
          </Text>
          <Text variant="subtitle1" class="text-gray-500 dark:text-gray-400">
            Welcome back, here is what's happening with your projects today.
          </Text>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Text Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          The Text component provides a flexible way to render text with
          consistent styling across your application.
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
