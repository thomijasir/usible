import type { JSXElement } from "solid-js";

interface Guideline {
  title: string;
  description: string;
  usage: JSXElement;
}

interface PropsReference {
  name: string;
  options: string;
  primaryText: string;
  secondaryText?: string;
}
export interface DocumentationLayoutProps {
  guideline: Guideline;
  propsReference: PropsReference;
  children: JSXElement;
}
