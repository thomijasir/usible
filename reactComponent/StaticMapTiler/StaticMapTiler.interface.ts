/**
 * Props for the StaticMapTiler component.
 */
export interface StaticMapTilerProps {
  /**
   * The API key for Tiler.
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
   * The style of the map.
   */
  mapStyle?: string;
  /**
   * The width of the map.
   */
  width?: number;
  /**
   * The height of the map.
   */
  height?: number;
  /**
   * The zoom level of the map.
   */
  zoom?: number;
  /**
   * Additional CSS class name for the map container.
   */
  className?: string;
}
