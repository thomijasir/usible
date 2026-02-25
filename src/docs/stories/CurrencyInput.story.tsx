import { CurrencyInput, Input } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const CurrencyInputStory: Component = () => {
  const [value, setValue] = createSignal(100);
  const propsReference = [
    { name: "value", type: "number", description: "Current value" },
    {
      name: "onChange",
      type: "(value: number) => void",
      description: "Change handler",
    },
    {
      name: "currency",
      type: "string",
      default: '"USD"',
      description: "Currency code",
    },
    { name: "locale", type: "string", description: "Locale for formatting" },
    {
      name: "decimalDigits",
      type: "number",
      default: "2",
      description: "Decimal places",
    },
    { name: "maxDigits", type: "number", description: "Maximum digits" },
    { name: "label", type: "string", description: "Input label" },
    { name: "disabled", type: "boolean", description: "Disable the input" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Currency Input",
      code: `<CurrencyInput value={100} onChange={(v) => console.log(v)} currency="USD" />`,
      render: (
        <CurrencyInput value={value()} onChange={setValue} currency="USD" />
      ),
    },
    {
      title: "With Label",
      code: `<CurrencyInput label="Amount" value={1000} currency="USD" onChange={(v) => console.log(v)} />`,
      render: (
        <CurrencyInput
          label="Amount"
          value={1000}
          currency="USD"
          onChange={() => {}}
        />
      ),
    },
    {
      title: "Different Currencies",
      code: `<CurrencyInput value={100} currency="EUR" onChange={(v) => console.log(v)} />
<CurrencyInput value={100} currency="GBP" onChange={(v) => console.log(v)} />
<CurrencyInput value={100} currency="JPY" decimalDigits={0} onChange={(v) => console.log(v)} />`,
      render: (
        <div class="flex flex-col gap-4">
          <CurrencyInput value={100} currency="EUR" onChange={() => {}} />
          <CurrencyInput value={100} currency="GBP" onChange={() => {}} />
          <CurrencyInput
            value={100}
            currency="JPY"
            decimalDigits={0}
            onChange={() => {}}
          />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<CurrencyInput label="Total" value={500} disabled onChange={(v) => console.log(v)} />`,
      render: (
        <CurrencyInput label="Total" value={500} disabled onChange={() => {}} />
      ),
    },
    {
      title: " Payment Form",
      code: `<div class="space-y-4 max-w-sm p-4 border rounded-lg">
  <h3 class="font-semibold">Payment Details</h3>
  <Input label="Cardholder Name" placeholder="John Doe" />
  <Input label="Card Number" placeholder="•••• •••• •••• ••••" />
  <div class="grid grid-cols-2 gap-4">
    <Input label="Expiry" placeholder="MM/YY" />
    <Input label="CVV" placeholder="•••" />
  </div>
  <CurrencyInput label="Amount" value={99.99} currency="USD" onChange={() => {}} />
  <Button block>Pay Now</Button>
</div>`,
      render: (
        <div class="space-y-4 max-w-sm p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="font-semibold">Payment Details</h3>
          <Input label="Cardholder Name" placeholder="John Doe" />
          <Input label="Card Number" placeholder="•••• •••• •••• ••••" />
          <div class="grid grid-cols-2 gap-4">
            <Input label="Expiry" placeholder="MM/YY" />
            <Input label="CVV" placeholder="•••" />
          </div>
          <CurrencyInput
            label="Amount"
            value={99.99}
            currency="USD"
            onChange={() => {}}
          />
        </div>
      ),
    },
    {
      title: " Invoice Summary",
      code: `<div class="space-y-2 max-w-sm p-4 border rounded-lg">
  <h3 class="font-semibold mb-4">Invoice Summary</h3>
  <div class="flex justify-between text-sm">
    <span>Subtotal</span>
    <CurrencyInput value={100} currency="USD" onChange={() => {}} disabled />
  </div>
  <div class="flex justify-between text-sm">
    <span>Tax (10%)</span>
    <CurrencyInput value={10} currency="USD" onChange={() => {}} disabled />
  </div>
  <hr />
  <div class="flex justify-between font-semibold">
    <span>Total</span>
    <CurrencyInput value={110} currency="USD" onChange={() => {}} disabled />
  </div>
</div>`,
      render: (
        <div class="space-y-2 max-w-sm p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="font-semibold mb-4">Invoice Summary</h3>
          <div class="flex justify-between text-sm">
            <span>Subtotal</span>
            <span class="font-mono">$100.00</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Tax (10%)</span>
            <span class="font-mono">$10.00</span>
          </div>
          <hr class="border-gray-200 dark:border-gray-700" />
          <div class="flex justify-between font-semibold">
            <span>Total</span>
            <CurrencyInput
              value={110}
              currency="USD"
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CurrencyInput Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          An input field formatted for currency values.
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
