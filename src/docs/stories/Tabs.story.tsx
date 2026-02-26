import { Tabs } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const TabsStory: Component = () => {
  const propsReference = [
    {
      name: "tabs",
      type: "TabItem[]",
      description:
        "Array of tab items: { label, value, content, icon?, disabled? }",
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

  const basicTabs = [
    {
      label: "Overview",
      value: "overview",
      content: (
        <div class="py-4 text-gray-600">
          Overview content: summary of the current status and key metrics.
        </div>
      ),
    },
    {
      label: "Details",
      value: "details",
      content: (
        <div class="py-4 text-gray-600">
          Details content: in-depth information and specifications.
        </div>
      ),
    },
    {
      label: "History",
      value: "history",
      content: (
        <div class="py-4 text-gray-600">
          History content: past events and change log.
        </div>
      ),
    },
  ];

  const iconTabs = [
    {
      label: "Profile",
      value: "profile",
      icon: <span>👤</span>,
      content: (
        <div class="py-4 text-gray-600">
          Profile settings and personal information.
        </div>
      ),
    },
    {
      label: "Security",
      value: "security",
      icon: <span>🔒</span>,
      content: (
        <div class="py-4 text-gray-600">
          Password, two-factor authentication, and active sessions.
        </div>
      ),
    },
    {
      label: "Notifications",
      value: "notifications",
      icon: <span>🔔</span>,
      content: (
        <div class="py-4 text-gray-600">
          Email and push notification preferences.
        </div>
      ),
    },
  ];

  const disabledTabs = [
    {
      label: "Active",
      value: "active",
      content: (
        <div class="py-4 text-gray-600">This tab is active and accessible.</div>
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
        <div class="py-4 text-gray-600">Another accessible tab.</div>
      ),
    },
  ];

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
      render: <Tabs tabs={basicTabs} />,
    },
    {
      title: "Filled Variant",
      code: `<Tabs variant="filled" tabs={tabs} />`,
      render: <Tabs variant="filled" tabs={basicTabs} />,
    },
    {
      title: "Block Variant",
      code: `<Tabs variant="block" tabs={tabs} />`,
      render: <Tabs variant="block" tabs={basicTabs} />,
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
      render: <Tabs tabs={iconTabs} />,
    },
    {
      title: "Centered",
      code: `<Tabs centered tabs={tabs} />`,
      render: <Tabs centered tabs={basicTabs} />,
    },
    {
      title: "Vertical Orientation",
      code: `<Tabs orientation="vertical" tabs={tabs} />`,
      render: <Tabs orientation="vertical" tabs={basicTabs} />,
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
      render: <Tabs tabs={disabledTabs} />,
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tabs Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A tabbed navigation component with standard, filled, and block variants supporting icons,
          vertical orientation, and disabled tabs.
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
