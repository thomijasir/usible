import { createSignal, createEffect, batch, on } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { ImageProps } from "./Image.interface";
import { Skeleton } from "../Skeleton";

export function Image(props: ImageProps) {
  const [imgSrc, setImgSrc] = createSignal<string | undefined>(props.src);
  const [isLoading, setIsLoading] = createSignal(!!props.src);
  const [hasError, setHasError] = createSignal(false);

  createEffect(
    on(
      () => props.src,
      (src) => {
        if (src) {
          batch(() => {
            setImgSrc(src);
            setIsLoading(true);
            setHasError(false);
          });
        } else {
          setImgSrc(undefined);
          setIsLoading(false);
        }
      },
      { defer: true },
    ),
  );

  const handleLoad = (e: Event) => {
    setIsLoading(false);
    props.onLoad?.(e);
  };

  const handleError = (e: Event) => {
    if (props.fallbackSrc && imgSrc() !== props.fallbackSrc) {
      batch(() => {
        setImgSrc(props.fallbackSrc);
        setIsLoading(true);
        setHasError(false);
      });
    } else {
      batch(() => {
        setIsLoading(false);
        setHasError(true);
      });
    }

    props.onError?.(e);
  };

  const containerStyle = () => {
    const s: Record<string, string> = {};
    s.width =
      typeof props.width === "number"
        ? `${props.width}px`
        : props.width || "100%";
    s.height =
      typeof props.height === "number"
        ? `${props.height}px`
        : props.height || "auto";
    return s;
  };

  return (
    <div
      class={twMerge("relative overflow-hidden bg-gray-100", props.class)}
      style={containerStyle()}>
      {isLoading() && (
        <div class="absolute inset-0">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="pulse"
          />
        </div>
      )}

      {!imgSrc() || (hasError() && !props.fallbackSrc) ? (
        <div
          class="w-full h-full flex items-center justify-center text-gray-400"
          data-testid="image-fallback">
          <svg
            class="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label={props.alt || "Image load error"}>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : (
        <img
          src={imgSrc()}
          alt={props.alt}
          loading={props.loading ?? "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          class={twMerge(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading() ? "opacity-0" : "opacity-100",
          )}
        />
      )}
    </div>
  );
}
