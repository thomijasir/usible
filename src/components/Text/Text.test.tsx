import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { Text } from "./Text.component";

describe("Text", () => {
  it("renders body1 (p) by default", () => {
    render(() => <Text>Hello</Text>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("P");
    expect(el.className).toContain("text-base");
    expect(el.className).toContain("text-foreground");
  });

  it("renders h1 variant", () => {
    render(() => <Text variant="h1">Heading</Text>);
    const el = screen.getByText("Heading");
    expect(el.tagName).toBe("H1");
    expect(el.className).toContain("text-5xl");
    expect(el.className).toContain("font-bold");
  });

  it("renders h6 variant", () => {
    render(() => <Text variant="h6">Sub</Text>);
    const el = screen.getByText("Sub");
    expect(el.tagName).toBe("H6");
    expect(el.className).toContain("text-lg");
  });

  it("renders caption as span", () => {
    render(() => <Text variant="caption">Cap</Text>);
    const el = screen.getByText("Cap");
    expect(el.tagName).toBe("SPAN");
    expect(el.className).toContain("text-xs");
  });

  it("applies primary color", () => {
    render(() => <Text color="primary">Primary</Text>);
    expect(screen.getByText("Primary").className).toContain("text-primary");
  });

  it("applies error color", () => {
    render(() => <Text color="error">Error</Text>);
    expect(screen.getByText("Error").className).toContain("text-error");
  });

  it("applies custom class", () => {
    render(() => <Text class="custom-cls">Custom</Text>);
    expect(screen.getByText("Custom").className).toContain("custom-cls");
  });

  it("lets custom text color classes override the default color", () => {
    render(() => (
      <Text class="text-blue-600 dark:text-blue-400">Custom color</Text>
    ));
    const className = screen.getByText("Custom color").className;

    expect(className).toContain("text-blue-600");
    expect(className).toContain("dark:text-blue-400");
    expect(className).not.toContain("text-foreground");
  });

  it("renders subtitle1 as h6", () => {
    render(() => <Text variant="subtitle1">Sub1</Text>);
    expect(screen.getByText("Sub1").tagName).toBe("H6");
    expect(screen.getByText("Sub1").className).toContain("text-base");
    expect(screen.getByText("Sub1").className).toContain("font-medium");
  });
});
