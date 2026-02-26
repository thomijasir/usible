import { render, screen, fireEvent } from "@testing-library/react";
import { Image } from "./Image.component";
import { describe, it, expect, vi } from "vitest";

describe("Image", () => {
  it("renders image with src, alt, width, height and className", () => {
    render(
      <Image
        src="test.jpg"
        alt="Test Image"
        width="200px"
        height="100px"
        className="custom-class"
      />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "Test Image");

    // The container has the class and styles
    const container = img.closest("div");
    expect(container).toHaveClass("custom-class");
    expect(container).toHaveStyle({ width: "200px", height: "100px" });
  });

  it("handles loading state and shows skeleton", () => {
    const { container } = render(<Image src="test.jpg" />);
    // Skeleton usually has animate-pulse
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    // Image should be hidden initially (opacity-0)
    const img = screen.getByRole("img");
    expect(img).toHaveClass("opacity-0");
  });

  it("removes loading state on load", () => {
    const onLoad = vi.fn();
    render(<Image src="test.jpg" onLoad={onLoad} />);
    const img = screen.getByRole("img");

    fireEvent.load(img);

    expect(img).toHaveClass("opacity-100");
    expect(onLoad).toHaveBeenCalledTimes(1);
    // Skeleton should be gone
    expect(document.querySelector(".animate-pulse")).not.toBeInTheDocument();
  });

  it("removes loading state on load without onLoad prop", () => {
    render(<Image src="test.jpg" />);
    const img = screen.getByRole("img");
    fireEvent.load(img);
    expect(img).toHaveClass("opacity-100");
  });

  it("uses fallbackSrc when image load fails and fallbackSrc is provided", () => {
    const onError = vi.fn();
    render(
      <Image
        src="invalid.jpg"
        fallbackSrc="fallback.jpg"
        alt="Test"
        onError={onError}
      />,
    );
    const img = screen.getByRole("img");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "fallback.jpg");
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("uses fallbackSrc when image load fails without onError prop", () => {
    render(<Image src="invalid.jpg" fallbackSrc="fallback.jpg" alt="Test" />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", "fallback.jpg");
  });

  it("renders SVG fallback when image load fails and no fallbackSrc is provided", () => {
    const onError = vi.fn();
    render(<Image src="invalid.jpg" alt="Test" onError={onError} />);
    const img = screen.getByRole("img");

    fireEvent.error(img);

    // The img tag should be gone (replaced by SVG div wrapper)
    expect(screen.getByTestId("image-fallback-svg")).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("resets state when src prop changes", () => {
    const { rerender, container } = render(<Image src="first.jpg" />);
    const img = screen.getByRole("img");
    fireEvent.load(img);
    expect(img).toHaveClass("opacity-100");

    // Update src
    rerender(<Image src="second.jpg" />);

    // Should be loading again
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    const newImg = screen.getByRole("img");
    expect(newImg).toHaveClass("opacity-0");
    expect(newImg).toHaveAttribute("src", "second.jpg");
  });
});
