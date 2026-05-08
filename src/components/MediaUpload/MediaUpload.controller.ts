import { createSignal, createEffect } from "solid-js";
import type { MediaUploadProps } from "./MediaUpload.interface";
import { validateFileExtension } from "~/utils/file";

export function createMediaUploadController(props: MediaUploadProps) {
  const mode = () => props.mode ?? "single";
  const extension = () => props.extension ?? ["png", "jpg", "jpeg"];
  const maximumFileSize = () => props.maximumFileSize ?? 5;

  const [files, setFiles] = createSignal<File[]>(props.value ?? []);
  const [internalError, setInternalError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    if (props.value) setFiles(props.value);
  });

  const validateMaxFiles = (selectedCount: number): string | null => {
    if (mode() === "multi" && props.maxFiles !== undefined) {
      if (files().length + selectedCount > props.maxFiles) {
        return `You can only upload a maximum of ${props.maxFiles} files.`;
      }
    }
    return null;
  };

  const validateFile = (file: File): string | null => {
    if (!validateFileExtension(file, extension())) {
      return `Invalid file extension. Allowed: ${extension().join(", ")}`;
    }
    if (file.size > maximumFileSize() * 1024 * 1024) {
      return `File size exceeds ${maximumFileSize()}MB`;
    }
    return null;
  };

  const handleFileChange = async (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const selected = input.files;
    if (!selected || selected.length === 0) return;

    const maxFilesError = validateMaxFiles(selected.length);
    if (maxFilesError) {
      setInternalError(maxFilesError);
      input.value = "";
      return;
    }

    setLoading(true);
    setInternalError(null);
    const newFiles: File[] = [];

    try {
      for (const file of Array.from(selected)) {
        const err = validateFile(file);
        if (err) {
          setInternalError(err);
          setLoading(false);
          return;
        }
        newFiles.push(file);
      }

      let updated: File[];
      if (mode() === "single") {
        updated = newFiles[0] ? [newFiles[0]] : [];
      } else {
        updated = [...files(), ...newFiles];
      }

      setFiles(updated);
      props.onChange?.(updated);
    } catch {
      setInternalError("Failed to process files");
    } finally {
      setLoading(false);
      input.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    if (props.minFiles !== undefined && files().length <= props.minFiles) {
      setInternalError(`You must upload at least ${props.minFiles} files.`);
      return;
    }

    const updated = files().filter((_, i) => i !== index);
    setInternalError(null);
    setFiles(updated);
    props.onChange?.(updated);
  };

  return {
    state: {
      files,
      loading,
      error: () => (props.error ? String(props.error) : internalError()),
    },
    actions: { handleFileChange, handleRemoveFile },
  };
}
