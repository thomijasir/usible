import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "../Button";
import { Text } from "../Text";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-white space-y-6 text-center">
          <div className="space-y-2 max-w-md">
            <Text variant="h4" className="font-bold text-gray-900">
              Oops! Something went wrong
            </Text>
            <Text variant="body1" className="text-gray-600">
              We encountered an unexpected error. Please try reloading the
              application.
            </Text>
            {this.state.error && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 w-full text-left overflow-hidden">
                <Text
                  variant="caption"
                  className="font-mono text-red-600 break-words">
                  {this.state.error.message}
                </Text>
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button onClick={this.handleReload} size="large" className="px-8">
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
