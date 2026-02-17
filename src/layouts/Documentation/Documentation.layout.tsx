import type { Component } from "solid-js";
import type { DocumentationLayoutProps } from "./Documentation.interface";

// TODO: Create default documentation layout
// this documentation layout
// divided into 3 main section
// 1. Guideline, information and basic usage
// 2. Sample Component implementation
//  - like variant color, any available props
// 3. props reference and information
export const DocumentationLayout: Component<DocumentationLayoutProps> = (
  props,
) => {
  return (
    <div>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p>hello</p>
      </div>
      <p>hello</p>
      {props.children}
    </div>
  );
};
