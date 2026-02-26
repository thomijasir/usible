import { A } from "@solidjs/router";
import { DocsLayout } from "../layouts";

export function HomePage() {
  return (
    <DocsLayout>
      <div class="space-y-8">
        <div>
          <div class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Mobile-First Starter Kit
          </div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Usible UI
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
            A SolidJS UI component library built to accelerate mobile-first app
            development. Copy-paste components you actually own — no lock-in,
            no config, just ship.
          </p>
          <div class="flex flex-wrap gap-3">
            <A
              href="/stories"
              class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Get Started
              <span aria-hidden="true">→</span>
            </A>
            <a
              href="#components"
              class="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Browse Components
            </a>
          </div>
        </div>

        <div id="components" class="grid md:grid-cols-2 gap-4">
          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Mobile First
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Every component is designed for touch interactions and small
              viewports first — desktop is an enhancement, not the baseline.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Copy & Paste Ownership
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Components live in your project. No npm package to update, no
              breaking changes from upstream — you own the code entirely.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              SolidJS Native
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Built from the ground up for SolidJS with reactive primitives and
              fine-grained reactivity. No wrappers, no overhead.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Motion Animations
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Smooth, performant animations powered by Motion — giving your
              mobile app a native-like feel right out of the box.
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
          <div class="mt-4 pt-4 border-t border-gray-700">
            <A
              href="/stories"
              class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Read the full setup guide →
            </A>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
