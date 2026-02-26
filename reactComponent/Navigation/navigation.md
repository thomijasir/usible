# Navigation System & Native Back Button Architecture

This document outlines the architecture for the custom Navigation system and the handling of Android hardware back button events.

## 1. Navigation System

The application uses a custom stack-based navigation system synchronized with the browser hash (`window.location.hash`). This allows for deep linking capabilities and standard browser navigation support while maintaining mobile-app-like transitions.

### Core Concepts

#### The Navigation Stack

The navigation state is maintained as a **Last-In, First-Out (LIFO)** stack of routes. Each route contains:

- `name`: The identifier used in `RouteConfig`.
- `component`: The React node to render.
- `params`: Optional data passed to the route.
- `key`: A unique identifier generated at runtime.

#### Route Identification & Keys

To support advanced navigation patterns (like circular flows: `Home` -> `Verification` -> `Home`) and ensure smooth animations:

- Every route pushed to the stack is assigned a **unique `key`** (format: `Name-Timestamp-Random`).
- React and Framer Motion use this `key` instead of the route `name`.
- This ensures that two routes with the same name are treated as distinct instances, preventing animation glitches and state conflicts.

### Navigation Actions

The `useNavigation` hook exposes the following actions:

1.  **`push(name, params)`**:
    - Adds a new route to the top of the stack.
    - Generates a new unique key.
    - **Animation**: Slides/Fades in based on configuration.

2.  **`replace(name, params)`**:
    - **Behavior**: Removes the _current_ top route and replaces it with the new route.
    - **History**: Preserves the previous history (`A -> B` becomes `A -> C`).
    - **Use Case**: Switching steps in a flow where the user shouldn't go back to the previous step (e.g., Login -> Home, or Step 1 -> Step 2).

3.  **`reset(name, params)`**:
    - **Behavior**: Clears the entire stack and sets the new route as the root.
    - **History**: History is wiped (`A -> B -> C` becomes `D`).
    - **Use Case**: Logging out, or restarting a major flow.

4.  **`pop()`**:
    - Removes the top route, returning to the previous one.
    - **Animation**: Reverse transition.

---

## 2. Native Back Button Architecture

The application implements a **Priority Queue Interceptor** system to manage hardware back button events (specifically for Android/Tauri). This ensures that the most relevant UI element (e.g., a modal, a drawer, or the active screen) handles the back action.

### Architecture Components

1.  **`NativeBackButtonContext`**: A global context maintaining the registry of handlers.
2.  **`NativeBackButtonProvider`**: Listens to the native Tauri event (`app.onBackButtonPress`) and dispatches it to the registered handlers.
3.  **`useNativeBackButton` Hook**: Allows components to register their interest in handling the back button.

### How It Works

1.  **Registration**: Components call `useNativeBackButton` to register a handler.
2.  **Event Handling**: When the hardware back button is pressed:
    - The Provider iterates through handlers sorted by **Priority** (High to Low) -> **Registration Order** (LIFO).
    - The first handler returning `true` consumes the event (stops propagation).
    - If no handler returns `true`, the event is ignored.
3.  **Default Behavior**: The `Navigation` component registers a fallback handler (Priority `-1`) that calls `pop()` if the stack has history.

### Performance & Optimization

- **Stable Callbacks**: The `NavigationBackHandler` uses `useRef` to maintain access to the latest navigation stack without forcing re-registration of the native event listener.
- **Cleanup**: Event listeners are properly detached when components unmount to prevent memory leaks.

### Usage Guide

#### Basic Interception

To intercept the back button (e.g., to close a modal instead of navigating back):

```typescript
import { useNativeBackButton } from "~/components/Navigation/useNativeBackButton";

const MyModal = ({ isOpen, onClose }) => {
  useNativeBackButton(() => {
    if (isOpen) {
      onClose();
      return true; // Stop propagation
    }
    return false; // Let next handler (navigation) handle it
  });

  // ...
};
```

#### Accessing State

If your handler depends on changing state, `useNativeBackButton` handles updates automatically, but ensuring your logic has access to the latest state is crucial.

```typescript
const [step, setStep] = useState(1);

useNativeBackButton(() => {
  if (step > 1) {
    setStep((s) => s - 1); // Go to previous step in local flow
    return true;
  }
  return false; // If at step 1, let standard navigation pop occur
});
```

#### Priorities

Use priorities to layer handlers. Higher numbers are handled first.

- **Default Navigation**: -1
- **Standard Components**: 0 (default)
- **Modals/Drawers**: 10+
- **Critical Alerts**: 100+

```typescript
useNativeBackButton(() => {
  // Critical logic
  return true;
}, 100);
```
