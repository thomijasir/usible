import React, { useRef } from "react";
import { useDocumentUploadController as useController } from "./DocumentUpload.controller";
import type { DocumentUploadProps } from "./DocumentUpload.interface";
import { Loader } from "../Loader/Loader.component";
import { Button } from "../Button";
import {
  TrashIcon,
  ImageErrorIcon,
  DocumentIcon,
  PhotoUpIcon,
} from "~/assets/icons";
import { formatFileSize } from "~/utilities/file.utils";

/**
 * DocumentUpload Component
 *
 * Allows users to upload single or multiple documents.
 */
export const DocumentUpload: React.FC<DocumentUploadProps> = (props) => {
  const { actions, state } = useController(props);
  const { files, error, loading } = state;
  const { handleFileChange, handleRemoveFile } = actions;
  const {
    label,
    helperText,
    fullWidth,
    showFileSize,
    mode = "single",
    extension,
    required,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderFilePreview = (file: File | string) => {
    const fileName = file instanceof File ? file.name : file;
    // If it's a string ID, try to make it look nicer if it follows the pattern
    const displayName =
      typeof fileName === "string" && fileName.includes("-")
        ? fileName.split("-").slice(1, -1).join("-") || fileName
        : fileName;

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-2">
        <DocumentIcon className="w-8 h-8 text-gray-500 mb-2" />
        <span className="text-xs text-gray-600 text-center break-all line-clamp-2">
          {displayName}
        </span>
      </div>
    );
  };

  const renderSinglePreview = () => {
    const file = files[0];
    if (!file) return null;

    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
        {renderFilePreview(file)}
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer"
          onClick={handleUploadClick}>
          <p className="text-white font-medium mb-2">Tap to replace</p>
        </div>

        <Button
          variant="filled"
          color="error"
          size="small"
          onClick={() => handleRemoveFile(0)}
          className="absolute top-2 right-2 z-10 rounded-full p-2 min-w-0">
          <TrashIcon className="w-5 h-5" />
        </Button>

        {showFileSize && file instanceof File && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded pointer-events-none">
            {formatFileSize(file.size)}
          </div>
        )}
      </div>
    );
  };

  const renderMultiPreviews = () => {
    return (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {files.map((file, index) => (
          <div
            key={`${file instanceof File ? file.name : file}-${index}`}
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
            {renderFilePreview(file)}
            <Button
              variant="filled"
              color="error"
              size="small"
              onClick={() => handleRemoveFile(index)}
              className="absolute top-2 right-2 rounded-full p-1.5 min-w-0">
              <TrashIcon className="w-4 h-4" />
            </Button>
            {showFileSize && file instanceof File && (
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded pointer-events-none">
                {formatFileSize(file.size)}
              </div>
            )}
          </div>
        ))}
        {/* Add More Button */}
        <div
          onClick={handleUploadClick}
          className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center transition-colors">
          <PhotoUpIcon className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 font-medium">Add more</span>
        </div>
      </div>
    );
  };

  const renderUploadArea = () => (
    <div
      onClick={handleUploadClick}
      className={`
        relative flex flex-col items-center justify-center w-full h-48
        border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${error ? "border-red-300 bg-red-50" : "border-gray-300 hover:bg-gray-50"}
      `}>
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <DocumentIcon
          className={`w-10 h-10 mb-3 ${error ? "text-red-400" : "text-gray-400"}`}
        />
        <p
          className={`mb-2 text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
          <span className="font-semibold">Click to upload</span>
        </p>
        <p className="text-xs text-gray-500">
          {extension ? extension.join(", ").toUpperCase() : "Documents"}
        </p>
      </div>
    </div>
  );

  return (
    <div className={`${fullWidth ? "w-full" : "w-auto"}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={extension?.map((ext) => `.${ext}`).join(",")}
        multiple={mode === "multi"}
        onChange={handleFileChange}
      />

      {loading ? (
        <div className="flex items-center justify-center w-full h-48 border-2 border-gray-200 rounded-lg bg-gray-50">
          <Loader size="large" />
        </div>
      ) : (
        <>
          {/* Single Mode: Show Preview OR Upload Area */}
          {mode === "single" &&
            (files.length > 0 ? renderSinglePreview() : renderUploadArea())}

          {/* Multi Mode: Show Upload Area (if empty) OR Grid (if has files) */}
          {mode === "multi" &&
            (files.length > 0 ? renderMultiPreviews() : renderUploadArea())}
        </>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <ImageErrorIcon className="w-4 h-4" />
          {String(error)}
        </p>
      )}

      {!error && helperText && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
