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
            Welcome to Usible — a mobile-first UI component library for SolidJS.
            Learn how to integrate it into your project and ship faster.
          </p>
        </div>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Why Usible?
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Usible was built out of a need for a reliable starter kit that
            accelerates mobile-first application development. Every component is
            designed with a mobile-first mindset from the ground up — not as an
            afterthought.
          </p>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            The goal is simple: reduce the time between idea and working product.
            Instead of rebuilding the same Input, Button, or Autocomplete every
            project, Usible gives you a solid, consistent foundation so you can
            focus on what makes your app unique.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
              <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Mobile First
              </h3>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                Every component is built and tested for touch interactions,
                small viewports, and mobile UX patterns before scaling up to
                desktop.
              </p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 rounded-xl p-4">
              <h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                Copy-Paste Ownership
              </h3>
              <p class="text-sm text-purple-700 dark:text-purple-300">
                No npm package lock-in. Copy the components into your project
                and own them completely — customize freely without constraints.
              </p>
            </div>
            <div class="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-xl p-4">
              <h3 class="font-semibold text-green-900 dark:text-green-100 mb-1">
                SolidJS Native
              </h3>
              <p class="text-sm text-green-700 dark:text-green-300">
                Built specifically for SolidJS reactivity model — no wrappers,
                no compatibility layers. Just lean, fast components that feel
                natural.
              </p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 rounded-xl p-4">
              <h3 class="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                Starter Kit Ready
              </h3>
              <p class="text-sm text-amber-700 dark:text-amber-300">
                Drop Usible into a new project and immediately have a complete
                UI foundation — inputs, buttons, modals, navigation, and more.
              </p>
            </div>
          </div>
        </section>

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
