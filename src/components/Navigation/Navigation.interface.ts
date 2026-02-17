import type { JSX } from "solid-js";

export type TransitionEffect = "slide" | "push" | "fade" | "none";
export type NavigationDirection = "forward" | "backward";

export type RouteConfig = Record<
  string,
  {
    component: JSX.Element;
    params?: Record<string, unknown>;
  }
>;

export interface ParamsObject extends Record<string, unknown> {
  transitionEffect?: TransitionEffect;
}

export interface NavigationActions {
  push: (name: string, params?: ParamsObject) => void;
  pop: () => void;
  replace: (name: string, params?: ParamsObject) => void;
  reset: (name: string, params?: ParamsObject) => void;
}

export interface Route {
  name: string;
  component: JSX.Element;
  params?: ParamsObject;
  key: string;
}

export type NavigationStack = Route[];

export interface NavigationContextProps extends NavigationActions {
  stack: NavigationStack;
  direction: NavigationDirection;
  searchParams: string | null;
}

export interface NavigationProps {
  config: RouteConfig;
  initialRouteName: string;
  fallback: JSX.Element;
}
