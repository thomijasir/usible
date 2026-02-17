import { Loader, Button } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const LoaderStory: Component = () => {
  const propsReference = [
    {
      name: "size",
      type: '"small" | "medium" | "large"',
      default: '"medium"',
      description: "Loader size",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "white" | "current"',
      default: '"primary"',
      description: "Loader color",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Loader Sizes",
      code: `<Loader size="small" />
<Loader size="medium" />
<Loader size="large" />`,
      render: (
        <div class="flex items-center gap-4">
          <Loader size="small" />
          <Loader size="medium" />
          <Loader size="large" />
        </div>
      ),
    },
    {
      title: "Loader Colors",
      code: `<Loader color="primary" />
<Loader color="secondary" />
<Loader color="white" />`,
      render: (
        <div class="flex items-center gap-4">
          <Loader color="primary" />
          <Loader color="secondary" />
          <div class="bg-gray-800 p-2 rounded">
            <Loader color="white" />
          </div>
        </div>
      ),
    },
    {
      title: "Current Color",
      code: `<p class="text-blue-500"><Loader color="current" /> Loading...</p>`,
      render: (
        <p class="text-blue-500 flex items-center gap-2">
          <Loader color="current" size="small" /> Loading...
        </p>
      ),
    },
    {
      title: "Centered Loader",
      code: `<div class="flex justify-center items-center h-32">
  <Loader size="large" />
</div>`,
      render: (
        <div class="flex justify-center items-center h-32">
          <Loader size="large" />
        </div>
      ),
    },
    {
      title: " Button Loading",
      code: `<div class="flex gap-2">
  <Button loading>Processing...</Button>
  <Button>Submit</Button>
</div>`,
      render: (
        <div class="flex gap-2">
          <Button loading>Processing...</Button>
          <Button>Submit</Button>
        </div>
      ),
    },
    {
      title: " Card Loading",
      code: `<div class="p-4 border rounded-lg max-w-sm">
  <div class="flex items-center justify-center h-24">
    <div class="text-center">
      <Loader size="medium" />
      <p class="text-sm text-gray-500 mt-2">Loading data...</p>
    </div>
  </div>
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <div class="flex items-center justify-center h-24">
            <div class="text-center">
              <Loader size="medium" />
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Loading data...
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Loader Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A loading spinner component.
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
