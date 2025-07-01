import mongoose, { Schema ,model,models} from "mongoose";

export const VideoDimension = {
    width: 1080,
    height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  control:boolean;
  transformation?:{
    height: number;
    width: number;
    quality?: number;
  },
  createdAt?: Date;
  updatedAt?: Date
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    control: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VideoDimension.height },
      width: { type: Number, default: VideoDimension.width },
      quality: { type: Number, min: 1, max: 100}, // Default quality
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);


const Video = models?.Video || model<IVideo>("Video", VideoSchema);

export default Video;
