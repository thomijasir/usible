import { InfoBox, Input, Button } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const InfoBoxStory: Component = () => {
  const propsReference = [
    {
      name: "description",
      type: "string",
      description: "Main message content",
    },
    { name: "title", type: "string", description: "Optional title" },
    {
      name: "color",
      type: '"primary" | "secondary" | "ternary" | "text" | "success" | "warning" | "error"',
      default: '"primary"',
      description: "Color theme",
    },
    {
      name: "leftIcon",
      type: "JSX.Element",
      description: "Icon displayed on the left",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Info Box Types",
      code: `<InfoBox description="This is an info message" color="primary" />
<InfoBox description="Success!" color="success" />
<InfoBox description="Warning!" color="warning" />
<InfoBox description="Error occurred" color="error" />`,
      render: (
        <div class="flex flex-col gap-4">
          <InfoBox description="This is an info message" color="primary" />
          <InfoBox description="Success!" color="success" />
          <InfoBox description="Warning!" color="warning" />
          <InfoBox description="Error occurred" color="error" />
        </div>
      ),
    },
    {
      title: "With Title",
      code: `<InfoBox title="Important Notice" description="Please read the terms carefully before proceeding." />`,
      render: (
        <InfoBox
          title="Important Notice"
          description="Please read the terms carefully before proceeding."
        />
      ),
    },
    {
      title: "Success Message",
      code: `<InfoBox title="Success!" description="Your changes have been saved successfully." color="success" />`,
      render: (
        <InfoBox
          title="Success!"
          description="Your changes have been saved successfully."
          color="success"
        />
      ),
    },
    {
      title: "Warning Message",
      code: `<InfoBox title="Warning" description="This action cannot be undone." color="warning" />`,
      render: (
        <InfoBox
          title="Warning"
          description="This action cannot be undone."
          color="warning"
        />
      ),
    },
    {
      title: "Error Message",
      code: `<InfoBox title="Error" description="Something went wrong. Please try again." color="error" />`,
      render: (
        <InfoBox
          title="Error"
          description="Something went wrong. Please try again."
          color="error"
        />
      ),
    },
    {
      title: " Form Status",
      code: `<div class="space-y-4 max-w-md">
  <InfoBox
    title="Form Incomplete"
    description="Please fill in all required fields marked with * before submitting."
    color="warning"
  />
  <Input label="Name *" placeholder="Your name" />
  <Input label="Email *" placeholder="your@email.com" />
  <Button block>Submit</Button>
</div>`,
      render: (
        <div class="space-y-4 max-w-md">
          <InfoBox
            title="Form Incomplete"
            description="Please fill in all required fields marked with * before submitting."
            color="warning"
          />
          <Input label="Name *" placeholder="Your name" />
          <Input label="Email *" placeholder="your@email.com" />
        </div>
      ),
    },
    {
      title: " Account Alert",
      code: `<div class="space-y-4 max-w-md">
  <InfoBox
    title="Verify Your Email"
    description="We sent a verification link to your email address. Please check your inbox."
    color="primary"
  />
  <div class="flex gap-2">
    <Button variant="outlined">Resend Email</Button>
    <Button>Check Status</Button>
  </div>
</div>`,
      render: (
        <div class="space-y-4 max-w-md">
          <InfoBox
            title="Verify Your Email"
            description="We sent a verification link to your email address. Please check your inbox."
            color="primary"
          />
          <div class="flex gap-2">
            <Button variant="outlined">Resend Email</Button>
            <Button>Check Status</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          InfoBox Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          An alert box for displaying informational messages.
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
