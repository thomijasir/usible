import React from "react";
import { render } from "@testing-library/react";
import { Backdrop } from "./Backdrop.component";

describe("Backdrop", () => {
  it("renders default content", () => {
    render(React.createElement(Backdrop));
  });
});
