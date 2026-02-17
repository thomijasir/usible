import React from "react";
import { render } from "@testing-library/react";
import { TextArea } from "./TextArea.component";

describe("TextArea", () => {
  it("renders default content", () => {
    render(React.createElement(TextArea));
  });
});
