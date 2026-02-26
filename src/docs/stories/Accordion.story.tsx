import { Accordion } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

const PlusMinusIcon = (props: { expanded: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-5 h-5">
    <line x1="5" y1="12" x2="19" y2="12" />
    {!props.expanded && <line x1="12" y1="5" x2="12" y2="19" />}
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-5 h-5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const AccordionStory: Component = () => {
  const propsReference = [
    {
      name: "items",
      type: "AccordionItem[]",
      description: "Array of { id, title, content, disabled }",
    },
    {
      name: "defaultExpandedId",
      type: "string | number",
      description: "Initially expanded item",
    },
    {
      name: "allowMultiple",
      type: "boolean",
      default: "false",
      description: "Allow multiple items open",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
    {
      name: "caretPosition",
      type: '"left" | "right"',
      default: '"right"',
      description: "Position of the caret icon",
    },
    {
      name: "caretIcon",
      type: "JSX.Element",
      description:
        "Static JSX element or render function (expanded: boolean) => JSX.Element",
    },
  ];
  const example = [
    {
      title: "Basic Accordion",
      code: `<Accordion items={[
  { id: 1, title: "Section 1", content: "Content 1" },
  { id: 2, title: "Section 2", content: "Content 2" }
]} />`,
      render: (
        <Accordion
          items={[
            {
              id: 1,
              title: "What is Solid.js?",
              content:
                "Solid.js is a reactive JavaScript library for building user interfaces with fine-grained reactivity.",
            },
            {
              id: 2,
              title: "How does reactivity work?",
              content:
                "Solid.js uses a fine-grained reactivity system where dependencies are tracked automatically.",
            },
            {
              id: 3,
              title: "Is Solid.js fast?",
              content:
                "Yes! Solid.js is one of the fastest UI frameworks thanks to its efficient reactive system and compiled templates.",
            },
          ]}
        />
      ),
    },
    {
      title: "FAQ Section",
      code: `<Accordion
  items={[
    { id: "q1", title: "How do I get started?", content: "Read the docs..." },
    { id: "q2", title: "What are the features?", content: "Reactivity, performance..." }
  ]}
/>`,
      render: (
        <Accordion
          items={[
            {
              id: "q1",
              title: "How do I get started?",
              content:
                "Start by installing the package and following the quick start guide in our documentation.",
            },
            {
              id: "q2",
              title: "What are the main features?",
              content:
                "Reactive primitives, JSX support, no virtual DOM, fine-grained updates, and excellent performance.",
            },
            {
              id: "q3",
              title: "Is there TypeScript support?",
              content:
                "Yes, Solid.js has first-class TypeScript support with full type definitions.",
            },
          ]}
        />
      ),
    },
    {
      title: "Allow Multiple Open",
      code: `<Accordion allowMultiple items={[...]} />`,
      render: (
        <Accordion
          allowMultiple
          items={[
            {
              id: 1,
              title: "Installation",
              content:
                "npm install solid-js or use your preferred package manager.",
            },
            {
              id: 2,
              title: "Quick Start",
              content: "Create a new project using the Solid starter template.",
            },
            {
              id: 3,
              title: "Documentation",
              content: "Visit solidjs.com for comprehensive documentation.",
            },
          ]}
        />
      ),
    },
    {
      title: "Default Expanded",
      code: `<Accordion defaultExpandedId={1} items={[...]} />`,
      render: (
        <Accordion
          defaultExpandedId={1}
          items={[
            {
              id: 1,
              title: "First Section (Expanded by default)",
              content: "This section is expanded when the accordion loads.",
            },
            {
              id: 2,
              title: "Second Section",
              content: "This section starts collapsed.",
            },
          ]}
        />
      ),
    },
    {
      title: " Settings Sections",
      code: `<Accordion allowMultiple items={[
  { id: "profile", title: "Profile Settings", content: "Edit your name, email, and avatar..." },
  { id: "security", title: "Security", content: "Change password, enable 2FA..." },
  { id: "notifications", title: "Notifications", content: "Manage email and push notifications..." }
]} />`,
      render: (
        <Accordion
          allowMultiple
          items={[
            {
              id: "profile",
              title: "Profile Settings",
              content:
                "Edit your name, email, and avatar. Your profile information is visible to other users.",
            },
            {
              id: "security",
              title: "Security",
              content:
                "Change password, enable two-factor authentication, and manage active sessions.",
            },
            {
              id: "notifications",
              title: "Notifications",
              content:
                "Manage email and push notifications. Control what updates you receive.",
            },
          ]}
        />
      ),
    },
    {
      title: "Custom Plus/Minus Icon (Left)",
      code: `<Accordion
  caretIcon={(expanded) => <PlusMinusIcon expanded={expanded} />}
  caretPosition="left"
  items={[...]}
/>`,
      render: (
        <Accordion
          caretIcon={(expanded) => <PlusMinusIcon expanded={expanded} />}
          caretPosition="left"
          items={[
            {
              id: "pm-1",
              title: "What is a render function icon?",
              content:
                "Passing a function as caretIcon lets the icon react to the expanded state, so you can show different icons when open or closed.",
            },
            {
              id: "pm-2",
              title: "Why place the icon on the left?",
              content:
                "Left-positioned icons are common in tree views and nested lists, giving a clear visual hierarchy at the start of each row.",
            },
            {
              id: "pm-3",
              title: "Can I combine this with allowMultiple?",
              content:
                "Yes! Each item receives its own expanded state, so every plus/minus icon updates independently.",
            },
          ]}
        />
      ),
    },
    {
      title: "Custom Caret Icon (Right)",
      code: `<Accordion
  caretIcon={<ArrowRightIcon />}
  caretPosition="right"
  items={[...]}
/>`,
      render: (
        <Accordion
          caretIcon={<ArrowRightIcon />}
          caretPosition="right"
          items={[
            {
              id: "custom-1",
              title: "What is a custom caret?",
              content:
                "You can pass any JSX element as the caretIcon prop to replace the default chevron with your own icon.",
            },
            {
              id: "custom-2",
              title: "Can I use any icon library?",
              content:
                "Yes! Pass any SVG or icon component via caretIcon. The icon appears on the right by default.",
            },
            {
              id: "custom-3",
              title: "Does it animate?",
              content:
                "The default chevron animates on expand/collapse. Custom icons are rendered as-is without automatic rotation.",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Accordion Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A collapsible content panel for FAQ or expandable sections.
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
