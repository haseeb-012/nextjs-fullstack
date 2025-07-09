"use client";
import React from "react";
import Image from "next/image";
import Header from "./compoents/Header";
import VideoUploadForm from "./compoents/VideoUploadForm";
import VideoFeed from "./compoents/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { IVideo } from '@/models/Video';
export default  function Home() {
 
  const [alldata, setAlldata] = React.useState<IVideo[]>([]);
  const data = async () => {
    try {
      const res = await fetch("/api/video");
      const videos = await res.json();
      setAlldata(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  React.useEffect(() => {
    data();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Header */}
      <Header />

    
     

      {/* Main content */}
      <main className="flex flex-col items-center w-full max-w-2xl flex-1 mt-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Welcome to Your Video Platform
        </h1>
      

        {/* Video Feed */}
        <div className="w-full mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">
            Latest Videos
          </h2>
          <VideoFeed videos={alldata } />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mt-10 flex flex-col items-center gap-2 text-gray-500 pb-6">
        
        <span className="text-xs mt-2">
          © {new Date().getFullYear()} Your Video Platform
        </span>
      </footer>
    </div>
  );
}
