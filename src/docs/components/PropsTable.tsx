import { type Component, For } from "solid-js";

interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export const PropsTable: Component<PropsTableProps> = (props) => {
  return (
    <div class="my-6 overflow-x-auto">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Props
      </h3>
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-tl-lg">
              Prop
            </th>
            <th class="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
              Type
            </th>
            <th class="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
              Default
            </th>
            <th class="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-tr-lg">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={props.props}>
            {(prop, index) => (
              <tr
                class={
                  index() % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800/50"
                }>
                <td class="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-mono text-primary">
                  {prop.name}
                </td>
                <td class="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-mono text-secondary text-xs">
                  {prop.type}
                </td>
                <td class="py-2 px-3 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-mono text-xs">
                  {prop.default || "-"}
                </td>
                <td class="py-2 px-3 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                  {prop.description}
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
