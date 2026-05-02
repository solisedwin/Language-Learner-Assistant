import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  username: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
