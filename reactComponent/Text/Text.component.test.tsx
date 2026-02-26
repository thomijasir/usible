import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "./Text.component";

describe("Text Component", () => {
  test("renders with default variant and color", () => {
    render(<Text>Hello World</Text>);
    const textElement = screen.getByText("Hello World");
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("P"); // Default variant is body1, which maps to <p>
    expect(textElement).toHaveClass("text-base"); // Default body1 class
    expect(textElement).toHaveClass("text-gray-900"); // Default text color
  });

  it("renders with h1 variant", () => {
    render(<Text variant="h1">Heading 1</Text>);
    const textElement = screen.getByText("Heading 1");
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("H1");
    expect(textElement).toHaveClass("text-5xl font-bold");
  });

  it("renders with primary color", () => {
    render(<Text color="primary">Primary Text</Text>);
    const textElement = screen.getByText("Primary Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-primary");
  });

  it("renders with custom className", () => {
    render(<Text className="custom-class">Custom Text</Text>);
    const textElement = screen.getByText("Custom Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("custom-class");
  });

  it("renders with combined variant, color, and className", () => {
    render(
      <Text variant="h3" color="secondary" className="extra-class">
        Combined Text
      </Text>,
    );
    const textElement = screen.getByText("Combined Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("H3");
    expect(textElement).toHaveClass("text-3xl font-bold");
    expect(textElement).toHaveClass("text-secondary");
    expect(textElement).toHaveClass("extra-class");
  });
});
