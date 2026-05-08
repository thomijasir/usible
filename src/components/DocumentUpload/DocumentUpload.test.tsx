import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { DocumentUpload } from "./DocumentUpload.component";

describe("DocumentUpload", () => {
  it("renders container div", () => {
    const { container } = render(() => <DocumentUpload onChange={vi.fn()} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("label shown when provided", () => {
    render(() => <DocumentUpload onChange={vi.fn()} label="Upload Document" />);
    expect(screen.getByText("Upload Document")).toBeTruthy();
  });

  it("required shows asterisk", () => {
    render(() => (
      <DocumentUpload onChange={vi.fn()} label="Document" required />
    ));
    const asterisk = document.querySelector(".text-error");
    expect(asterisk).toBeTruthy();
    expect(asterisk?.textContent).toContain("*");
  });

  it("upload area rendered with Click to upload text", () => {
    render(() => <DocumentUpload onChange={vi.fn()} />);
    expect(screen.getByText("Click to upload")).toBeTruthy();
  });

  it("hidden file input is present", () => {
    render(() => <DocumentUpload onChange={vi.fn()} />);
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.className).toContain("hidden");
  });

  it("helperText shown when provided", () => {
    render(() => (
      <DocumentUpload onChange={vi.fn()} helperText="PDF files only" />
    ));
    expect(screen.getByText("PDF files only")).toBeTruthy();
  });

  it("error shown when error prop is provided", () => {
    render(() => <DocumentUpload onChange={vi.fn()} error="File too large" />);
    expect(screen.getByText("File too large")).toBeTruthy();
  });

  it("file input accepts specified extensions", () => {
    render(() => (
      <DocumentUpload onChange={vi.fn()} extension={["pdf", "doc"]} />
    ));
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toContain(".pdf");
    expect(input.accept).toContain(".doc");
  });
});
