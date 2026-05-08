import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { TextHighlight } from "./TextHighlight.component";

describe("TextHighlight", () => {
  it("renders children text", () => {
    render(() => <TextHighlight highlight="">Hello World</TextHighlight>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("wraps matching portion in a span with font-bold class", () => {
    const { container } = render(() => (
      <TextHighlight highlight="World">Hello World</TextHighlight>
    ));
    const highlighted = container.querySelector("span.font-bold");
    expect(highlighted).toBeInTheDocument();
    expect(highlighted?.textContent).toBe("World");
  });

  it("non-matching text renders normally without bold span", () => {
    const { container } = render(() => (
      <TextHighlight highlight="xyz">Hello World</TextHighlight>
    ));
    const highlighted = container.querySelector("span.font-bold");
    expect(highlighted).not.toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("color=primary applies text-primary class to highlighted span", () => {
    const { container } = render(() => (
      <TextHighlight highlight="World" color="primary">
        Hello World
      </TextHighlight>
    ));
    const highlighted = container.querySelector("span.font-bold");
    expect(highlighted?.className).toContain("text-primary");
  });

  it("renders plain text when no highlight is provided", () => {
    const { container } = render(() => (
      <TextHighlight highlight="">Hello World</TextHighlight>
    ));
    const highlighted = container.querySelector("span.font-bold");
    expect(highlighted).not.toBeInTheDocument();
  });

  it("performs case-insensitive matching", () => {
    const { container } = render(() => (
      <TextHighlight highlight="world">Hello World</TextHighlight>
    ));
    const highlighted = container.querySelector("span.font-bold");
    expect(highlighted).toBeInTheDocument();
    expect(highlighted?.textContent?.toLowerCase()).toBe("world");
  });
});
