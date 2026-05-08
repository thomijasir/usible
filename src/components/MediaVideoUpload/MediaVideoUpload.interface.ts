/**
 * MediaVideoUpload component props
 *
 * @example
 * ```tsx
 * <MediaVideoUpload onChange={(file) => setVideo(file)} />
 * ```
 */
export interface MediaVideoUploadProps {
  /** Current video file */
  value?: File | null;
  /** Called when the selected video changes */
  onChange?: (file: File | null) => void;
  /** Label text displayed above the uploader */
  label?: string;
  /** Error message to display, or boolean to show error state */
  error?: string | boolean;
  /** Helper text displayed below the uploader */
  helperText?: string;
  /** Maximum file size in MB - @default 50 */
  maximumFileSize?: number;
  /** Additional CSS classes */
  class?: string;
}
