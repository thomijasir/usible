import { afterEach } from "vitest";
import { cleanup } from "@solidjs/testing-library";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});
