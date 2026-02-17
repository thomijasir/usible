# AGENTS.md

Coding agent instructions for the Usible component library.

## Project Overview

Usible is a Solid.js UI component library built with Tailwind CSS. The project uses Rsbuild for building and Rstest for testing.

## Build/Lint/Test Commands

```bash
# Development
bun dev              # Start dev server with hot reload
bun run build            # Production build with Rsbuild

# Linting & Type Checking
bun lint             # Run ESLint on src/ and TypeScript type check

# Formatting
bun format           # Format all files with Prettier
bun format:check     # Check formatting without writing

# Testing
bun test             # Run all tests
bun test:watch       # Run tests in watch mode
bun test:coverage    # Run tests with coverage report

# Run a single test file
bunx rstest src/components/Button/Button.test.tsx
bun test -- src/components/Button/Button.test.tsx
```

## Code Style Guidelines

### TypeScript

- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Use `verbatimModuleSyntax` - always use `import type` for type-only imports
- Target: ES2020 with ESNext modules

### Imports

```typescript
// Type-only imports use 'type' keyword
import type { ButtonProps } from "./Button.interface";
import type { JSX } from "solid-js";

// Regular imports
import { createSignal, createUniqueId } from "solid-js";
import { twMerge } from "tailwind-merge";

// Relative imports for local modules
import { Loader } from "../Loader";
```

Import order: External packages → Internal utilities/types → Relative imports

### Component Structure

```
src/components/ComponentName/
├── ComponentName.interface.ts  # Type definitions and JSDoc
├── ComponentName.component.tsx # Component implementation
├── ComponentName.test.tsx      # Tests
└── index.ts                    # Barrel export
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `TextInput`)
- **Props interfaces**: PascalCase with `Props` suffix (`ButtonProps`)
- **Type aliases**: PascalCase (`ButtonVariant`, `InputSize`)
- **Functions**: camelCase (`handleClick`, `getAriaDescribedBy`)
- **Constants**: camelCase for objects (`sizeClasses`, `variantClasses`)

### Solid.js Patterns

- Use functions for component definitions:

```typescript
export function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}
```

- Access props reactively via function calls, not destructuring:

```typescript
const variant = () => props.variant ?? "filled";
const isDisabled = () => props.disabled || props.loading;
```

- Use `class` prop instead of `className` for Solid.js
- Use `twMerge` for composing Tailwind classes

### Styling with Tailwind

```typescript
const sizeClasses: Record<InputSize, string> = {
  small: "py-2 px-3 text-sm",
  medium: "py-3 px-3 text-base",
  large: "py-4 px-4 text-lg",
};

const classes = twMerge(
  "base-classes",
  conditional && "conditional-class",
  props.class,
);
```

Use design system colors: `primary`, `secondary`, `ternary`, `success`, `warning`, `error`

### Interface Documentation

````typescript
/**
 * Button component props
 * @example
 * ```tsx
 * <Button variant="filled" color="primary">Click me</Button>
 * ```
 */
export interface ButtonProps {
  /** Button content */
  children: JSX.Element;
  /** Visual style variant - @default "filled" */
  variant?: ButtonVariant;
}
````

### Error Handling

- Use `error` prop on form components (`string | boolean`)
- Apply ARIA attributes for accessibility:

```typescript
const isError = () => !!props.error;
aria-invalid={isError() ? "true" : undefined}
aria-describedby={isError() ? errorId() : undefined}
```

### Testing

```typescript
import { describe, it, expect } from "@rstest/core";

describe("Button Component", () => {
  it("renders with default props", () => {
    const container = document.createElement("div");
    container.innerHTML = `<button class="...">Click me</button>`;
    const button = container.querySelector("button");
    expect(button?.textContent?.trim()).toBe("Click me");
  });
});
```

- Test environment: `happy-dom`
- Jest-DOM matchers available via setup file

### Formatting (Prettier)

- Semicolons: enabled
- Tab width: 2 spaces
- Print width: 80 characters
- Double quotes, trailing commas: all
- Bracket spacing: true, Arrow parens: always

### Barrel Exports

```typescript
// Component index.ts
export { Button } from "./Button.component";
export type { ButtonProps, ButtonVariant } from "./Button.interface";

// Aggregate in src/components/index.ts
export * from "./Button";
export * from "./Input";
```

## File Path Aliases

Use `~/` for `src/`:

```typescript
import { useTheme } from "~/utils/theme";
```
