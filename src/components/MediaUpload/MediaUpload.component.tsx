import { createEffect, createSignal, For, onCleanup, Show } from "solid-js";
import { createMediaUploadController } from "./MediaUpload.controller";
import type { MediaUploadProps } from "./MediaUpload.interface";
import { Loader } from "../Loader";
import { Button } from "../Button";
import { Image } from "../Image";
import { formatFileSize } from "~/utils/file";
import { PhotoUpIcon, TrashIcon, ImageErrorIcon } from "~/assets/icons";

function PreviewImage(props: { file: File; alt: string; class?: string }) {
  const [src, setSrc] = createSignal("");

  createEffect(() => {
    const url = URL.createObjectURL(props.file);
    setSrc(url);
    onCleanup(() => URL.revokeObjectURL(url));
  });

  return <Image src={src()} alt={props.alt} class={props.class} />;
}

export function MediaUpload(props: MediaUploadProps) {
  const { state, actions } = createMediaUploadController(props);
  let fileInputRef: HTMLInputElement | undefined;

  const mode = () => props.mode ?? "single";
  const accept = () => props.extension?.map((e) => `.${e}`).join(",");

  const UploadArea = () => (
    <div
      onClick={() => fileInputRef?.click()}
      class={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-usible cursor-pointer transition-colors ${state.error() ? "border-error-light bg-error-50" : "border-border-strong hover:bg-surface-hover"}`}>
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <PhotoUpIcon
          class={`w-10 h-10 mb-3 ${state.error() ? "text-error-light" : "text-foreground-subtle"}`}
        />
        <p
          class={`mb-2 text-sm ${state.error() ? "text-error" : "text-foreground-muted"}`}>
          <span class="font-semibold">Click to upload</span>
        </p>
        <p class="text-xs text-foreground-muted">
          {props.extension
            ? props.extension.join(", ").toUpperCase()
            : "Images"}
        </p>
      </div>
    </div>
  );

  return (
    <div class={props.fullWidth ? "w-full" : "w-auto"}>
      <Show when={props.label}>
        <label class="block mb-2 text-sm font-medium text-foreground">
          {props.label}
          <Show when={props.required}>
            {" "}
            <span class="text-error">*</span>
          </Show>
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
          <div class="flex items-center justify-center w-full h-48 border-2 border-border rounded-usible bg-surface-muted">
            <Loader size="large" />
          </div>
        }>
        <Show when={mode() === "single"}>
          <Show when={state.files().length > 0} fallback={<UploadArea />}>
            <div class="relative w-full h-48 rounded-usible overflow-hidden border border-border group">
              <PreviewImage
                file={state.files()[0]!}
                alt="Preview"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-backdrop/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                onClick={() => fileInputRef?.click()}>
                <p class="text-inverse font-medium">Tap to replace</p>
              </div>
              <Button
                variant="filled"
                color="error"
                size="small"
                onClick={() => actions.handleRemoveFile(0)}
                class="absolute top-2 right-2 z-10 rounded-usible-pill p-2 min-w-0">
                <TrashIcon class="w-5 h-5" />
              </Button>
              <Show when={props.showFileSize}>
                <div class="absolute bottom-2 right-2 px-2 py-1 bg-backdrop/70 text-inverse text-xs rounded-usible pointer-events-none">
                  {formatFileSize(state.files()[0]!.size)}
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
                  <div class="relative aspect-square rounded-usible overflow-hidden border border-border group">
                    <PreviewImage
                      file={file}
                      alt={`Preview ${i()}`}
                      class="w-full h-full object-cover"
                    />
                    <Button
                      variant="filled"
                      color="error"
                      size="small"
                      onClick={() => actions.handleRemoveFile(i())}
                      class="absolute top-2 right-2 rounded-usible-pill p-1.5 min-w-0">
                      <TrashIcon class="w-4 h-4" />
                    </Button>
                    <Show when={props.showFileSize}>
                      <div class="absolute bottom-2 right-2 px-2 py-1 bg-backdrop/70 text-inverse text-xs rounded-usible pointer-events-none">
                        {formatFileSize(file.size)}
                      </div>
                    </Show>
                  </div>
                )}
              </For>
              <Show
                when={
                  props.maxFiles === undefined ||
                  state.files().length < props.maxFiles
                }>
                <div
                  onClick={() => fileInputRef?.click()}
                  class="relative aspect-square rounded-usible border-2 border-dashed border-border-strong hover:bg-surface-hover cursor-pointer flex flex-col items-center justify-center transition-colors">
                  <PhotoUpIcon class="w-8 h-8 text-foreground-subtle mb-2" />
                  <span class="text-sm text-foreground-muted font-medium">
                    Add more
                  </span>
                </div>
              </Show>
            </div>
          </Show>
        </Show>
      </Show>

      <Show when={state.error()}>
        <p class="mt-2 text-sm text-error flex items-center gap-1">
          <ImageErrorIcon class="w-4 h-4" />
          {state.error()}
        </p>
      </Show>

      <Show when={!state.error() && props.helperText}>
        <p class="mt-2 text-sm text-foreground-muted">{props.helperText}</p>
      </Show>
    </div>
  );
}
