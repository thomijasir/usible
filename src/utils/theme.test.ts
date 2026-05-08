import { beforeEach, describe, expect, it, vi } from "vitest";

const loadTheme = async (prefersDark = false) => {
  vi.resetModules();
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({ matches: prefersDark }),
  });
  return import("./theme");
};

describe("useTheme", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.stubGlobal("localStorage", {});
    document.documentElement.classList.remove("dark");
  });

  it("returns isDark signal and toggleTheme function", async () => {
    const { useTheme } = await loadTheme();
    const { isDark, toggleTheme } = useTheme();
    expect(typeof isDark).toBe("function");
    expect(typeof toggleTheme).toBe("function");
  });

  it("isDark returns a boolean", async () => {
    const { useTheme } = await loadTheme();
    const { isDark } = useTheme();
    expect(typeof isDark()).toBe("boolean");
  });

  it("initializes dark mode from localStorage", async () => {
    localStorage.theme = "dark";
    const { useTheme } = await loadTheme();
    const { isDark } = useTheme();

    expect(isDark()).toBe(true);
    expect(document.documentElement).toHaveClass("dark");
  });

  it("initializes light mode from localStorage", async () => {
    localStorage.theme = "light";
    document.documentElement.classList.add("dark");
    const { useTheme } = await loadTheme(true);
    const { isDark } = useTheme();

    expect(isDark()).toBe(false);
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("uses system dark preference when no localStorage theme exists", async () => {
    const { useTheme } = await loadTheme(true);
    const { isDark } = useTheme();

    expect(isDark()).toBe(true);
    expect(document.documentElement).toHaveClass("dark");
  });

  it("toggles dark mode on and persists it", async () => {
    const { useTheme } = await loadTheme();
    const { isDark, toggleTheme } = useTheme();

    toggleTheme();

    expect(isDark()).toBe(true);
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.theme).toBe("dark");
  });

  it("toggles dark mode off and persists light mode", async () => {
    localStorage.theme = "dark";
    const { useTheme } = await loadTheme();
    const { isDark, toggleTheme } = useTheme();

    toggleTheme();

    expect(isDark()).toBe(false);
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.theme).toBe("light");
  });
});
