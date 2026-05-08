import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { MediaVideoUpload } from "./MediaVideoUpload.component";

describe("MediaVideoUpload", () => {
  it("renders upload prompt", () => {
    render(() => <MediaVideoUpload />);
    expect(screen.getByText("Click to upload video")).toBeInTheDocument();
  });

  it("applies custom class to container", () => {
    const { container } = render(() => (
      <MediaVideoUpload class="my-custom-class" />
    ));
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("my-custom-class");
  });

  it("renders helper text", () => {
    render(() => <MediaVideoUpload helperText="MP4 up to 50MB" />);
    expect(screen.getByText("MP4 up to 50MB")).toBeInTheDocument();
  });
});
