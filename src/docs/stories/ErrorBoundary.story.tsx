import { ErrorBoundary } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

const BrokenComponent: Component = () => {
  throw new Error(
    "TypeError: Cannot read properties of undefined (reading 'map')",
  );
};

export const ErrorBoundaryStory: Component = () => {
  const propsReference = [
    {
      name: "children",
      type: "JSX.Element",
      description:
        "Content to render — wrapped in an error boundary that catches runtime errors",
    },
  ];

  const example = [
    {
      title: "Wrapping Content (no error)",
      code: `<ErrorBoundary>
  <div class="p-4">This content renders normally when there are no errors.</div>
</ErrorBoundary>`,
      render: (
        <ErrorBoundary>
          <div class="p-4 border border-gray-200 rounded-lg text-gray-600">
            This content renders normally when there are no errors.
          </div>
        </ErrorBoundary>
      ),
    },
    {
      title: "Error Fallback UI",
      code: `// When a child component throws, the fallback UI is displayed:
<ErrorBoundary>
  <ComponentThatThrows />
</ErrorBoundary>`,
      render: (
        <ErrorBoundary>
          <BrokenComponent />
        </ErrorBoundary>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ErrorBoundary Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Wraps a component tree and catches runtime errors, displaying a
          full-screen fallback UI with the error message and a reload button.
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
