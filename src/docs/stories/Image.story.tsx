import { Image } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const ImageStory: Component = () => {
  const propsReference = [
    { name: "src", type: "string", description: "Image source URL" },
    {
      name: "alt",
      type: "string",
      description: "Alt text for accessibility",
    },
    {
      name: "fallbackSrc",
      type: "string",
      description: "Fallback image on error",
    },
    { name: "width", type: "string | number", description: "Image width" },
    { name: "height", type: "string | number", description: "Image height" },
    {
      name: "loading",
      type: '"lazy" | "eager"',
      default: '"lazy"',
      description: "Loading strategy",
    },
    {
      name: "onLoad",
      type: "(event: Event) => void",
      description: "Load handler",
    },
    {
      name: "onError",
      type: "(event: Event) => void",
      description: "Error handler",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Basic Image",
      code: `<Image src="https://picsum.photos/400/300" alt="Example" />`,
      render: (
        <Image src="https://picsum.photos/seed/story1/400/300" alt="Example" />
      ),
    },
    {
      title: "With Fallback",
      code: `<Image src="broken.jpg" fallbackSrc="placeholder.jpg" alt="With fallback" />`,
      render: (
        <Image
          src="https://invalid-url-that-does-not-exist.jpg"
          fallbackSrc="https://picsum.photos/seed/fallback/400/300"
          alt="With fallback"
        />
      ),
    },
    {
      title: "Fixed Dimensions",
      code: `<Image src="https://picsum.photos/400/300" alt="Fixed size" width={400} height={300} />`,
      render: (
        <Image
          src="https://picsum.photos/seed/story2/400/300"
          alt="Fixed size"
          width={400}
          height={300}
        />
      ),
    },
    {
      title: "Eager Loading",
      code: `<Image src="https://picsum.photos/400/300" alt="Eager load" loading="eager" />`,
      render: (
        <Image
          src="https://picsum.photos/seed/story3/400/300"
          alt="Eager load"
          loading="eager"
        />
      ),
    },
    {
      title: "Rounded Image",
      code: `<Image src="https://picsum.photos/200/200" alt="Rounded" class="rounded-full" width={200} height={200} />`,
      render: (
        <Image
          src="https://picsum.photos/seed/avatar/200/200"
          alt="Rounded"
          class="rounded-full"
          width={200}
          height={200}
        />
      ),
    },
    {
      title: " Profile Card",
      code: `<div class="flex items-center gap-4 p-4 border rounded-lg max-w-sm">
  <Image
    src="https://picsum.photos/seed/profile/80/80"
    alt="Profile"
    class="rounded-full"
    width={80}
    height={80}
  />
  <div>
    <h3 class="font-semibold">John Doe</h3>
    <p class="text-sm text-gray-500">Software Engineer</p>
  </div>
</div>`,
      render: (
        <div class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <Image
            src="https://picsum.photos/seed/profile/80/80"
            alt="Profile"
            class="rounded-full"
            width={80}
            height={80}
          />
          <div>
            <h3 class="font-semibold">John Doe</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Software Engineer
            </p>
          </div>
        </div>
      ),
    },
    {
      title: " Product Card",
      code: `<div class="border rounded-lg overflow-hidden max-w-xs">
  <Image src="https://picsum.photos/seed/product/400/300" alt="Product" width={400} height={300} />
  <div class="p-4">
    <h3 class="font-semibold">Product Name</h3>
    <p class="text-sm text-gray-500 mb-2">Product description here</p>
    <p class="font-bold">$99.99</p>
  </div>
</div>`,
      render: (
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-w-xs">
          <Image
            src="https://picsum.photos/seed/product/400/300"
            alt="Product"
            width={400}
            height={300}
          />
          <div class="p-4">
            <h3 class="font-semibold">Product Name</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Product description here
            </p>
            <p class="font-bold">$99.99</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Image Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          An image component with fallback support.
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
