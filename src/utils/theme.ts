import { createSignal } from "solid-js";

const [isDark, setIsDark] = createSignal(false);

// Initialize theme
const initTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setIsDark(true);
    document.documentElement.classList.add("dark");
  } else {
    setIsDark(false);
    document.documentElement.classList.remove("dark");
  }
};

// Toggle theme
const toggleTheme = () => {
  const newIsDark = !isDark();
  setIsDark(newIsDark);
  if (newIsDark) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
};

// Run initialization once
initTheme();

export function useTheme() {
  return { isDark, toggleTheme };
}
