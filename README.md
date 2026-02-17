# Usible

A modern, accessible Solid.js UI component library built with Tailwind CSS.

## Features

- **Solid.js Components**: Built specifically for Solid.js with reactive patterns
- **Tailwind CSS**: Styled with Tailwind CSS v4 for easy customization
- **Dark Mode**: Full dark mode support out of the box
- **Accessible**: ARIA attributes and semantic HTML for accessibility
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Tree-shakeable**: Import only the components you need

## Installation

```bash
bun install
# or
npm install
```

## Getting Started

### Development

Start the development server:

```bash
bun run dev
# or
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
bun run build
# or
npm run build
```

Preview the production build locally:

```bash
bun run preview
# or
npm run preview
```

## Available Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Production build with Rsbuild            |
| `npm run preview`       | Preview production build locally         |
| `npm run lint`          | Run ESLint and TypeScript type check     |
| `npm run format`        | Format all files with Prettier           |
| `npm run format:check`  | Check formatting without writing         |
| `npm run test`          | Run all tests with Rstest                |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Run tests with coverage report           |

### Running Single Tests

```bash
npx rstest src/components/Button/Button.test.tsx
# or
npm test -- src/components/Button/Button.test.tsx
```

## Components

Usible provides a comprehensive set of UI components:

### Form Components

- **Button** - Versatile button with multiple variants (filled, outlined, text, icon)
- **Input** - Text input with labels, error states, and adornments
- **TextArea** - Multi-line text input
- **Select** - Dropdown selection component
- **Checkbox** - Checkbox input with custom styling
- **Switch** - Toggle switch component
- **Slider** - Range slider input
- **DatePicker** - Date selection component
- **CurrencyInput** - Formatted currency input
- **Numpad** - Numeric keypad input

### Layout & Display

- **Text** - Typography component with variants
- **Loader** - Loading spinner
- **Skeleton** - Loading placeholder
- **Image** - Optimized image component
- **Chip** - Tag/badge component
- **InfoBox** - Information display box
- **Accordion** - Collapsible content sections
- **Timeline** - Vertical timeline display
- **TextHighlight** - Text highlighting component

### Overlay Components

- **Dialog** - Modal dialog
- **Drawer** - Side panel drawer
- **Backdrop** - Overlay backdrop
- **MenuList** - Dropdown menu list

### Media & Maps

- **MediaVideoUpload** - Video upload component
- **HtmlRender** - Safe HTML rendering
- **StaticMapGoogle** - Static Google Maps integration

## Design System

### Colors

Usible uses a semantic color system:

| Color       | Usage                             |
| ----------- | --------------------------------- |
| `primary`   | Primary actions, links, emphasis  |
| `secondary` | Secondary actions, accents        |
| `ternary`   | Tertiary elements, subtle accents |
| `success`   | Success states, confirmations     |
| `warning`   | Warning states, cautions          |
| `error`     | Error states, destructive actions |

Each color has light and dark variants: `primary-light`, `primary-dark`, etc.

### Dark Mode

Dark mode is supported through CSS custom properties. Toggle dark mode by adding/removing the `dark` class on the `<html>` element:

```typescript
import { useTheme } from "~/utils/theme";

const { isDark, toggleTheme } = useTheme();
```

### Component Sizing

Most components support three sizes:

- `small` - Compact size for tight spaces
- `medium` - Default size
- `large` - Prominent size for emphasis

## Component Usage

Import components from the library:

```tsx
import { Button, Input, Dialog } from "~/components";

function MyForm() {
  return (
    <form>
      <Input
        label="Email"
        placeholder="Enter your email"
        onInput={(value) => console.log(value)}
      />
      <Button variant="filled" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
```

### Button Example

```tsx
<Button variant="filled" color="primary">Primary Button</Button>
<Button variant="outlined" color="secondary">Outlined</Button>
<Button variant="text" color="ternary">Text Button</Button>
<Button variant="icon" color="primary">
  <Icon name="settings" />
</Button>
```

### Input Example

```tsx
<Input
  label="Username"
  placeholder="Enter username"
  error={hasError ? "Username is required" : false}
  startAdornment={<Icon name="user" />}
  onInput={handleInput}
/>
```

## Tech Stack

- [Solid.js](https://solidjs.com/) - Reactive JavaScript framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Rsbuild](https://rsbuild.rs/) - Build tool
- [Rstest](https://rstest.rs/) - Testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

```
src/
├── components/           # Solid.js components
│   ├── Button/
│   │   ├── Button.interface.ts
│   │   ├── Button.component.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── assets/              # Icons and static assets
├── utils/               # Utility functions
│   └── theme.ts         # Dark mode toggle
├── docs/                # Documentation pages
└── App.tsx              # Application entry
```

## Testing

Tests use `@rstest/core` with `happy-dom` environment:

```typescript
import { describe, it, expect } from "@rstest/core";

describe("Button Component", () => {
  it("renders with default props", () => {
    const container = document.createElement("div");
    container.innerHTML = `<button>Click me</button>`;
    const button = container.querySelector("button");
    expect(button?.textContent).toBe("Click me");
  });
});
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting: `npm run lint && npm run test`
5. Submit a pull request

## Documentation

- [Rsbuild documentation](https://rsbuild.rs)
- [Solid.js documentation](https://solidjs.com)
- [Tailwind CSS documentation](https://tailwindcss.com)

## License

MIT
