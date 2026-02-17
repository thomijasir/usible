import { HtmlRender } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const HtmlRenderStory: Component = () => {
  const propsReference = [
    { name: "html", type: "string", description: "HTML string to render" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Render HTML",
      code: `<HtmlRender html="<p><strong>Bold</strong> text</p>" />`,
      render: <HtmlRender html="<p><strong>Bold</strong> text</p>" />,
    },
    {
      title: "Rich Content",
      code: `<HtmlRender html="<div><h3>Title</h3><p>Paragraph with <a href='#'>link</a></p></div>" />`,
      render: (
        <HtmlRender html="<div><h3 class='text-lg font-semibold mb-2'>Title</h3><p>Paragraph with <a href='#' class='text-blue-500 underline'>link</a></p></div>" />
      ),
    },
    {
      title: "List",
      code: `<HtmlRender html="<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>" />`,
      render: (
        <HtmlRender html="<ul class='list-disc list-inside'><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>" />
      ),
    },
    {
      title: "Sanitized Output",
      code: `<HtmlRender html="<p>Safe</p><script>alert('XSS')</script>" />`,
      render: (
        <HtmlRender html="<p>Safe content - script tags are removed</p><script>alert('This will not execute')</script>" />
      ),
    },
    {
      title: "Email Content",
      code: `<HtmlRender html="<div style='padding: 16px; background: #f5f5f5; border-radius: 8px;'><p>Dear User,</p><p>Thank you for subscribing!</p></div>" />`,
      render: (
        <HtmlRender html="<div style='padding: 16px; background: #f5f5f5; border-radius: 8px;'><p>Dear User,</p><p>Thank you for subscribing!</p></div>" />
      ),
    },
    {
      title: " Rich Text Editor Output",
      code: `<div class="border rounded-lg p-4 max-w-lg">
  <div class="flex gap-2 mb-4 border-b pb-2">
    <button class="font-bold">B</button>
    <button class="italic">I</button>
    <button class="underline">U</button>
  </div>
  <HtmlRender html="<h2>Article Title</h2><p>This is <strong>bold</strong> and <em>italic</em> text.</p><ul><li>Item 1</li><li>Item 2</li></ul>" />
</div>`,
      render: (
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-w-lg">
          <div class="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            <button class="font-bold px-2">B</button>
            <button class="italic px-2">I</button>
            <button class="underline px-2">U</button>
          </div>
          <HtmlRender html="<h2 class='text-xl font-bold mb-2'>Article Title</h2><p class='mb-2'>This is <strong>bold</strong> and <em>italic</em> text.</p><ul class='list-disc list-inside'><li>Item 1</li><li>Item 2</li></ul>" />
        </div>
      ),
    },
    {
      title: " Notification Content",
      code: `<div class="space-y-2 max-w-sm">
  <div class="p-3 border rounded-lg">
    <HtmlRender html="<strong>John Doe</strong> commented on your post" />
    <span class="text-xs text-gray-400">2 min ago</span>
  </div>
  <div class="p-3 border rounded-lg">
    <HtmlRender html="<strong>Jane Smith</strong> liked your photo" />
    <span class="text-xs text-gray-400">5 min ago</span>
  </div>
</div>`,
      render: (
        <div class="space-y-2 max-w-sm">
          <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <HtmlRender html="<strong>John Doe</strong> commented on your post" />
            <span class="text-xs text-gray-400">2 min ago</span>
          </div>
          <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <HtmlRender html="<strong>Jane Smith</strong> liked your photo" />
            <span class="text-xs text-gray-400">5 min ago</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          HtmlRender Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Renders HTML safely using DOMPurify for sanitization.
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
