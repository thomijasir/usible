import { TextArea, Input } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const TextAreaStory: Component = () => {
  const propsReference = [
    { name: "value", type: "string", description: "TextArea value" },
    {
      name: "onInput",
      type: "(value: string) => void",
      description: "Input handler",
    },
    { name: "placeholder", type: "string", description: "Placeholder text" },
    { name: "label", type: "string", description: "TextArea label" },
    { name: "rows", type: "number", description: "Number of rows" },
    {
      name: "disabled",
      type: "boolean",
      description: "Disable the textarea",
    },
    {
      name: "error",
      type: "string | boolean",
      description: "Error state or message",
    },
    { name: "fullWidth", type: "boolean", description: "Full width mode" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic TextArea",
      code: `<TextArea placeholder="Enter your message..." rows={4} />`,
      render: <TextArea placeholder="Enter your message..." rows={4} />,
    },
    {
      title: "With Label",
      code: `<TextArea label="Description" placeholder="Describe your issue..." />`,
      render: (
        <TextArea label="Description" placeholder="Describe your issue..." />
      ),
    },
    {
      title: "With Error",
      code: `<TextArea label="Message" error="Message is required" />`,
      render: <TextArea label="Message" error="Message is required" />,
    },
    {
      title: "Disabled",
      code: `<TextArea label="Disabled" placeholder="Cannot edit" disabled />`,
      render: <TextArea label="Disabled" placeholder="Cannot edit" disabled />,
    },
    {
      title: "Full Width",
      code: `<TextArea label="Notes" fullWidth rows={3} />`,
      render: <TextArea label="Notes" fullWidth rows={3} />,
    },
    {
      title: " Contact Form",
      code: `<div class="space-y-4 max-w-md">
  <Input label="Subject" placeholder="What's this about?" />
  <TextArea label="Message" placeholder="Describe your issue or question..." rows={5} />
  <Button block>Send Message</Button>
</div>`,
      render: (
        <div class="space-y-4 max-w-md">
          <Input label="Subject" placeholder="What's this about?" />
          <TextArea
            label="Message"
            placeholder="Describe your issue or question..."
            rows={5}
          />
        </div>
      ),
    },
    {
      title: " Feedback Form",
      code: `<div class="p-4 border rounded-lg max-w-md">
  <h3 class="font-semibold mb-4">Send Feedback</h3>
  <TextArea
    label="Your feedback"
    placeholder="Tell us what you think..."
    rows={4}
  />
  <div class="flex justify-end gap-2 mt-4">
    <Button variant="outlined" size="small">Cancel</Button>
    <Button size="small">Submit</Button>
  </div>
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-md">
          <h3 class="font-semibold mb-4">Send Feedback</h3>
          <TextArea
            label="Your feedback"
            placeholder="Tell us what you think..."
            rows={4}
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          TextArea Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A multi-line text input for longer content.
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
