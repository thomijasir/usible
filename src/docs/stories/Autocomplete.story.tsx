import { Autocomplete } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const AutocompleteStory: Component = () => {
  const [country, setCountry] = createSignal("");
  const [fruit, setFruit] = createSignal("");

  const propsReference = [
    {
      name: "items",
      type: "AutocompleteItem[]",
      description:
        "Array of items: { id, label, description?, iconLeft?, iconRight? }",
    },
    {
      name: "value",
      type: "string",
      description: "Selected item id (controlled)",
    },
    {
      name: "onChange",
      type: "(id: string) => void",
      description: "Change handler — receives the selected item id",
    },
    { name: "label", type: "string", description: "Input label" },
    { name: "placeholder", type: "string", description: "Input placeholder text" },
    { name: "disabled", type: "boolean", description: "Disable the autocomplete" },
    {
      name: "error",
      type: "string | boolean",
      description: "Error state or message",
    },
    { name: "helperText", type: "string", description: "Helper text below the input" },
    { name: "id", type: "string", description: "HTML id for the input element" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];

  const countries = [
    { id: "us", label: "United States", description: "North America" },
    { id: "ca", label: "Canada", description: "North America" },
    { id: "uk", label: "United Kingdom", description: "Europe" },
    { id: "au", label: "Australia", description: "Oceania" },
    { id: "de", label: "Germany", description: "Europe" },
    { id: "fr", label: "France", description: "Europe" },
    { id: "jp", label: "Japan", description: "Asia" },
    { id: "sg", label: "Singapore", description: "Asia" },
  ];

  const fruits = [
    { id: "apple", label: "Apple", iconLeft: <span>🍎</span> },
    { id: "banana", label: "Banana", iconLeft: <span>🍌</span> },
    { id: "cherry", label: "Cherry", iconLeft: <span>🍒</span> },
    { id: "grape", label: "Grape", iconLeft: <span>🍇</span> },
    { id: "mango", label: "Mango", iconLeft: <span>🥭</span> },
  ];

  const example = [
    {
      title: "Basic Autocomplete",
      code: `<Autocomplete
  placeholder="Search..."
  items={[
    { id: "1", label: "Option One" },
    { id: "2", label: "Option Two" },
    { id: "3", label: "Option Three" },
  ]}
  onChange={(id) => console.log(id)}
/>`,
      render: (
        <div class="max-w-sm">
          <Autocomplete
            placeholder="Search..."
            items={[
              { id: "1", label: "Option One" },
              { id: "2", label: "Option Two" },
              { id: "3", label: "Option Three" },
            ]}
            onChange={() => {}}
          />
        </div>
      ),
    },
    {
      title: "With Label",
      code: `<Autocomplete
  label="Country"
  placeholder="Select a country"
  items={countries}
  value={country()}
  onChange={setCountry}
/>`,
      render: (
        <div class="max-w-sm">
          <Autocomplete
            label="Country"
            placeholder="Select a country"
            items={countries}
            value={country()}
            onChange={setCountry}
          />
        </div>
      ),
    },
    {
      title: "With Item Icons",
      code: `<Autocomplete
  label="Fruit"
  placeholder="Pick a fruit"
  items={[
    { id: "apple", label: "Apple", iconLeft: <span>🍎</span> },
    { id: "banana", label: "Banana", iconLeft: <span>🍌</span> },
    { id: "cherry", label: "Cherry", iconLeft: <span>🍒</span> },
  ]}
  value={fruit()}
  onChange={setFruit}
/>`,
      render: (
        <div class="max-w-sm">
          <Autocomplete
            label="Fruit"
            placeholder="Pick a fruit"
            items={fruits}
            value={fruit()}
            onChange={setFruit}
          />
        </div>
      ),
    },
    {
      title: "With Item Descriptions",
      code: `<Autocomplete
  label="Country"
  placeholder="Select a country"
  items={[
    { id: "us", label: "United States", description: "North America" },
    { id: "uk", label: "United Kingdom", description: "Europe" },
    { id: "jp", label: "Japan", description: "Asia" },
  ]}
  onChange={(id) => console.log(id)}
/>`,
      render: (
        <div class="max-w-sm">
          <Autocomplete
            label="Country"
            placeholder="Select a country"
            items={countries}
            onChange={() => {}}
          />
        </div>
      ),
    },
    {
      title: "With Helper Text",
      code: `<Autocomplete
  label="Country"
  placeholder="Select your country"
  helperText="This determines your tax region"
  items={countries}
  onChange={(id) => console.log(id)}
/>`,
      render: (
        <div class="max-w-sm">
          <Autocomplete
            label="Country"
            placeholder="Select your country"
            helperText="This determines your tax region"
            items={countries}
            onChange={() => {}}
          />
        </div>
      ),
    },
    {
      title: "With Error",
      code: `<Autocomplete
  label="Category"
  placeholder="Select a category"
  error="Please select a category"
  items={items}
  onChange={(id) => console.log(id)}
/>`,
      render: (
        <div class="max-w-sm">
          <Autocomplete
            label="Category"
            placeholder="Select a category"
            error="Please select a category"
            items={countries}
            onChange={() => {}}
          />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Autocomplete
  label="Country"
  placeholder="Cannot change"
  disabled
  items={countries}
  onChange={() => {}}
/>`,
      render: (
        <div class="max-w-sm">
          <Autocomplete
            label="Country"
            placeholder="Cannot change"
            disabled
            items={countries}
            onChange={() => {}}
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Autocomplete Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A searchable select that opens a full-screen overlay with highlighted matching text and
          icon support.
        </p>
      </div>

      <section>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Examples:</h2>
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
