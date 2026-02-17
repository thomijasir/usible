import React from "react";
import { render } from "@testing-library/react";
import { ScrollToTop } from "./ScrollToTop.component";

describe("ScrollToTop", () => {
  it("renders default content", () => {
    render(React.createElement(ScrollToTop));
  });
});
