"use client";
import React, { useState } from "react";
import FileUpload from "./FileUpload";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [thumbnailProgress, setThumbnailProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !description || !videoUrl || !thumbnailUrl) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const body = {
        title,
        description,
        videoUrl,
        thumbnailUrl,
      };
      console.log("Request body:", body);

      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to upload video");
      }

      setSuccess("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl(null);
      setThumbnailUrl(null);
      setVideoProgress(0);
      setThumbnailProgress(0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Upload Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div>
            <label className="block text-gray-300 mb-1">Video File</label>
            <FileUpload
              fileType="video"
              onSuccess={(res) => setVideoUrl(res.url)}
              onProgress={setVideoProgress}
            />
            {videoProgress > 0 && videoProgress < 100 && (
              <div className="text-blue-400 text-xs mt-1">
                Uploading: {videoProgress}%
              </div>
            )}
            {videoUrl && (
              <div className="text-green-400 text-xs mt-1">Video uploaded!</div>
            )}
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Thumbnail Image</label>
            <FileUpload
              fileType="image"
              onSuccess={(res) => setThumbnailUrl(res.url)}
              onProgress={setThumbnailProgress}
            />
            {thumbnailProgress > 0 && thumbnailProgress < 100 && (
              <div className="text-blue-400 text-xs mt-1">
                Uploading: {thumbnailProgress}%
              </div>
            )}
            {thumbnailUrl && (
              <div className="text-green-400 text-xs mt-1">
                Thumbnail uploaded!
              </div>
            )}
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50">
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VideoUploadForm;
