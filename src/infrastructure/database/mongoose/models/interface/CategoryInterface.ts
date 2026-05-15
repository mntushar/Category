import mongoose from "mongoose";

export interface CategoryInterface extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  parentId?: mongoose.Types.ObjectId | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}