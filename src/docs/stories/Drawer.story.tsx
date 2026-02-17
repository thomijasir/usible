import { Drawer, Button, Select, Slider } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const DrawerStory: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const propsReference = [
    { name: "isOpen", type: "boolean", description: "Drawer visibility" },
    { name: "onClose", type: "() => void", description: "Close handler" },
    { name: "children", type: "JSX.Element", description: "Drawer content" },
    { name: "height", type: "string | number", description: "Drawer height" },
    {
      name: "showHandle",
      type: "boolean",
      default: "true",
      description: "Show drag handle",
    },
  ];
  const example = [
    {
      title: "Basic Drawer",
      code: `<Drawer isOpen={true} onClose={() => {}}>
  <div class="p-4">Drawer content</div>
</Drawer>`,
      render: (
        <div class="flex justify-center">
          <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
          <Drawer isOpen={isOpen()} onClose={() => setIsOpen(false)}>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">Drawer Title</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                This is the drawer content. Swipe down or click outside to
                close.
              </p>
              <Button block onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </Drawer>
        </div>
      ),
    },
    {
      title: "Custom Height",
      code: `<Drawer isOpen={true} onClose={() => {}} height="50vh">
  <div class="p-4">Half screen drawer</div>
</Drawer>`,
      render: (
        <div class="flex justify-center">
          <Button onClick={() => setIsOpen(true)}>Half Height Drawer</Button>
          <Drawer
            isOpen={isOpen()}
            onClose={() => setIsOpen(false)}
            height="50vh">
            <div class="p-4 h-full">
              <h3 class="text-lg font-semibold mb-2">Half Screen</h3>
              <p class="text-gray-600 dark:text-gray-300">
                This drawer takes up 50% of the viewport height.
              </p>
            </div>
          </Drawer>
        </div>
      ),
    },
    {
      title: "Action Sheet",
      code: `<Drawer isOpen={true} onClose={() => {}}>
  <div class="p-4 space-y-2">
    <Button block>Share</Button>
    <Button block>Edit</Button>
    <Button block color="error">Delete</Button>
  </div>
</Drawer>`,
      render: (
        <div class="flex justify-center">
          <Button onClick={() => setIsOpen(true)}>Open Action Sheet</Button>
          <Drawer isOpen={isOpen()} onClose={() => setIsOpen(false)}>
            <div class="p-4 space-y-2">
              <h3 class="text-lg font-semibold mb-4">Actions</h3>
              <Button block>Share</Button>
              <Button block>Edit</Button>
              <Button block variant="outlined" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button block color="error">
                Delete
              </Button>
            </div>
          </Drawer>
        </div>
      ),
    },
    {
      title: " Filter Drawer",
      code: `<Drawer isOpen={true} onClose={() => {}} height="60vh">
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-4">Filter Products</h3>
    <div class="space-y-4">
      <Select label="Category" placeholder="All categories" options={[...]} />
      <Slider label="Price Range" min={0} max={1000} value={500} showValue />
    </div>
    <div class="flex gap-2 mt-6">
      <Button variant="outlined" block>Reset</Button>
      <Button block>Apply</Button>
    </div>
  </div>
</Drawer>`,
      render: (
        <div class="flex justify-center">
          <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
          <Drawer
            isOpen={isOpen()}
            onClose={() => setIsOpen(false)}
            height="60vh">
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-4">Filter Products</h3>
              <div class="space-y-4">
                <Select
                  label="Category"
                  placeholder="All categories"
                  options={[
                    { label: "Electronics", value: "electronics" },
                    { label: "Clothing", value: "clothing" },
                  ]}
                />
                <Slider
                  label="Price Range"
                  min={0}
                  max={1000}
                  value={500}
                  showValue
                  onChange={() => {}}
                />
              </div>
              <div class="flex gap-2 mt-6">
                <Button
                  variant="outlined"
                  block
                  onClick={() => setIsOpen(false)}>
                  Reset
                </Button>
                <Button block onClick={() => setIsOpen(false)}>
                  Apply
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Drawer Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A bottom drawer/sheet component with swipe gestures.
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
