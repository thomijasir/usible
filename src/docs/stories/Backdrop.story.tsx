import { Backdrop, Loader } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, Show, type Component, createSignal } from "solid-js";

export const BackdropStory: Component = () => {
  const [basicOpen, setBasicOpen] = createSignal(false);
  const [customOpen, setCustomOpen] = createSignal(false);
  const [higherOpen, setHigherOpen] = createSignal(false);
  const [interactiveOpen, setInteractiveOpen] = createSignal(false);
  const [loadingOpen, setLoadingOpen] = createSignal(false);

  const propsReference = [
    { name: "isOpen", type: "boolean", description: "Visibility state" },
    { name: "onClick", type: "() => void", description: "Click handler" },
    {
      name: "opacity",
      type: "number",
      default: "0.5",
      description: "Backdrop opacity (0-1)",
    },
  ];
  const example = [
    {
      title: "Basic Backdrop",
      code: `<Button onClick={() => setBasicOpen(true)}>Show Backdrop</Button>
<Backdrop isOpen={basicOpen()} onClick={() => setBasicOpen(false)} />`,
      render: (
        <div class="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div class="p-4">Content behind backdrop</div>
          <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setBasicOpen(true)}>
            Show Backdrop
          </button>
          <Backdrop isOpen={basicOpen()} onClick={() => setBasicOpen(false)} />
        </div>
      ),
    },
    {
      title: "Custom Opacity",
      code: `<Button onClick={() => setCustomOpen(true)}>Show Backdrop</Button>
<Backdrop isOpen={customOpen()} opacity={0.8} onClick={() => setCustomOpen(false)} />`,
      render: (
        <div class="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div class="p-4">Content behind backdrop</div>
          <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setCustomOpen(true)}>
            Show Backdrop
          </button>
          <Backdrop
            isOpen={customOpen()}
            opacity={0.8}
            onClick={() => setCustomOpen(false)}
          />
        </div>
      ),
    },
    {
      title: "Higher Opacity",
      code: `<Button onClick={() => setHigherOpen(true)}>Show Backdrop</Button>
<Backdrop isOpen={higherOpen()} opacity={0.9} onClick={() => setHigherOpen(false)} />`,
      render: (
        <div class="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div class="p-4">Content behind backdrop</div>
          <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setHigherOpen(true)}>
            Show Backdrop
          </button>
          <Backdrop
            isOpen={higherOpen()}
            opacity={0.9}
            onClick={() => setHigherOpen(false)}
          />
        </div>
      ),
    },
    {
      title: "Interactive Demo",
      code: `<Button onClick={() => setInteractiveOpen(true)}>Show Backdrop</Button>
<Backdrop isOpen={interactiveOpen()} onClick={() => setInteractiveOpen(false)} />`,
      render: (
        <div class="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setInteractiveOpen(true)}>
            Toggle Backdrop
          </button>
          <Backdrop
            isOpen={interactiveOpen()}
            onClick={() => setInteractiveOpen(false)}
          />
        </div>
      ),
    },
    {
      title: "Loading Overlay",
      code: `<Button onClick={() => setLoadingOpen(true)}>Show Loading</Button>
<div class="relative p-4 border rounded-lg">
  <div class="space-y-2">
    <p class="font-medium">Processing your order...</p>
    <p class="text-sm text-gray-500">Please wait while we confirm your payment.</p>
  </div>
  <Backdrop isOpen={loadingOpen()} opacity={0.7} onClick={() => setLoadingOpen(false)} />
  <Show when={loadingOpen()}>
    <div class="absolute inset-0 flex items-center justify-center z-50">
      <Loader size="large" color="white" />
    </div>
  </Show>
</div>`,
      render: (
        <div class="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded mb-4"
            onClick={() => setLoadingOpen(true)}>
            Show Loading
          </button>
          <div class="space-y-2">
            <p class="font-medium">Processing your order...</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Please wait while we confirm your payment.
            </p>
          </div>
          <Backdrop isOpen={loadingOpen()} opacity={0.7} onClick={() => setLoadingOpen(false)} />
          <Show when={loadingOpen()}>
            <div class="absolute inset-0 flex items-center justify-center z-50">
              <Loader size="large" color="white" />
            </div>
          </Show>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Backdrop Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A semi-transparent overlay for modal behaviors.
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
