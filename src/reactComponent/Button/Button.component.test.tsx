import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button.component";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies default props correctly", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("px-5");
    expect(button).toHaveClass("py-3");
    expect(button).not.toHaveClass("w-full");
  });

  describe("variants", () => {
    it("renders filled variant", () => {
      render(<Button variant="filled">Filled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary");
    });

    it("renders outlined variant", () => {
      render(<Button variant="outlined">Outlined</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass("border-primary");
    });

    it("renders text variant", () => {
      render(<Button variant="text">Text</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-primary");
    });
  });

  describe("colors", () => {
    const colors = [
      "primary",
      "secondary",
      "ternary",
      "success",
      "warning",
      "error",
      "transparent",
    ] as const;

    colors.forEach((color) => {
      it(`renders ${color} color`, () => {
        render(<Button color={color}>{color}</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`bg-${color}`);
      });
    });
  });

  describe("sizes", () => {
    it("renders small size", () => {
      render(<Button size="small">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-4");
      expect(button).toHaveClass("py-2.5");
      expect(button).toHaveClass("text-sm");
    });

    it("renders medium size", () => {
      render(<Button size="medium">Medium</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-5");
      expect(button).toHaveClass("py-3");
      expect(button).toHaveClass("text-base");
    });

    it("renders large size", () => {
      render(<Button size="large">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("py-4");
      expect(button).toHaveClass("text-lg");
    });
  });

  describe("disabled state", () => {
    it("renders disabled button", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("opacity-50");
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("does not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole("button");

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("block prop", () => {
    it("renders full width when block is true", () => {
      render(<Button block>Block Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full");
    });

    it("does not render full width when block is false", () => {
      render(<Button block={false}>Normal Button</Button>);
      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("w-full");
    });
  });

  describe("click handler", () => {
    it("calls onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);
      const button = screen.getByRole("button");

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick multiple times", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);
      const button = screen.getByRole("button");

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("custom className", () => {
    it("applies custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("merges custom className with default classes", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass("bg-primary");
    });
  });

  describe("additional props", () => {
    it("supports aria attributes", () => {
      render(<Button aria-label="Close dialog">X</Button>);
      const button = screen.getByRole("button", { name: "Close dialog" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("loading state", () => {
    it("renders loading button", () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("opacity-50");
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("does not call onClick when loading", () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>,
      );
      const button = screen.getByRole("button");

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("renders loader component when loading", () => {
      const { container } = render(<Button loading>Loading</Button>);
      const loaderSpan = container.querySelector("span.inline-flex");
      expect(loaderSpan).toBeInTheDocument();
    });

    it("disables button when both disabled and loading", () => {
      render(
        <Button disabled loading>
          Disabled and Loading
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("combination of props", () => {
    it("renders outlined secondary large button", () => {
      render(
        <Button variant="outlined" color="secondary" size="large">
          Large Outlined Secondary
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass("border-secondary");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("py-4");
    });

    it("renders text error small disabled button", () => {
      render(
        <Button variant="text" color="error" size="small" disabled>
          Small Text Error Disabled
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-error");
      expect(button).toHaveClass("text-sm");
      expect(button).toBeDisabled();
    });
  });
});
