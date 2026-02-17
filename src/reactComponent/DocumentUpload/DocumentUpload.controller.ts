/* -----------------------------------------------------------------------------
 * Domain Business Logic for DocumentUpload
 * -----------------------------------------------------------------------------
 * Keep these functions pure and easily testable. They can be imported in tests
 * or used internally and only belongs to single use/view cannot shared.
 */

import { useState, useEffect, useCallback } from "react";
import { DocumentUploadProps } from "./DocumentUpload.interface";
import { validateFileExtension } from "~/utilities/file.utils";

/**
 * Controller hook for DocumentUpload component.
 * Handles file selection, validation, and state management.
 *
 * @param props - DocumentUploadProps
 * @returns actions and state for the component
 */
export const useDocumentUploadController = (props: DocumentUploadProps) => {
  const {
    mode = "single",
    extension = ["pdf", "doc", "docx"],
    maximumFileSize = 10, // Default 10MB
    onChange,
    value,
  } = props;

  const [files, setFiles] = useState<(File | string)[]>(value || []);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      setFiles(value);
    }
  }, [value]);

  /**
   * Validates a single file against extension and size constraints.
   */
  const validateFile = useCallback(
    (file: File): string | null => {
      if (!validateFileExtension(file, extension)) {
        return `Invalid file extension. Allowed: ${extension.join(", ")}`;
      }
      if (file.size > maximumFileSize * 1024 * 1024) {
        return `File size exceeds ${maximumFileSize}MB`;
      }
      return null;
    },
    [extension, maximumFileSize],
  );

  /**
   * Handles the file input change event.
   * Validates and updates the file state.
   */
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (!selectedFiles || selectedFiles.length === 0) return;

      setLoading(true);
      setInternalError(null);

      const newFiles: File[] = [];
      const fileList = Array.from(selectedFiles);

      try {
        for (const file of fileList) {
          const validationError = validateFile(file);
          if (validationError) {
            setInternalError(validationError);
            setLoading(false);
            return;
          }
          newFiles.push(file);
        }

        let updatedFiles: (File | string)[] = [];
        if (mode === "single") {
          const file = newFiles[0];
          if (file) {
            updatedFiles = [file];
          }
        } else {
          updatedFiles = [...files, ...newFiles];
        }

        setFiles(updatedFiles);
        onChange?.(updatedFiles);
      } catch (err) {
        console.error("Error processing files:", err);
        setInternalError("Failed to process files");
      } finally {
        setLoading(false);
        // Reset input value to allow selecting same file again
        event.target.value = "";
      }
    },
    [files, mode, validateFile, onChange],
  );

  /**
   * Removes a file at the specified index.
   */
  const handleRemoveFile = useCallback(
    (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    },
    [files, onChange],
  );

  return {
    actions: {
      handleFileChange,
      handleRemoveFile,
    },
    state: {
      files,
      error: props.error ? String(props.error) : internalError,
      loading,
    },
  };
};
