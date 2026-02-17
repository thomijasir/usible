import type { Variants } from "motion/react";
import { NavigationDirection, TransitionEffect } from "./Navigation.interface";

export const getVariants = (transitionEffect: TransitionEffect): Variants => {
  if (transitionEffect === "none") {
    return {
      initial: { opacity: 1 },
      active: { opacity: 1 },
      inactive: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }

  if (transitionEffect === "slide") {
    // iOS-style horizontal slide
    return {
      initial: (direction: NavigationDirection) => ({
        x: direction === "forward" ? "100%" : "-33%",
        opacity: 1,
        transition: {
          duration: 0.35,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }),
      active: () => ({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.35,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }),
      inactive: () => ({
        x: "-33%", // Move to background
        opacity: 1,
        scale: 1, // iOS doesn't scale down much, mainly parallax
        transition: {
          duration: 0.35,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }),
      exit: (direction: NavigationDirection) => ({
        x: direction === "forward" ? "-33%" : "100%",
        opacity: 1,
        zIndex: direction === "forward" ? 0 : 999, // Ensure exiting element is on top if popping
        transition: {
          duration: 0.35,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }),
    };
  }

  if (transitionEffect === "fade") {
    return {
      initial: { opacity: 0 },
      active: {
        opacity: 1,
        transition: { duration: 0.2 },
      },
      inactive: {
        opacity: 0, // Hide if not active
        transition: { duration: 0.2 },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.2 },
      },
    };
  }

  // Default 'push' - Android/Material Design-style vertical slide
  return {
    initial: (direction: NavigationDirection) => ({
      y: direction === "forward" ? "100%" : 0,
      opacity: direction === "forward" ? 1 : 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    active: () => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    inactive: () => ({
      y: 0,
      opacity: 1,
      scale: 1, // Could scale down for material effect: 0.95
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    exit: (direction: NavigationDirection) => ({
      y: direction === "forward" ? 0 : "100%",
      opacity: direction === "forward" ? 0 : 1,
      zIndex: direction === "forward" ? 0 : 999,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };
};
