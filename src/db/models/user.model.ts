import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, requerid: true, trim: true },
    password: { type: String, requerid: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>('Client', UserSchema);
