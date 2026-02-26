import { Radio } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const RadioStory: Component = () => {
  const [shipping, setShipping] = createSignal("standard");
  const [plainOption, setPlainOption] = createSignal("a");
  const [iconOption, setIconOption] = createSignal("card");
  const [payment, setPayment] = createSignal("card");

  const propsReference = [
    { name: "label", type: "JSX.Element | string", description: "Radio label" },
    { name: "description", type: "string", description: "Supporting text below the label" },
    { name: "icon", type: "JSX.Element", description: "Icon displayed alongside the label" },
    { name: "checked", type: "boolean", description: "Checked state" },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Change handler",
    },
    { name: "name", type: "string", description: "HTML radio group name" },
    { name: "value", type: "string", description: "HTML input value" },
    {
      name: "variant",
      type: '"boxed" | "plain"',
      default: '"boxed"',
      description: "Visual style variant",
    },
    {
      name: "inputPosition",
      type: '"left" | "right"',
      default: '"right"',
      description: "Position of the radio input relative to content",
    },
    { name: "disabled", type: "boolean", description: "Disable the radio" },
    { name: "error", type: "boolean", description: "Error state" },
    { name: "id", type: "string", description: "HTML id for the input element" },
    { name: "class", type: "string", description: "Additional CSS classes for the input" },
    {
      name: "containerClass",
      type: "string",
      description: "Additional CSS classes for the outer container",
    },
  ];

  const example = [
    {
      title: "Boxed Variant (default)",
      code: `<Radio label="Standard Shipping" description="Arrives in 5–7 days" checked />
<Radio label="Express Shipping" description="Arrives in 1–2 days" />`,
      render: (
        <div class="flex flex-col gap-3 max-w-sm">
          <Radio
            label="Standard Shipping"
            description="Arrives in 5–7 days"
            checked={shipping() === "standard"}
            onChange={() => setShipping("standard")}
          />
          <Radio
            label="Express Shipping"
            description="Arrives in 1–2 days"
            checked={shipping() === "express"}
            onChange={() => setShipping("express")}
          />
        </div>
      ),
    },
    {
      title: "Plain Variant",
      code: `<Radio variant="plain" label="Option A" checked />
<Radio variant="plain" label="Option B" />
<Radio variant="plain" label="Option C" />`,
      render: (
        <div class="flex flex-col gap-3">
          <Radio
            variant="plain"
            label="Option A"
            checked={plainOption() === "a"}
            onChange={() => setPlainOption("a")}
          />
          <Radio
            variant="plain"
            label="Option B"
            checked={plainOption() === "b"}
            onChange={() => setPlainOption("b")}
          />
          <Radio
            variant="plain"
            label="Option C"
            checked={plainOption() === "c"}
            onChange={() => setPlainOption("c")}
          />
        </div>
      ),
    },
    {
      title: "Input Position Left",
      code: `<Radio inputPosition="left" label="Start aligned" description="Radio input on the left side" checked />`,
      render: (
        <div class="max-w-sm">
          <Radio
            inputPosition="left"
            label="Start aligned"
            description="Radio input on the left side"
            checked
          />
        </div>
      ),
    },
    {
      title: "With Icon",
      code: `<Radio label="Credit Card" description="Visa, Mastercard, Amex" icon={<span>💳</span>} checked />
<Radio label="Bank Transfer" description="Direct bank deposit" icon={<span>🏦</span>} />`,
      render: (
        <div class="flex flex-col gap-3 max-w-sm">
          <Radio
            label="Credit Card"
            description="Visa, Mastercard, Amex"
            icon={<span>💳</span>}
            checked={iconOption() === "card"}
            onChange={() => setIconOption("card")}
          />
          <Radio
            label="Bank Transfer"
            description="Direct bank deposit"
            icon={<span>🏦</span>}
            checked={iconOption() === "bank"}
            onChange={() => setIconOption("bank")}
          />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Radio label="Unavailable option" description="This option is currently not available" disabled />`,
      render: (
        <div class="max-w-sm">
          <Radio
            label="Unavailable option"
            description="This option is currently not available"
            disabled
          />
        </div>
      ),
    },
    {
      title: "Error State",
      code: `<Radio label="Required selection" description="Please select an option to continue" error />`,
      render: (
        <div class="max-w-sm">
          <Radio
            label="Required selection"
            description="Please select an option to continue"
            error
          />
        </div>
      ),
    },
    {
      title: " Payment Method Selection",
      code: `const [payment, setPayment] = createSignal("card");

<div class="flex flex-col gap-3 max-w-sm">
  <Radio
    name="payment"
    label="Credit Card"
    description="Visa, Mastercard, Amex"
    icon={<span>💳</span>}
    checked={payment() === "card"}
    onChange={() => setPayment("card")}
  />
  <Radio
    name="payment"
    label="Bank Transfer"
    description="Direct deposit, 1–3 business days"
    icon={<span>🏦</span>}
    checked={payment() === "bank"}
    onChange={() => setPayment("bank")}
  />
  <Radio
    name="payment"
    label="Cash on Delivery"
    description="Pay when you receive your order"
    icon={<span>💵</span>}
    checked={payment() === "cod"}
    onChange={() => setPayment("cod")}
  />
</div>`,
      render: (
        <div class="flex flex-col gap-3 max-w-sm">
          <Radio
            name="payment"
            label="Credit Card"
            description="Visa, Mastercard, Amex"
            icon={<span>💳</span>}
            checked={payment() === "card"}
            onChange={() => setPayment("card")}
          />
          <Radio
            name="payment"
            label="Bank Transfer"
            description="Direct deposit, 1–3 business days"
            icon={<span>🏦</span>}
            checked={payment() === "bank"}
            onChange={() => setPayment("bank")}
          />
          <Radio
            name="payment"
            label="Cash on Delivery"
            description="Pay when you receive your order"
            icon={<span>💵</span>}
            checked={payment() === "cod"}
            onChange={() => setPayment("cod")}
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Radio Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A radio input with boxed and plain variants, icon support, and flexible input positioning.
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
