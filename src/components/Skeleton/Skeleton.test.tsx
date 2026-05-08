import { render } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton.component";

describe("Skeleton", () => {
  it("default variant=text has rounded class", () => {
    const { container } = render(() => <Skeleton />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("rounded");
  });

  it("circular variant has themed pill radius class", () => {
    const { container } = render(() => <Skeleton variant="circular" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("rounded-usible-pill");
  });

  it("animation=pulse has animate-pulse class", () => {
    const { container } = render(() => <Skeleton animation="pulse" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("animate-pulse");
  });

  it("animation=none does not have animate-pulse class", () => {
    const { container } = render(() => <Skeleton animation="none" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).not.toContain("animate-pulse");
  });

  it("applies width style when provided", () => {
    const { container } = render(() => <Skeleton width="200px" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe("200px");
  });

  it("applies height style when provided", () => {
    const { container } = render(() => <Skeleton height="50px" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.height).toBe("50px");
  });

  it("applies custom class", () => {
    const { container } = render(() => <Skeleton class="my-skeleton" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("my-skeleton");
  });
});
