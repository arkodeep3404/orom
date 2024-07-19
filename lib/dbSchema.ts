import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

export interface PopupDetailsType extends Document {
  title: string;
  description: string;
  duration: number;
  start: number;
}

export interface Popup extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  popupName: string;
  popupDetails: PopupDetailsType[];
}

export const PopupDetailsTypeSchema: Schema<PopupDetailsType> =
  new mongoose.Schema({
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    duration: { type: Number, required: [true, "Duration is required"] },
    start: { type: Number, required: [true, "Start is required"] },
  });

const UserSchema: Schema<User> = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  token: {
    type: String,
    required: [true, "Token is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const PopupSchema: Schema<Popup> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "UserId is required"],
  },
  popupName: {
    type: String,
    required: [true, "Popup name is required"],
  },
  popupDetails: {
    type: [PopupDetailsTypeSchema],
    required: [true, "Detail is required"],
  },
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

const popupModel =
  (mongoose.models.Popup as mongoose.Model<Popup>) ||
  mongoose.model<Popup>("Popup", PopupSchema);

export { userModel, popupModel };
