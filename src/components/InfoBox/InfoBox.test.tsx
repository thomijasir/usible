import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { InfoBox } from "./InfoBox.component";

describe("InfoBox", () => {
  it("renders description text", () => {
    render(() => <InfoBox description="This is a description" />);
    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(() => <InfoBox description="Desc" title="My Title" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("does not render title element when title is not provided", () => {
    render(() => <InfoBox description="Desc" />);
    expect(screen.queryByText(/title/i)).not.toBeInTheDocument();
  });

  it("primary color (default) applies themed primary surface", () => {
    const { container } = render(() => (
      <InfoBox description="Desc" color="primary" />
    ));
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("bg-primary-50");
  });

  it("error color applies themed error surface", () => {
    const { container } = render(() => (
      <InfoBox description="Desc" color="error" />
    ));
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("bg-error-50");
  });

  it("renders leftIcon when provided", () => {
    const Icon = () => <span data-testid="left-icon">icon</span>;
    render(() => <InfoBox description="Desc" leftIcon={<Icon />} />);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("applies custom class", () => {
    const { container } = render(() => (
      <InfoBox description="Desc" class="my-info-box" />
    ));
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("my-info-box");
  });
});
