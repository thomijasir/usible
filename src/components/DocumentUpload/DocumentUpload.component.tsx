import { Show, For } from "solid-js";
import { createDocumentUploadController } from "./DocumentUpload.controller";
import type { DocumentUploadProps } from "./DocumentUpload.interface";
import { Loader } from "../Loader";
import { Button } from "../Button";
import { formatFileSize } from "~/utils/file";
import { TrashIcon, ImageErrorIcon, DocumentIcon, PhotoUpIcon } from "~/assets/icons";

export function DocumentUpload(props: DocumentUploadProps) {
  const { state, actions } = createDocumentUploadController(props);
  let fileInputRef: HTMLInputElement | undefined;

  const mode = () => props.mode ?? "single";
  const accept = () => props.extension?.map((e) => `.${e}`).join(",");

  const getFileName = (file: File | string) => {
    const name = file instanceof File ? file.name : file;
    return typeof name === "string" && name.includes("-")
      ? name.split("-").slice(1, -1).join("-") || name
      : name;
  };

  const FilePreview = (file: File | string) => (
    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-2">
      <DocumentIcon class="w-8 h-8 text-gray-500 mb-2" />
      <span class="text-xs text-gray-600 text-center break-all line-clamp-2">
        {getFileName(file)}
      </span>
    </div>
  );

  const UploadArea = () => (
    <div
      onClick={() => fileInputRef?.click()}
      class={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${state.error() ? "border-red-300 bg-red-50" : "border-gray-300 hover:bg-gray-50"}`}>
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <DocumentIcon class={`w-10 h-10 mb-3 ${state.error() ? "text-red-400" : "text-gray-400"}`} />
        <p class={`mb-2 text-sm ${state.error() ? "text-red-500" : "text-gray-500"}`}>
          <span class="font-semibold">Click to upload</span>
        </p>
        <p class="text-xs text-gray-500">
          {props.extension ? props.extension.join(", ").toUpperCase() : "Documents"}
        </p>
      </div>
    </div>
  );

  return (
    <div class={props.fullWidth ? "w-full" : "w-auto"}>
      <Show when={props.label}>
        <label class="block mb-2 text-sm font-medium text-gray-900">
          {props.label}
          <Show when={props.required}> <span class="text-red-500">*</span></Show>
        </label>
      </Show>

      <input
        ref={fileInputRef}
        type="file"
        class="hidden"
        accept={accept()}
        multiple={mode() === "multi"}
        onChange={actions.handleFileChange}
      />

      <Show
        when={!state.loading()}
        fallback={
          <div class="flex items-center justify-center w-full h-48 border-2 border-gray-200 rounded-lg bg-gray-50">
            <Loader size="large" />
          </div>
        }>
        <Show when={mode() === "single"}>
          <Show when={state.files().length > 0} fallback={<UploadArea />}>
            <div class="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
              {FilePreview(state.files()[0]!)}
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                onClick={() => fileInputRef?.click()}>
                <p class="text-white font-medium">Tap to replace</p>
              </div>
              <Button
                variant="filled"
                color="error"
                size="small"
                onClick={() => actions.handleRemoveFile(0)}
                class="absolute top-2 right-2 z-10 rounded-full p-2 min-w-0">
                <TrashIcon class="w-5 h-5" />
              </Button>
              <Show when={props.showFileSize && state.files()[0] instanceof File}>
                <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded pointer-events-none">
                  {formatFileSize((state.files()[0] as File).size)}
                </div>
              </Show>
            </div>
          </Show>
        </Show>

        <Show when={mode() === "multi"}>
          <Show when={state.files().length > 0} fallback={<UploadArea />}>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <For each={state.files()}>
                {(file, i) => (
                  <div class="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                    {FilePreview(file)}
                    <Button
                      variant="filled"
                      color="error"
                      size="small"
                      onClick={() => actions.handleRemoveFile(i())}
                      class="absolute top-2 right-2 rounded-full p-1.5 min-w-0">
                      <TrashIcon class="w-4 h-4" />
                    </Button>
                    <Show when={props.showFileSize && file instanceof File}>
                      <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded pointer-events-none">
                        {formatFileSize((file as File).size)}
                      </div>
                    </Show>
                  </div>
                )}
              </For>
              <div
                onClick={() => fileInputRef?.click()}
                class="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center transition-colors">
                <PhotoUpIcon class="w-8 h-8 text-gray-400 mb-2" />
                <span class="text-sm text-gray-500 font-medium">Add more</span>
              </div>
            </div>
          </Show>
        </Show>
      </Show>

      <Show when={state.error()}>
        <p class="mt-2 text-sm text-red-600 flex items-center gap-1">
          <ImageErrorIcon class="w-4 h-4" />
          {state.error()}
        </p>
      </Show>

      <Show when={!state.error() && props.helperText}>
        <p class="mt-2 text-sm text-gray-500">{props.helperText}</p>
      </Show>
    </div>
  );
}
