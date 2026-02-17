import { MenuList } from "~/components";
import { ComponentPreview, PropsTable } from "../components";
import { For, type Component } from "solid-js";

export const MenuListStory: Component = () => {
  const propsReference = [
    {
      name: "children",
      type: "JSX.Element",
      description: "MenuItem components",
    },
    { name: "title", type: "string", description: "Optional menu title" },
    {
      name: "variant",
      type: '"standard" | "rounded"',
      default: '"standard"',
      description: "Menu style",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];
  const example = [
    {
      title: "Menu List",
      code: `<MenuList title="Actions">
  <MenuItem label="Edit" onClick={() => {}} />
  <MenuItem label="Delete" onClick={() => {}} />
</MenuList>`,
      render: (
        <MenuList title="Actions">
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Edit
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Duplicate
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500">
            Delete
          </div>
        </MenuList>
      ),
    },
    {
      title: "Without Title",
      code: `<MenuList>
  <MenuItem label="Option 1" onClick={() => {}} />
  <MenuItem label="Option 2" onClick={() => {}} />
</MenuList>`,
      render: (
        <MenuList>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Profile
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Settings
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Help
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500">
            Logout
          </div>
        </MenuList>
      ),
    },
    {
      title: "Rounded Variant",
      code: `<MenuList variant="rounded" title="Options">
  <MenuItem label="First" onClick={() => {}} />
  <MenuItem label="Second" onClick={() => {}} />
</MenuList>`,
      render: (
        <MenuList variant="rounded" title="Options">
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg">
            Camera
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg">
            Gallery
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg">
            Documents
          </div>
        </MenuList>
      ),
    },
    {
      title: "Navigation Menu",
      code: `<MenuList title="Navigate">
  <MenuItem label="Home" onClick={() => {}} />
  <MenuItem label="About" onClick={() => {}} />
  <MenuItem label="Contact" onClick={() => {}} />
</MenuList>`,
      render: (
        <MenuList title="Navigate">
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <span>🏠</span> Home
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <span>ℹ️</span> About
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <span>📧</span> Contact
          </div>
        </MenuList>
      ),
    },
    {
      title: " User Dropdown",
      code: `<div class="relative inline-block">
  <div class="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
    <div class="w-8 h-8 rounded-full bg-blue-500" />
    <span>John</span>
  </div>
  <MenuList class="absolute right-0 top-full mt-1 w-48 shadow-lg">
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Your Profile</div>
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
    <hr />
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Sign out</div>
  </MenuList>
</div>`,
      render: (
        <div class="relative inline-block">
          <div class="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="w-8 h-8 rounded-full bg-blue-500" />
            <span>John</span>
          </div>
          <MenuList class="absolute right-0 top-full mt-1 w-48 shadow-lg">
            <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Your Profile
            </div>
            <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Settings
            </div>
            <hr class="border-gray-200 dark:border-gray-700" />
            <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500">
              Sign out
            </div>
          </MenuList>
        </div>
      ),
    },
    {
      title: " Context Menu",
      code: `<div class="p-4 border rounded-lg max-w-sm">
  <p class="text-sm text-gray-500 mb-2">Right-click on the item below</p>
  <div class="p-3 bg-gray-50 rounded cursor-pointer">
    File: document.pdf
  </div>
  <MenuList title="Actions" class="mt-2 shadow-lg">
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Open</div>
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Rename</div>
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Download</div>
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Delete</div>
  </MenuList>
</div>`,
      render: (
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Right-click on the item below
          </p>
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded cursor-pointer">
            File: document.pdf
          </div>
          <MenuList title="Actions" class="mt-2 shadow-lg">
            <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Open
            </div>
            <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Rename
            </div>
            <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Download
            </div>
            <div class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500">
              Delete
            </div>
          </MenuList>
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          MenuList Component Guidelines
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          A list of menu items for actions and navigation.
        </p>
      </div>

      <section>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Examples:
        </h2>
        <For each={example}>
          {(item) => (
            <ComponentPreview title={item.title} code={item.code}>
              {item.render}
            </ComponentPreview>
          )}
        </For>
      </section>

      <section>
        <PropsTable props={propsReference} />
      </section>
    </div>
  );
};
