/* -----------------------------------------------------------------------------
 * Domain Business Logic for MediaUpload
 * -----------------------------------------------------------------------------
 * Keep these functions pure and easily testable. They can be imported in tests
 * or used internally and only belongs to single use/view cannot shared.
 */

import { useState, useEffect, useCallback } from "react";
import { MediaUploadProps } from "./MediaUpload.interface";
import { compressImageFile } from "~/utilities/media.utils";
import { validateFileExtension } from "~/utilities/file.utils";

/**
 * Controller hook for MediaUpload component.
 * Handles file selection, validation, compression, and state management.
 *
 * @param props - MediaUploadProps
 * @returns actions and state for the component
 */
export const useMediaUploadController = (props: MediaUploadProps) => {
  const {
    mode = "single",
    extension = ["png", "jpg", "jpeg"],
    maximumFileSize = 5, // Default 5MB
    onChange,
    value,
    maxFiles,
  } = props;

  const [files, setFiles] = useState<File[]>(value || []);
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
   * Validates, compresses, and updates the file state.
   */
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (!selectedFiles || selectedFiles.length === 0) return;

      // Validate max files for multi mode
      if (mode === "multi" && maxFiles !== undefined) {
        const currentCount = files.length;
        const newCount = selectedFiles.length;
        if (currentCount + newCount > maxFiles) {
          setInternalError(
            `You can only upload a maximum of ${maxFiles} files.`,
          );
          // Reset input value
          event.target.value = "";
          return;
        }
      }

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

          const compressedFile = await compressImageFile(file);
          newFiles.push(compressedFile);
        }

        let updatedFiles: File[] = [];
        if (mode === "single") {
          const file = newFiles[0];
          updatedFiles = file ? [file] : [];
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
    [files, mode, maxFiles, validateFile, onChange],
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
