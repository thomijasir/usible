import { DocsLayout } from "../layouts";

export function GettingStartedPage() {
  return (
    <DocsLayout>
      <div class="space-y-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Getting Started
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Learn how to integrate Usible UI components into your SolidJS
            project.
          </p>
        </div>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Installation
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Usible UI is designed to be copy-pasted directly into your project.
            This gives you full control over the components and makes
            customization straightforward.
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`# Copy the components folder to your project
cp -r src/components your-project/src/

# Copy the assets folder if you need icons
cp -r src/assets your-project/src/`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            CSS Setup
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Import the Usible CSS file in your app entry point. This includes
            Tailwind CSS imports and CSS variables for theming.
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`// In your main.tsx or index.tsx
import './components/usible.css';`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            CSS Variables
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Customize the theme by overriding CSS variables in your global
            stylesheet:
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`:root {
  --usible-primary: #3b82f6;
  --usible-primary-light: #93c5fd;
  --usible-primary-dark: #1d4ed8;

  --usible-secondary: #8b5cf6;
  --usible-ternary: #06b6d4;
  --usible-success: #22c55e;
  --usible-warning: #f59e0b;
  --usible-error: #ef4444;

  --usible-radius: 0.5rem;
  --usible-radius-lg: 1rem;
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Usage
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Import and use components directly:
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`import { Button, Input, Chip } from './components';

function App() {
  return (
    <div>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
      <Chip label="Tag" variant="filled" color="primary" />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Dependencies
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Make sure you have these dependencies installed in your project:
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto">
            <pre>
              <code>{`{
  "dependencies": {
    "solid-js": "^1.9.0",
    "tailwindcss": "^4.0.0",
    "tailwind-merge": "^3.0.0",
    "motion": "^12.0.0",
    "dompurify": "^3.0.0"
  }
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
