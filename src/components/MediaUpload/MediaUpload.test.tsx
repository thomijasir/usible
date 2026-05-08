import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { MediaUpload } from "./MediaUpload.component";

describe("MediaUpload", () => {
  it("renders container div", () => {
    const { container } = render(() => <MediaUpload onChange={vi.fn()} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("label shown when provided", () => {
    render(() => <MediaUpload onChange={vi.fn()} label="Upload Photo" />);
    expect(screen.getByText("Upload Photo")).toBeTruthy();
  });

  it("required shows asterisk", () => {
    render(() => <MediaUpload onChange={vi.fn()} label="Photo" required />);
    const asterisk = document.querySelector(".text-error");
    expect(asterisk).toBeTruthy();
    expect(asterisk?.textContent).toContain("*");
  });

  it("upload area rendered with Click to upload text", () => {
    render(() => <MediaUpload onChange={vi.fn()} />);
    expect(screen.getByText("Click to upload")).toBeTruthy();
  });

  it("hidden file input is present", () => {
    render(() => <MediaUpload onChange={vi.fn()} />);
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.className).toContain("hidden");
  });

  it("helperText shown when provided", () => {
    render(() => <MediaUpload onChange={vi.fn()} helperText="Max size 5MB" />);
    expect(screen.getByText("Max size 5MB")).toBeTruthy();
  });

  it("error shown when error prop is provided", () => {
    render(() => <MediaUpload onChange={vi.fn()} error="File too large" />);
    expect(screen.getByText("File too large")).toBeTruthy();
  });

  it("file input accepts specified extensions", () => {
    render(() => <MediaUpload onChange={vi.fn()} extension={["png", "jpg"]} />);
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toContain(".png");
    expect(input.accept).toContain(".jpg");
  });
});
