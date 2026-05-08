import { describe, it, expect } from "vitest";
import { createMediaUploadController } from "./MediaUpload.controller";

const createMockFile = (name: string) => {
  return new File(["content"], name, { type: "image/png" });
};

describe("createMediaUploadController", () => {
  it("returns initial state with empty files", () => {
    const controller = createMediaUploadController({
      onChange: () => {},
    });
    expect(controller.state.files()).toHaveLength(0);
    expect(controller.state.loading()).toBe(false);
    expect(controller.state.error()).toBeNull();
  });

  it("returns files from props value", () => {
    const files = [createMockFile("test.png")];
    const controller = createMediaUploadController({
      value: files,
      onChange: () => {},
    });
    expect(controller.state.files()).toHaveLength(1);
  });

  it("mode single replaces existing file", () => {
    const controller = createMediaUploadController({
      mode: "single",
      value: [createMockFile("existing.png")],
      onChange: () => {},
    });

    const mockEvent = {
      currentTarget: {
        files: [createMockFile("new.png")],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.files()).toHaveLength(1);
  });

  it("mode multi adds files", () => {
    const controller = createMediaUploadController({
      mode: "multi",
      onChange: () => {},
    });

    const mockEvent = {
      currentTarget: {
        files: [createMockFile("new.png")],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.files()).toHaveLength(1);
  });

  it("respects maxFiles limit in multi mode", () => {
    const controller = createMediaUploadController({
      mode: "multi",
      maxFiles: 2,
      value: [createMockFile("1.png"), createMockFile("2.png")],
      onChange: () => {},
    });

    const mockEvent = {
      currentTarget: {
        files: [createMockFile("3.png")],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.error()).toContain("maximum of 2");
  });

  it("handles invalid file extension", () => {
    const controller = createMediaUploadController({
      extension: ["jpg", "png"],
      onChange: () => {},
    });

    const mockEvent = {
      currentTarget: {
        files: [createMockFile("test.gif")],
        value: "",
      },
    } as unknown as Event;

    controller.actions.handleFileChange(mockEvent);
    expect(controller.state.error()).toContain("Invalid file extension");
  });

  it("handles file size exceeded", () => {
    const controller = createMediaUploadController({
      maximumFileSize: 1,
      onChange: () => {},
    });

    const largeFile = new File(["x".repeat(2 * 1024 * 1024)], "large.png", {
      type: "image/png",
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
    const controller = createMediaUploadController({
      value: [createMockFile("1.png"), createMockFile("2.png")],
      onChange: () => {},
    });

    controller.actions.handleRemoveFile(0);
    expect(controller.state.files()).toHaveLength(1);
  });

  it("returns error from props when present", () => {
    const controller = createMediaUploadController({
      error: "Custom error",
      onChange: () => {},
    });
    expect(controller.state.error()).toBe("Custom error");
  });

  it("returns internal error when no props error", () => {
    const controller = createMediaUploadController({
      onChange: () => {},
    });
    expect(controller.state.error()).toBeNull();
  });
});
