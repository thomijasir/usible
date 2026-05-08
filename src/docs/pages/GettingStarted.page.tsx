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
            Welcome to Usible, a mobile-first UI component library for SolidJS.
            Use it as a packaged dependency when you want shared updates, or
            copy the source into a project when you want full ownership.
          </p>
        </div>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Choose a Workflow
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Usible supports two integration styles. The package workflow is best
            for reusing the library across multiple apps. The legacy source copy
            workflow is best when a project needs direct control over every
            component file.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
              <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Package Install
              </h3>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                Build a local tarball, install it in another SolidJS project,
                and import components from <code>usible</code>.
              </p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 rounded-xl p-4">
              <h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                Legacy Source Copy
              </h3>
              <p class="text-sm text-purple-700 dark:text-purple-300">
                Copy components, utilities, and assets directly into the target
                app so the project owns and customizes the code.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Package Workflow
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Build the npm tarball from this repository, then install the tarball
            in the consuming project. This keeps imports clean and lets multiple
            apps share the same component library build.
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`# From the Usible repository
bun run build:pack

# From the consuming project
bun add ./dist-pack/usible-0.0.1.tgz
# or
npm install ./dist-pack/usible-0.0.1.tgz`}</code>
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Import the package stylesheet once in the app entry point, then
            import components, utilities, or icons from <code>usible</code>.
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto">
            <pre>
              <code>{`import 'usible/style.css';
import { Button, Input, useTheme } from 'usible';

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
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Legacy Source Copy Workflow
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Copy the source folders into the consuming project when you want to
            edit the components locally. Include utilities and assets because
            several components use shared helpers and icons.
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`# From the Usible repository
cp -r src/components your-project/src/
cp -r src/utils your-project/src/
cp -r src/assets your-project/src/`}</code>
            </pre>
          </div>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto">
            <pre>
              <code>{`// In your main.tsx or index.tsx
import './components/usible.css';

// In app code
import { Button, Input } from './components';`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            CSS Variables
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Customize the theme by importing one complete Usible theme file or
            by overriding CSS variables in your global stylesheet:
          </p>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`// Choose exactly one theme stylesheet.
import 'usible/style.css';
// import 'usible/themes/materialize.css';
// import 'usible/themes/aurora.css';
// import 'usible/themes/trusible.css';`}</code>
            </pre>
          </div>

          <div class="bg-gray-900 rounded-xl p-4 text-white text-sm overflow-x-auto mb-4">
            <pre>
              <code>{`:root {
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

  --usible-surface: #ffffff;
  --usible-surface-muted: #f9fafb;
  --usible-border: #e5e7eb;
  --usible-foreground: #111827;
  --usible-foreground-muted: #6b7280;

  --usible-radius: 0.5rem;
  --usible-radius-lg: 1rem;
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Consumer Dependencies
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            The consuming project should be a SolidJS app with Tailwind CSS v4
            support. These runtime packages are required by Usible components:
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
