import React from "react";
import { render } from "@testing-library/react";
import { MediaUpload } from "./MediaUpload.component";

describe("MediaUpload", () => {
  it("renders default content", () => {
    render(React.createElement(MediaUpload));
  });
});
