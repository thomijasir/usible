import { DocumentUpload } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const DocumentUploadStory: Component = () => {
  const propsReference = [
    {
      name: "mode",
      type: '"single" | "multi"',
      default: '"single"',
      description: "Upload mode — single file or multiple files",
    },
    { name: "label", type: "string", description: "Upload field label" },
    {
      name: "value",
      type: "(File | string)[]",
      description: "Controlled file list (File objects or remote URLs)",
    },
    {
      name: "onChange",
      type: "(files: (File | string)[]) => void",
      description: "Change handler",
    },
    {
      name: "extension",
      type: "string[]",
      description: "Allowed file extensions, e.g. ['pdf', 'docx']",
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
      title: "Single File Upload",
      code: `<DocumentUpload label="Contract" />`,
      render: (
        <div class="max-w-sm">
          <DocumentUpload label="Contract" />
        </div>
      ),
    },
    {
      title: "Multi File Upload",
      code: `<DocumentUpload mode="multi" label="Attachments" />`,
      render: (
        <div class="max-w-sm">
          <DocumentUpload mode="multi" label="Attachments" />
        </div>
      ),
    },
    {
      title: "With Extension Filter",
      code: `<DocumentUpload
  label="PDF Documents Only"
  extension={["pdf"]}
  helperText="Only PDF files are accepted"
/>`,
      render: (
        <div class="max-w-sm">
          <DocumentUpload
            label="PDF Documents Only"
            extension={["pdf"]}
            helperText="Only PDF files are accepted"
          />
        </div>
      ),
    },
    {
      title: "Required Field",
      code: `<DocumentUpload label="ID Document" required />`,
      render: (
        <div class="max-w-sm">
          <DocumentUpload label="ID Document" required />
        </div>
      ),
    },
    {
      title: "With Error",
      code: `<DocumentUpload
  label="Proof of Address"
  error="File must be less than 5MB"
/>`,
      render: (
        <div class="max-w-sm">
          <DocumentUpload label="Proof of Address" error="File must be less than 5MB" />
        </div>
      ),
    },
    {
      title: "Full Width",
      code: `<DocumentUpload label="Supporting Documents" fullWidth />`,
      render: <DocumentUpload label="Supporting Documents" fullWidth />,
    },
    {
      title: " KYC Document Upload",
      code: `<div class="space-y-4 max-w-sm">
  <DocumentUpload
    label="ID Card (Front)"
    required
    extension={["jpg", "jpeg", "png", "pdf"]}
    helperText="JPEG, PNG, or PDF — max 5MB"
  />
  <DocumentUpload
    label="ID Card (Back)"
    required
    extension={["jpg", "jpeg", "png", "pdf"]}
    helperText="JPEG, PNG, or PDF — max 5MB"
  />
  <DocumentUpload
    mode="multi"
    label="Supporting Documents"
    extension={["pdf", "docx"]}
    maxFiles={3}
    helperText="Upload up to 3 supporting documents"
  />
</div>`,
      render: (
        <div class="space-y-4 max-w-sm">
          <DocumentUpload
            label="ID Card (Front)"
            required
            extension={["jpg", "jpeg", "png", "pdf"]}
            helperText="JPEG, PNG, or PDF — max 5MB"
          />
          <DocumentUpload
            label="ID Card (Back)"
            required
            extension={["jpg", "jpeg", "png", "pdf"]}
            helperText="JPEG, PNG, or PDF — max 5MB"
          />
          <DocumentUpload
            mode="multi"
            label="Supporting Documents"
            extension={["pdf", "docx"]}
            maxFiles={3}
            helperText="Upload up to 3 supporting documents"
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          DocumentUpload Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A file upload component for documents with single and multi-file modes, extension
          filtering, and file size display.
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
