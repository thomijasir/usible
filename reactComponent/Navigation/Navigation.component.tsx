import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { app } from "@tauri-apps/api";
import type {
  RouteConfig,
  NavigationStack,
  NavigationActions,
  NavigationContextProps,
  NavigationDirection,
} from "./Navigation.interface";
import { getVariants } from "./Navigation.animate";
import { NavigationContext, useNavigation } from "./useNavigation";
import {
  NativeBackButtonProvider,
  useNativeBackButtonContext,
  useNativeBackButton,
} from "./useNativeBackButton";
import { useDebounceCallback } from "~/hooks";

// Default handle navigation
// Internal component to handle back button logic with access to NavigationContext
const NavigationBackHandler = () => {
  const { stack, pop } = useNavigation();
  const stackRef = useRef(stack);
  const popRef = useRef(pop);

  // Update refs when stack or pop changes
  useEffect(() => {
    stackRef.current = stack;
    popRef.current = pop;
  }, [stack, pop]);

  // Create a stable callback that uses the refs
  const handleBack = useCallback(() => {
    if (stackRef.current.length > 1) {
      popRef.current();
      return true;
    }
    return false;
  }, []);

  useNativeBackButton(handleBack, -1); // Low priority to allow other handlers to intercept

  return null;
};

// Default Setup Listener Component
// Internal component to connect native listener to context
const NativeBackListener = () => {
  const { handleBack } = useNativeBackButtonContext();

  // Need to debounce due to react strict render twice
  const debounceBack = useDebounceCallback(async () => {
    handleBack();
  }, 50);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let unlisten: any = undefined;

    const setupListener = async () => {
      try {
        // Check if running in Tauri and if onBackButtonPress is available
        if (app && typeof app.onBackButtonPress === "function") {
          unlisten = await app.onBackButtonPress(async () => {
            debounceBack();
          });
        }
      } catch (error) {
        console.error("Failed to setup back button listener:", error);
      }
    };

    setupListener();

    return () => {
      if (unlisten && typeof unlisten === "function") {
        unlisten();
      }
    };
  }, [debounceBack]);

  return null;
};

interface NavigationProps {
  config: RouteConfig;
  initialRouteName: string;
  fallback: ReactNode;
}
// Utility to parse the hash from the URL.
const getHash = () => window.location.hash.substring(1);

const generateKey = (name: string) =>
  `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

// The main component that manages the navigation stack and rendering.
export const Navigation: React.FC<NavigationProps> = ({
  config,
  initialRouteName,
  fallback,
}) => {
  const [stack, setStack] = useState<NavigationStack>(() => {
    const initialRoute = config[initialRouteName];
    if (!initialRoute) {
      throw new Error(`Initial route not found in config.`);
    }
    return [
      {
        name: initialRouteName,
        ...initialRoute,
        key: generateKey(initialRouteName),
      },
    ];
  });

  const [direction, setDirection] = useState<NavigationDirection>("forward");
  const [searchParams, setSearchParams] = useState<string | null>(null);

  // Keep a ref to the stack to use in event listeners without triggering re-effects
  const stackRef = useRef(stack);
  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  // Memoize the navigation actions to prevent unnecessary re-renders.
  const actions: NavigationActions = useMemo(() => {
    const routeToFallback = () => {
      console.warn(`Route not found. Rendering fallback.`);
      setStack((prevStack) => [
        ...prevStack,
        {
          name: "fallback",
          component: fallback,
          params: {},
          key: generateKey("fallback"),
        },
      ]);
    };
    return {
      push: (name, params) => {
        const routeName = name.split("?")[0] || name;
        setDirection("forward");
        const routeConfigEntry = config[routeName];

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
      replace: (name, params) => {
        const routeName = name.split("?")[0] || name;
        setDirection("forward");
        const routeConfigEntry = config[routeName];
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
      reset: (name, params) => {
        const routeName = name.split("?")[0] || name;
        setDirection("forward");
        const routeConfigEntry = config[routeName];
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
    };
  }, [config, fallback]);

  // Effect to handle browser hash changes (back/forward buttons).
  useEffect(() => {
    const handleHashChange = () => {
      const hash = getHash();
      const [routeName, urlParams] = hash.split("?");
      const currentStack = stackRef.current; // Use ref to avoid re-binding listener
      const currentRouteIndex = currentStack.findIndex(
        (r) => r.name === routeName,
      );

      if (currentRouteIndex === -1) {
        // If route not found in stack, push it (or initial if hash is empty)
        const targetRouteName = hash || initialRouteName;

        if (config[targetRouteName]) {
          actions.push(targetRouteName);
        }
      } else if (currentRouteIndex < currentStack.length - 1) {
        // If navigating back in history
        setDirection("backward");
        setStack(currentStack.slice(0, currentRouteIndex + 1));
      }
      setSearchParams(urlParams ?? null);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [initialRouteName, actions, config]); // Removed stack from dependencies

  // Effect to synchronize the stack with the URL hash.
  useEffect(() => {
    const currentRoute = stack[stack.length - 1];
    if (currentRoute && window.location.hash !== `#${currentRoute.name}`) {
      window.location.hash = currentRoute.name;
    }
  }, [stack]);

  // Effect to listen for Tauri deep links.
  // TODO: Active later when i give order for now disable it
  // useEffect(() => {
  //   const unlisten = listen("deep-link://new-url", (event) => {
  //     const url = new URL(event.payload as string);
  //     const routeName = url.pathname.substring(1); // Remove leading '/'
  //     if (config[routeName]) {
  //       actions.push(routeName);
  //     }
  //   });

  //   return () => {
  //     unlisten.then((fn) => fn());
  //   };
  // }, [config, actions]);

  const contextValue: NavigationContextProps = useMemo(
    () => ({ stack, ...actions, direction, searchParams }),
    [stack, actions, direction, searchParams],
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      <NativeBackButtonProvider>
        <NativeBackListener />
        <NavigationBackHandler />
        <AnimatePresence initial={false} custom={direction}>
          {stack.map((route, index) => {
            const isLast = index === stack.length - 1;
            return (
              <motion.div
                key={route.key}
                custom={direction}
                variants={getVariants(
                  route.params?.transitionEffect ?? "slide",
                )}
                initial="initial"
                animate={isLast ? "active" : "inactive"}
                exit="exit"
                style={{ zIndex: index }}
                className="app-navigation bg-white absolute w-full h-full shadow-xl">
                {route.component}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </NativeBackButtonProvider>
    </NavigationContext.Provider>
  );
};
