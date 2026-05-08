import { describe, it, expect } from "vitest";
import { getAnimationConfig, transitionOptions } from "./Navigation.animate";

describe("getAnimationConfig", () => {
  describe('transitionEffect="none"', () => {
    it("returns opacity 1 for all states when direction is forward", () => {
      const config = getAnimationConfig("none", "forward");
      expect(config.initial).toEqual({ opacity: 1 });
      expect(config.active).toEqual({ opacity: 1 });
      expect(config.inactive).toEqual({ opacity: 1 });
      expect(config.exit).toEqual({ opacity: 1 });
    });

    it("returns opacity 1 for all states when direction is backward", () => {
      const config = getAnimationConfig("none", "backward");
      expect(config.initial).toEqual({ opacity: 1 });
      expect(config.active).toEqual({ opacity: 1 });
      expect(config.inactive).toEqual({ opacity: 1 });
      expect(config.exit).toEqual({ opacity: 1 });
    });
  });

  describe('transitionEffect="slide"', () => {
    it("returns slide config with forward direction", () => {
      const config = getAnimationConfig("slide", "forward");
      expect(config.initial).toEqual({
        transform: "translateX(100%)",
        opacity: 1,
      });
      expect(config.active).toEqual({
        transform: "translateX(0)",
        opacity: 1,
      });
      expect(config.inactive).toEqual({
        transform: "translateX(-33%)",
        opacity: 1,
      });
      expect(config.exit).toEqual({
        transform: "translateX(-33%)",
        opacity: 1,
        "z-index": 0,
      });
    });

    it("returns slide config with backward direction", () => {
      const config = getAnimationConfig("slide", "backward");
      expect(config.initial).toEqual({
        transform: "translateX(-33%)",
        opacity: 1,
      });
      expect(config.exit).toEqual({
        transform: "translateX(100%)",
        opacity: 1,
        "z-index": 999,
      });
    });
  });

  describe('transitionEffect="fade"', () => {
    it("returns fade config for any direction", () => {
      const configForward = getAnimationConfig("fade", "forward");
      const configBackward = getAnimationConfig("fade", "backward");

      expect(configForward.initial).toEqual({ opacity: 0 });
      expect(configForward.active).toEqual({ opacity: 1 });
      expect(configForward.inactive).toEqual({ opacity: 0 });
      expect(configForward.exit).toEqual({ opacity: 0 });

      expect(configBackward.initial).toEqual({ opacity: 0 });
      expect(configBackward.active).toEqual({ opacity: 1 });
      expect(configBackward.inactive).toEqual({ opacity: 0 });
      expect(configBackward.exit).toEqual({ opacity: 0 });
    });
  });

  describe('transitionEffect="push"', () => {
    it("returns push config with forward direction", () => {
      const config = getAnimationConfig("push", "forward");
      expect(config.initial).toEqual({
        transform: "translateY(100%)",
        opacity: 1,
      });
      expect(config.active).toEqual({
        transform: "translateY(0)",
        opacity: 1,
      });
      expect(config.exit).toEqual({
        transform: "translateY(0)",
        opacity: 0,
        "z-index": 0,
      });
    });

    it("returns push config with backward direction", () => {
      const config = getAnimationConfig("push", "backward");
      expect(config.initial).toEqual({
        transform: "translateY(0)",
        opacity: 0,
      });
      expect(config.exit).toEqual({
        transform: "translateY(100%)",
        opacity: 1,
        "z-index": 999,
      });
    });
  });
});

describe("transitionOptions", () => {
  it("has slide transition options", () => {
    expect(transitionOptions.slide).toEqual({
      duration: 0.35,
      ease: "easeInOut",
    });
  });

  it("has push transition options", () => {
    expect(transitionOptions.push).toEqual({
      duration: 0.4,
      ease: "easeOut",
    });
  });

  it("has fade transition options", () => {
    expect(transitionOptions.fade).toEqual({
      duration: 0.2,
      ease: "easeOut",
    });
  });

  it("has none transition options", () => {
    expect(transitionOptions.none).toEqual({
      duration: 0,
    });
  });
});
