import { createSignal, Show } from "solid-js";
import type { StaticMapGoogleProps } from "./StaticMapGoogle.interface";
import { Image } from "../Image";
import { Text } from "../Text";
import { MapPinFilledIcon } from "~/assets/icons";

export function StaticMapGoogle(props: StaticMapGoogleProps) {
  const [error, setError] = createSignal(false);

  const mapUrl = () => {
    const width = props.width ?? 600;
    const height = props.height ?? 400;
    const zoom = props.zoom ?? 16;
    const scale = props.scale ?? 2;
    const mapType = props.mapType ?? "roadmap";

    return `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=${zoom}&size=${width}x${height}&maptype=${mapType}&key=${props.apiKey}&scale=${scale}`;
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <Show
      when={!error()}
      fallback={
        <div
          class={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${props.class ?? ""}`}
          style={{ width: "100%", height: "100%", "min-height": "200px" }}>
          <Text variant="body2" color="secondary">
            Map currently not available
          </Text>
        </div>
      }>
      <div class={`relative overflow-hidden ${props.class ?? ""}`}>
        <Image
          src={mapUrl()}
          alt={`Map showing location at ${props.lat}, ${props.lng}`}
          class="w-full h-full object-cover"
          onError={handleError}
        />
        <Show when={props.showPin !== false}>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none pb-1">
            <MapPinFilledIcon class="w-8 h-8 drop-shadow-md fill-primary text-white" />
          </div>
        </Show>
      </div>
    </Show>
  );
}
