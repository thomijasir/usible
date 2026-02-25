import { createEffect, on } from "solid-js";
import { animate } from "motion";
import type { BackdropProps } from "./Backdrop.interface";

export function Backdrop(props: BackdropProps) {
  let backdropRef: HTMLDivElement | undefined;

  createEffect(
    on(
      () => props.isOpen,
      async (isOpen, prevIsOpen) => {
        if (!backdropRef) return;

        if (isOpen && !prevIsOpen) {
          backdropRef.style.display = "block";
          await animate(
            backdropRef,
            { opacity: props.opacity ?? 0.5 },
            { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          ).finished;
        } else if (!isOpen && prevIsOpen) {
          await animate(
            backdropRef,
            { opacity: 0 },
            { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          ).finished;
          backdropRef.style.display = "none";
        }
      },
    ),
  );

  return (
    <div
      ref={backdropRef}
      onClick={props.onClick}
      aria-hidden="true"
      class="fixed inset-0 bg-black z-40 backdrop-blur-md"
      style={{
        opacity: 0,
        display: "none",
        "touch-action": "none",
        "backdrop-filter": "blur(8px)",
      }}
    />
  );
}
