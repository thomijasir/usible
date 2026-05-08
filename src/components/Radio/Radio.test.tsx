import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "./Radio.component";

describe("Radio", () => {
  it("renders radio input", () => {
    render(() => <Radio value="test" onChange={() => {}} />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(() => <Radio value="test" onChange={() => {}} label="My Label" />);
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(() => (
      <Radio
        value="test"
        onChange={() => {}}
        label="Label"
        description="Some description"
      />
    ));
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("calls onChange when radio is changed", () => {
    const handleChange = vi.fn();
    render(() => <Radio value="test" onChange={handleChange} label="Label" />);
    fireEvent.change(screen.getByRole("radio"), { target: { checked: true } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("disabled radio has disabled attribute", () => {
    render(() => (
      <Radio value="test" onChange={() => {}} label="Label" disabled />
    ));
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("error state applies border-error class", () => {
    const { container } = render(() => (
      <Radio value="test" onChange={() => {}} label="Label" error />
    ));
    expect((container.firstElementChild as HTMLElement).className).toContain(
      "border-error",
    );
  });

  it("boxed variant with checked applies themed primary surface", () => {
    const { container } = render(() => (
      <Radio
        value="test"
        onChange={() => {}}
        label="Label"
        variant="boxed"
        checked
      />
    ));
    expect((container.firstElementChild as HTMLElement).className).toContain(
      "bg-primary-50",
    );
  });

  it("renders without label", () => {
    render(() => <Radio value="test" onChange={() => {}} />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("applies containerClass", () => {
    const { container } = render(() => (
      <Radio
        value="test"
        onChange={() => {}}
        label="Label"
        containerClass="custom-container"
      />
    ));
    expect((container.firstElementChild as HTMLElement).className).toContain(
      "custom-container",
    );
  });

  it("renders with inputPosition left", () => {
    render(() => (
      <Radio
        value="test"
        onChange={() => {}}
        label="Label"
        inputPosition="left"
      />
    ));
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(() => (
      <Radio
        value="test"
        onChange={() => {}}
        label="Label"
        icon={<span>Icon</span>}
      />
    ));
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });
});
