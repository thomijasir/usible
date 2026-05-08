import { ErrorBoundary as SolidErrorBoundary } from "solid-js";
import type { ErrorBoundaryProps } from "./ErrorBoundary.interface";
import { Text } from "../Text";
import { Button } from "../Button";

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <SolidErrorBoundary
      fallback={(err) => (
        <div class="h-screen w-full flex flex-col items-center justify-center p-6 bg-background space-y-6 text-center">
          <div class="space-y-2 max-w-md">
            <Text variant="h4" class="font-bold text-foreground">
              Oops! Something went wrong
            </Text>
            <Text variant="body1" class="text-foreground-muted">
              We encountered an unexpected error. Please try reloading the
              application.
            </Text>
            <div class="mt-4 p-3 bg-error-50 rounded-usible border border-error-light w-full text-left overflow-hidden">
              <Text variant="caption" class="font-mono text-error break-words">
                {err?.message ?? String(err)}
              </Text>
            </div>
          </div>
          <div class="pt-4">
            <Button
              onClick={() => window.location.reload()}
              size="large"
              class="px-8">
              Reload Application
            </Button>
          </div>
        </div>
      )}>
      {props.children}
    </SolidErrorBoundary>
  );
}
