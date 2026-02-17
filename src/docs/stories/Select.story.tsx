import { Select, Input } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const SelectStory: Component = () => {
  const propsReference = [
    { name: "value", type: "string | number", description: "Selected value" },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Change handler",
    },
    {
      name: "options",
      type: "SelectOption[]",
      description: "Array of { label, value } options",
    },
    { name: "placeholder", type: "string", description: "Placeholder text" },
    { name: "label", type: "string", description: "Select label" },
    { name: "disabled", type: "boolean", description: "Disable the select" },
    {
      name: "error",
      type: "string | boolean",
      description: "Error state or message",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Select",
      code: `<Select
  placeholder="Choose an option"
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" }
  ]}
/>`,
      render: (
        <Select
          placeholder="Choose an option"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
        />
      ),
    },
    {
      title: "With Label",
      code: `<Select
  label="Country"
  placeholder="Select country"
  options={[
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" }
  ]}
/>`,
      render: (
        <Select
          label="Country"
          placeholder="Select country"
          options={[
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "United Kingdom", value: "uk" },
          ]}
        />
      ),
    },
    {
      title: "With Error",
      code: `<Select
  label="Category"
  error="Please select a category"
  options={[
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" }
  ]}
/>`,
      render: (
        <Select
          label="Category"
          error="Please select a category"
          options={[
            { label: "Electronics", value: "electronics" },
            { label: "Clothing", value: "clothing" },
          ]}
        />
      ),
    },
    {
      title: "Disabled",
      code: `<Select
  label="Disabled"
  disabled
  options={[
    { label: "Option 1", value: "1" }
  ]}
/>`,
      render: (
        <Select
          label="Disabled"
          disabled
          options={[{ label: "Option 1", value: "1" }]}
        />
      ),
    },
    {
      title: " Address Form",
      code: `<div class="space-y-4 max-w-sm">
  <Input label="Street Address" placeholder="123 Main St" />
  <Select
    label="Country"
    placeholder="Select country"
    options={[
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
      { label: "United Kingdom", value: "uk" }
    ]}
  />
  <Select
    label="State/Province"
    placeholder="Select state"
    options={[
      { label: "California", value: "ca" },
      { label: "New York", value: "ny" },
      { label: "Texas", value: "tx" }
    ]}
  />
</div>`,
      render: (
        <div class="space-y-4 max-w-sm">
          <Input label="Street Address" placeholder="123 Main St" />
          <Select
            label="Country"
            placeholder="Select country"
            options={[
              { label: "United States", value: "us" },
              { label: "Canada", value: "ca" },
              { label: "United Kingdom", value: "uk" },
            ]}
          />
          <Select
            label="State/Province"
            placeholder="Select state"
            options={[
              { label: "California", value: "ca" },
              { label: "New York", value: "ny" },
              { label: "Texas", value: "tx" },
            ]}
          />
        </div>
      ),
    },
    {
      title: " Product Filter",
      code: `<div class="flex gap-4 flex-wrap">
  <Select
    placeholder="Category"
    options={[
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" }
    ]}
  />
  <Select
    placeholder="Sort by"
    options={[
      { label: "Price: Low to High", value: "price_asc" },
      { label: "Price: High to Low", value: "price_desc" }
    ]}
  />
</div>`,
      render: (
        <div class="flex gap-4 flex-wrap">
          <Select
            placeholder="Category"
            options={[
              { label: "Electronics", value: "electronics" },
              { label: "Clothing", value: "clothing" },
            ]}
          />
          <Select
            placeholder="Sort by"
            options={[
              { label: "Price: Low to High", value: "price_asc" },
              { label: "Price: High to Low", value: "price_desc" },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Select Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A dropdown select component for choosing from a list of options.
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
