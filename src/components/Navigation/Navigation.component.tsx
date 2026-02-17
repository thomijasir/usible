import {
  createSignal,
  createMemo,
  createEffect,
  onMount,
  onCleanup,
  For,
} from "solid-js";
import { animate } from "motion";
import type {
  NavigationProps,
  NavigationStack,
  NavigationDirection,
  ParamsObject,
} from "./Navigation.interface";
import { NavigationContext } from "./useNavigation";
import { getAnimationConfig, transitionOptions } from "./Navigation.animate";

const getHash = () => window.location.hash.substring(1);

const generateKey = (name: string) =>
  `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

export function Navigation(props: NavigationProps) {
  const initialRoute = () => props.config[props.initialRouteName];
  if (!initialRoute()) {
    throw new Error(`Initial route not found in config.`);
  }

  const [stack, setStack] = createSignal<NavigationStack>([
    {
      name: props.initialRouteName,
      ...initialRoute()!,
      key: generateKey(props.initialRouteName),
    },
  ]);

  const [direction, setDirection] =
    createSignal<NavigationDirection>("forward");
  const [searchParams, setSearchParams] = createSignal<string | null>(null);

  const routeRefs = new Map<string, HTMLDivElement>();

  const routeToFallback = () => {
    console.warn(`Route not found. Rendering fallback.`);
    setStack((prevStack) => [
      ...prevStack,
      {
        name: "fallback",
        component: props.fallback,
        params: {},
        key: generateKey("fallback"),
      },
    ]);
  };

  const actions = createMemo(() => ({
    push: (name: string, params?: ParamsObject) => {
      const routeName = name.split("?")[0] || name;
      setDirection("forward");
      const routeConfigEntry = props.config[routeName];

      if (routeConfigEntry) {
        setStack((prevStack) => [
          ...prevStack,
          {
            name,
            component: routeConfigEntry.component,
            params,
            key: generateKey(name),
          },
        ]);
      } else {
        routeToFallback();
      }
    },
    replace: (name: string, params?: ParamsObject) => {
      const routeName = name.split("?")[0] || name;
      setDirection("forward");
      const routeConfigEntry = props.config[routeName];
      if (routeConfigEntry) {
        setStack((prevStack) => [
          ...prevStack.slice(0, -1),
          {
            name: name,
            component: routeConfigEntry.component,
            params,
            key: generateKey(name),
          },
        ]);
      } else {
        routeToFallback();
      }
    },
    reset: (name: string, params?: ParamsObject) => {
      const routeName = name.split("?")[0] || name;
      setDirection("forward");
      const routeConfigEntry = props.config[routeName];
      if (routeConfigEntry) {
        setStack([
          {
            name: name,
            component: routeConfigEntry.component,
            params,
            key: generateKey(name),
          },
        ]);
      } else {
        routeToFallback();
      }
    },
    pop: () => {
      setDirection("backward");
      setStack((prevStack) => prevStack.slice(0, -1));
    },
  }));

  onMount(() => {
    const handleHashChange = () => {
      const hash = getHash();
      const [routeName, urlParams] = hash.split("?");
      const currentStack = stack();
      const currentRouteIndex = currentStack.findIndex(
        (r) => r.name === routeName,
      );

      if (currentRouteIndex === -1) {
        const targetRouteName = hash || props.initialRouteName;

        if (props.config[targetRouteName]) {
          actions().push(targetRouteName);
        }
      } else if (currentRouteIndex < currentStack.length - 1) {
        setDirection("backward");
        setStack(currentStack.slice(0, currentRouteIndex + 1));
      }
      setSearchParams(urlParams ?? null);
    };

    window.addEventListener("hashchange", handleHashChange);
    onCleanup(() => window.removeEventListener("hashchange", handleHashChange));
  });

  createEffect(() => {
    const currentStack = stack();
    const currentRoute = currentStack[currentStack.length - 1];
    if (currentRoute && window.location.hash !== `#${currentRoute.name}`) {
      window.location.hash = currentRoute.name;
    }
  });

  createEffect(() => {
    const currentStack = stack();
    const currentDirection = direction();

    currentStack.forEach((route, index) => {
      const ref = routeRefs.get(route.key);
      if (!ref) return;

      const isLast = index === currentStack.length - 1;
      const transitionEffect =
        (route.params as { transitionEffect?: string })?.transitionEffect ??
        "slide";

      const config = getAnimationConfig(
        transitionEffect as "slide" | "push" | "fade" | "none",
        currentDirection,
      );

      const targetConfig = isLast ? config.active : config.inactive;
      const options =
        transitionOptions[transitionEffect as keyof typeof transitionOptions];

      animate(ref as HTMLElement, targetConfig, options);
    });
  });

  const contextValue = createMemo(() => ({
    stack: stack(),
    ...actions(),
    direction: direction(),
    searchParams: searchParams(),
  }));

  return (
    <NavigationContext.Provider value={contextValue()}>
      <div class="relative w-full h-full overflow-hidden">
        <For each={stack()}>
          {(route, index) => {
            const transitionEffect = () =>
              (route.params as { transitionEffect?: string })
                ?.transitionEffect ?? "slide";

            const initialConfig = getAnimationConfig(
              transitionEffect() as "slide" | "push" | "fade" | "none",
              direction(),
            );

            return (
              <div
                ref={(el) => routeRefs.set(route.key, el)}
                data-key={route.key}
                style={{
                  "z-index": index(),
                  ...initialConfig.initial,
                }}
                class="app-navigation bg-white absolute w-full h-full shadow-xl">
                {route.component}
              </div>
            );
          }}
        </For>
      </div>
    </NavigationContext.Provider>
  );
}
