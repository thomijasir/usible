import { Input } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const InputStory: Component = () => {
  const propsReference = [
    { name: "value", type: "string", description: "Input value" },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Value change handler",
    },
    { name: "placeholder", type: "string", description: "Placeholder text" },
    { name: "label", type: "string", description: "Input label" },
    {
      name: "type",
      type: '"text" | "password" | "email" | "number"',
      default: '"text"',
      description: "Input type",
    },
    { name: "disabled", type: "boolean", description: "Disable the input" },
    {
      name: "error",
      type: "string",
      description: "Error message to display",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Input",
      code: `<Input placeholder="Enter text..." />`,
      render: <Input placeholder="Enter text..." />,
    },
    {
      title: "With Label",
      code: `<Input label="Email" placeholder="you@example.com" />`,
      render: <Input label="Email" placeholder="you@example.com" />,
    },
    {
      title: "With Error",
      code: `<Input label="Password" type="password" error="Password is required" />`,
      render: (
        <Input label="Password" type="password" error="Password is required" />
      ),
    },
    {
      title: "Disabled Input",
      code: `<Input label="Disabled" placeholder="Cannot edit" disabled />`,
      render: <Input label="Disabled" placeholder="Cannot edit" disabled />,
    },
    {
      title: "Email Input",
      code: `<Input label="Email Address" type="email" placeholder="you@example.com" />`,
      render: (
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
        />
      ),
    },
    {
      title: " Login Form",
      code: `<div class="space-y-4 max-w-sm">
  <Input label="Email" type="email" placeholder="you@example.com" />
  <Input label="Password" type="password" placeholder="••••••••" />
  <Button block>Sign In</Button>
</div>`,
      render: (
        <div class="space-y-4 max-w-sm">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
        </div>
      ),
    },
    {
      title: " Form with Validation",
      code: `<div class="space-y-4 max-w-sm">
  <Input label="Full Name" placeholder="John Doe" />
  <Input label="Email" type="email" placeholder="john@example.com" error="Invalid email format" />
  <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
</div>`,
      render: (
        <div class="space-y-4 max-w-sm">
          <Input label="Full Name" placeholder="John Doe" />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            error="Invalid email format"
          />
          <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Input Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A text input field with support for labels, placeholders, and
          validation states.
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
