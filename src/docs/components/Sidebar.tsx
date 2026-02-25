import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const componentGroups = [
  {
    title: "Basic Primitives",
    items: [
      { id: "text", label: "Text" },
      { id: "loader", label: "Loader" },
      { id: "skeleton", label: "Skeleton" },
      { id: "image", label: "Image" },
      { id: "html-render", label: "HTML Render" },
    ],
  },
  {
    title: "Form Controls",
    items: [
      { id: "button", label: "Button" },
      { id: "checkbox", label: "Checkbox" },
      { id: "switch", label: "Switch" },
      { id: "input", label: "Input" },
      { id: "text-area", label: "Text Area" },
      { id: "select", label: "Select" },
      { id: "slider", label: "Slider" },
      { id: "numpad", label: "Numpad" },
      { id: "currency-input", label: "Currency Input" },
      { id: "date-picker", label: "Date Picker" },
      { id: "time-picker", label: "Time Picker" },
    ],
  },
  {
    title: "Feedback & Display",
    items: [
      { id: "chip", label: "Chip" },
      { id: "info-box", label: "Info Box" },
      { id: "text-highlight", label: "Text Highlight" },
      { id: "timeline", label: "Timeline" },
    ],
  },
  {
    title: "Overlay & Navigation",
    items: [
      { id: "backdrop", label: "Backdrop" },
      { id: "dialog", label: "Dialog" },
      { id: "drawer", label: "Drawer" },
      { id: "menulist", label: "MenuList" },
      { id: "accordion", label: "Accordion" },
    ],
  },
];

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <Show when={props.open && props.isMobile}>
        <div
          class="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={props.onClose}
        />
      </Show>

      <aside
        class={twMerge(
          "fixed top-0 left-0 z-50 h-full w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-30 pt-16 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500",
          props.open || !props.isMobile ? "translate-x-0" : "-translate-x-full",
        )}>
        <nav class="p-4">
          <A
            href="/"
            class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium"
            activeClass="bg-primary/10 text-primary">
            Getting Started
          </A>

          <div class="mt-6">
            <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Components
            </h3>

            <For each={componentGroups}>
              {(group) => (
                <div class="mt-4">
                  <h4 class="px-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">
                    {group.title}
                  </h4>
                  <div class="mt-1 space-y-0.5">
                    <For each={group.items}>
                      {(item) => (
                        <A
                          href={`/stories/${item.id}`}
                          class="block px-3 py-1.5 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          activeClass="bg-primary/10 text-primary font-medium"
                          onClick={props.onClose}>
                          {item.label}
                        </A>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </nav>
      </aside>
    </>
  );
}
