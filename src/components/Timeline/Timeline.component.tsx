import { For } from "solid-js";
import type { TimelineProps } from "./Timeline.interface";
import { Text } from "../Text";

export function Timeline(props: TimelineProps) {
  const variant = () => props.variant ?? "default";

  return (
    <div class={`flex flex-col ${props.class ?? ""}`}>
      <For each={props.items}>
        {(item, index) => (
          <div class="flex gap-4 relative pb-8 last:pb-0">
            {index() !== props.items.length - 1 && (
              <div class="absolute left-5 top-10 bottom-0 w-0.5 bg-border" />
            )}

            <div
              class={`relative z-10 flex items-center justify-center w-10 h-10 rounded-usible-pill border-2 shrink-0 bg-surface ${
                item.status === "completed"
                  ? "border-success text-success"
                  : item.status === "failed"
                    ? "border-error text-error"
                    : "border-border-strong text-foreground-subtle"
              }`}>
              {variant() === "numbered" ? (
                <Text
                  variant="subtitle2"
                  class={
                    item.status === "completed"
                      ? "text-success"
                      : item.status === "failed"
                        ? "text-error"
                        : "text-foreground-muted"
                  }>
                  {index() + 1}
                </Text>
              ) : (
                item.icon || (
                  <div
                    class={`w-3 h-3 rounded-usible-pill ${
                      item.status === "completed"
                        ? "bg-success"
                        : item.status === "failed"
                          ? "bg-error"
                          : "bg-foreground-subtle"
                    }`}
                  />
                )
              )}
            </div>

            <div class="flex flex-col pt-1">
              <Text variant="subtitle1" class="font-semibold text-foreground">
                {item.title}
              </Text>
              {item.description && (
                <Text variant="body2" class="text-foreground-muted mt-1">
                  {item.description}
                </Text>
              )}
              {item.date && (
                <Text variant="caption" class="text-foreground-subtle mt-1">
                  {item.date}
                </Text>
              )}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
