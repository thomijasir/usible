import React from "react";
import { render } from "@testing-library/react";
import { MediaVideoUpload } from "./MediaVideoUpload.component";

describe("MediaVideoUpload", () => {
  it("renders default content", () => {
    render(React.createElement(MediaVideoUpload));
  });
});
