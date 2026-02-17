import { Checkbox } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const CheckboxStory: Component = () => {
  const [checked, setChecked] = createSignal(false);
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
      description: "Checkbox label",
    },
    {
      name: "size",
      type: '"small" | "medium" | "large"',
      default: '"medium"',
      description: "Checkbox size",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disable the checkbox",
    },
    {
      name: "error",
      type: "boolean | string",
      description: "Error state or message",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Checkbox",
      code: `<Checkbox label="Accept terms" />`,
      render: <Checkbox label="Accept terms" />,
    },
    {
      title: "Sizes",
      code: `<Checkbox size="small" label="Small" />
<Checkbox size="medium" label="Medium" />
<Checkbox size="large" label="Large" />`,
      render: (
        <div class="flex flex-col gap-2">
          <Checkbox size="small" label="Small" />
          <Checkbox size="medium" label="Medium" />
          <Checkbox size="large" label="Large" />
        </div>
      ),
    },
    {
      title: "With Error",
      code: `<Checkbox label="Must accept terms" error />`,
      render: <Checkbox label="Must accept terms" error />,
    },
    {
      title: "Disabled",
      code: `<Checkbox label="Disabled checkbox" disabled />`,
      render: <Checkbox label="Disabled checkbox" disabled />,
    },
    {
      title: "Controlled",
      code: `<Checkbox label="Toggle me" checked={checked()} onChange={setChecked} />`,
      render: (
        <Checkbox label="Toggle me" checked={checked()} onChange={setChecked} />
      ),
    },
    {
      title: " Terms Agreement",
      code: `<div class="space-y-3 p-4 border rounded-lg max-w-sm">
  <h3 class="font-semibold">Create Account</h3>
  <Checkbox label="I agree to the Terms of Service" />
  <Checkbox label="I want to receive marketing emails" />
  <Checkbox label="I agree to the Privacy Policy" error />
  <Button block>Continue</Button>
</div>`,
      render: (
        <div class="space-y-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <h3 class="font-semibold">Create Account</h3>
          <Checkbox label="I agree to the Terms of Service" />
          <Checkbox label="I want to receive marketing emails" />
          <Checkbox label="I agree to the Privacy Policy" error />
        </div>
      ),
    },
    {
      title: " Filter Options",
      code: `<div class="space-y-2 p-4 border rounded-lg max-w-xs">
  <h4 class="font-medium text-sm mb-3">Filter by Status</h4>
  <Checkbox size="small" label="Active" />
  <Checkbox size="small" label="Pending" />
  <Checkbox size="small" label="Completed" />
  <Checkbox size="small" label="Cancelled" />
</div>`,
      render: (
        <div class="space-y-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-xs">
          <h4 class="font-medium text-sm mb-3">Filter by Status</h4>
          <Checkbox size="small" label="Active" />
          <Checkbox size="small" label="Pending" />
          <Checkbox size="small" label="Completed" />
          <Checkbox size="small" label="Cancelled" />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Checkbox Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A checkbox input with label support and customizable sizes.
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
