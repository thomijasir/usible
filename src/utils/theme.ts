import { createSignal } from "solid-js";

const [isDark, setIsDark] = createSignal(false);
let initialized = false;

const isBrowser = () =>
  typeof window !== "undefined" &&
  typeof document !== "undefined" &&
  typeof localStorage !== "undefined";

const initTheme = () => {
  if (!isBrowser()) {
    return;
  }

  const storedTheme = localStorage.theme as string | undefined;
  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "dark" || (storedTheme === undefined && prefersDark)) {
    setIsDark(true);
    document.documentElement.classList.add("dark");
  } else {
    setIsDark(false);
    document.documentElement.classList.remove("dark");
  }
};

const toggleTheme = () => {
  if (!initialized) {
    initTheme();
    initialized = true;
  }

  const newIsDark = !isDark();
  setIsDark(newIsDark);

  if (!isBrowser()) {
    return;
  }

  if (newIsDark) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
};

/**
 * Provides reactive theme state and a toggle action.
 *
 * @returns An object with:
 * - `isDark`: accessor for the current dark-mode state
 * - `toggleTheme`: toggles theme and persists it to `localStorage` in browser environments
 */
export function useTheme() {
  if (!initialized) {
    initTheme();
    initialized = true;
  }

  return { isDark, toggleTheme };
}
