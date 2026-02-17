import { createEffect, on } from "solid-js";
import { animate } from "motion";
import { twMerge } from "tailwind-merge";
import type { DialogProps } from "./Dialog.interface";
import { Backdrop } from "../Backdrop";
import { Text } from "../Text";

export function Dialog(props: DialogProps) {
  let dialogRef: HTMLDivElement | undefined;
  const titleId = `dialog-title-${Math.random().toString(36).slice(2, 9)}`;
  const descId = `dialog-desc-${Math.random().toString(36).slice(2, 9)}`;
  let previousActiveElement: HTMLElement | null = null;

  const handleBackdropClick = () => {
    if (props.dismissible !== false) {
      props.onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.dismissible !== false) {
      props.onClose();
    }
  };

  createEffect(
    on(
      () => props.isOpen,
      async (isOpen, prevIsOpen) => {
        if (!dialogRef) return;

        if (isOpen && !prevIsOpen) {
          previousActiveElement = document.activeElement as HTMLElement;
          dialogRef.style.display = "block";
          dialogRef.style.opacity = "0";
          await animate(
            dialogRef as HTMLElement,
            { scale: [0.95, 1], y: [10, 0] },
            { duration: 0.2, ease: "easeOut" },
          ).finished;
          dialogRef.style.opacity = "1";
          dialogRef.focus();
        } else if (!isOpen && prevIsOpen) {
          dialogRef.style.opacity = "0";
          await animate(
            dialogRef as HTMLElement,
            { scale: 0.95, y: 10 },
            { duration: 0.2, ease: "easeOut" },
          ).finished;
          dialogRef.style.display = "none";
          previousActiveElement?.focus();
        }
      },
    ),
  );

  return (
    <>
      <Backdrop
        isOpen={props.isOpen}
        onClick={handleBackdropClick}
        opacity={0.5}
      />
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={dialogRef}
          class={twMerge(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm overflow-hidden pointer-events-auto transition-opacity",
            props.class,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={props.title ? titleId : undefined}
          aria-describedby={props.children ? descId : undefined}
          tabindex={-1}
          onKeyDown={handleKeyDown}
          style={{ display: "none" }}>
          {props.title && (
            <div class="px-6 pt-6 pb-2" id={titleId}>
              {typeof props.title === "string" ? (
                <Text variant="h6" class="text-center">
                  {props.title}
                </Text>
              ) : (
                props.title
              )}
            </div>
          )}

          <div
            id={descId}
            class={twMerge("px-6", props.title ? "pb-6 pt-2" : "p-6")}>
            {typeof props.children === "string" ? (
              <Text
                variant="body2"
                class="text-center text-gray-500 dark:text-gray-400">
                {props.children}
              </Text>
            ) : (
              props.children
            )}
          </div>

          {props.actions && (
            <div class="border-t border-gray-100 dark:border-gray-700 p-2 flex flex-row justify-end gap-2 bg-gray-50/50 dark:bg-gray-800/50">
              {props.actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
