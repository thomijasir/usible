import { createEffect, on, onCleanup, createUniqueId } from "solid-js";
import { animate } from "motion";
import type { DrawerProps } from "./Drawer.interface";
import { Backdrop } from "../Backdrop";

export function Drawer(props: DrawerProps) {
  const drawerId = () => `drawer-${createUniqueId()}`;
  let drawerRef: HTMLDivElement | undefined;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let previousActiveElement: HTMLElement | null = null;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.isOpen) {
      props.onClose();
    }
  };

  createEffect(
    on(
      () => props.isOpen,
      (isOpen) => {
        if (isOpen) {
          previousActiveElement = document.activeElement as HTMLElement;
          document.addEventListener("keydown", handleKeyDown);
          drawerRef?.focus();
        } else {
          document.removeEventListener("keydown", handleKeyDown);
          previousActiveElement?.focus();
        }
      },
    ),
  );

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });

  const handlePointerDown = (e: PointerEvent) => {
    if (!drawerRef) return;
    isDragging = true;
    startY = e.clientY;
    currentY = 0;
    drawerRef.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || !drawerRef) return;
    currentY = Math.max(0, e.clientY - startY);
    drawerRef.style.transform = `translateY(${currentY}px)`;
  };

  const handlePointerUp = () => {
    if (!isDragging || !drawerRef) return;
    isDragging = false;

    if (currentY > 150) {
      props.onClose();
    } else {
      animate(
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
          drawerRef.style.display = "block";
          drawerRef.style.transform = "translateY(100%)";
          await animate(
            drawerRef as HTMLElement,
            { y: 0 },
            { duration: 0.3, ease: "easeOut" },
          ).finished;
        } else if (!isOpen && prevIsOpen) {
          await animate(
            drawerRef as HTMLElement,
            { y: "100%" },
            { duration: 0.3, ease: "easeOut" },
          ).finished;
          drawerRef.style.display = "none";
        }
      },
    ),
  );

  return (
    <>
      <Backdrop isOpen={props.isOpen} onClick={props.onClose} />
      <div
        ref={drawerRef}
        id={drawerId()}
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
          "touch-action": "none",
          display: "none",
        }}
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden focus:outline-none">
        {props.showHandle && (
          <div class="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
            <div class="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>
        )}
        <div class="overflow-y-auto max-h-full pb-safe">{props.children}</div>
      </div>
    </>
  );
}
