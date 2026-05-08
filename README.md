# Usible

A modern, accessible Solid.js UI component library built with Tailwind CSS.

Usible can be used in two ways:

- Build a local npm tarball and install it in another project.
- Copy the source folders into another project for full local ownership.

## Features

- **Solid.js Components**: Built specifically for Solid.js with reactive patterns
- **Tailwind CSS**: Styled with Tailwind CSS v4 for easy customization
- **Dark Mode**: Full dark mode support through CSS variables
- **Accessible**: ARIA attributes and semantic HTML for accessibility
- **TypeScript**: Type definitions are emitted for package consumers
- **Tree-shakeable**: Import only the components you need

## Repository Setup

Install dependencies before developing or building the package:

```bash
bun install
# or
npm install
```

Start the documentation app:

```bash
bun run dev
# or
npm run dev
```

Build the documentation app:

```bash
bun run build
# or
npm run build
```

## Package Workflow

Build Usible as a local npm package when you want another project to install it
like a normal dependency.

```bash
# From the Usible repository
bun run build:pack
```

This creates a tarball at:

```text
dist-pack/usible-0.0.1.tgz
```

Install the tarball in the consuming SolidJS project:

```bash
bun add ./dist-pack/usible-0.0.1.tgz
# or
npm install ./dist-pack/usible-0.0.1.tgz
```

Import one Usible theme stylesheet in the consuming app entry point, then import
components, utilities, or icons from `usible`.

```tsx
import "usible/style.css";
import { Button, Input, useTheme } from "usible";

function App() {
  const { toggleTheme } = useTheme();

  return (
    <form>
      <Input label="Email" placeholder="name@example.com" />
      <Button variant="filled" color="primary" onClick={toggleTheme}>
        Save
      </Button>
    </form>
  );
}
```

To swap the whole component skin without changing JSX, replace the stylesheet
import with another complete theme file:

```tsx
import "usible/themes/materialize.css";
// or
import "usible/themes/aurora.css";
// or
import "usible/themes/trusible.css";
```

The Trusible theme is designed for formal financial products such as private
banking dashboards, Bitcoin wallets, tokenized-gold products, and long-term
wealth custody interfaces.

## Legacy Source Copy Workflow

Copy the source folders when the target project needs direct ownership of the
component code.

```bash
# From the Usible repository
cp -r src/components your-project/src/
cp -r src/utils your-project/src/
cp -r src/assets your-project/src/
```

Import the CSS file once in the target app entry point:

```tsx
import "./components/usible.css";
```

Import copied components through the local barrel:

```tsx
import { Button, Input, Dialog } from "./components";
```

## Consumer Dependencies

The consuming project should be a SolidJS app with Tailwind CSS v4 support.
Usible components require these runtime packages:

```json
{
  "dependencies": {
    "solid-js": "^1.9.0",
    "tailwindcss": "^4.0.0",
    "tailwind-merge": "^3.0.0",
    "motion": "^12.0.0",
    "dompurify": "^3.0.0"
  }
}
```

## Available Scripts

| Command                 | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `bun run dev`           | Start documentation server with hot reload      |
| `bun run build`         | Production build for the documentation app      |
| `bun run build:lib`     | Build the npm package output into `dist/`       |
| `bun run build:pack`    | Build package output and create a local tarball |
| `bun run preview`       | Preview production documentation build locally  |
| `bun run lint`          | Run ESLint and TypeScript type check            |
| `bun run format`        | Format all files with Prettier                  |
| `bun run format:check`  | Check formatting without writing                |
| `bun run test`          | Run all tests with Vitest                       |
| `bun run test:watch`    | Run tests in watch mode                         |
| `bun run test:coverage` | Run tests with coverage report                  |

### Running Single Tests

```bash
bun test -- src/components/Button/Button.test.tsx
# or
bun run test -- src/components/Button/Button.test.tsx
```

## Components

Usible provides a comprehensive set of UI components:

### Form Components

- **Button** - Versatile button with multiple variants
- **Input** - Text input with labels, error states, and adornments
- **TextArea** - Multi-line text input
- **Select** - Dropdown selection component
- **Checkbox** - Checkbox input with custom styling
- **Radio** - Radio input with custom styling
- **Switch** - Toggle switch component
- **Slider** - Range slider input
- **DatePicker** - Date selection component
- **TimePicker** - Time selection component
- **CurrencyInput** - Formatted currency input
- **Numpad** - Numeric keypad input
- **Autocomplete** - Searchable option picker
- **DocumentUpload** - Document upload component
- **MediaUpload** - Media upload component
- **MediaVideoUpload** - Video upload component

### Layout & Display

- **Text** - Typography component with variants
- **Loader** - Loading spinner
- **Skeleton** - Loading placeholder
- **Image** - Optimized image component
- **Card** - Content container
- **Chip** - Tag or badge component
- **InfoBox** - Information display box
- **Accordion** - Collapsible content sections
- **Timeline** - Vertical timeline display
- **TextHighlight** - Text highlighting component
- **HtmlRender** - Safe HTML rendering
- **StaticMapGoogle** - Static Google Maps integration

### Overlay & Navigation

- **Dialog** - Modal dialog
- **Drawer** - Side panel drawer
- **Backdrop** - Overlay backdrop
- **MenuList** - Dropdown menu list
- **Tabs** - Tabbed content navigation
- **ErrorBoundary** - Error fallback wrapper

## Design System

Usible uses semantic design tokens for accent colors, surfaces, text, borders,
radii, and shadows. Components keep the same DOM structure while the active CSS
theme controls their visual treatment.

Override theme variables in your global stylesheet:

```css
:root {
  --usible-primary: #3b82f6;
  --usible-primary-surface: #eff6ff;
  --usible-primary-light: #93c5fd;
  --usible-primary-dark: #1d4ed8;
  --usible-primary-active: #dbeafe;

  --usible-secondary: #8b5cf6;
  --usible-ternary: #06b6d4;
  --usible-success: #22c55e;
  --usible-warning: #f59e0b;
  --usible-error: #ef4444;

  --usible-background: #ffffff;
  --usible-surface: #ffffff;
  --usible-surface-muted: #f9fafb;
  --usible-surface-hover: #f3f4f6;
  --usible-border: #e5e7eb;
  --usible-foreground: #111827;
  --usible-foreground-muted: #6b7280;
  --usible-placeholder: #9ca3af;

  --usible-radius: 0.5rem;
  --usible-radius-lg: 1rem;
  --usible-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
```

Toggle dark mode by adding or removing the `dark` class on the `<html>`
element. The `useTheme` utility is exported by the package and copied source
workflow.

## Tech Stack

- [Solid.js](https://solidjs.com/) - Reactive JavaScript framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Rsbuild](https://rsbuild.rs/) - Documentation app build tool
- [Rslib](https://rslib.rs/) - Package build tool
- [Vitest](https://vitest.dev/) - Testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

```text
src/
├── assets/              # Icons and static assets
├── components/          # Solid.js components
├── docs/                # Documentation pages and stories
├── utils/               # Utility functions
├── package.ts           # Public package entrypoint
└── App.tsx              # Documentation app entry
```

## Documentation

- [Rsbuild documentation](https://rsbuild.rs)
- [Rslib documentation](https://rslib.rs)
- [Solid.js documentation](https://solidjs.com)
- [Tailwind CSS documentation](https://tailwindcss.com)

## License

MIT
