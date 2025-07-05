import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { create } from "domain";
import { getServerSession } from "next-auth";
import { transform } from "next/dist/build/swc/generated-native";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json({ message: "No videos found" }, { status: 404 });
    }

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await dbConnect();
    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const videodata = {
      ...body,
      control: body?.control ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body?.transformation?.quality ?? 100, // Default quality
      },
    };

    const newvideo = await Video.create(videodata);
    return NextResponse.json(newvideo, { status: 201 }); 
  } catch (error) {
    console.error("Error in POST /api/video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
