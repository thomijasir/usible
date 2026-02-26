export interface DocumentUploadProps {
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
  onChange?: (files: (File | string)[]) => void;
  value?: (File | string)[];
  required?: boolean;
}
