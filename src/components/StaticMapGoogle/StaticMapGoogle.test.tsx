import { render } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { StaticMapGoogle } from "./StaticMapGoogle.component";

describe("StaticMapGoogle", () => {
  const defaultProps = {
    lat: 1.3521,
    lng: 103.8198,
    apiKey: "TEST_API_KEY",
  };

  it("renders a container element", () => {
    const { container } = render(() => <StaticMapGoogle {...defaultProps} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("renders an img element with maps.googleapis.com in src", () => {
    const { container } = render(() => <StaticMapGoogle {...defaultProps} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toContain("maps.googleapis.com");
  });

  it("includes lat and lng in the image URL", () => {
    const { container } = render(() => <StaticMapGoogle {...defaultProps} />);
    const img = container.querySelector("img");
    const src = img?.getAttribute("src") ?? "";
    expect(src).toContain(String(defaultProps.lat));
    expect(src).toContain(String(defaultProps.lng));
  });

  it("renders pin overlay when showPin is true (default)", () => {
    const { container } = render(() => <StaticMapGoogle {...defaultProps} />);
    // Pin div has pointer-events-none and pb-1 classes
    const pinContainer = container.querySelector(".pointer-events-none.pb-1");
    expect(pinContainer).toBeInTheDocument();
  });

  it("hides pin overlay when showPin=false", () => {
    const { container } = render(() => (
      <StaticMapGoogle {...defaultProps} showPin={false} />
    ));
    const pinContainer = container.querySelector(".pointer-events-none.pb-1");
    expect(pinContainer).not.toBeInTheDocument();
  });
});
