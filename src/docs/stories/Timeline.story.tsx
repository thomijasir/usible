import { Timeline } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const TimelineStory: Component = () => {
  const propsReference = [
    {
      name: "items",
      type: "TimelineItem[]",
      description: "Array of timeline items",
    },
    {
      name: "variant",
      type: '"default" | "numbered"',
      default: '"default"',
      description: "Display variant",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Timeline",
      code: `<Timeline items={[
  { title: "Step 1", description: "First step", status: "completed" },
  { title: "Step 2", description: "Second step", status: "pending" }
]} />`,
      render: (
        <Timeline
          items={[
            {
              title: "Order Placed",
              description: "Your order has been placed",
              status: "completed",
            },
            {
              title: "Processing",
              description: "Order is being processed",
              status: "pending",
            },
            {
              title: "Shipped",
              description: "Order has been shipped",
              status: "pending",
            },
            {
              title: "Delivered",
              description: "Order delivered",
              status: "pending",
            },
          ]}
        />
      ),
    },
    {
      title: "Numbered Timeline",
      code: `<Timeline variant="numbered" items={[
  { title: "Step 1", description: "First step" },
  { title: "Step 2", description: "Second step" }
]} />`,
      render: (
        <Timeline
          variant="numbered"
          items={[
            {
              title: "Create Account",
              description: "Sign up for a new account",
            },
            {
              title: "Verify Email",
              description: "Confirm your email address",
            },
            {
              title: "Setup Profile",
              description: "Complete your profile information",
            },
            {
              title: "Start Using",
              description: "Begin exploring the platform",
            },
          ]}
        />
      ),
    },
    {
      title: "Order Status",
      code: `<Timeline items={[
  { title: "Confirmed", description: "Order #12345 confirmed", status: "completed" },
  { title: "Processing", description: "Preparing your items", status: "completed" },
  { title: "In Transit", description: "Package is on the way", status: "active" },
  { title: "Delivered", description: "Expected by Friday", status: "pending" }
]} />`,
      render: (
        <Timeline
          items={[
            {
              title: "Confirmed",
              description: "Order #12345 confirmed",
              status: "completed",
            },
            {
              title: "Processing",
              description: "Preparing your items",
              status: "completed",
            },
            {
              title: "In Transit",
              description: "Package is on the way",
              status: "pending",
            },
            {
              title: "Delivered",
              description: "Expected by Friday",
              status: "pending",
            },
          ]}
        />
      ),
    },
    {
      title: " Onboarding Steps",
      code: `<div class="p-4 border rounded-lg max-w-md">
  <h3 class="font-semibold mb-4">Account Setup Progress</h3>
  <Timeline variant="numbered" items={[
    { title: "Create Account", description: "Basic information" },
    { title: "Verify Email", description: "Confirm your email address" },
    { title: "Setup Profile", description: "Add your details" },
    { title: "Start Using", description: "You're all set!" }
  ]} />
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-md">
          <h3 class="font-semibold mb-4">Account Setup Progress</h3>
          <Timeline
            variant="numbered"
            items={[
              { title: "Create Account", description: "Basic information" },
              {
                title: "Verify Email",
                description: "Confirm your email address",
              },
              { title: "Setup Profile", description: "Add your details" },
              { title: "Start Using", description: "You're all set!" },
            ]}
          />
        </div>
      ),
    },
    {
      title: " Transaction History",
      code: `<div class="max-w-md">
  <h3 class="font-semibold mb-4">Recent Activity</h3>
  <Timeline items={[
    { title: "Payment Received", description: "$150.00 from John D.", date: "2 hours ago", status: "completed" },
    { title: "Transfer Sent", description: "$50.00 to Savings", date: "Yesterday", status: "completed" },
    { title: "Deposit Pending", description: "$200.00 from Bank", date: "2 days ago", status: "pending" }
  ]} />
</div>`,
      render: (
        <div class="max-w-md">
          <h3 class="font-semibold mb-4">Recent Activity</h3>
          <Timeline
            items={[
              {
                title: "Payment Received",
                description: "$150.00 from John D.",
                date: "2 hours ago",
                status: "completed",
              },
              {
                title: "Transfer Sent",
                description: "$50.00 to Savings",
                date: "Yesterday",
                status: "completed",
              },
              {
                title: "Deposit Pending",
                description: "$200.00 from Bank",
                date: "2 days ago",
                status: "pending",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Timeline Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A vertical timeline for displaying sequential events.
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
