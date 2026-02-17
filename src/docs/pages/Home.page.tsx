import { DocsLayout } from "../layouts";

export function HomePage() {
  return (
    <DocsLayout>
      <div class="space-y-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Usible UI
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            A SolidJS UI component library built with pure Tailwind CSS.
            Copy-paste ready for any project.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Copy & Paste
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Components are designed to be copied directly into your project.
              No npm dependencies required.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              SolidJS Native
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Built from the ground up for SolidJS with reactive primitives and
              fine-grained reactivity.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Tailwind CSS 4
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Styled with Tailwind CSS 4.x using CSS variables for easy theming
              and customization.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Motion Animations
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Smooth animations powered by Motion for polished user
              interactions.
            </p>
          </div>
        </div>

        <div class="p-6 rounded-xl bg-gray-900 text-white">
          <h2 class="text-lg font-semibold mb-3">Quick Start</h2>
          <pre class="text-sm overflow-x-auto">
            <code>{`// 1. Copy the components folder to your project
cp -r src/components your-project/src/

// 2. Import the CSS
import './components/usible.css';

// 3. Use components
import { Button, Input } from './components';`}</code>
          </pre>
        </div>
      </div>
    </DocsLayout>
  );
}
