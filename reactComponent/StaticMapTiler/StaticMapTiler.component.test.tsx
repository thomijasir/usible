import React from "react";
import { render } from "@testing-library/react";
import { StaticMapTiler } from "./StaticMapTiler.component";

describe("StaticMapTiler", () => {
  it("renders default content", () => {
    render(React.createElement(StaticMapTiler));
  });
});
