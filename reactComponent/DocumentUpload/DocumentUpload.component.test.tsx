import React from "react";
import { render } from "@testing-library/react";
import { DocumentUpload } from "./DocumentUpload.component";

describe("DocumentUpload", () => {
  it("renders default content", () => {
    render(React.createElement(DocumentUpload));
  });
});
