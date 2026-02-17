import { DatePicker, Select } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const DatePickerStory: Component = () => {
  const [date, setDate] = createSignal<Date | null>(null);
  const propsReference = [
    { name: "value", type: "Date | null", description: "Selected date" },
    {
      name: "onChange",
      type: "(date: Date) => void",
      description: "Date change handler",
    },
    { name: "minDate", type: "Date", description: "Minimum selectable date" },
    { name: "maxDate", type: "Date", description: "Maximum selectable date" },
    { name: "format", type: "string", description: "Date display format" },
    { name: "label", type: "string", description: "Input label" },
    { name: "disabled", type: "boolean", description: "Disable the picker" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic DatePicker",
      code: `<DatePicker label="Select date" />`,
      render: <DatePicker label="Select date" />,
    },
    {
      title: "Controlled",
      code: `<DatePicker value={date()} onChange={setDate} />`,
      render: <DatePicker value={date()} onChange={setDate} />,
    },
    {
      title: "With Min/Max Range",
      code: `<DatePicker
  label="Select date"
  minDate={new Date()}
  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
/>`,
      render: (
        <DatePicker
          label="Select date"
          minDate={new Date()}
          maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
        />
      ),
    },
    {
      title: "Disabled",
      code: `<DatePicker label="Disabled" disabled />`,
      render: <DatePicker label="Disabled" disabled />,
    },
    {
      title: " Booking Form",
      code: `<div class="space-y-4 max-w-sm p-4 border rounded-lg">
  <h3 class="font-semibold">Book Appointment</h3>
  <DatePicker label="Select Date" minDate={new Date()} />
  <Select label="Time Slot" placeholder="Choose time" options={[
    { label: "9:00 AM", value: "9am" },
    { label: "10:00 AM", value: "10am" },
    { label: "2:00 PM", value: "2pm" }
  ]} />
  <Button block>Book Now</Button>
</div>`,
      render: (
        <div class="space-y-4 max-w-sm p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="font-semibold">Book Appointment</h3>
          <DatePicker label="Select Date" minDate={new Date()} />
          <Select
            label="Time Slot"
            placeholder="Choose time"
            options={[
              { label: "9:00 AM", value: "9am" },
              { label: "10:00 AM", value: "10am" },
              { label: "2:00 PM", value: "2pm" },
            ]}
          />
        </div>
      ),
    },
    {
      title: " Date Range",
      code: `<div class="flex gap-4 max-w-md">
  <DatePicker label="Check-in" placeholder="Start date" />
  <DatePicker label="Check-out" placeholder="End date" />
</div>`,
      render: (
        <div class="flex gap-4 max-w-md">
          <DatePicker label="Check-in" placeholder="Start date" />
          <DatePicker label="Check-out" placeholder="End date" />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          DatePicker Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A date selection component with calendar picker.
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
