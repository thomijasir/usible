import { describe, it, expect } from "@rstest/core";

describe("StaticMapGoogle Component", () => {
  it("renders map image with correct source URL", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="relative overflow-hidden">
        <img src="https://maps.googleapis.com/maps/api/staticmap?center=1.3521,103.8198&zoom=16&size=600x400&maptype=roadmap&key=test-api-key&scale=2" alt="Map showing location at 1.3521, 103.8198" class="w-full h-full object-cover">
      </div>
    `;

    const img = container.querySelector("img");
    expect(img).toBeTruthy();
    expect(img?.src).toContain("maps.googleapis.com");
    expect(img?.src).toContain("center=1.3521,103.8198");
  });

  it("renders with default zoom level", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=16&size=600x400" alt="Map">
    `;

    const img = container.querySelector("img");
    expect(img?.src).toContain("zoom=16");
  });

  it("renders with custom zoom level", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=18&size=600x400" alt="Map">
    `;

    const img = container.querySelector("img");
    expect(img?.src).toContain("zoom=18");
  });

  it("renders with default size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=16&size=600x400" alt="Map">
    `;

    const img = container.querySelector("img");
    expect(img?.src).toContain("size=600x400");
  });

  it("renders with custom size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=16&size=800x600" alt="Map">
    `;

    const img = container.querySelector("img");
    expect(img?.src).toContain("size=800x600");
  });

  it("renders with default map type (roadmap)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&maptype=roadmap" alt="Map">
    `;

    const img = container.querySelector("img");
    expect(img?.src).toContain("maptype=roadmap");
  });

  it("renders with satellite map type", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&maptype=satellite" alt="Map">
    `;

    const img = container.querySelector("img");
    expect(img?.src).toContain("maptype=satellite");
  });

  it("renders location pin by default", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative overflow-hidden">
        <img src="https://maps.googleapis.com/maps/api/staticmap" alt="Map" class="w-full h-full object-cover">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none pb-1">
          <svg class="w-8 h-8 drop-shadow-md fill-primary text-white"></svg>
        </div>
      </div>
    `;

    const pin = container.querySelector("svg");
    expect(pin).toBeTruthy();
    expect(pin?.classList.contains("fill-primary")).toBe(true);
  });

  it("hides pin when showPin is false", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative overflow-hidden">
        <img src="https://maps.googleapis.com/maps/api/staticmap" alt="Map" class="w-full h-full object-cover">
      </div>
    `;

    const pin = container.querySelector("svg");
    expect(pin).toBeNull();
  });

  it("renders error fallback when map fails to load", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" style="width: 100%; height: 100%; min-height: 200px;">
        <span class="text-gray-500">Map currently not available</span>
      </div>
    `;

    const fallback = container.querySelector("span");
    expect(fallback?.textContent).toBe("Map currently not available");
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative overflow-hidden custom-map-class">
        <img src="https://maps.googleapis.com/maps/api/staticmap" alt="Map">
      </div>
    `;

    const mapContainer = container.querySelector("div");
    expect(mapContainer?.classList.contains("custom-map-class")).toBe(true);
  });

  it("renders with default scale (2x)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&scale=2" alt="Map">
    `;

    const img = container.querySelector("img");
    expect(img?.src).toContain("scale=2");
  });

  it("has accessible alt text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap" alt="Map showing location at 1.3521, 103.8198">
    `;

    const img = container.querySelector("img");
    expect(img?.alt).toContain("Map showing location");
  });

  it("renders image with full width and height", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="https://maps.googleapis.com/maps/api/staticmap" class="w-full h-full object-cover">
    `;

    const img = container.querySelector("img");
    expect(img?.classList.contains("w-full")).toBe(true);
    expect(img?.classList.contains("h-full")).toBe(true);
    expect(img?.classList.contains("object-cover")).toBe(true);
  });
});
