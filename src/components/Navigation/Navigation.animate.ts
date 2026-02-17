import type {
  NavigationDirection,
  TransitionEffect,
} from "./Navigation.interface";

export interface AnimationConfig {
  initial: Record<string, string | number | undefined>;
  active: Record<string, string | number | undefined>;
  inactive: Record<string, string | number | undefined>;
  exit: Record<string, string | number | undefined>;
}

export function getAnimationConfig(
  transitionEffect: TransitionEffect,
  direction: NavigationDirection,
): AnimationConfig {
  if (transitionEffect === "none") {
    return {
      initial: { opacity: 1 },
      active: { opacity: 1 },
      inactive: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }

  if (transitionEffect === "slide") {
    return {
      initial: {
        transform:
          direction === "forward" ? "translateX(100%)" : "translateX(-33%)",
        opacity: 1,
      },
      active: {
        transform: "translateX(0)",
        opacity: 1,
      },
      inactive: {
        transform: "translateX(-33%)",
        opacity: 1,
      },
      exit: {
        transform:
          direction === "forward" ? "translateX(-33%)" : "translateX(100%)",
        opacity: 1,
        "z-index": direction === "forward" ? 0 : 999,
      },
    };
  }

  if (transitionEffect === "fade") {
    return {
      initial: { opacity: 0 },
      active: { opacity: 1 },
      inactive: { opacity: 0 },
      exit: { opacity: 0 },
    };
  }

  return {
    initial: {
      transform: direction === "forward" ? "translateY(100%)" : "translateY(0)",
      opacity: direction === "forward" ? 1 : 0,
    },
    active: {
      transform: "translateY(0)",
      opacity: 1,
    },
    inactive: {
      transform: "translateY(0)",
      opacity: 1,
    },
    exit: {
      transform: direction === "forward" ? "translateY(0)" : "translateY(100%)",
      opacity: direction === "forward" ? 0 : 1,
      "z-index": direction === "forward" ? 0 : 999,
    },
  };
}

export const transitionOptions = {
  slide: { duration: 0.35, ease: "easeInOut" as const },
  push: { duration: 0.4, ease: "easeOut" as const },
  fade: { duration: 0.2, ease: "easeOut" as const },
  none: { duration: 0 },
};
