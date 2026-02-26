import React, { useState } from "react";
import type { StaticMapGoogleProps } from "./StaticMapGoogle.interface";
import { Image } from "../Image";
import { MapPinFilledIcon } from "~/assets/icons";
import { Text } from "../Text";

export const StaticMapGoogle: React.FC<StaticMapGoogleProps> = ({
  apiKey,
  lat,
  lng,
  showPin = true,
  mapType = "roadmap",
  width = 600,
  height = 400,
  zoom = 16,
  className = "",
  scale = 2,
}) => {
  const [error, setError] = useState(false);

  // Construct Google Maps Static API URL
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=${mapType}&key=${apiKey}&scale=${scale}`;

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${className}`}
        style={{ width: "100%", height: "100%", minHeight: 200 }}>
        <Text variant="body2" color="secondary">
          Map currently not available
        </Text>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={mapUrl}
        alt={`Map showing location at ${lat}, ${lng}`}
        width="100%"
        height="100%"
        className="w-full h-full object-cover"
        onError={handleError}
      />
      {showPin && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none pb-1">
          <MapPinFilledIcon className="w-8 h-8 drop-shadow-md fill-primary text-white" />
        </div>
      )}
    </div>
  );
};
