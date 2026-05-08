import type { JSX } from "solid-js";

/** Transition animation used between route changes. */
export type TransitionEffect = "slide" | "push" | "fade" | "none";
/** Navigation direction used for transition logic. */
export type NavigationDirection = "forward" | "backward";

/**
 * Route map keyed by route name.
 */
export type RouteConfig = Record<
  string,
  {
    /** Route component rendered when the route is active. */
    component: JSX.Element;
    /** Optional initial params for this route. */
    params?: Record<string, unknown>;
  }
>;

/**
 * Route params object shared between navigation actions.
 */
export interface ParamsObject extends Record<string, unknown> {
  /** Optional per-navigation transition override. */
  transitionEffect?: TransitionEffect;
}

/**
 * Imperative navigation actions.
 */
export interface NavigationActions {
  /** Pushes a new route onto the stack. */
  push: (name: string, params?: ParamsObject) => void;
  /** Pops the current route. */
  pop: () => void;
  /** Replaces the current route with a new route. */
  replace: (name: string, params?: ParamsObject) => void;
  /** Resets the stack and sets a new root route. */
  reset: (name: string, params?: ParamsObject) => void;
}

/**
 * Runtime route entry stored in the navigation stack.
 */
export interface Route {
  /** Route name resolved from the config map. */
  name: string;
  /** Route component instance. */
  component: JSX.Element;
  /** Route params passed during navigation. */
  params?: ParamsObject;
  /** Unique key for route identity in the stack. */
  key: string;
}

/** Ordered stack of active navigation routes. */
export type NavigationStack = Route[];

/**
 * Navigation context payload provided to consumers.
 */
export interface NavigationContextProps extends NavigationActions {
  /** Current route stack. */
  stack: NavigationStack;
  /** Latest navigation direction. */
  direction: NavigationDirection;
  /** Current URL query string when available. */
  searchParams: string | null;
}

/**
 * Props for the `Navigation` component.
 */
export interface NavigationProps {
  /** Route configuration map keyed by route name. */
  config: RouteConfig;
  /** Initial route name used at mount time. */
  initialRouteName: string;
  /** Fallback content rendered for unknown routes. */
  fallback: JSX.Element;
}
