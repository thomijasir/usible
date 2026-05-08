import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Image } from "./Image.component";

describe("Image", () => {
  it("renders container div", () => {
    const { container } = render(() => <Image />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("shows img element when src is provided", () => {
    const { container } = render(() => (
      <Image src="https://example.com/image.jpg" alt="Test image" />
    ));
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("img has correct alt attribute", () => {
    const { container } = render(() => (
      <Image src="https://example.com/image.jpg" alt="My alt text" />
    ));
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "My alt text");
  });

  it("shows fallback element when no src is provided", () => {
    render(() => <Image alt="no source" />);
    expect(screen.getByTestId("image-fallback")).toBeInTheDocument();
  });

  it("does not show fallback when src is provided", () => {
    render(() => <Image src="https://example.com/image.jpg" alt="has src" />);
    expect(screen.queryByTestId("image-fallback")).not.toBeInTheDocument();
  });

  it("applies width and height as inline styles", () => {
    const { container } = render(() => (
      <Image width={200} height={150} alt="sized" />
    ));
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute("style");
    const style = wrapper.getAttribute("style") ?? "";
    expect(style).toContain("200px");
    expect(style).toContain("150px");
  });

  it("applies width and height as string", () => {
    const { container } = render(() => (
      <Image width="100%" height="auto" alt="sized" />
    ));
    const wrapper = container.firstElementChild as HTMLElement;
    const style = wrapper.getAttribute("style") ?? "";
    expect(style).toContain("width: 100%");
    expect(style).toContain("height: auto");
  });

  it("applies custom class", () => {
    const { container } = render(() => (
      <Image
        src="https://example.com/image.jpg"
        alt="test"
        class="custom-class"
      />
    ));
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("custom-class");
  });

  it("calls onLoad callback when image loads", () => {
    const onLoad = vi.fn();
    const { container } = render(() => (
      <Image src="https://example.com/image.jpg" alt="test" onLoad={onLoad} />
    ));
    const img = container.querySelector("img") as HTMLImageElement;
    fireEvent.load(img);
    expect(onLoad).toHaveBeenCalledOnce();
  });

  it("calls onError callback when image fails to load", () => {
    const onError = vi.fn();
    const { container } = render(() => (
      <Image src="https://example.com/image.jpg" alt="test" onError={onError} />
    ));
    const img = container.querySelector("img") as HTMLImageElement;
    fireEvent.error(img);
    expect(onError).toHaveBeenCalledOnce();
  });

  it("shows fallback when image fails to load without fallbackSrc", () => {
    render(() => <Image src="https://example.com/image.jpg" alt="test" />);
    const img = document.querySelector("img") as HTMLImageElement;
    fireEvent.error(img);
    expect(screen.getByTestId("image-fallback")).toBeInTheDocument();
  });

  it("shows fallback icon with alt text when error", () => {
    render(() => (
      <Image src="https://example.com/image.jpg" alt="Custom error alt" />
    ));
    const img = document.querySelector("img") as HTMLImageElement;
    fireEvent.error(img);
    const fallback = screen.getByTestId("image-fallback");
    expect(fallback.innerHTML).toContain("aria-label");
  });

  it("uses fallbackSrc when image fails to load", () => {
    const { container } = render(() => (
      <Image
        src="https://example.com/image.jpg"
        alt="test"
        fallbackSrc="https://example.com/fallback.jpg"
      />
    ));
    const img = container.querySelector("img") as HTMLImageElement;
    fireEvent.error(img);
    const retryImg = container.querySelector("img") as HTMLImageElement;
    expect(retryImg.src).toContain("fallback.jpg");
  });
});
