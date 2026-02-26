/**
 * Props for the StaticMapGoogle component.
 */
export interface StaticMapGoogleProps {
  /**
   * The API key for Google Maps.
   */
  apiKey: string;
  /**
   * The latitude of the map center.
   */
  lat: number;
  /**
   * The longitude of the map center.
   */
  lng: number;
  /**
   * Whether to display a pin at the specified lat/lng.
   * @default false
   */
  showPin?: boolean;
  /**
   * The type of map to display.
   * - "roadmap": Displays a normal, default 2D roadmap.
   * - "satellite": Displays satellite images.
   * - "hybrid": Displays a photographic map with roads and feature names.
   * - "terrain": Displays a physical map based on terrain information.
   * @default "roadmap"
   */
  mapType?: "roadmap" | "satellite" | "hybrid" | "terrain";
  /**
   * The width of the map in pixels.
   */
  width?: number;
  /**
   * The height of the map in pixels.
   */
  height?: number;
  /**
   * The zoom level of the map.
   * @default 15
   */
  zoom?: number;
  /**
   * Additional CSS class name for the map container.
   */
  className?: string;
  /**
   * The scaling factor for the map image.
   * @default 1
   */
  scale?: 1 | 2;
}
