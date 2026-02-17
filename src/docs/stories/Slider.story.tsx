import { Slider } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const SliderStory: Component = () => {
  const [value, setValue] = createSignal(50);
  const propsReference = [
    { name: "value", type: "number", description: "Current value" },
    {
      name: "onChange",
      type: "(value: number) => void",
      description: "Change handler",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Step increment",
    },
    { name: "label", type: "string", description: "Slider label" },
    {
      name: "showValue",
      type: "boolean",
      description: "Display current value",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error"',
      default: '"primary"',
      description: "Color theme",
    },
    { name: "disabled", type: "boolean", description: "Disable the slider" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Slider",
      code: `<Slider value={50} onChange={(v) => console.log(v)} />`,
      render: <Slider value={value()} onChange={setValue} />,
    },
    {
      title: "With Label",
      code: `<Slider label="Volume" value={75} showValue onChange={(v) => console.log(v)} />`,
      render: (
        <Slider label="Volume" value={75} showValue onChange={() => {}} />
      ),
    },
    {
      title: "Range with Step",
      code: `<Slider label="Temperature" min={0} max={100} step={5} value={25} showValue onChange={(v) => console.log(v)} />`,
      render: (
        <Slider
          label="Temperature"
          min={0}
          max={100}
          step={5}
          value={25}
          showValue
          onChange={() => {}}
        />
      ),
    },
    {
      title: "Colors",
      code: `<Slider color="primary" value={30} onChange={(v) => console.log(v)} />
<Slider color="secondary" value={50} onChange={(v) => console.log(v)} />
<Slider color="success" value={70} onChange={(v) => console.log(v)} />`,
      render: (
        <div class="flex flex-col gap-4">
          <Slider color="primary" value={30} onChange={() => {}} />
          <Slider color="secondary" value={50} onChange={() => {}} />
          <Slider color="success" value={70} onChange={() => {}} />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Slider label="Disabled" value={50} disabled onChange={(v) => console.log(v)} />`,
      render: (
        <Slider label="Disabled" value={50} disabled onChange={() => {}} />
      ),
    },
    {
      title: " Audio Player",
      code: `<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-sm">
  <div class="flex items-center gap-4">
    <span class="text-2xl">🎵</span>
    <div class="flex-1">
      <p class="font-medium text-sm">Now Playing</p>
      <p class="text-gray-500 text-xs">Artist Name</p>
    </div>
  </div>
  <Slider label="Volume" value={75} showValue onChange={() => {}} class="mt-4" />
</div>`,
      render: (
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-sm">
          <div class="flex items-center gap-4">
            <span class="text-2xl">🎵</span>
            <div class="flex-1">
              <p class="font-medium text-sm">Now Playing</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">
                Artist Name
              </p>
            </div>
          </div>
          <Slider
            label="Volume"
            value={75}
            showValue
            onChange={() => {}}
            class="mt-4"
          />
        </div>
      ),
    },
    {
      title: " Settings Control",
      code: `<div class="space-y-4 max-w-sm">
  <Slider label="Brightness" value={80} showValue onChange={() => {}} />
  <Slider label="Contrast" value={50} showValue onChange={() => {}} />
  <Slider label="Font Size" min={12} max={24} value={16} showValue onChange={() => {}} />
</div>`,
      render: (
        <div class="space-y-4 max-w-sm">
          <Slider label="Brightness" value={80} showValue onChange={() => {}} />
          <Slider label="Contrast" value={50} showValue onChange={() => {}} />
          <Slider
            label="Font Size"
            min={12}
            max={24}
            value={16}
            showValue
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
          Slider Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A range slider for selecting numeric values.
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
