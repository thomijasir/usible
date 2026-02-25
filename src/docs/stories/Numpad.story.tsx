import { Numpad } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, createSignal, type Component } from "solid-js";

export const NumpadStory: Component = () => {
  const [pin, setPin] = createSignal<string[]>([]);
  const propsReference = [
    {
      name: "theme",
      type: '"light" | "dark"',
      default: '"light"',
      description: "Visual theme",
    },
    {
      name: "onKeyPress",
      type: "(key: string) => void",
      description: "Key press handler",
    },
    {
      name: "onBackspace",
      type: "() => void",
      description: "Backspace handler",
    },
    {
      name: "onBiometricAuth",
      type: "() => void",
      description: "Biometric auth handler",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Numpad",
      code: `<Numpad onKeyPress={(k) => console.log(k)} />`,
      render: <Numpad onKeyPress={(k) => console.log(k)} />,
    },
    {
      title: "Dark Theme",
      code: `<Numpad theme="dark" onKeyPress={(k) => console.log(k)} />`,
      render: <Numpad theme="dark" onKeyPress={(k) => console.log(k)} />,
    },
    {
      title: "With Handlers",
      code: `<Numpad
  onKeyPress={(k) => console.log('Key:', k)}
  onBackspace={() => console.log('Backspace')}
  onBiometricAuth={() => console.log('Biometric')}
/>`,
      render: (
        <Numpad
          onKeyPress={(k) => console.log("Key:", k)}
          onBackspace={() => console.log("Backspace")}
          onBiometricAuth={() => console.log("Biometric")}
        />
      ),
    },
    {
      title: " PIN Entry",
      code: `const [pin, setPin] = createSignal([]);

<div class="text-center max-w-xs mx-auto">
  <h3 class="text-lg font-semibold mb-2">Enter PIN</h3>
  <div class="flex justify-center gap-2 mb-4">
    <For each={[0, 1, 2, 3]}>
      {(i) => (
        <div class={pin().length > i ? "w-4 h-4 rounded-full bg-primary" : "w-4 h-4 rounded-full bg-gray-300"} />
      )}
    </For>
  </div>
  <Numpad
    onKeyPress={(k) => { if (pin().length < 4) setPin([...pin(), k]); }}
    onBackspace={() => setPin(pin().slice(0, -1))}
  />
</div>`,
      render: (
        <div class="text-center max-w-xs mx-auto">
          <h3 class="text-lg font-semibold mb-2">Enter PIN</h3>
          <div class="flex justify-center gap-2 mb-4">
            <For each={[0, 1, 2, 3]}>
              {(i) => (
                <div
                  class={
                    pin().length > i
                      ? "w-4 h-4 rounded-full bg-primary"
                      : "w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"
                  }
                />
              )}
            </For>
          </div>
          <Numpad
            onKeyPress={(k) => {
              if (pin().length < 4) setPin([...pin(), k]);
            }}
            onBackspace={() => setPin(pin().slice(0, -1))}
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Numpad Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A numeric keypad for PIN entry and numeric input.
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
