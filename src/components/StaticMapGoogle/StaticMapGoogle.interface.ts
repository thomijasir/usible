/**
 * Google Maps map type options
 */
export type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";

/**
 * StaticMapGoogle component props for embedding Google Maps static images
 *
 * @example
 * ```tsx
 * <StaticMapGoogle
 *   apiKey="YOUR_API_KEY"
 *   lat={1.3521}
 *   lng={103.8198}
 *   zoom={16}
 *   width={600}
 *   height={400}
 *   showPin
 * />
 * ```
 */
export interface StaticMapGoogleProps {
  /** Google Maps API key (required) */
  apiKey: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** If true, shows a pin marker at the location (default: true) */
  showPin?: boolean;
  /** Map type style */
  mapType?: MapType;
  /** Image width in pixels (default: 600) */
  width?: number;
  /** Image height in pixels (default: 400) */
  height?: number;
  /** Zoom level 0-21 (default: 16) */
  zoom?: number;
  /** Additional CSS classes */
  class?: string;
  /** Image resolution scale for retina displays (default: 2) */
  scale?: 1 | 2;
}
