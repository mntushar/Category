import mongoose from 'mongoose';
import { Category } from '../../../../domain/entities/Category';
import { CategoryModel } from '../models/CategoryModel';
import { CategorySearchResultInterface } from '../../../../domain/interface/CategorySearchResultInterface';
import { CategoryBaseInterface } from '../../../../domain/interface/CategoryBaseInterface';
import { CategoryInterface } from '../models/interface/CategoryInterface';

export class CategoryRepository implements CategoryBaseInterface {
  private toDomain(doc: CategoryInterface): Category {
    return new Category({
      _id: doc._id?.toString(),
      name: doc.name,
      parentId: doc.parentId ? doc.parentId.toString() : null,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  }

  async create(category: Category): Promise<Category> {
    const created = await CategoryModel.create({
      name: category.name,
      parentId: category.parentId,
      isActive: category.isActive
    });
    return this.toDomain(created);
  }

  async findById(_id: string): Promise<Category | null> {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;
    const doc = await CategoryModel.findById(_id);
    return doc ? this.toDomain(doc) : null;
  }

  async update(_id: string, data: Partial<Pick<Category, 'name' | 'parentId' | 'isActive'>>): Promise<Category | null> {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;
    const doc = await CategoryModel.findByIdAndUpdate(_id, data, { new: true, runValidators: true });
    return doc ? this.toDomain(doc) : null;
  }

  async delete(_id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(_id)) return false;
    const children = await CategoryModel.countDocuments({ parentId: _id });
    if (children > 0) throw new Error('Cannot delete category with child categories');
    const result = await CategoryModel.findByIdAndDelete(_id);
    return Boolean(result);
  }

  async deactivate(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Bad request');
    const data = await this.findByIdWithRelation(id);
    if (!data) throw new Error('Bad request');

    const idsToDeactivate = [
      data._id,
      ...data.children.map((child: any) => child._id)
    ];
    await CategoryModel.updateMany(
      { _id: { $in: idsToDeactivate } },
      { $set: { isActive: false } }
    );

    return true;
  }

  async findByIdWithRelation(_id: string): Promise<CategorySearchResultInterface | null> {
    const result = await CategoryModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(_id)
        }
      },
      {
        $graphLookup: {
          from: CategoryModel.collection.name,
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentId",
          as: "children"
        }
      }
    ]);

    return result[0] || null;
  }

  async searchByName(name: string): Promise<CategorySearchResultInterface[]> {
    const result = await CategoryModel.aggregate([
      {
        $match: {
          name: {
            $regex: name,
            $options: "i"
          }
        }
      },
      {
        $graphLookup: {
          from: CategoryModel.collection.name,
          startWith: "$parentId",
          connectFromField: "parentId",
          connectToField: "_id",
          as: "parents",
          depthField: "level"
        }
      }
    ]);

    return result;
  }
}
