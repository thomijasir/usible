import React, { useState } from "react";
import type { StaticMapTilerProps } from "./StaticMapTiler.interface";
import { Image } from "../Image";
import { MapPinIcon } from "~/assets/icons";
import { Text } from "../Text";

export const StaticMapTiler: React.FC<StaticMapTilerProps> = ({
  apiKey,
  lat,
  lng,
  showPin = true,
  mapStyle = "streets-v2",
  width = 600,
  height = 400,
  zoom = 14,
  className = "",
}) => {
  const [error, setError] = useState(false);

  // Construct MapTiler Static Map URL
  const mapUrl = `https://api.maptiler.com/maps/${mapStyle}/static/${lng},${lat},${zoom}/${width}x${height}.png?key=${apiKey}&attribution=false`;

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
        style={{ width: "100%", height: "100%", minHeight: 200 }}>
        <Text variant="body2" color="secondary">
          Map currently not available
        </Text>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
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
          <MapPinIcon className="w-8 h-8 drop-shadow-md fill-primary text-white" />
        </div>
      )}
    </div>
  );
};
