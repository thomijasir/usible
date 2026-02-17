import { Switch } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const SwitchStory: Component = () => {
  const [enabled, setEnabled] = createSignal(false);
  const propsReference = [
    { name: "checked", type: "boolean", description: "Checked state" },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Change handler",
    },
    {
      name: "label",
      type: "JSX.Element | string",
      description: "Switch label",
    },
    { name: "disabled", type: "boolean", description: "Disable the switch" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Switch",
      code: `<Switch label="Enable notifications" />`,
      render: <Switch label="Enable notifications" />,
    },
    {
      title: "Disabled",
      code: `<Switch label="Disabled" disabled />`,
      render: <Switch label="Disabled" disabled />,
    },
    {
      title: "Controlled",
      code: `<Switch label="Toggle me" checked={enabled()} onChange={setEnabled} />`,
      render: (
        <Switch label="Toggle me" checked={enabled()} onChange={setEnabled} />
      ),
    },
    {
      title: "Without Label",
      code: `<Switch />`,
      render: <Switch />,
    },
    {
      title: " Settings Panel",
      code: `<div class="space-y-4 p-4 border rounded-lg max-w-sm">
  <h3 class="font-semibold">Notifications</h3>
  <div class="flex justify-between items-center">
    <span class="text-sm">Email notifications</span>
    <Switch />
  </div>
  <div class="flex justify-between items-center">
    <span class="text-sm">Push notifications</span>
    <Switch />
  </div>
  <div class="flex justify-between items-center">
    <span class="text-sm">SMS alerts</span>
    <Switch disabled />
  </div>
</div>`,
      render: (
        <div class="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <h3 class="font-semibold">Notifications</h3>
          <div class="flex justify-between items-center">
            <span class="text-sm">Email notifications</span>
            <Switch />
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm">Push notifications</span>
            <Switch />
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm">SMS alerts</span>
            <Switch disabled />
          </div>
        </div>
      ),
    },
    {
      title: " Privacy Settings",
      code: `<div class="space-y-4 p-4 border rounded-lg max-w-sm">
  <h3 class="font-semibold">Privacy</h3>
  <Switch label="Public profile" />
  <Switch label="Show activity status" />
  <Switch label="Allow friend requests" />
</div>`,
      render: (
        <div class="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <h3 class="font-semibold">Privacy</h3>
          <Switch label="Public profile" />
          <Switch label="Show activity status" />
          <Switch label="Allow friend requests" />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Switch Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A toggle switch for boolean settings.
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
