import mongoose, { Schema, Document } from "mongoose";

export interface UserSchema extends Document {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema<UserSchema> = new Schema({
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

const userModel =
  (mongoose.models.User as mongoose.Model<UserSchema>) ||
  mongoose.model<UserSchema>("User", UserSchema);

export default userModel;
