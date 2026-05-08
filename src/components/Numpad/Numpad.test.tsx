import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Numpad } from "./Numpad.component";

describe("Numpad", () => {
  it("renders digit buttons 1-9 and 0", () => {
    render(() => <Numpad onKeyPress={() => {}} />);
    for (const digit of ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) {
      expect(screen.getByText(digit)).toBeInTheDocument();
    }
  });

  it("clicking '1' calls onKeyPress with '1'", () => {
    const handleKeyPress = vi.fn();
    render(() => <Numpad onKeyPress={handleKeyPress} />);
    fireEvent.click(screen.getByText("1"));
    expect(handleKeyPress).toHaveBeenCalledWith("1");
  });

  it("clicking '0' calls onKeyPress with '0'", () => {
    const handleKeyPress = vi.fn();
    render(() => <Numpad onKeyPress={handleKeyPress} />);
    fireEvent.click(screen.getByText("0"));
    expect(handleKeyPress).toHaveBeenCalledWith("0");
  });

  it("clicking backspace button calls onBackspace", () => {
    const handleBackspace = vi.fn();
    render(() => (
      <Numpad onKeyPress={() => {}} onBackspace={handleBackspace} />
    ));
    const buttons = screen.getAllByRole("button");
    const backspaceButton = buttons[buttons.length - 1];
    fireEvent.click(backspaceButton);
    expect(handleBackspace).toHaveBeenCalledTimes(1);
  });

  it("biometric button is visible when onBiometricAuth is provided", () => {
    const handleBiometric = vi.fn();
    const { container } = render(() => (
      <Numpad onKeyPress={() => {}} onBiometricAuth={handleBiometric} />
    ));
    const buttons = container.querySelectorAll("button");
    const biometricButton = buttons[9];
    expect(biometricButton).not.toHaveClass("opacity-0");
  });

  it("biometric button is hidden when onBiometricAuth is not provided", () => {
    const { container } = render(() => <Numpad onKeyPress={() => {}} />);
    const buttons = container.querySelectorAll("button");
    const biometricButton = buttons[9];
    expect(biometricButton).toHaveClass("opacity-0");
  });

  it("dark theme applies inverse themed container classes", () => {
    const { container } = render(() => (
      <Numpad onKeyPress={() => {}} theme="dark" />
    ));
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("bg-foreground");
  });
});
