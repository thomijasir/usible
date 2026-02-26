export interface MediaUploadProps {
  mode?: "single" | "multi";
  label?: string;
  error?: string | boolean;
  helperText?: string;
  fullWidth?: boolean;
  extension?: string[];
  maximumFileSize?: number;
  showFileSize?: boolean;
  minFiles?: number;
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  value?: File[];
  required?: boolean;
}
