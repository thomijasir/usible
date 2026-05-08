import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { Loader } from "./Loader.component";

describe("Loader", () => {
  it("renders with role=status", () => {
    render(() => <Loader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders with aria-label=Loading", () => {
    render(() => <Loader />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("applies small size class (w-4)", () => {
    render(() => <Loader size="small" />);
    expect(screen.getByRole("status").className).toContain("w-4");
  });

  it("applies medium size class (w-8)", () => {
    render(() => <Loader size="medium" />);
    expect(screen.getByRole("status").className).toContain("w-8");
  });

  it("applies large size class (w-12)", () => {
    render(() => <Loader size="large" />);
    expect(screen.getByRole("status").className).toContain("w-12");
  });

  it("applies primary color class containing border-t-primary", () => {
    render(() => <Loader color="primary" />);
    expect(screen.getByRole("status").className).toContain("border-t-primary");
  });

  it("applies custom class", () => {
    render(() => <Loader class="my-custom-class" />);
    expect(screen.getByRole("status")).toHaveClass("my-custom-class");
  });
});
