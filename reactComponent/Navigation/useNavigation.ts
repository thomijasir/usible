import { useContext, createContext } from "react";
import type { NavigationContextProps } from "./Navigation.interface";

type NullNavigationContext = NavigationContextProps | null;
export const NavigationContext = createContext<NullNavigationContext>(null);

/**
 * Custom hook to access navigation actions.
 *
 * @returns The navigation actions `push`, `pop`, and `replace`.
 * @throws An error if used outside of a `StackNavigation` provider.
 */
export const useNavigation = (): NavigationContextProps => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useStackNavigation must be used within a StackNavigation provider",
    );
  }

  return context;
};
