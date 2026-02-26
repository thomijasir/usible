import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Numpad } from "./Numpad.component";

describe("Numpad Component", () => {
  it("renders keys 0-9", () => {
    render(<Numpad />);
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });

  it("calls onKeyPress with correct digit when number keys are clicked", () => {
    const onKeyPressMock = vi.fn();
    render(<Numpad onKeyPress={onKeyPressMock} />);

    const key1 = screen.getByText("1");
    fireEvent.click(key1);
    expect(onKeyPressMock).toHaveBeenCalledWith("1");

    const key0 = screen.getByText("0");
    fireEvent.click(key0);
    expect(onKeyPressMock).toHaveBeenCalledWith("0");
  });

  it("calls onBackspace when backspace button is clicked", () => {
    const onBackspaceMock = vi.fn();
    render(<Numpad onBackspace={onBackspaceMock} />);

    // Keys 1-9 (9 buttons) + Biometric (1) + 0 (1) + Backspace (1) = 12 buttons
    // Indices: 0-8 are 1-9, 9 is Biometric, 10 is 0, 11 is Backspace
    const buttons = screen.getAllByRole("button");
    const backspaceButton = buttons[11]!;

    fireEvent.click(backspaceButton);
    expect(onBackspaceMock).toHaveBeenCalledTimes(1);
  });

  it("calls onBiometricAuth when biometric button is clicked", () => {
    const onBiometricAuthMock = vi.fn();
    render(<Numpad onBiometricAuth={onBiometricAuthMock} />);

    const buttons = screen.getAllByRole("button");
    // Biometric is index 9
    const biometricButton = buttons[9]!;

    fireEvent.click(biometricButton);
    expect(onBiometricAuthMock).toHaveBeenCalledTimes(1);
  });

  it("hides biometric button when onBiometricAuth is not provided", () => {
    render(<Numpad />);
    const buttons = screen.getAllByRole("button");
    // Biometric is index 9
    const biometricButton = buttons[9]!;
    expect(biometricButton).toHaveClass("opacity-0");
    expect(biometricButton).toHaveClass("pointer-events-none");
  });

  it("applies dark theme classes when theme is dark", () => {
    const { container } = render(<Numpad theme="dark" />);
    expect(container.firstChild).toHaveClass("bg-gray-900");
    expect(container.firstChild).toHaveClass("text-white");
  });

  it("applies light theme classes by default", () => {
    const { container } = render(<Numpad />);
    expect(container.firstChild).toHaveClass("bg-white");
    expect(container.firstChild).toHaveClass("text-gray-900");
  });
});
