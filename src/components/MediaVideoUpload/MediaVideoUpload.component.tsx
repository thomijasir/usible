import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { MediaVideoUploadProps } from "./MediaVideoUpload.interface";
import { Button } from "../Button";

export function MediaVideoUpload(props: MediaVideoUploadProps) {
  const [file, setFile] = createSignal<File | null>(props.value ?? null);
  const [previewUrl, setPreviewUrl] = createSignal<string | null>(null);
  const [internalError, setInternalError] = createSignal<string | null>(null);
  let inputRef: HTMLInputElement | undefined;

  const maximumFileSize = () => props.maximumFileSize ?? 50;
  const error = () => (props.error ? String(props.error) : internalError());

  createEffect(() => {
    setFile(props.value ?? null);
  });

  createEffect(() => {
    const currentFile = file();
    if (!currentFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(currentFile);
    setPreviewUrl(url);
    onCleanup(() => URL.revokeObjectURL(url));
  });

  const handleFileChange = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const selectedFile = input.files?.[0] ?? null;

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("video/")) {
      setInternalError("Invalid file type. Please upload a video.");
      input.value = "";
      return;
    }

    if (selectedFile.size > maximumFileSize() * 1024 * 1024) {
      setInternalError(`File size exceeds ${maximumFileSize()}MB`);
      input.value = "";
      return;
    }

    setInternalError(null);
    setFile(selectedFile);
    props.onChange?.(selectedFile);
    input.value = "";
  };

  const handleRemove = () => {
    setInternalError(null);
    setFile(null);
    props.onChange?.(null);
  };

  return (
    <div class={twMerge("flex flex-col gap-2", props.class)}>
      <Show when={props.label}>
        <label class="text-sm font-medium text-foreground">{props.label}</label>
      </Show>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        class="hidden"
        onChange={handleFileChange}
      />

      <Show
        when={file() && previewUrl()}
        fallback={
          <button
            type="button"
            onClick={() => inputRef?.click()}
            class={twMerge(
              "flex h-48 w-full items-center justify-center rounded-usible border-2 border-dashed text-sm font-medium transition-colors",
              error()
                ? "border-error-light bg-error-50 text-error"
                : "border-border-strong text-foreground-muted hover:bg-surface-hover",
            )}>
            Click to upload video
          </button>
        }>
        <div class="overflow-hidden rounded-usible border border-border">
          <video
            src={previewUrl() ?? undefined}
            controls
            class="h-48 w-full bg-backdrop object-contain"
          />
          <div class="flex items-center justify-between gap-3 p-3">
            <span class="truncate text-sm text-foreground-muted">
              {file()?.name}
            </span>
            <div class="flex shrink-0 gap-2">
              <Button
                variant="outlined"
                size="small"
                onClick={() => inputRef?.click()}>
                Replace
              </Button>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={handleRemove}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </Show>

      <Show when={error()}>
        <p class="text-sm text-error">{error()}</p>
      </Show>

      <Show when={!error() && props.helperText}>
        <p class="text-sm text-foreground-muted">{props.helperText}</p>
      </Show>
    </div>
  );
}
