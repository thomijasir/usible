import { Card } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const CardStory: Component = () => {
  const propsReference = [
    { name: "children", type: "JSX.Element", description: "Card content" },
    {
      name: "variant",
      type: '"elevated" | "outlined" | "filled"',
      default: '"elevated"',
      description: "Visual style variant",
    },
    {
      name: "onClick",
      type: "() => void",
      description:
        "Click handler — adds a press scale effect and cursor-pointer",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];

  const example = [
    {
      title: "Elevated (default)",
      code: `<Card>
  <div class="p-4">Elevated card with shadow and border</div>
</Card>`,
      render: (
        <Card>
          <div class="p-4">Elevated card with shadow and border</div>
        </Card>
      ),
    },
    {
      title: "Outlined",
      code: `<Card variant="outlined">
  <div class="p-4">Outlined card with border, no background</div>
</Card>`,
      render: (
        <Card variant="outlined">
          <div class="p-4">Outlined card with border, no background</div>
        </Card>
      ),
    },
    {
      title: "Filled",
      code: `<Card variant="filled">
  <div class="p-4">Filled card with gray background</div>
</Card>`,
      render: (
        <Card variant="filled">
          <div class="p-4">Filled card with gray background</div>
        </Card>
      ),
    },
    {
      title: "Clickable Card",
      code: `<Card onClick={() => console.log("clicked")}>
  <div class="p-4">Press and release to see the scale effect</div>
</Card>`,
      render: (
        <Card onClick={() => {}}>
          <div class="p-4">Press and release to see the scale effect</div>
        </Card>
      ),
    },
    {
      title: " Profile Card",
      code: `<Card class="max-w-sm">
  <div class="p-6">
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">JD</div>
      <div>
        <p class="font-semibold text-gray-900">Jane Doe</p>
        <p class="text-sm text-gray-500">Product Designer</p>
      </div>
    </div>
    <p class="text-sm text-gray-600">Creating digital experiences people love to use every day.</p>
  </div>
</Card>`,
      render: (
        <Card class="max-w-sm">
          <div class="p-6">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                JD
              </div>
              <div>
                <p class="font-semibold text-gray-900">Jane Doe</p>
                <p class="text-sm text-gray-500">Product Designer</p>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              Creating digital experiences people love to use every day.
            </p>
          </div>
        </Card>
      ),
    },
    {
      title: " Stats Dashboard",
      code: `<div class="grid grid-cols-3 gap-4 max-w-lg">
  <Card variant="filled">
    <div class="p-4 text-center">
      <p class="text-2xl font-bold text-gray-900">128</p>
      <p class="text-xs text-gray-500 mt-1">Orders</p>
    </div>
  </Card>
  <Card variant="filled">
    <div class="p-4 text-center">
      <p class="text-2xl font-bold text-primary">4.8</p>
      <p class="text-xs text-gray-500 mt-1">Rating</p>
    </div>
  </Card>
  <Card variant="filled">
    <div class="p-4 text-center">
      <p class="text-2xl font-bold text-gray-900">12</p>
      <p class="text-xs text-gray-500 mt-1">Reviews</p>
    </div>
  </Card>
</div>`,
      render: (
        <div class="grid grid-cols-3 gap-4 max-w-lg">
          <Card variant="filled">
            <div class="p-4 text-center">
              <p class="text-2xl font-bold text-gray-900">128</p>
              <p class="text-xs text-gray-500 mt-1">Orders</p>
            </div>
          </Card>
          <Card variant="filled">
            <div class="p-4 text-center">
              <p class="text-2xl font-bold text-primary">4.8</p>
              <p class="text-xs text-gray-500 mt-1">Rating</p>
            </div>
          </Card>
          <Card variant="filled">
            <div class="p-4 text-center">
              <p class="text-2xl font-bold text-gray-900">12</p>
              <p class="text-xs text-gray-500 mt-1">Reviews</p>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Card Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A flexible container component with elevated, outlined, and filled
          variants and optional interactivity.
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
