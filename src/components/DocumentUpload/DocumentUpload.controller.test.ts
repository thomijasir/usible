import { describe, it, expect } from "vitest";
import { createDocumentUploadController } from "./DocumentUpload.controller";

const createMockFile = (name: string) => {
  return new File(["content"], name, { type: "application/pdf" });
};

describe("createDocumentUploadController", () => {
  it("returns initial state with empty files", () => {
    const controller = createDocumentUploadController({
      onChange: () => {},
    });
    expect(controller.state.files()).toHaveLength(0);
    expect(controller.state.loading()).toBe(false);
    expect(controller.state.error()).toBeNull();
  });

  it("returns files from props value", () => {
    const files = [createMockFile("test.pdf")];
    const controller = createDocumentUploadController({
      value: files,
      onChange: () => {},
    });
    expect(controller.state.files()).toHaveLength(1);
  });

  it("mode single replaces existing file", () => {
    const controller = createDocumentUploadController({
      mode: "single",
      value: [createMockFile("existing.pdf")],
      onChange: () => {},
    });

    const mockEvent = {
      currentTarget: {
        files: [createMockFile("new.pdf")],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.files()).toHaveLength(1);
  });

  it("mode multi adds files", () => {
    const controller = createDocumentUploadController({
      mode: "multi",
      onChange: () => {},
    });

    const mockEvent = {
      currentTarget: {
        files: [createMockFile("new.pdf")],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.files()).toHaveLength(1);
  });

  it("handles invalid file extension", () => {
    const controller = createDocumentUploadController({
      extension: ["pdf", "doc"],
      onChange: () => {},
    });

    const mockEvent = {
      currentTarget: {
        files: [createMockFile("test.txt")],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.error()).toContain("Invalid file extension");
  });

  it("handles file size exceeded", () => {
    const controller = createDocumentUploadController({
      maximumFileSize: 1,
      onChange: () => {},
    });

    const largeFile = new File(["x".repeat(11 * 1024 * 1024)], "large.pdf", {
      type: "application/pdf",
    });

    const mockEvent = {
      currentTarget: {
        files: [largeFile],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.error()).toContain("File size exceeds");
  });

  it("handleRemoveFile removes file at index", () => {
    const controller = createDocumentUploadController({
      value: [createMockFile("1.pdf"), createMockFile("2.pdf")],
      onChange: () => {},
    });

    controller.actions.handleRemoveFile(0);
    expect(controller.state.files()).toHaveLength(1);
  });

  it("returns error from props when present", () => {
    const controller = createDocumentUploadController({
      error: "Custom error",
      onChange: () => {},
    });
    expect(controller.state.error()).toBe("Custom error");
  });

  it("returns internal error when no props error", () => {
    const controller = createDocumentUploadController({
      onChange: () => {},
    });
    expect(controller.state.error()).toBeNull();
  });
});
