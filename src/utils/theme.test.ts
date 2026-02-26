import { describe, it, expect } from "@rstest/core";
import { useTheme } from "./theme";

describe("useTheme", () => {
  it("returns isDark signal and toggleTheme function", () => {
    const { isDark, toggleTheme } = useTheme();
    expect(typeof isDark).toBe("function");
    expect(typeof toggleTheme).toBe("function");
  });

  it("isDark returns a boolean", () => {
    const { isDark } = useTheme();
    expect(typeof isDark()).toBe("boolean");
  });
});
