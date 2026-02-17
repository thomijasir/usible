import React from "react";
import { useMediaVideoUploadController as useController } from "./MediaVideoUpload.controller";
import type { MediaVideoUploadProps } from "./MediaVideoUpload.interface";

export const MediaVideoUpload: React.FC<MediaVideoUploadProps> = (_props) => {
  const { actions, state } = useController();
  console.log({ actions, state });
  return (
    <div>
      <p>Hello, {state.name}</p>
    </div>
  );
};
