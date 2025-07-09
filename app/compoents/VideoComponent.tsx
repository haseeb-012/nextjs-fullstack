"use client";
import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";


export default function VideoComponent({ video }: { video: IVideo }) {

  console.log("Endpoint:", process.env.NEXT_PUBLIC_URI_ENDPOINT);
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}>
            <IKVideo
              path={video.videoUrl}
              poster={video.thumbnailUrl} // 👈 Thumbnail image here
              autoPlay={true}
              muted
              loop
              urlEndpoint={process.env.NEXT_PUBLIC_URI_ENDPOINT}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.control}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity">
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
