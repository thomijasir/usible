import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { HtmlRender } from "./HtmlRender.component";

describe("HtmlRender", () => {
  it("renders sanitized html content", () => {
    render(() => <HtmlRender html="<p>Hello</p>" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders multiple html elements", () => {
    render(() => <HtmlRender html="<p>First</p><p>Second</p>" />);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("strips script tags to prevent XSS", () => {
    const { container } = render(() => (
      <HtmlRender html='<p>Safe content</p><script>alert("xss")</script>' />
    ));
    expect(container.querySelector("script")).not.toBeInTheDocument();
    expect(screen.getByText("Safe content")).toBeInTheDocument();
  });

  it("strips script content from innerHTML", () => {
    const { container } = render(() => (
      <HtmlRender html='<script>alert("xss")</script>' />
    ));
    expect(container.innerHTML).not.toContain("alert");
  });

  it("applies custom class to the wrapper element", () => {
    const { container } = render(() => (
      <HtmlRender html="<p>Text</p>" class="custom-html" />
    ));
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("custom-html");
  });
});
