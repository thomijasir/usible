import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { TextArea } from "./TextArea.component";

describe("TextArea", () => {
  it("renders a textarea element", () => {
    render(() => <TextArea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(() => <TextArea label="Your message" />);
    expect(screen.getByText("Your message")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(() => <TextArea placeholder="Enter text here" />);
    expect(screen.getByPlaceholderText("Enter text here")).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(() => <TextArea value="Hello world" />);
    expect(screen.getByRole("textbox")).toHaveValue("Hello world");
  });

  it("is disabled when disabled=true", () => {
    render(() => <TextArea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("shows error string below the textarea", () => {
    render(() => <TextArea error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows helperText when provided", () => {
    render(() => <TextArea helperText="Max 500 characters" />);
    expect(screen.getByText("Max 500 characters")).toBeInTheDocument();
  });

  it("calls onInput with the current value", () => {
    const handleInput = vi.fn();
    render(() => <TextArea onInput={handleInput} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.input(textarea, { target: { value: "typed text" } });
    expect(handleInput).toHaveBeenCalledWith("typed text");
  });

  it("has default rows=4", () => {
    render(() => <TextArea />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  it("uses provided rows value", () => {
    render(() => <TextArea rows={8} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "8");
  });
});
