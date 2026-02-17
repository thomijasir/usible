import { createSignal, For, createEffect, on } from "solid-js";
import { animate } from "motion";
import type { AccordionProps } from "./Accordion.interface";
import { Text } from "../Text";
import { ChevronDownIcon } from "~/assets/icons";

export function Accordion(props: AccordionProps) {
  const [expandedIds, setExpandedIds] = createSignal<(string | number)[]>(
    props.defaultExpandedId ? [props.defaultExpandedId] : [],
  );

  const toggleItem = (id: string | number) => {
    const current = expandedIds();
    if (current.includes(id)) {
      setExpandedIds(current.filter((existingId) => existingId !== id));
    } else {
      if (props.allowMultiple) {
        setExpandedIds([...current, id]);
      } else {
        setExpandedIds([id]);
      }
    }
  };

  return (
    <div
      class={`flex flex-col divide-y divide-gray-100 dark:divide-gray-800 border-t border-b border-gray-100 dark:border-gray-800 ${props.class ?? ""}`}>
      <For each={props.items}>
        {(item) => {
          const isExpanded = () => expandedIds().includes(item.id);
          const isDisabled = () => item.disabled;
          let contentRef: HTMLDivElement | undefined;
          let iconRef: SVGSVGElement | undefined;

          createEffect(
            on(isExpanded, async (expanded) => {
              if (contentRef) {
                if (expanded) {
                  contentRef.style.display = "block";
                  const height = contentRef.scrollHeight;
                  contentRef.style.height = "0px";
                  contentRef.style.opacity = "0";
                  await animate(
                    contentRef as HTMLElement,
                    { height: height, opacity: 1 },
                    { duration: 0.3, ease: "easeInOut" },
                  ).finished;
                  contentRef.style.height = "auto";
                } else {
                  contentRef.style.height = `${contentRef.scrollHeight}px`;
                  await animate(
                    contentRef as HTMLElement,
                    { height: 0, opacity: 0 },
                    { duration: 0.3, ease: "easeInOut" },
                  ).finished;
                  contentRef.style.display = "none";
                }
              }
            }),
          );

          createEffect(
            on(isExpanded, async (expanded) => {
              if (iconRef) {
                await animate(
                  iconRef as SVGSVGElement,
                  { rotate: expanded ? 180 : 0 },
                  { duration: 0.2 },
                ).finished;
              }
            }),
          );

          return (
            <div class="bg-white dark:bg-gray-900">
              <button
                onClick={() => !isDisabled() && toggleItem(item.id)}
                disabled={isDisabled()}
                class={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                  isDisabled()
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer active:bg-gray-50 dark:active:bg-gray-800"
                }`}
                aria-expanded={isExpanded()}
                aria-controls={`accordion-panel-${item.id}`}>
                <div class="flex-1 pr-4">
                  {typeof item.title === "string" ? (
                    <Text variant="subtitle1" class="font-medium">
                      {item.title}
                    </Text>
                  ) : (
                    item.title
                  )}
                </div>

                <div class="text-gray-400 shrink-0">
                  <ChevronDownIcon ref={iconRef} class="w-5 h-5" />
                </div>
              </button>

              <div
                ref={contentRef}
                id={`accordion-panel-${item.id}`}
                role="region"
                aria-hidden={!isExpanded()}
                class="overflow-hidden"
                style={{ display: "none", height: 0, opacity: 0 }}>
                <div class="p-4 pt-0 text-gray-600 dark:text-gray-400">
                  {typeof item.content === "string" ? (
                    <Text variant="body2">{item.content}</Text>
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
}
