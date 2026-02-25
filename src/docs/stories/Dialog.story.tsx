import { Dialog, Button, Input } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component, createSignal } from "solid-js";

export const DialogStory: Component = () => {
  const [basicOpen, setBasicOpen] = createSignal(false);
  const [actionsOpen, setActionsOpen] = createSignal(false);
  const [noDismissOpen, setNoDismissOpen] = createSignal(false);
  const [formOpen, setFormOpen] = createSignal(false);

  const propsReference = [
    { name: "isOpen", type: "boolean", description: "Dialog visibility" },
    { name: "onClose", type: "() => void", description: "Close handler" },
    {
      name: "title",
      type: "JSX.Element | string",
      description: "Dialog title",
    },
    {
      name: "children",
      type: "JSX.Element | string",
      description: "Dialog content",
    },
    { name: "actions", type: "JSX.Element", description: "Action buttons" },
    {
      name: "dismissible",
      type: "boolean",
      default: "true",
      description: "Allow dismissal by backdrop click",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Dialog",
      code: `<Dialog isOpen={basicOpen()} onClose={() => setBasicOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Dialog>`,
      render: (
        <div class="flex justify-center">
          <Button onClick={() => setBasicOpen(true)}>Open Dialog</Button>
          <Dialog
            isOpen={basicOpen()}
            onClose={() => setBasicOpen(false)}
            title="Confirm Action">
            <p class="text-gray-600 dark:text-gray-300">
              Are you sure you want to proceed with this action?
            </p>
            <div class="flex gap-2 mt-4 justify-end">
              <Button variant="outlined" onClick={() => setBasicOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setBasicOpen(false)}>Confirm</Button>
            </div>
          </Dialog>
        </div>
      ),
    },
    {
      title: "Dialog with Actions",
      code: `<Dialog isOpen={actionsOpen()} onClose={() => setActionsOpen(false)} title="Delete Item" actions={actions}>
  <p>This action cannot be undone.</p>
</Dialog>`,
      render: (
        <div class="flex justify-center">
          <Button color="error" onClick={() => setActionsOpen(true)}>
            Delete Item
          </Button>
          <Dialog
            isOpen={actionsOpen()}
            onClose={() => setActionsOpen(false)}
            title="Delete Item">
            <p class="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div class="flex gap-2 mt-4 justify-end">
              <Button variant="outlined" onClick={() => setActionsOpen(false)}>
                Cancel
              </Button>
              <Button color="error" onClick={() => setActionsOpen(false)}>
                Delete
              </Button>
            </div>
          </Dialog>
        </div>
      ),
    },
    {
      title: "Non-dismissible Dialog",
      code: `<Dialog isOpen={noDismissOpen()} onClose={() => setNoDismissOpen(false)} title="Important" dismissible={false}>
  <p>Please read this carefully.</p>
</Dialog>`,
      render: (
        <div class="flex justify-center">
          <Button onClick={() => setNoDismissOpen(true)}>
            Open Non-dismissible
          </Button>
          <Dialog
            isOpen={noDismissOpen()}
            onClose={() => setNoDismissOpen(false)}
            title="Important Notice"
            dismissible={false}>
            <p class="text-gray-600 dark:text-gray-300">
              This dialog cannot be closed by clicking outside. You must use the
              button below.
            </p>
            <div class="mt-4">
              <Button block onClick={() => setNoDismissOpen(false)}>
                I Understand
              </Button>
            </div>
          </Dialog>
        </div>
      ),
    },
    {
      title: " Form Dialog",
      code: `<Dialog isOpen={formOpen()} onClose={() => setFormOpen(false)} title="Edit Profile">
  <div class="space-y-4">
    <Input label="Name" placeholder="John Doe" />
    <Input label="Email" type="email" placeholder="john@example.com" />
  </div>
  <div class="flex gap-2 mt-4 justify-end">
    <Button variant="outlined" onClick={() => {}}>Cancel</Button>
    <Button onClick={() => {}}>Save</Button>
  </div>
</Dialog>`,
      render: (
        <div class="flex justify-center">
          <Button onClick={() => setFormOpen(true)}>Edit Profile</Button>
          <Dialog
            isOpen={formOpen()}
            onClose={() => setFormOpen(false)}
            title="Edit Profile">
            <div class="space-y-4">
              <Input label="Name" placeholder="John Doe" />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
              />
            </div>
            <div class="flex gap-2 mt-4 justify-end">
              <Button variant="outlined" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setFormOpen(false)}>Save</Button>
            </div>
          </Dialog>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dialog Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A modal dialog with animations and customizable content.
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
