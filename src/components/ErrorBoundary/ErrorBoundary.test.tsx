import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import type { JSX } from "solid-js";
import { ErrorBoundary } from "./ErrorBoundary.component";

function ThrowingComponent(): JSX.Element {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    render(() => (
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    ));
    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });

  it("shows error heading when a child throws an error", () => {
    render(() => (
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    ));
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
  });

  it("shows Reload Application button in error state", () => {
    render(() => (
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    ));
    expect(
      screen.getByRole("button", { name: /reload application/i }),
    ).toBeInTheDocument();
  });
});
