import type { ReactNode } from "react";

export type TransitionEffect = "slide" | "push" | "fade" | "none";
export type NavigationDirection = "forward" | "backward";
// A map of route names to their corresponding components and initial parameters.
// This will be used to configure the navigator.
/**
 * A map of route names to their corresponding components and initial parameters.
 * This will be used to configure the navigator.
 */
export type RouteConfig = Record<
  string,
  {
    /**
     * The React component associated with this route.
     */
    component: ReactNode;
    /**
     * Optional parameters to pass to the route's component.
     */
    params?: object;
  }
>;

/**
 * Generic object for route parameters.
 */

export interface ParamsObject {
  /**
   * The transition effect to apply when navigating to this route.
   */
  transitionEffect?: TransitionEffect;
}

/**
 * Actions available for navigation.
 */
export interface NavigationActions {
  /**
   * Pushes a new route onto the navigation stack.
   * @template T - Type of the parameters.
   * @param name The name of the route to push.
   * @param params Optional parameters to pass to the new route.
   */
  push: <T extends ParamsObject = Record<string, unknown>>(
    name: string,
    params?: T,
  ) => void;
  /**
   * Pops the top route from the navigation stack.
   */
  pop: () => void;
  /**
   * Replaces the current route on the top of the stack with a new one.
   * @template T - Type of the parameters.
   * @param name The name of the route to replace with.
   * @param params Optional parameters to pass to the new route.
   */
  replace: <T extends ParamsObject = Record<string, unknown>>(
    name: string,
    params?: T,
  ) => void;
  /**
   * Reset the current route on the top of the stack with a new one.
   * @template T - Type of the parameters.
   * @param name The name of the route to replace with.
   * @param params Optional parameters to pass to the new route.
   */
  reset: <T extends ParamsObject = Record<string, unknown>>(
    name: string,
    params?: T,
  ) => void;
}

/**
 * Represents the navigation stack.
 */
export type NavigationStack = Route[];

/**
 * Represents a single route in the navigation stack.
 * @template P - Type of the route parameters.
 */
export interface Route<P = ParamsObject> {
  /**
   * The unique name of the route, used as an identifier.
   */
  name: string;
  /**
   * The React component associated with this route.
   */
  component: ReactNode;
  /**
   * Optional parameters for the route.
   */
  params?: P;
  /**
   * Unique key for the route to ensure proper rendering and animation.
   */
  key: string;
}

/**
 * Props for the NavigationContext.
 */
export interface NavigationContextProps extends NavigationActions {
  /**
   * The current navigation stack.
   */
  stack: NavigationStack;
  /**
   * The direction of the last navigation action.
   */
  direction: NavigationDirection;
  /**
   * Search parameters from the current URL.
   */
  searchParams: string | null;
}
