import { useParams } from "@solidjs/router";
import { createMemo, Show, type Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { DocsLayout } from "../layouts";
import * as storyList from "../stories";
import { stripAndKebabCase } from "../../utils";

export function StoriesPage() {
  const params = useParams<{ name: string }>();

  const doc = createMemo<Component | undefined>(() => {
    const paramName = params.name.toLowerCase(); // e.g., "main-component"

    const key = Object.keys(storyList).find(
      (k) => stripAndKebabCase(k) === paramName,
    );
    if (key) {
      return (storyList as Record<string, Component>)[key];
    }
    return undefined;
  });

  return (
    <Show when={doc()} fallback={<NotFound name={params.name} />}>
      {(ResolveComponent) => (
        <DocsLayout>
          <Dynamic component={ResolveComponent()} />
        </DocsLayout>
      )}
    </Show>
  );
}

function NotFound(props: { name: string }) {
  return (
    <DocsLayout>
      <div class="text-center py-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Component Not Found
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          "{props.name}" doesn't have documentation yet.
        </p>
      </div>
    </DocsLayout>
  );
}
