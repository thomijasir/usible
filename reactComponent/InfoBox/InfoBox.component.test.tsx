import React from "react";
import { render } from "@testing-library/react";
import { InfoBox } from "./InfoBox.component";

describe("InfoBox", () => {
  it("renders default content", () => {
    render(React.createElement(InfoBox));
  });
});
