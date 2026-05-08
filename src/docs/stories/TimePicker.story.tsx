import { TimePicker, DatePicker } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const TimePickerStory: Component = () => {
  const [time, setTime] = createSignal<Date | null>(null);

  const propsReference = [
    {
      name: "value",
      type: "Date | null",
      description: "Currently selected time as a Date object",
    },
    {
      name: "onChange",
      type: "(date: Date) => void",
      description: "Called when the user confirms a new time",
    },
    {
      name: "format",
      type: '"12h" | "24h"',
      description: 'Time display format (default: "12h")',
    },
    { name: "label", type: "string", description: "Input label" },
    {
      name: "placeholder",
      type: "string",
      description: "Input placeholder text",
    },
    { name: "disabled", type: "boolean", description: "Disable the picker" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];

  const examples = [
    {
      title: "Basic TimePicker",
      code: `<TimePicker label="Select time" />`,
      render: <TimePicker label="Select time" />,
    },
    {
      title: "Controlled",
      code: `const [time, setTime] = createSignal<Date | null>(null);
<TimePicker value={time()} onChange={setTime} label="Pick a time" />`,
      render: (
        <TimePicker value={time()} onChange={setTime} label="Pick a time" />
      ),
    },
    {
      title: "24-Hour Format",
      code: `<TimePicker label="Select time (24h)" format="24h" />`,
      render: <TimePicker label="Select time (24h)" format="24h" />,
    },
    {
      title: "With Preset Value",
      code: `<TimePicker
  label="Meeting time"
  value={new Date(2026, 0, 1, 9, 30)}
/>`,
      render: (
        <TimePicker label="Meeting time" value={new Date(2026, 0, 1, 9, 30)} />
      ),
    },
    {
      title: "Disabled",
      code: `<TimePicker label="Disabled" disabled />`,
      render: <TimePicker label="Disabled" disabled />,
    },
    {
      title: "Appointment Booking Form",
      code: `<div class="space-y-4 max-w-sm p-4 border rounded-lg">
  <h3 class="font-semibold">Book Appointment</h3>
  <DatePicker label="Select Date" minDate={new Date()} />
  <TimePicker label="Select Time" format="12h" />
</div>`,
      render: (
        <div class="space-y-4 max-w-sm p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="font-semibold dark:text-white">Book Appointment</h3>
          <DatePicker label="Select Date" minDate={new Date()} />
          <TimePicker label="Select Time" format="12h" />
        </div>
      ),
    },
    {
      title: "Time Range",
      code: `<div class="flex gap-4 max-w-md">
  <TimePicker label="Start Time" />
  <TimePicker label="End Time" format="24h" />
</div>`,
      render: (
        <div class="flex gap-4 max-w-md">
          <TimePicker label="Start Time" />
          <TimePicker label="End Time" format="24h" />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          TimePicker Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A scroll-based time selection component with 12h/24h format support.
        </p>
      </div>

      <section>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Examples:
        </h2>
        <For each={examples}>
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
