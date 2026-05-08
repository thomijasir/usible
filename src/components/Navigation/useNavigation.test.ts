import { describe, it, expect } from "vitest";
import { useNavigation } from "./useNavigation";

describe("useNavigation", () => {
  it("throws error when used outside Navigation provider", () => {
    expect(() => useNavigation()).toThrow(
      "useNavigation must be used within a Navigation provider",
    );
  });
});
