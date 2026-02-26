import { createSignal, createEffect } from "solid-js";
import type { DocumentUploadProps } from "./DocumentUpload.interface";
import { validateFileExtension } from "~/utils/file";

export function createDocumentUploadController(props: DocumentUploadProps) {
  const mode = () => props.mode ?? "single";
  const extension = () => props.extension ?? ["pdf", "doc", "docx"];
  const maximumFileSize = () => props.maximumFileSize ?? 10;

  const [files, setFiles] = createSignal<(File | string)[]>(props.value ?? []);
  const [internalError, setInternalError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    if (props.value) setFiles(props.value);
  });

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

      let updated: (File | string)[];
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
    const updated = files().filter((_, i) => i !== index);
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
