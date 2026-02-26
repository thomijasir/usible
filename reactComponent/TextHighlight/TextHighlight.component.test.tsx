import React from "react";
import { render } from "@testing-library/react";
import { TextHighlight } from "./TextHighlight.component";

describe("TextHighlight", () => {
  it("renders default content", () => {
    render(React.createElement(TextHighlight));
  });
});
