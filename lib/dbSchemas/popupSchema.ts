import mongoose, { Schema, Document } from "mongoose";

export interface PopupDetailsType {
  _id: mongoose.Types.ObjectId;
  popupTitle: string;
  popupDescription: string;
  popupDuration: number;
  popupStart: number;
}

export interface PopupSchema extends Document {
  userId: mongoose.Types.ObjectId;
  popupName: string;
  popupDetails: PopupDetailsType[];
}

export const PopupDetailsTypeSchema: Schema<PopupDetailsType> = new Schema({
  _id: { type: Schema.Types.ObjectId, required: [true, "_id is required"] },
  popupTitle: { type: String, required: [true, "Title is required"] },
  popupDescription: {
    type: String,
    required: [true, "Description is required"],
  },
  popupDuration: { type: Number, required: [true, "Duration is required"] },
  popupStart: { type: Number, required: [true, "Start is required"] },
});

const PopupSchema: Schema<PopupSchema> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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

const popupModel =
  (mongoose.models.Popup as mongoose.Model<PopupSchema>) ||
  mongoose.model<PopupSchema>("Popup", PopupSchema);

export default popupModel;
