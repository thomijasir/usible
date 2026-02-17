import { createContext, useContext } from "solid-js";
import type { NavigationContextProps } from "./Navigation.interface";

const NavigationContext = createContext<NavigationContextProps | null>(null);

export function useNavigation(): NavigationContextProps {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within a Navigation provider");
  }

  return context;
}

export { NavigationContext };
