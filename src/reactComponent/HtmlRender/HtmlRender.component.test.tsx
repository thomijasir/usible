import React from "react";
import { render } from "@testing-library/react";
import { HtmlRender } from "./HtmlRender.component";

describe("HtmlRender", () => {
  it("renders default content", () => {
    render(React.createElement(HtmlRender));
  });
});
