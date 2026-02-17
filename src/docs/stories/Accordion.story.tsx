import { Accordion } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

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
      title: " FAQ Page",
      code: `<div class="max-w-2xl">
  <h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
  <Accordion items={[
    { id: 1, title: "How do I reset my password?", content: "Click 'Forgot Password' on the login page..." },
    { id: 2, title: "What payment methods do you accept?", content: "We accept Visa, Mastercard, PayPal..." },
    { id: 3, title: "Can I cancel my subscription?", content: "Yes, you can cancel anytime from your account..." }
  ]} />
</div>`,
      render: (
        <div class="max-w-2xl">
          <h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion
            items={[
              {
                id: 1,
                title: "How do I reset my password?",
                content:
                  "Click 'Forgot Password' on the login page and follow the instructions sent to your email.",
              },
              {
                id: 2,
                title: "What payment methods do you accept?",
                content:
                  "We accept Visa, Mastercard, PayPal, and Apple Pay for all subscriptions.",
              },
              {
                id: 3,
                title: "Can I cancel my subscription?",
                content:
                  "Yes, you can cancel anytime from your account settings. No cancellation fees apply.",
              },
            ]}
          />
        </div>
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
