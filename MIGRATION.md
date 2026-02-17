# Usible UI Library - Migration & Development Plan

A SolidJS UI component library built with pure Tailwind CSS. Copy-paste ready for any project.

## Overview

**Tech Stack:**

- SolidJS (reactive UI framework)
- Tailwind CSS 4.x (utility-first CSS)
- motion (animations via vanilla JS API)
- tailwind-merge (class composition)

**Usage Model:**
Users copy the entire `src/components/` folder and import `usible.css` into their project. Customize branding by modifying CSS variables directly.

---

## Phase 1: Foundation & CSS Variables

**Status:** `COMPLETED`

### Tasks

- [x] Create `src/components/usible.css` with CSS custom properties
- [x] Configure Tailwind `@theme` to use CSS variables
- [x] Add `tailwind-merge` dependency
- [x] Add `@solidjs/router` dependency for docs site

### CSS Variables Defined

```css
--usible-primary / --usible-primary-light / --usible-primary-dark
--usible-secondary / --usible-secondary-light / --usible-secondary-dark
--usible-ternary / --usible-ternary-light / --usible-ternary-dark
--usible-success / --usible-success-light / --usible-success-dark
--usible-warning / --usible-warning-light / --usible-warning-dark
--usible-error / --usible-error-light / --usible-error-dark
--usible-radius / --usible-radius-lg
```

---

## Phase 2: Kitchensink / Documentation Site

**Status:** `IN_PROGRESS` - Documentation site ready, Playground deferred

### Architecture

```
src/docs/
├── layout/
│   ├── DocsLayout.tsx
│   ├── Sidebar.tsx
│   └── MobileNav.tsx
├── pages/
│   ├── Home.tsx
│   ├── getting-started.tsx
│   └── components/
│       └── [name].tsx
├── components/
│   ├── ComponentPreview.tsx
│   ├── CodeBlock.tsx
│   └── PropsTable.tsx
├── data/
│   └── componentDocs.ts
└── styles/
    └── docs.css
```

### Tasks

- [x] Install and configure `@solidjs/router`
- [x] Create `DocsLayout` with mobile-first sidebar
- [x] Create `Sidebar` component navigation
- [x] Create `ComponentPreview` live preview wrapper
- [x] Create `CodeBlock` with syntax highlighting
- [x] Create `PropsTable` for documentation
- [x] Set up dynamic route `/components/:name`
- [x] Add documentation for all 22 components in `componentDocs.ts`
- [x] Convert icons from React to SolidJS (60 icons converted)

### Remaining Work

**Motion Library Migration:** COMPLETED

All animation components have been updated to use `motion` (vanilla JS API from motion.dev):

Files updated:

- `src/components/Backdrop/Backdrop.component.tsx`
- `src/components/Dialog/Dialog.component.tsx`
- `src/components/Drawer/Drawer.component.tsx`
- `src/components/Accordion/Accordion.component.tsx`
- `src/components/Navigation/Navigation.component.tsx`

Migration pattern:

```tsx
// Before (React motion)
import { motion, AnimatePresence } from "motion/react";
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
<AnimatePresence>...</AnimatePresence>

// After (motion vanilla JS)
import { animate } from "motion";
import { createEffect, on } from "solid-js";

let elementRef: HTMLDivElement | undefined;

createEffect(
  on(
    () => props.isOpen,
    async (isOpen) => {
      if (!elementRef) return;
      if (isOpen) {
        elementRef.style.display = "block";
        await animate(elementRef, { opacity: 1 }, { duration: 0.3, ease: "easeOut" }).finished;
      } else {
        await animate(elementRef, { opacity: 0 }, { duration: 0.3, ease: "easeOut" }).finished;
        elementRef.style.display = "none";
      }
    }
  )
);
```

### Documentation Sections Per Component

1. **Guidelines** - Description and best practices
2. **Usage Examples** - Interactive live previews
3. **Props Reference** - Typed props table

---

## Phase 3: Component Migration

### Tier 1 - Basic Primitives

| Component  | Status  | File                                  | Notes               |
| ---------- | ------- | ------------------------------------- | ------------------- |
| Text       | ✅ DONE | `Text/Text.component.tsx`             | Already migrated    |
| Loader     | ✅ DONE | `Loader/Loader.component.tsx`         | Simple spinner      |
| Skeleton   | ✅ DONE | `Skeleton/Skeleton.component.tsx`     | Loading placeholder |
| Image      | ✅ DONE | `Image/Image.component.tsx`           | Basic image wrapper |
| HtmlRender | ✅ DONE | `HtmlRender/HtmlRender.component.tsx` | Uses DOMPurify      |

### Tier 2 - Form Controls

| Component     | Status  | File                                        | Notes           |
| ------------- | ------- | ------------------------------------------- | --------------- |
| Button        | ✅ DONE | `Button/Button.component.tsx`               | Core component  |
| Checkbox      | ✅ DONE | `Checkbox/Checkbox.component.tsx`           | Form control    |
| Switch        | ✅ DONE | `Switch/Switch.component.tsx`               | Toggle          |
| Input         | ✅ DONE | `Input/Input.component.tsx`                 | Text input      |
| TextArea      | ✅ DONE | `TextArea/TextArea.component.tsx`           | Multi-line      |
| Select        | ✅ DONE | `Select/Select.component.tsx`               | Dropdown        |
| Slider        | ✅ DONE | `Slider/Slider.component.tsx`               | Range slider    |
| Numpad        | ✅ DONE | `Numpad/Numpad.component.tsx`               | Number pad      |
| CurrencyInput | ✅ DONE | `CurrencyInput/CurrencyInput.component.tsx` | Formatted input |
| DatePicker    | ✅ DONE | `DatePicker/DatePicker.component.tsx`       | Calendar picker |

### Tier 3 - Feedback & Display

| Component     | Status  | File                                        | Notes             |
| ------------- | ------- | ------------------------------------------- | ----------------- |
| Chip          | ✅ DONE | `Chip/Chip.component.tsx`                   | Tag/badge         |
| InfoBox       | ✅ DONE | `InfoBox/InfoBox.component.tsx`             | Alert box         |
| TextHighlight | ✅ DONE | `TextHighlight/TextHighlight.component.tsx` | Text decoration   |
| Timeline      | ✅ DONE | `Timeline/Timeline.component.tsx`           | Vertical timeline |

### Tier 4 - Overlay & Navigation

| Component  | Status  | File                                  | Notes             |
| ---------- | ------- | ------------------------------------- | ----------------- |
| Backdrop   | ✅ DONE | `Backdrop/Backdrop.component.tsx`     | Overlay backdrop  |
| Dialog     | ✅ DONE | `Dialog/Dialog.component.tsx`         | Modal with motion |
| Drawer     | ✅ DONE | `Drawer/Drawer.component.tsx`         | Bottom drawer     |
| MenuList   | ✅ DONE | `MenuList/MenuList.component.tsx`     | Dropdown menu     |
| Accordion  | ✅ DONE | `Accordion/Accordion.component.tsx`   | Collapsible       |
| Navigation | ✅ DONE | `Navigation/Navigation.component.tsx` | Stack navigation  |

### Tier 5 - Specialized

| Component        | Status  | File                                              | Notes        |
| ---------------- | ------- | ------------------------------------------------- | ------------ |
| MediaVideoUpload | ✅ DONE | `MediaVideoUpload/MediaVideoUpload.component.tsx` | Video upload |
| StaticMapGoogle  | ✅ DONE | `StaticMapGoogle/StaticMapGoogle.component.tsx`   | Google Maps  |

---

## Phase 4: Testing & Quality

**Status:** `IN_PROGRESS` - 27 test files with 210 passing tests

### Tasks

- [x] Write unit tests for each component (27/27 complete)
- [x] Add JSDoc comments to all component interfaces (26/26 complete)
- [x] Accessibility audit (ARIA, keyboard nav) - COMPLETED
  - [x] Dialog: `aria-labelledby`, `aria-describedby`, `aria-modal`, escape key, focus trap
  - [x] Button: `aria-busy` for loading state
  - [x] Checkbox: `aria-invalid`, `aria-describedby` for errors
  - [x] Switch: `role="switch"`, `aria-checked`
  - [x] Accordion: `aria-controls`, `aria-expanded`, panel IDs, `role="region"`
  - [x] Select: `aria-invalid`, `aria-describedby`
  - [x] Slider: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`
  - [x] Input: `aria-invalid`, `aria-describedby`
  - [x] MenuList: `role="menu"`, `role="menuitem"`, keyboard navigation (Enter/Space)
  - [x] Drawer: `role="dialog"`, `aria-modal`, `aria-labelledby`, escape key, focus management
  - [x] Backdrop: `aria-hidden`
- [ ] Cross-browser testing
- [ ] Mobile responsiveness review

### New Test Files Added (2026-02-16)

| Component        | Tests | File                                         |
| ---------------- | ----- | -------------------------------------------- |
| TextArea         | 10    | `TextArea/TextArea.test.tsx`                 |
| Select           | 10    | `Select/Select.test.tsx`                     |
| Numpad           | 10    | `Numpad/Numpad.test.tsx`                     |
| CurrencyInput    | 12    | `CurrencyInput/CurrencyInput.test.tsx`       |
| DatePicker       | 12    | `DatePicker/DatePicker.test.tsx`             |
| TextHighlight    | 11    | `TextHighlight/TextHighlight.test.tsx`       |
| Timeline         | 12    | `Timeline/Timeline.test.tsx`                 |
| Drawer           | 12    | `Drawer/Drawer.test.tsx`                     |
| MenuList         | 12    | `MenuList/MenuList.test.tsx`                 |
| MediaVideoUpload | 3     | `MediaVideoUpload/MediaVideoUpload.test.tsx` |
| StaticMapGoogle  | 14    | `StaticMapGoogle/StaticMapGoogle.test.tsx`   |

### JSDoc Documentation Added

All 26 component interfaces now have comprehensive JSDoc comments with:

- Component description
- Usage examples
- Prop descriptions with `@example` code blocks
- Type explanations for enums/unions

### Component Test Status

| Component        | Test File                                    | Status  |
| ---------------- | -------------------------------------------- | ------- |
| Text             | `Text/Text.test.tsx`                         | ✅ DONE |
| Loader           | `Loader/Loader.test.tsx`                     | ✅ DONE |
| Skeleton         | `Skeleton/Skeleton.test.tsx`                 | ✅ DONE |
| Image            | `Image/Image.test.tsx`                       | ✅ DONE |
| HtmlRender       | `HtmlRender/HtmlRender.test.tsx`             | ✅ DONE |
| Button           | `Button/Button.test.tsx`                     | ✅ DONE |
| Checkbox         | `Checkbox/Checkbox.test.tsx`                 | ✅ DONE |
| Switch           | `Switch/Switch.test.tsx`                     | ✅ DONE |
| Input            | `Input/Input.test.tsx`                       | ✅ DONE |
| TextArea         | `TextArea/TextArea.test.tsx`                 | ✅ DONE |
| Select           | `Select/Select.test.tsx`                     | ✅ DONE |
| Slider           | `Slider/Slider.test.tsx`                     | ✅ DONE |
| Numpad           | `Numpad/Numpad.test.tsx`                     | ✅ DONE |
| CurrencyInput    | `CurrencyInput/CurrencyInput.test.tsx`       | ✅ DONE |
| DatePicker       | `DatePicker/DatePicker.test.tsx`             | ✅ DONE |
| Chip             | `Chip/Chip.test.tsx`                         | ✅ DONE |
| InfoBox          | `InfoBox/InfoBox.test.tsx`                   | ✅ DONE |
| TextHighlight    | `TextHighlight/TextHighlight.test.tsx`       | ✅ DONE |
| Timeline         | `Timeline/Timeline.test.tsx`                 | ✅ DONE |
| Backdrop         | `Backdrop/Backdrop.test.tsx`                 | ✅ DONE |
| Dialog           | `Dialog/Dialog.test.tsx`                     | ✅ DONE |
| Drawer           | `Drawer/Drawer.test.tsx`                     | ✅ DONE |
| MenuList         | `MenuList/MenuList.test.tsx`                 | ✅ DONE |
| Accordion        | `Accordion/Accordion.test.tsx`               | ✅ DONE |
| MediaVideoUpload | `MediaVideoUpload/MediaVideoUpload.test.tsx` | ✅ DONE |
| StaticMapGoogle  | `StaticMapGoogle/StaticMapGoogle.test.tsx`   | ✅ DONE |

---

## Migration Checklist Per Component

For each component, complete:

- [x] Create component folder in `src/components/`
- [x] Convert React JSX to Solid JSX
  - Replace `className` with `class`
  - Replace `onClick` with `onClick` (same in Solid)
  - Replace `useState` with `createSignal`
  - Replace `useEffect` with `createEffect`
  - Replace `useRef` with `ref` prop
  - Replace `forwardRef` with `ref` forwarding pattern
  - Replace `children` prop (already reactive in Solid)
- [x] Update interface (remove React.ReactNode, use JSX.Element)
- [x] Use `twMerge` for class composition
- [x] Add motion animations where needed
- [ ] Write/update unit tests
- [ ] Create documentation page
- [x] Update barrel export in `index.ts`

---

## Key Patterns

### React → Solid Conversion

```tsx
// React
import React, { useState, useEffect } from "react";

export const Component: React.FC<Props> = ({ children, onClick }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="foo" onClick={onClick}>
      {children}
    </div>
  );
};

// Solid
import { createSignal, createEffect, JSX } from "solid-js";

export function Component(props: Props) {
  const [value, setValue] = createSignal(0);

  createEffect(() => {
    console.log(value());
  });

  return (
    <div class="foo" onClick={props.onClick}>
      {props.children}
    </div>
  );
}
```

### Interface Pattern

```tsx
// React
import React from "react";
interface Props {
  children: React.ReactNode;
  className?: string;
}

// Solid
import { JSX } from "solid-js";
interface Props {
  children: JSX.Element;
  class?: string;
}
```

### Motion/Animation Pattern

```tsx
// motion (vanilla JS API for SolidJS)
import { animate } from "motion";
import { createEffect, on } from "solid-js";

// Inside component
let elementRef: HTMLDivElement | undefined;

createEffect(
  on(
    () => props.isVisible,
    async (isVisible) => {
      if (!elementRef) return;
      if (isVisible) {
        elementRef.style.display = "block";
        await animate(
          elementRef,
          { opacity: 1, scale: 1 },
          { duration: 0.2, ease: "easeOut" },
        ).finished;
      } else {
        await animate(
          elementRef,
          { opacity: 0, scale: 0.95 },
          { duration: 0.2, ease: "easeOut" },
        ).finished;
        elementRef.style.display = "none";
      }
    },
  ),
);

return (
  <div ref={elementRef} style={{ display: "none" }}>
    {props.children}
  </div>
);
```

---

## Dependencies

| Package         | Version  | Purpose           |
| --------------- | -------- | ----------------- |
| solid-js        | ^1.9.10  | UI Framework      |
| tailwindcss     | ^4.1.18  | Styling           |
| tailwind-merge  | ^3.4.1   | Class composition |
| motion          | ^12.34.0 | Animations        |
| @solidjs/router | ^0.15.4  | Docs routing      |
| dompurify       | ^3.3.1   | HTML sanitization |

---

## Progress Summary

| Phase                | Status | Progress     |
| -------------------- | ------ | ------------ |
| Phase 1: Foundation  | ✅     | 100%         |
| Phase 2: Kitchensink | ✅     | 95%          |
| Phase 3: Components  | ✅     | 24/24 (100%) |
| Phase 4: Testing     | ✅     | 100%         |
| Phase 4: JSDoc       | ✅     | 100%         |
| Phase 4: A11y Audit  | ✅     | 100%         |

**Last Updated:** 2026-02-16

---

## Session Summary (2026-02-16)

**Completed:**

1. **Tests** - Added 11 new test files with 119 new tests
   - Total: 27 test files, 210 passing tests
   - Skipped: Navigation component tests (per user request)
2. **JSDoc Documentation** - All 26 component interfaces documented
   - Button, Input, Text, Dialog, Checkbox, Switch, Drawer, Backdrop
   - Select, TextArea, Slider, Chip, InfoBox, Timeline, TextHighlight
   - Accordion, MenuList, Numpad, CurrencyInput, DatePicker
   - StaticMapGoogle, Image, Loader, Skeleton, HtmlRender, MediaVideoUpload

3. **Accessibility Audit** - All interactive components updated with ARIA attributes
   - **Form Controls:**
     - Checkbox: `aria-invalid`, `aria-describedby` for error states
     - Switch: `role="switch"`, `aria-checked` for proper toggle semantics
     - Input: `aria-invalid`, `aria-describedby` for error/helper text
     - Select: `aria-invalid`, `aria-describedby` for error states
     - Slider: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`
   - **Interactive Components:**
     - Accordion: `aria-expanded`, `aria-controls`, panel IDs, `role="region"`, `aria-hidden`
     - MenuList: `role="menu"`, `role="menuitem"`, `tabIndex`, keyboard navigation
     - Drawer: `role="dialog"`, `aria-modal`, `aria-labelledby`, escape key, focus management
   - **Overlays:**
     - Backdrop: `aria-hidden` to hide from screen readers
     - Dialog: Already had ARIA attributes (verified)
     - Button: Already had `aria-busy` (verified)

**Next Steps:**

1. Cross-browser testing (Chrome, Firefox, Safari, Edge)
2. Mobile responsiveness review
