import { createEffect, createUniqueId, on, onCleanup } from "solid-js";
import { animate, type AnimationPlaybackControls } from "motion";
import { twMerge } from "tailwind-merge";
import type { DialogProps } from "./Dialog.interface";
import { Backdrop } from "../Backdrop";
import { Text } from "../Text";

export function Dialog(props: DialogProps) {
  let dialogRef: HTMLDivElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  const titleId = `dialog-title-${createUniqueId()}`;
  const descId = `dialog-desc-${createUniqueId()}`;
  let previousActiveElement: HTMLElement | null = null;
  let currentAnimation: AnimationPlaybackControls | undefined;
  let previousBodyOverflow: string | undefined;

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  const getFocusableElements = () =>
    Array.from(
      dialogRef?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

  const handleBackdropClick = () => {
    if (props.dismissible !== false) {
      props.onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.dismissible !== false) {
      props.onClose();
      return;
    }

    if (e.key !== "Tab" || !props.isOpen || !dialogRef) {
      return;
    }

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      e.preventDefault();
      dialogRef.focus();
      return;
    }

    const firstElement = focusableElements[0]!;
    const lastElement = focusableElements[focusableElements.length - 1]!;
    const activeElement = document.activeElement;

    if (e.shiftKey && activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  const lockScroll = () => {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    if (previousBodyOverflow !== undefined) {
      document.body.style.overflow = previousBodyOverflow;
      previousBodyOverflow = undefined;
    }
  };

  createEffect(
    on(
      () => props.isOpen,
      async (isOpen, prevIsOpen) => {
        if (!dialogRef || !containerRef) return;

        currentAnimation?.stop();

        if (isOpen && !prevIsOpen) {
          previousActiveElement = document.activeElement as HTMLElement;
          lockScroll();
          document.addEventListener("keydown", handleKeyDown);
          containerRef.style.display = "flex";
          dialogRef.style.opacity = "0";
          dialogRef.style.transform = "translateY(12px)";
          dialogRef.style.visibility = "visible";
          dialogRef.style.display = "block";
          currentAnimation = animate(
            dialogRef as HTMLElement,
            { opacity: [0, 1], y: [12, 0] },
            { duration: 0.2, ease: "easeOut" },
          );
          try {
            await currentAnimation.finished;
            dialogRef.style.transform = "";
            dialogRef.focus();
          } catch {
            // animation was cancelled by a subsequent transition
          }
        } else if (!isOpen && prevIsOpen) {
          document.removeEventListener("keydown", handleKeyDown);
          currentAnimation = animate(
            dialogRef as HTMLElement,
            { opacity: [1, 0], y: [0, 12] },
            { duration: 0.15, ease: "easeIn" },
          );
          try {
            await currentAnimation.finished;
            dialogRef.style.display = "none";
            dialogRef.style.visibility = "hidden";
            dialogRef.style.transform = "";
            containerRef.style.display = "none";
            unlockScroll();
            previousActiveElement?.focus();
          } catch {
            // animation was cancelled
            if (!props.isOpen) {
              dialogRef.style.display = "none";
              dialogRef.style.visibility = "hidden";
              dialogRef.style.transform = "";
              containerRef.style.display = "none";
              unlockScroll();
            }
          }
        }
      },
    ),
  );

  onCleanup(() => {
    currentAnimation?.stop();
    document.removeEventListener("keydown", handleKeyDown);
    unlockScroll();
  });

  return (
    <>
      <Backdrop
        isOpen={props.isOpen}
        onClick={handleBackdropClick}
        opacity={0.5}
      />
      <div
        ref={containerRef}
        class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        style={{ display: "none" }}>
        <div
          ref={dialogRef}
          class={twMerge(
            "bg-surface rounded-usible-xl shadow-usible-lg w-full max-w-xs sm:max-w-sm overflow-hidden pointer-events-auto",
            props.class,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={props.title ? titleId : undefined}
          aria-describedby={props.children ? descId : undefined}
          tabindex={-1}
          style={{
            display: "none",
            visibility: "hidden",
            transform: "translateY(12px)",
          }}>
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
              <Text variant="body2" class="text-center text-foreground-muted">
                {props.children}
              </Text>
            ) : (
              props.children
            )}
          </div>

          {props.actions && (
            <div class="border-t border-border-muted p-2 flex flex-row justify-end gap-2 bg-surface-muted/50">
              {props.actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
