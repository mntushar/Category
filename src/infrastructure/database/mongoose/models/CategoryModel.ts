import mongoose, { Document, Schema } from 'mongoose';
import { CategoryInterface } from './interface/CategoryInterface';

const CategorySchema = new Schema<CategoryInterface>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model<CategoryInterface>('Category', CategorySchema);
