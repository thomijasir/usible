import { useParams } from "@solidjs/router";
import { Show, For, createMemo, type JSX } from "solid-js";
import { DocsLayout } from "../../layout";
import { ComponentPreview, PropsTable } from "../../components";
import {
  componentDocs,
  componentList,
  type ComponentDoc,
} from "../../data/componentDocs";

export default function ComponentPage() {
  const params = useParams<{ name: string }>();

  const doc = createMemo(
    (): ComponentDoc | undefined => componentDocs[params.name.toLowerCase()],
  );
  const exists = createMemo(() => !!doc());

  return (
    <Show when={exists()} fallback={<NotFound name={params.name} />}>
      <DocsLayout>
        <div class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {doc()?.name}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">{doc()?.description}</p>
          </div>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Examples
            </h2>
            <For each={doc()?.examples}>
              {(example) => (
                <ComponentPreview title={example.title} code={example.code}>
                  <DynamicComponent component={doc()!.component} />
                </ComponentPreview>
              )}
            </For>
          </section>

          <section>
            <PropsTable props={doc()?.props || []} />
          </section>
        </div>
      </DocsLayout>
    </Show>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DynamicComponent(props: { component: (p: any) => JSX.Element }) {
  return <>{props.component({})}</>;
}
