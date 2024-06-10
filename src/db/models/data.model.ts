import { Schema, model, Document, Types } from "mongoose";

export interface Data extends Document {
  data: number;
  userJWT?: Types.ObjectId;
  userGoogle?: Types.ObjectId;
}

const DataSchema = new Schema(
  {
    data: { type: Number, required: true },
    userJWT: {
      type: Types.ObjectId,
      ref: "Client",
    },
    userGoogle: {
      type: Types.ObjectId,
      ref: "UserGoole",
    },
  },
  {
    timestamps: true,
  }
);

export const DataModel = model<Data>("Data", DataSchema);
