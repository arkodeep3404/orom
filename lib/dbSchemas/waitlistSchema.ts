import mongoose, { Schema, Document } from "mongoose";

export interface SocialUrlsType {
  FacebookUrl: string;
  InstagramUrl: string;
  XUrl: string;
  YouTubeUrl: string;
  LinkedInUrl: string;
  GitHubUrl: string;
  DiscordUrl: string;
}

export interface WaitlistSchema extends Document {
  userId: mongoose.Types.ObjectId;
  waitlistName: string;
  waitlistTitle: string;
  waitlistDescription: string;
  socialUrls: SocialUrlsType;
  waitlistEmails: string[];
}

export const SocialUrlsTypeSchema: Schema<SocialUrlsType> = new Schema({
  FacebookUrl: {
    type: String,
    required: false,
    default: "",
  },
  InstagramUrl: {
    type: String,
    required: false,
    default: "",
  },
  XUrl: { type: String, required: false, default: "" },
  YouTubeUrl: {
    type: String,
    required: false,
    default: "",
  },
  LinkedInUrl: {
    type: String,
    required: false,
    default: "",
  },
  GitHubUrl: {
    type: String,
    required: false,
    default: "",
  },
  DiscordUrl: {
    type: String,
    required: false,
    default: "",
  },
});

const WaitlistSchema: Schema<WaitlistSchema> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "UserId is required"],
  },
  waitlistName: {
    type: String,
    required: [true, "Name is required"],
  },
  waitlistTitle: {
    type: String,
    required: false,
    default: "",
  },
  waitlistDescription: {
    type: String,
    required: false,
    default: "",
  },
  socialUrls: {
    type: SocialUrlsTypeSchema,
    required: false,
    default: {},
  },
  waitlistEmails: {
    type: [String],
    required: false,
    default: [],
  },
});

const waitlistModel =
  (mongoose.models.Waitlist as mongoose.Model<WaitlistSchema>) ||
  mongoose.model<WaitlistSchema>("Waitlist", WaitlistSchema);

export default waitlistModel;
