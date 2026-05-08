import { Tabs } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { createSignal, For, type Component } from "solid-js";

export const TabsStory: Component = () => {
  const propsReference = [
    {
      name: "tabs",
      type: "TabItem[]",
      description:
        "Array of tab items: { label, value, content, icon?, disabled?, active? }",
    },
    {
      name: "value",
      type: "string | number",
      description: "Controlled active tab value",
    },
    {
      name: "defaultValue",
      type: "string | number",
      description: "Default active tab value (uncontrolled)",
    },
    {
      name: "onChange",
      type: "(value: string | number) => void",
      description: "Tab change handler",
    },
    {
      name: "variant",
      type: '"standard" | "filled" | "block"',
      default: '"standard"',
      description: "Visual style variant",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Tab layout orientation",
    },
    {
      name: "centered",
      type: "boolean",
      description: "Center the tab bar (horizontal only)",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];

  const createBasicTabs = () => [
    {
      label: "Overview",
      value: "overview",
      content: (
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Project Overview
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            This section provides a high-level summary of the current project
            status, upcoming milestones, and key performance indicators. Use
            this tab to get a quick snapshot without diving into details.
          </p>
          <div class="grid grid-cols-3 gap-3 pt-1">
            <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-3 text-center">
              <div class="text-xl font-bold text-primary">94%</div>
              <div class="text-xs text-gray-400 mt-0.5">Completion</div>
            </div>
            <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-3 text-center">
              <div class="text-xl font-bold text-primary">12</div>
              <div class="text-xs text-gray-400 mt-0.5">Open Tasks</div>
            </div>
            <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-3 text-center">
              <div class="text-xl font-bold text-primary">3</div>
              <div class="text-xs text-gray-400 mt-0.5">Milestones</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Details",
      value: "details",
      content: (
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Technical Details
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Detailed specifications, configuration options, and technical
            documentation for this component. Review this section before
            integrating into production.
          </p>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Supports both controlled and uncontrolled usage
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Three visual variants: standard, filled, block
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Horizontal and vertical orientations
            </li>
          </ul>
        </div>
      ),
    },
    {
      label: "History",
      value: "history",
      content: (
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Change History
          </h3>
          <div class="space-y-2">
            {[
              {
                date: "Feb 27, 2026",
                note: "Added smooth transition animation",
              },
              {
                date: "Feb 20, 2026",
                note: "Introduced block and filled variants",
              },
              { date: "Feb 12, 2026", note: "Initial component release" },
            ].map((item) => (
              <div class="flex items-start gap-3 text-sm">
                <span class="text-xs text-gray-400 whitespace-nowrap pt-0.5">
                  {item.date}
                </span>
                <span class="text-gray-600 dark:text-gray-400">
                  {item.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const createIconTabs = () => [
    {
      label: "Profile",
      value: "profile",
      icon: <span>👤</span>,
      content: (
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Profile Settings
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Manage your personal information, display name, and avatar
            preferences.
          </p>
        </div>
      ),
    },
    {
      label: "Security",
      value: "security",
      icon: <span>🔒</span>,
      content: (
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Security
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Configure your password, two-factor authentication, and review
            active sessions.
          </p>
        </div>
      ),
    },
    {
      label: "Notifications",
      value: "notifications",
      icon: <span>🔔</span>,
      content: (
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Notifications
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Manage email digests, push notifications, and alert frequency
            preferences.
          </p>
        </div>
      ),
    },
  ];

  const createDisabledTabs = () => [
    {
      label: "Active",
      value: "active",
      content: (
        <div class="text-sm text-gray-500 dark:text-gray-400">
          This tab is active and accessible. The middle tab is disabled and
          cannot be selected.
        </div>
      ),
    },
    {
      label: "Disabled",
      value: "disabled",
      disabled: true,
      content: <div />,
    },
    {
      label: "Also Active",
      value: "also-active",
      content: (
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Another accessible tab with its own content.
        </div>
      ),
    },
  ];

  const ControlledDemo: Component = () => {
    const steps = ["step-1", "step-2", "step-3"] as const;
    const [active, setActive] = createSignal<string>(steps[0]);
    const controlledTabs = steps.map((s, i) => ({
      label: `Step ${i + 1}`,
      value: s,
      content: (
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Step {i + 1}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is the content for step {i + 1}. The active tab is driven by
            external state — the buttons below control it directly.
          </p>
        </div>
      ),
    }));
    return (
      <div class="space-y-4">
        <Tabs
          tabs={controlledTabs}
          value={active()}
          onChange={(v) => setActive(v as string)}
        />
        <div class="flex gap-2">
          {steps.map((s, i) => (
            <button
              onClick={() => setActive(s)}
              class={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                active() === s
                  ? "bg-primary text-white border-primary"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary/50"
              }`}>
              Go to Step {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const example = [
    {
      title: "Standard Variant (default)",
      code: `<Tabs
  tabs={[
    { label: "Overview", value: "overview", content: <div>Overview content</div> },
    { label: "Details", value: "details", content: <div>Details content</div> },
    { label: "History", value: "history", content: <div>History content</div> },
  ]}
/>`,
      render: <Tabs tabs={createBasicTabs()} />,
    },
    {
      title: "Filled Variant",
      code: `<Tabs variant="filled" tabs={tabs} />`,
      render: <Tabs variant="filled" tabs={createBasicTabs()} />,
    },
    {
      title: "Block Variant",
      code: `<Tabs variant="block" tabs={tabs} />`,
      render: <Tabs variant="block" tabs={createBasicTabs()} />,
    },
    {
      title: "With Icons",
      code: `<Tabs
  tabs={[
    { label: "Profile", value: "profile", icon: <span>👤</span>, content: <div>Profile settings</div> },
    { label: "Security", value: "security", icon: <span>🔒</span>, content: <div>Security settings</div> },
    { label: "Notifications", value: "notifications", icon: <span>🔔</span>, content: <div>Notification preferences</div> },
  ]}
/>`,
      render: <Tabs tabs={createIconTabs()} />,
    },
    {
      title: "Centered",
      code: `<Tabs centered tabs={tabs} />`,
      render: <Tabs centered tabs={createBasicTabs()} />,
    },
    {
      title: "Vertical Orientation",
      code: `<Tabs orientation="vertical" tabs={tabs} />`,
      render: <Tabs orientation="vertical" tabs={createBasicTabs()} />,
    },
    {
      title: "Controlled",
      code: `const [active, setActive] = createSignal("step-1");

<Tabs
  tabs={tabs}
  value={active()}
  onChange={(v) => setActive(v as string)}
/>

// External buttons drive the active tab
<button onClick={() => setActive("step-2")}>Go to Step 2</button>`,
      render: <ControlledDemo />,
    },
    {
      title: "Disabled Tab",
      code: `<Tabs
  tabs={[
    { label: "Active", value: "active", content: <div>Active tab</div> },
    { label: "Disabled", value: "disabled", disabled: true, content: <div /> },
    { label: "Also Active", value: "also-active", content: <div>Another tab</div> },
  ]}
/>`,
      render: <Tabs tabs={createDisabledTabs()} />,
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tabs Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A tabbed navigation component with standard, filled, and block
          variants supporting icons, vertical orientation, disabled tabs, and
          smooth animated content transitions. The first tab displays
          immediately without animation on initial render.
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
