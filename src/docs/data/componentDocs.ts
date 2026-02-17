import type { JSX } from "solid-js";

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ExampleDoc {
  title: string;
  code: string;
}

export interface ComponentDoc {
  name: string;
  description: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (props: any) => JSX.Element;
  props: PropDoc[];
  examples: ExampleDoc[];
}

import { Button } from "../../components/Button/Button.component";
import { Input } from "../../components/Input/Input.component";
import { Chip } from "../../components/Chip/Chip.component";
import { Loader } from "../../components/Loader/Loader.component";
import { Text } from "../../components/Text/Text.component";
import { Checkbox } from "../../components/Checkbox/Checkbox.component";
import { Switch } from "../../components/Switch/Switch.component";
import { TextArea } from "../../components/TextArea/TextArea.component";
import { Select } from "../../components/Select/Select.component";
import { Slider } from "../../components/Slider/Slider.component";
import { Numpad } from "../../components/Numpad/Numpad.component";
import { CurrencyInput } from "../../components/CurrencyInput/CurrencyInput.component";
import { DatePicker } from "../../components/DatePicker/DatePicker.component";
import { Skeleton } from "../../components/Skeleton/Skeleton.component";
import { Image } from "../../components/Image/Image.component";
import { HtmlRender } from "../../components/HtmlRender/HtmlRender.component";
import { InfoBox } from "../../components/InfoBox/InfoBox.component";
import { TextHighlight } from "../../components/TextHighlight/TextHighlight.component";
import { Timeline } from "../../components/Timeline/Timeline.component";
import { Backdrop } from "../../components/Backdrop/Backdrop.component";
import { Dialog } from "../../components/Dialog/Dialog.component";
import { Drawer } from "../../components/Drawer/Drawer.component";
import { MenuList } from "../../components/MenuList/MenuList.component";
import { Accordion } from "../../components/Accordion/Accordion.component";

export const componentDocs: Record<string, ComponentDoc> = {
  button: {
    name: "Button",
    description:
      "A versatile button component with multiple variants, colors, and sizes.",
    category: "Form Controls",
    component: Button,
    props: [
      { name: "children", type: "JSX.Element", description: "Button content" },
      {
        name: "variant",
        type: '"filled" | "outlined" | "text" | "icon" | "iconOutline"',
        default: '"filled"',
        description: "Visual style variant",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error" | "transparent"',
        default: '"primary"',
        description: "Color theme",
      },
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        default: '"medium"',
        description: "Button size",
      },
      { name: "block", type: "boolean", description: "Full width button" },
      { name: "disabled", type: "boolean", description: "Disable the button" },
      { name: "loading", type: "boolean", description: "Show loading spinner" },
      { name: "onClick", type: "() => void", description: "Click handler" },
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        default: '"button"',
        description: "Button type attribute",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Filled Buttons",
        code: `<Button>Primary</Button>\n<Button color="secondary">Secondary</Button>\n<Button color="success">Success</Button>`,
      },
      {
        title: "Outlined Buttons",
        code: `<Button variant="outlined">Primary</Button>\n<Button variant="outlined" color="secondary">Secondary</Button>`,
      },
      {
        title: "Button Sizes",
        code: `<Button size="small">Small</Button>\n<Button size="medium">Medium</Button>\n<Button size="large">Large</Button>`,
      },
      { title: "Loading State", code: `<Button loading>Loading</Button>` },
    ],
  },
  input: {
    name: "Input",
    description:
      "A text input field with support for labels, placeholders, and validation states.",
    category: "Form Controls",
    component: Input,
    props: [
      { name: "value", type: "string", description: "Input value" },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Value change handler",
      },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "label", type: "string", description: "Input label" },
      {
        name: "type",
        type: '"text" | "password" | "email" | "number"',
        default: '"text"',
        description: "Input type",
      },
      { name: "disabled", type: "boolean", description: "Disable the input" },
      {
        name: "error",
        type: "string",
        description: "Error message to display",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      { title: "Basic Input", code: `<Input placeholder="Enter text..." />` },
      {
        title: "With Label",
        code: `<Input label="Email" placeholder="you@example.com" />`,
      },
      {
        title: "With Error",
        code: `<Input label="Password" type="password" error="Password is required" />`,
      },
    ],
  },
  checkbox: {
    name: "Checkbox",
    description: "A checkbox input with label support and customizable sizes.",
    category: "Form Controls",
    component: Checkbox,
    props: [
      { name: "checked", type: "boolean", description: "Checked state" },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        description: "Change handler",
      },
      {
        name: "label",
        type: "JSX.Element | string",
        description: "Checkbox label",
      },
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        default: '"medium"',
        description: "Checkbox size",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disable the checkbox",
      },
      {
        name: "error",
        type: "boolean | string",
        description: "Error state or message",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      { title: "Basic Checkbox", code: `<Checkbox label="Accept terms" />` },
      {
        title: "Sizes",
        code: `<Checkbox size="small" label="Small" />\n<Checkbox size="medium" label="Medium" />\n<Checkbox size="large" label="Large" />`,
      },
    ],
  },
  switch: {
    name: "Switch",
    description: "A toggle switch for boolean settings.",
    category: "Form Controls",
    component: Switch,
    props: [
      { name: "checked", type: "boolean", description: "Checked state" },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        description: "Change handler",
      },
      {
        name: "label",
        type: "JSX.Element | string",
        description: "Switch label",
      },
      { name: "disabled", type: "boolean", description: "Disable the switch" },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Switch",
        code: `<Switch label="Enable notifications" />`,
      },
      { title: "Disabled", code: `<Switch label="Disabled" disabled />` },
    ],
  },
  textarea: {
    name: "TextArea",
    description: "A multi-line text input for longer content.",
    category: "Form Controls",
    component: TextArea,
    props: [
      { name: "value", type: "string", description: "TextArea value" },
      {
        name: "onInput",
        type: "(value: string) => void",
        description: "Input handler",
      },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "label", type: "string", description: "TextArea label" },
      { name: "rows", type: "number", description: "Number of rows" },
      {
        name: "disabled",
        type: "boolean",
        description: "Disable the textarea",
      },
      {
        name: "error",
        type: "string | boolean",
        description: "Error state or message",
      },
      { name: "fullWidth", type: "boolean", description: "Full width mode" },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic TextArea",
        code: `<TextArea placeholder="Enter your message..." rows={4} />`,
      },
      {
        title: "With Label",
        code: `<TextArea label="Description" placeholder="Describe your issue..." />`,
      },
    ],
  },
  select: {
    name: "Select",
    description:
      "A dropdown select component for choosing from a list of options.",
    category: "Form Controls",
    component: Select,
    props: [
      { name: "value", type: "string | number", description: "Selected value" },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Change handler",
      },
      {
        name: "options",
        type: "SelectOption[]",
        description: "Array of { label, value } options",
      },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "label", type: "string", description: "Select label" },
      { name: "disabled", type: "boolean", description: "Disable the select" },
      {
        name: "error",
        type: "string | boolean",
        description: "Error state or message",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Select",
        code: `<Select\n  placeholder="Choose an option"\n  options={[\n    { label: "Option 1", value: "1" },\n    { label: "Option 2", value: "2" }\n ]}\n/>`,
      },
    ],
  },
  slider: {
    name: "Slider",
    description: "A range slider for selecting numeric values.",
    category: "Form Controls",
    component: Slider,
    props: [
      { name: "value", type: "number", description: "Current value" },
      {
        name: "onChange",
        type: "(value: number) => void",
        description: "Change handler",
      },
      {
        name: "min",
        type: "number",
        default: "0",
        description: "Minimum value",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Maximum value",
      },
      {
        name: "step",
        type: "number",
        default: "1",
        description: "Step increment",
      },
      { name: "label", type: "string", description: "Slider label" },
      {
        name: "showValue",
        type: "boolean",
        description: "Display current value",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error"',
        default: '"primary"',
        description: "Color theme",
      },
      { name: "disabled", type: "boolean", description: "Disable the slider" },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Slider",
        code: `<Slider value={50} onChange={(v) => console.log(v)} />`,
      },
      {
        title: "With Label",
        code: `<Slider label="Volume" value={75} showValue />`,
      },
    ],
  },
  numpad: {
    name: "Numpad",
    description: "A numeric keypad for PIN entry and numeric input.",
    category: "Form Controls",
    component: Numpad,
    props: [
      {
        name: "theme",
        type: '"light" | "dark"',
        default: '"light"',
        description: "Visual theme",
      },
      {
        name: "onKeyPress",
        type: "(key: string) => void",
        description: "Key press handler",
      },
      {
        name: "onBackspace",
        type: "() => void",
        description: "Backspace handler",
      },
      {
        name: "onBiometricAuth",
        type: "() => void",
        description: "Biometric auth handler",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Numpad",
        code: `<Numpad onKeyPress={(k) => console.log(k)} />`,
      },
    ],
  },
  currencyinput: {
    name: "CurrencyInput",
    description: "An input field formatted for currency values.",
    category: "Form Controls",
    component: CurrencyInput,
    props: [
      { name: "value", type: "number", description: "Current value" },
      {
        name: "onChange",
        type: "(value: number) => void",
        description: "Change handler",
      },
      {
        name: "currency",
        type: "string",
        default: '"USD"',
        description: "Currency code",
      },
      { name: "locale", type: "string", description: "Locale for formatting" },
      {
        name: "decimalDigits",
        type: "number",
        default: "2",
        description: "Decimal places",
      },
      { name: "maxDigits", type: "number", description: "Maximum digits" },
      { name: "label", type: "string", description: "Input label" },
      { name: "disabled", type: "boolean", description: "Disable the input" },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Currency Input",
        code: `<CurrencyInput value={100} onChange={(v) => console.log(v)} currency="USD" />`,
      },
    ],
  },
  datepicker: {
    name: "DatePicker",
    description: "A date selection component with calendar picker.",
    category: "Form Controls",
    component: DatePicker,
    props: [
      { name: "value", type: "Date | null", description: "Selected date" },
      {
        name: "onChange",
        type: "(date: Date) => void",
        description: "Date change handler",
      },
      { name: "minDate", type: "Date", description: "Minimum selectable date" },
      { name: "maxDate", type: "Date", description: "Maximum selectable date" },
      { name: "format", type: "string", description: "Date display format" },
      { name: "label", type: "string", description: "Input label" },
      { name: "disabled", type: "boolean", description: "Disable the picker" },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      { title: "Basic DatePicker", code: `<DatePicker label="Select date" />` },
    ],
  },
  chip: {
    name: "Chip",
    description:
      "A compact element representing an input, attribute, or action.",
    category: "Feedback & Display",
    component: Chip,
    props: [
      { name: "label", type: "string", description: "Chip text content" },
      {
        name: "variant",
        type: '"filled" | "outlined"',
        default: '"filled"',
        description: "Visual style",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error"',
        default: '"primary"',
        description: "Color theme",
      },
      {
        name: "size",
        type: '"small" | "medium"',
        default: '"medium"',
        description: "Chip size",
      },
      { name: "icon", type: "JSX.Element", description: "Optional icon" },
      {
        name: "onDelete",
        type: "() => void",
        description: "Delete handler - shows delete button",
      },
      { name: "onClick", type: "() => void", description: "Click handler" },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Chips",
        code: `<Chip label="Primary" />\n<Chip label="Secondary" color="secondary" />\n<Chip label="Success" color="success" />`,
      },
      {
        title: "With Delete",
        code: `<Chip label="Tag" onDelete={() => console.log('delete')} />`,
      },
    ],
  },
  infobox: {
    name: "InfoBox",
    description: "An alert box for displaying informational messages.",
    category: "Feedback & Display",
    component: InfoBox,
    props: [
      {
        name: "description",
        type: "string",
        description: "Main message content",
      },
      { name: "title", type: "string", description: "Optional title" },
      {
        name: "color",
        type: '"primary" | "secondary" | "ternary" | "text" | "success" | "warning" | "error"',
        default: '"primary"',
        description: "Color theme",
      },
      {
        name: "leftIcon",
        type: "JSX.Element",
        description: "Icon displayed on the left",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Info Box Types",
        code: `<InfoBox description="This is an info message" color="primary" />\n<InfoBox description="Success!" color="success" />\n<InfoBox description="Warning!" color="warning" />\n<InfoBox description="Error occurred" color="error" />`,
      },
    ],
  },
  texthighlight: {
    name: "TextHighlight",
    description: "Highlights matching text within a string.",
    category: "Feedback & Display",
    component: TextHighlight,
    props: [
      {
        name: "children",
        type: "string",
        description: "Text to search within",
      },
      { name: "highlight", type: "string", description: "Text to highlight" },
      {
        name: "color",
        type: '"primary" | "secondary" | "ternary" | "success" | "warning" | "error"',
        default: '"primary"',
        description: "Highlight color",
      },
    ],
    examples: [
      {
        title: "Basic Highlight",
        code: `<TextHighlight highlight="world">Hello world, welcome to the world</TextHighlight>`,
      },
    ],
  },
  timeline: {
    name: "Timeline",
    description: "A vertical timeline for displaying sequential events.",
    category: "Feedback & Display",
    component: Timeline,
    props: [
      {
        name: "items",
        type: "TimelineItem[]",
        description: "Array of timeline items",
      },
      {
        name: "variant",
        type: '"default" | "numbered"',
        default: '"default"',
        description: "Display variant",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Timeline",
        code: `<Timeline items={[\n  { title: "Step 1", description: "First step", status: "completed" },\n  { title: "Step 2", description: "Second step", status: "pending" }\n]} />`,
      },
    ],
  },
  loader: {
    name: "Loader",
    description: "A loading spinner component.",
    category: "Basic Primitives",
    component: Loader,
    props: [
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        default: '"medium"',
        description: "Loader size",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "white" | "current"',
        default: '"primary"',
        description: "Loader color",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Loader Sizes",
        code: `<Loader size="small" />\n<Loader size="medium" />\n<Loader size="large" />`,
      },
    ],
  },
  text: {
    name: "Text",
    description: "Typography component for consistent text styling.",
    category: "Basic Primitives",
    component: Text,
    props: [
      { name: "children", type: "JSX.Element", description: "Text content" },
      {
        name: "variant",
        type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption"',
        default: '"body1"',
        description: "Typography variant",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Headings",
        code: `<Text variant="h1">Heading 1</Text>\n<Text variant="h2">Heading 2</Text>\n<Text variant="h3">Heading 3</Text>`,
      },
      {
        title: "Body Text",
        code: `<Text variant="body1">Body 1 text</Text>\n<Text variant="body2">Body 2 text</Text>\n<Text variant="caption">Caption text</Text>`,
      },
    ],
  },
  skeleton: {
    name: "Skeleton",
    description: "A loading placeholder that mimics content shape.",
    category: "Basic Primitives",
    component: Skeleton,
    props: [
      {
        name: "variant",
        type: '"text" | "rectangular" | "circular"',
        default: '"text"',
        description: "Skeleton shape",
      },
      {
        name: "width",
        type: "string | number",
        description: "Width of skeleton",
      },
      {
        name: "height",
        type: "string | number",
        description: "Height of skeleton",
      },
      {
        name: "animation",
        type: '"pulse" | "none"',
        default: '"pulse"',
        description: "Animation style",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Skeleton Variants",
        code: `<Skeleton variant="text" width={200} />\n<Skeleton variant="circular" width={40} height={40} />\n<Skeleton variant="rectangular" width={200} height={100} />`,
      },
    ],
  },
  image: {
    name: "Image",
    description: "An image component with fallback support.",
    category: "Basic Primitives",
    component: Image,
    props: [
      { name: "src", type: "string", description: "Image source URL" },
      {
        name: "alt",
        type: "string",
        description: "Alt text for accessibility",
      },
      {
        name: "fallbackSrc",
        type: "string",
        description: "Fallback image on error",
      },
      { name: "width", type: "string | number", description: "Image width" },
      { name: "height", type: "string | number", description: "Image height" },
      {
        name: "loading",
        type: '"lazy" | "eager"',
        default: '"lazy"',
        description: "Loading strategy",
      },
      {
        name: "onLoad",
        type: "(event: Event) => void",
        description: "Load handler",
      },
      {
        name: "onError",
        type: "(event: Event) => void",
        description: "Error handler",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Image",
        code: `<Image src="https://example.com/image.jpg" alt="Example" />`,
      },
      {
        title: "With Fallback",
        code: `<Image src="broken.jpg" fallbackSrc="placeholder.jpg" alt="With fallback" />`,
      },
    ],
  },
  htmlrender: {
    name: "HtmlRender",
    description: "Renders HTML safely using DOMPurify for sanitization.",
    category: "Basic Primitives",
    component: HtmlRender,
    props: [
      { name: "html", type: "string", description: "HTML string to render" },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Render HTML",
        code: `<HtmlRender html="<p><strong>Bold</strong> text</p>" />`,
      },
    ],
  },
  backdrop: {
    name: "Backdrop",
    description: "A semi-transparent overlay for modal behaviors.",
    category: "Overlay & Navigation",
    component: Backdrop,
    props: [
      { name: "isOpen", type: "boolean", description: "Visibility state" },
      { name: "onClick", type: "() => void", description: "Click handler" },
      {
        name: "opacity",
        type: "number",
        default: "0.5",
        description: "Backdrop opacity (0-1)",
      },
    ],
    examples: [
      {
        title: "Basic Backdrop",
        code: `<Backdrop isOpen={true} onClick={() => console.log('clicked')} />`,
      },
    ],
  },
  dialog: {
    name: "Dialog",
    description: "A modal dialog with animations and customizable content.",
    category: "Overlay & Navigation",
    component: Dialog,
    props: [
      { name: "isOpen", type: "boolean", description: "Dialog visibility" },
      { name: "onClose", type: "() => void", description: "Close handler" },
      {
        name: "title",
        type: "JSX.Element | string",
        description: "Dialog title",
      },
      {
        name: "children",
        type: "JSX.Element | string",
        description: "Dialog content",
      },
      { name: "actions", type: "JSX.Element", description: "Action buttons" },
      {
        name: "dismissible",
        type: "boolean",
        default: "true",
        description: "Allow dismissal by backdrop click",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Dialog",
        code: `<Dialog isOpen={true} onClose={() => {}} title="Confirm">\n  <p>Are you sure?</p>\n</Dialog>`,
      },
    ],
  },
  drawer: {
    name: "Drawer",
    description: "A bottom drawer/sheet component with swipe gestures.",
    category: "Overlay & Navigation",
    component: Drawer,
    props: [
      { name: "isOpen", type: "boolean", description: "Drawer visibility" },
      { name: "onClose", type: "() => void", description: "Close handler" },
      { name: "children", type: "JSX.Element", description: "Drawer content" },
      { name: "height", type: "string | number", description: "Drawer height" },
      {
        name: "showHandle",
        type: "boolean",
        default: "true",
        description: "Show drag handle",
      },
    ],
    examples: [
      {
        title: "Basic Drawer",
        code: `<Drawer isOpen={true} onClose={() => {}}>\n  <div class="p-4">Drawer content</div>\n</Drawer>`,
      },
    ],
  },
  menulist: {
    name: "MenuList",
    description: "A list of menu items for actions and navigation.",
    category: "Overlay & Navigation",
    component: MenuList,
    props: [
      {
        name: "children",
        type: "JSX.Element",
        description: "MenuItem components",
      },
      { name: "title", type: "string", description: "Optional menu title" },
      {
        name: "variant",
        type: '"standard" | "rounded"',
        default: '"standard"',
        description: "Menu style",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Menu List",
        code: `<MenuList title="Actions">\n  <MenuItem label="Edit" onClick={() => {}} />\n  <MenuItem label="Delete" onClick={() => {}} />\n</MenuList>`,
      },
    ],
  },
  accordion: {
    name: "Accordion",
    description: "A collapsible content panel for FAQ or expandable sections.",
    category: "Overlay & Navigation",
    component: Accordion,
    props: [
      {
        name: "items",
        type: "AccordionItem[]",
        description: "Array of { id, title, content, disabled }",
      },
      {
        name: "defaultExpandedId",
        type: "string | number",
        description: "Initially expanded item",
      },
      {
        name: "allowMultiple",
        type: "boolean",
        default: "false",
        description: "Allow multiple items open",
      },
      { name: "class", type: "string", description: "Additional CSS classes" },
    ],
    examples: [
      {
        title: "Basic Accordion",
        code: `<Accordion items={[\n  { id: 1, title: "Section 1", content: "Content 1" },\n  { id: 2, title: "Section 2", content: "Content 2" }\n]} />`,
      },
    ],
  },
};

export const componentList = Object.keys(componentDocs).sort();
