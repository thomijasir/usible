/**
 * Props for the MediaUpload component.
 */
export interface MediaUploadProps {
  /**
   * Upload mode. 'single' allows one file, 'multi' allows multiple.
   * @default "single"
   */
  mode?: "single" | "multi";

  /**
   * Label for the input field.
   */
  label?: string;

  /**
   * Error message or boolean to indicate error state.
   */
  error?: string | boolean;

  /**
   * Helper text displayed below the input.
   */
  helperText?: string;

  /**
   * Whether the component should take full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Allowed file extensions.
   * @default ["png", "jpg", "jpeg"]
   */
  extension?: string[];

  /**
   * Maximum file size in Megabytes (MB).
   * @default 5
   */
  maximumFileSize?: number;

  /**
   * Whether to show the file size on the preview.
   * @default false
   */
  showFileSize?: boolean;

  /**
   * Minimum number of files required (for multi mode).
   */
  minFiles?: number;

  /**
   * Maximum number of files allowed (for multi mode).
   */
  maxFiles?: number;

  /**
   * Callback function triggered when files change.
   * @param files - Array of selected (and compressed) files.
   */
  onChange?: (files: File[]) => void;

  /**
   * Controlled value for the files.
   */
  value?: File[];

  /**
   * Whether the field is required.
   * @default false
   */
  required?: boolean;
}
