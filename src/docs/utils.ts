export function stripAndKebabCase(str: string): string {
  // 1. Remove "Story" from the end of the string if it exists
  const stripped = str.replace(/Story$/, "");

  // 2. Convert PascalCase to kebab-case
  return stripped
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Insert hyphen between lower & upper
    .toLowerCase();
}
