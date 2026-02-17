import { Skeleton } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const SkeletonStory: Component = () => {
  const propsReference = [
    {
      name: "variant",
      type: '"text" | "rectangular" | "circular"',
      default: '"text"',
      description: "Skeleton shape",
    },
    {
      name: "width",
      type: "string | number",
      description: "Width of skeleton",
    },
    {
      name: "height",
      type: "string | number",
      description: "Height of skeleton",
    },
    {
      name: "animation",
      type: '"pulse" | "none"',
      default: '"pulse"',
      description: "Animation style",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Skeleton Variants",
      code: `<Skeleton variant="text" width={200} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={200} height={100} />`,
      render: (
        <div class="flex flex-col gap-4">
          <Skeleton variant="text" width={200} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={200} height={100} />
        </div>
      ),
    },
    {
      title: "Card Loading",
      code: `<div class="p-4 border rounded-lg">
  <div class="flex gap-3 mb-4">
    <Skeleton variant="circular" width={48} height={48} />
    <div class="flex-1">
      <Skeleton variant="text" height={20} />
      <Skeleton variant="text" height={16} width="60%" />
    </div>
  </div>
  <Skeleton variant="rectangular" height={100} />
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <div class="flex gap-3 mb-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div class="flex-1">
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={16} width="60%" />
            </div>
          </div>
          <Skeleton variant="rectangular" height={100} />
        </div>
      ),
    },
    {
      title: "List Loading",
      code: `<div class="space-y-2">
  <Skeleton variant="text" />
  <Skeleton variant="text" width="80%" />
  <Skeleton variant="text" width="60%" />
</div>`,
      render: (
        <div class="space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      ),
    },
    {
      title: "No Animation",
      code: `<Skeleton variant="rectangular" width={200} height={100} animation="none" />`,
      render: (
        <Skeleton
          variant="rectangular"
          width={200}
          height={100}
          animation="none"
        />
      ),
    },
    {
      title: "Profile Card",
      code: `<div class="p-4 border rounded-lg flex flex-col items-center">
  <Skeleton variant="circular" width={80} height={80} />
  <Skeleton variant="text" width={120} class="mt-2" />
  <Skeleton variant="text" width={80} />
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center">
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width={120} class="mt-2" />
          <Skeleton variant="text" width={80} />
        </div>
      ),
    },
    {
      title: " Loading List",
      code: `<div class="space-y-3">
  {[1, 2, 3].map(() => (
    <div class="flex gap-3 p-3 border rounded-lg">
      <Skeleton variant="circular" width={40} height={40} />
      <div class="flex-1">
        <Skeleton variant="text" height={16} width="40%" />
        <Skeleton variant="text" height={14} width="70%" />
      </div>
    </div>
  ))}
</div>`,
      render: (
        <div class="space-y-3">
          <div class="flex gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Skeleton variant="circular" width={40} height={40} />
            <div class="flex-1">
              <Skeleton variant="text" height={16} width="40%" />
              <Skeleton variant="text" height={14} width="70%" />
            </div>
          </div>
          <div class="flex gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Skeleton variant="circular" width={40} height={40} />
            <div class="flex-1">
              <Skeleton variant="text" height={16} width="40%" />
              <Skeleton variant="text" height={14} width="70%" />
            </div>
          </div>
          <div class="flex gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Skeleton variant="circular" width={40} height={40} />
            <div class="flex-1">
              <Skeleton variant="text" height={16} width="40%" />
              <Skeleton variant="text" height={14} width="70%" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: " Dashboard Widget",
      code: `<div class="p-4 border rounded-lg">
  <div class="flex justify-between items-center mb-4">
    <Skeleton variant="text" width={100} height={20} />
    <Skeleton variant="text" width={60} height={14} />
  </div>
  <div class="grid grid-cols-3 gap-4">
    <Skeleton variant="rectangular" height={60} />
    <Skeleton variant="rectangular" height={60} />
    <Skeleton variant="rectangular" height={60} />
  </div>
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={60} height={14} />
          </div>
          <div class="grid grid-cols-3 gap-4">
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Skeleton Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A loading placeholder that mimics content shape.
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
