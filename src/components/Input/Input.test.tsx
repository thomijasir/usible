import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input.component";

describe("Input", () => {
  it("renders an input element", () => {
    render(() => <Input />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("renders label", () => {
    render(() => <Input label="Email" />);
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("renders placeholder", () => {
    render(() => <Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText("Enter value")).toBeTruthy();
  });

  it("displays value", () => {
    render(() => <Input value="hello" />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onInput with new value", () => {
    const onInput = vi.fn();
    render(() => <Input onInput={onInput} />);
    fireEvent.input(screen.getByRole("textbox"), { target: { value: "test" } });
    expect(onInput).toHaveBeenCalledWith("test");
  });

  it("calls onChange", () => {
    const onChange = vi.fn();
    render(() => <Input onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledWith("abc");
  });

  it("shows error string", () => {
    render(() => <Input error="Required" />);
    expect(screen.getByText("Required")).toBeTruthy();
  });

  it("marks input as invalid on error", () => {
    render(() => <Input error="Err" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows helper text", () => {
    render(() => <Input helperText="Helper" />);
    expect(screen.getByText("Helper")).toBeTruthy();
  });

  it("is disabled when disabled=true", () => {
    render(() => <Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders type=password", () => {
    const { container } = render(() => <Input type="password" />);
    expect(container.querySelector('input[type="password"]')).toBeTruthy();
  });

  it("applies uppercase text case", () => {
    const onInput = vi.fn();
    render(() => <Input textCase="uppercase" onInput={onInput} />);
    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    expect(onInput).toHaveBeenCalledWith("HELLO");
  });

  it("calls onBlur", () => {
    const onBlur = vi.fn();
    render(() => <Input onBlur={onBlur} />);
    fireEvent.blur(screen.getByRole("textbox"));
    expect(onBlur).toHaveBeenCalledOnce();
  });
});
