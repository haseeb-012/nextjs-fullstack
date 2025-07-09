"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (response: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const FileValidate = async (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        throw new Error("Invalid file type. Please upload a video file.");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      // 100 MB limit
      throw new Error("File size exceeds the limit of 100 MB.");
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected file:", file);
    if (!file || !FileValidate(file)) return;
    setUploading(true);
    setError(null);
    try {
      const res = await fetch("api/auth/imagekit-auth");
      const auth = await res.json();
      console.log("Auth response:", auth);

      const response = await upload({
        file,
        fileName: file.name, // Optionally set a custom file name
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.authenticationParameters.signature,
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(Math.round(progress));
          }
        },
      });
      onSuccess(response);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <p>Uploading...</p>}
    </>
  );
};

export default FileUpload;
