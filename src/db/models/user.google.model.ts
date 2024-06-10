import { Schema, model, Document } from "mongoose";

export interface IUserGoogle extends Document {
  id: string;
  email: string;
  displayName: string;
}

const UserGoogleSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    displayName: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const UserGoogleModel = model<IUserGoogle>(
  "UserGoogle",
  UserGoogleSchema
);
