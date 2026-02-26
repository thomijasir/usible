import { MediaUpload } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const MediaUploadStory: Component = () => {
  const propsReference = [
    {
      name: "mode",
      type: '"single" | "multi"',
      default: '"single"',
      description: "Upload mode — single image or multiple images",
    },
    { name: "label", type: "string", description: "Upload field label" },
    { name: "value", type: "File[]", description: "Controlled file list" },
    {
      name: "onChange",
      type: "(files: File[]) => void",
      description: "Change handler",
    },
    {
      name: "extension",
      type: "string[]",
      description: "Allowed file extensions, e.g. ['jpg', 'png', 'webp']",
    },
    {
      name: "maximumFileSize",
      type: "number",
      description: "Maximum file size in bytes",
    },
    {
      name: "minFiles",
      type: "number",
      description: "Minimum number of files required (multi mode)",
    },
    {
      name: "maxFiles",
      type: "number",
      description: "Maximum number of files allowed (multi mode)",
    },
    {
      name: "showFileSize",
      type: "boolean",
      description: "Show a file size badge on the preview",
    },
    { name: "required", type: "boolean", description: "Mark the field as required" },
    {
      name: "error",
      type: "string | boolean",
      description: "Error state or message",
    },
    { name: "helperText", type: "string", description: "Helper text below the upload area" },
    {
      name: "fullWidth",
      type: "boolean",
      description: "Expand the upload area to full container width",
    },
  ];

  const example = [
    {
      title: "Single Image Upload",
      code: `<MediaUpload label="Profile Photo" />`,
      render: (
        <div class="max-w-sm">
          <MediaUpload label="Profile Photo" />
        </div>
      ),
    },
    {
      title: "Multi Image Upload",
      code: `<MediaUpload mode="multi" label="Product Photos" />`,
      render: (
        <div class="max-w-sm">
          <MediaUpload mode="multi" label="Product Photos" />
        </div>
      ),
    },
    {
      title: "With Extension Filter",
      code: `<MediaUpload
  label="Avatar"
  extension={["jpg", "jpeg", "png", "webp"]}
  helperText="JPG, PNG, or WebP — max 2MB"
/>`,
      render: (
        <div class="max-w-sm">
          <MediaUpload
            label="Avatar"
            extension={["jpg", "jpeg", "png", "webp"]}
            helperText="JPG, PNG, or WebP — max 2MB"
          />
        </div>
      ),
    },
    {
      title: "With Max Files Limit",
      code: `<MediaUpload
  mode="multi"
  label="Gallery (max 6)"
  maxFiles={6}
  helperText="Upload up to 6 images"
/>`,
      render: (
        <div class="max-w-sm">
          <MediaUpload
            mode="multi"
            label="Gallery (max 6)"
            maxFiles={6}
            helperText="Upload up to 6 images"
          />
        </div>
      ),
    },
    {
      title: "Required Field",
      code: `<MediaUpload label="Cover Image" required />`,
      render: (
        <div class="max-w-sm">
          <MediaUpload label="Cover Image" required />
        </div>
      ),
    },
    {
      title: "With Error",
      code: `<MediaUpload
  label="Profile Photo"
  error="Image must be less than 2MB"
/>`,
      render: (
        <div class="max-w-sm">
          <MediaUpload label="Profile Photo" error="Image must be less than 2MB" />
        </div>
      ),
    },
    {
      title: "Full Width",
      code: `<MediaUpload label="Banner Image" fullWidth />`,
      render: <MediaUpload label="Banner Image" fullWidth />,
    },
    {
      title: " Product Listing Form",
      code: `<div class="space-y-4 max-w-sm">
  <MediaUpload
    label="Main Product Photo"
    required
    extension={["jpg", "jpeg", "png"]}
    helperText="First image shown in search results"
  />
  <MediaUpload
    mode="multi"
    label="Additional Photos"
    maxFiles={5}
    extension={["jpg", "jpeg", "png", "webp"]}
    helperText="Upload up to 5 additional photos"
  />
</div>`,
      render: (
        <div class="space-y-4 max-w-sm">
          <MediaUpload
            label="Main Product Photo"
            required
            extension={["jpg", "jpeg", "png"]}
            helperText="First image shown in search results"
          />
          <MediaUpload
            mode="multi"
            label="Additional Photos"
            maxFiles={5}
            extension={["jpg", "jpeg", "png", "webp"]}
            helperText="Upload up to 5 additional photos"
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          MediaUpload Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          An image upload component with live preview, single and multi-file modes, and optional
          file size display.
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
