/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  ReactNode,
  useEffect,
  useId,
} from "react";

export type NativeBackButtonFunc = () => boolean | Promise<boolean>;

interface HandlerItem {
  id: string;
  fn: NativeBackButtonFunc;
  priority: number;
}

interface NativeBackButtonContextType {
  register: (id: string, fn: NativeBackButtonFunc, priority?: number) => void;
  unregister: (id: string) => void;
  handleBack: () => Promise<boolean>;
}

const NativeBackButtonContext =
  createContext<NativeBackButtonContextType | null>(null);

export const useNativeBackButtonContext = () => {
  const context = useContext(NativeBackButtonContext);
  if (!context) {
    throw new Error(
      "useNativeBackButtonContext must be used within a NativeBackButtonProvider",
    );
  }
  return context;
};

export const NativeBackButtonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const handlersRef = useRef<HandlerItem[]>([]);

  const register = useCallback(
    (id: string, fn: NativeBackButtonFunc, priority = 0) => {
      // Remove existing if any (to update)
      handlersRef.current = handlersRef.current.filter((h) => h.id !== id);
      // Append new
      handlersRef.current.push({ id, fn, priority });
    },
    [],
  );

  const unregister = useCallback((id: string) => {
    handlersRef.current = handlersRef.current.filter((h) => h.id !== id);
  }, []);

  const handleBack = useCallback(async (): Promise<boolean> => {
    // We want to find the handler with:
    // 1. Highest priority
    // 2. If tie, latest registration (LIFO)
    //
    // Since we push to the array, the native order is registration order.
    // We can stable sort by priority, then take the last item.

    const sorted = [...handlersRef.current].sort((a, b) => {
      return a.priority - b.priority;
    });

    // Iterate from end (highest priority + latest)
    for (let i = sorted.length - 1; i >= 0; i--) {
      const handler = sorted[i];
      if (!handler) continue;
      try {
        const result = await handler.fn();
        if (result) {
          return true; // Handled
        }
      } catch (error) {
        console.error("Error in back handler:", error);
      }
    }

    return false; // Not handled
  }, []);

  return (
    <NativeBackButtonContext.Provider
      value={{ register, unregister, handleBack }}>
      {children}
    </NativeBackButtonContext.Provider>
  );
};

/**
 * Hook to register a hardware back button handler.
 * The handler should return `true` if it handled the event (stopping propagation),
 * or `false` to let the next handler (in the stack) handle it.
 *
 * Handlers are called in LIFO order (Last In, First Out).
 *
 * @param handler The function to call when the back button is pressed. IMPORTANT: Wrap this in `useCallback` to prevent unnecessary re-registrations.
 * @param priority Optional priority. Higher priority handlers are called first. Default is 0.
 */
export const useNativeBackButton = (
  handler: NativeBackButtonFunc,
  priority: number = 0,
) => {
  const { register, unregister } = useNativeBackButtonContext();
  const id = useId();

  useEffect(() => {
    register(id, handler, priority);
    return () => unregister(id);
  }, [register, unregister, id, handler, priority]);
};
