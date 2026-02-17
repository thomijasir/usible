import React, { useState } from "react";
import type { ImageProps } from "./Image.interface";
import { Skeleton } from "../Skeleton";
import { ImageErrorIcon } from "~/assets/icons";

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = "",
  width,
  height,
  loading = "lazy",
  onLoad,
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [isLoading, setIsLoading] = useState(!!src);
  const [hasError, setHasError] = useState(false);

  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src);
    if (src) {
      setIsLoading(true);
      setHasError(false);
    } else {
      setIsLoading(false);
    }
  }

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(true);

    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }

    if (onError) onError(e);
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ width: width || "100%", height: height }}>
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="pulse"
          />
        </div>
      )}

      {!imgSrc || (hasError && !fallbackSrc) ? (
        <div
          className="w-full h-full flex items-center justify-center text-gray-400"
          data-testid="image-fallback-svg">
          <ImageErrorIcon
            className="w-12 h-12"
            aria-label={alt || "Image load error"}
          />
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          {...props}
        />
      )}
    </div>
  );
};
