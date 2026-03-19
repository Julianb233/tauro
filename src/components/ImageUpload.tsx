"use client";

import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadStatus = "idle" | "uploading" | "done" | "error";

interface ImageUploadProps {
  bucket: "property-images" | "agent-photos";
  onUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
  label?: string;
  multiple?: boolean;
}

export function ImageUpload({
  bucket,
  onUpload,
  currentImage,
  className,
  label = "Upload an image",
  multiple = false,
}: ImageUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setStatus("uploading");
      setErrorMessage("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await response.json();
        setPreview(data.url);
        setStatus("done");
        onUpload(data.url);
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Upload failed"
        );
      }
    },
    [bucket, onUpload]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      if (multiple) {
        Array.from(files).forEach((file) => uploadFile(file));
      } else {
        uploadFile(files[0]);
      }
    },
    [multiple, uploadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer",
          "bg-[#1A1A1A] text-[#F5F0E8]",
          isDragging
            ? "border-[#C9A84C]/60 bg-[#C9A84C]/5"
            : "border-[#C9A84C]/30 hover:border-[#C9A84C]/60"
        )}
      >
        {preview && status !== "uploading" ? (
          <img
            src={preview}
            alt="Upload preview"
            className="max-h-48 rounded-md object-contain"
          />
        ) : status === "uploading" ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A84C] border-t-transparent" />
            <span className="text-sm text-[#F5F0E8]/60">Uploading...</span>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 text-[#C9A84C]/60" />
            <span className="text-sm text-[#F5F0E8]/60">{label}</span>
            <span className="text-xs text-[#F5F0E8]/40">
              Drag & drop or click to select
            </span>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
