import { createEffect, on, onCleanup, createUniqueId } from "solid-js";
import { animate, type AnimationPlaybackControls } from "motion";
import type { DrawerProps } from "./Drawer.interface";
import { Backdrop } from "../Backdrop";

export function Drawer(props: DrawerProps) {
  const drawerId = `drawer-${createUniqueId()}`;
  let drawerRef: HTMLDivElement | undefined;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let previousActiveElement: HTMLElement | null = null;
  let previousBodyOverflow: string | undefined;
  let currentAnimation: AnimationPlaybackControls | undefined;

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
      drawerRef?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.isOpen) {
      props.onClose();
      return;
    }

    if (e.key !== "Tab" || !props.isOpen || !drawerRef) {
      return;
    }

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      e.preventDefault();
      drawerRef.focus();
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
      (isOpen) => {
        if (isOpen) {
          previousActiveElement = document.activeElement as HTMLElement;
          lockScroll();
          document.addEventListener("keydown", handleKeyDown);
          drawerRef?.focus();
        } else {
          document.removeEventListener("keydown", handleKeyDown);
          unlockScroll();
          previousActiveElement?.focus();
        }
      },
    ),
  );

  onCleanup(() => {
    currentAnimation?.stop();
    document.removeEventListener("keydown", handleKeyDown);
    unlockScroll();
  });

  const handlePointerDown = (e: PointerEvent) => {
    if (!drawerRef || props.disableDrag) return;
    isDragging = true;
    startY = e.clientY;
    currentY = 0;
    drawerRef.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || !drawerRef || props.disableDrag) return;
    currentY = Math.max(0, e.clientY - startY);
    drawerRef.style.transform = `translateY(${currentY}px)`;
  };

  const handlePointerUp = () => {
    if (!isDragging || !drawerRef || props.disableDrag) return;
    isDragging = false;

    if (currentY > 150) {
      props.onClose();
    } else {
      currentAnimation?.stop();
      currentAnimation = animate(
        drawerRef as HTMLElement,
        { y: 0 },
        { duration: 0.2, ease: "easeOut" },
      );
    }
    currentY = 0;
  };

  const heightStyle = () => {
    if (typeof props.height === "number") {
      return `${props.height}px`;
    }
    return props.height ?? "auto";
  };

  createEffect(
    on(
      () => props.isOpen,
      async (isOpen, prevIsOpen) => {
        if (!drawerRef) return;

        if (isOpen && !prevIsOpen) {
          currentAnimation?.stop();
          drawerRef.style.display = "block";
          drawerRef.style.transform = "translateY(100%)";
          currentAnimation = animate(
            drawerRef as HTMLElement,
            { y: 0 },
            { duration: 0.3, ease: "easeOut" },
          );
          try {
            await currentAnimation.finished;
          } catch {
            // animation was cancelled by a subsequent transition
          }
        } else if (!isOpen && prevIsOpen) {
          currentAnimation?.stop();
          currentAnimation = animate(
            drawerRef as HTMLElement,
            { y: "100%" },
            { duration: 0.3, ease: "easeOut" },
          );
          try {
            await currentAnimation.finished;
            drawerRef.style.display = "none";
          } catch {
            if (!props.isOpen) {
              drawerRef.style.display = "none";
            }
          }
        }
      },
    ),
  );

  return (
    <>
      <Backdrop isOpen={props.isOpen} onClick={props.onClose} />
      <div
        ref={drawerRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={props.ariaLabelledBy}
        tabIndex={-1}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          height: heightStyle(),
          "touch-action": props.disableDrag ? "auto" : "none",
          display: "none",
        }}
        class="fixed bottom-0 left-0 right-0 bg-surface rounded-t-usible-xl shadow-usible-lg z-50 overflow-hidden focus:outline-none">
        {props.showHandle && (
          <div class="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
            <div class="w-12 h-1.5 bg-border-strong rounded-usible-pill" />
          </div>
        )}
        <div class="overflow-y-auto max-h-full pb-safe">{props.children}</div>
      </div>
    </>
  );
}
