/**
 * Props for the `MediaUpload` component.
 */
export interface MediaUploadProps {
  /** Upload mode: one file or multiple files. */
  mode?: "single" | "multi";
  /** Field label shown above the uploader. */
  label?: string;
  /** Error state or error message displayed below the field. */
  error?: string | boolean;
  /** Supporting helper text displayed below the uploader. */
  helperText?: string;
  /** Expands the uploader to the full container width. */
  fullWidth?: boolean;
  /** Allowed file extensions, for example `["png", "jpg"]`. */
  extension?: string[];
  /** Maximum allowed file size in bytes. */
  maximumFileSize?: number;
  /** Shows file size metadata in the selected file list. */
  showFileSize?: boolean;
  /** Minimum required number of files in multi mode. */
  minFiles?: number;
  /** Maximum allowed number of files in multi mode. */
  maxFiles?: number;
  /** Called when the file list changes. */
  onChange?: (files: File[]) => void;
  /** Controlled file list value. */
  value?: File[];
  /** Marks the field as required for form validation flows. */
  required?: boolean;
}
