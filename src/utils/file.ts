export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateFileExtension(file: File, allowed: string[]): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return allowed.map((e) => e.toLowerCase()).includes(ext);
}
