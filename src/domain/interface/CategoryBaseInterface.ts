import { Category } from "../entities/Category";
import { CategorySearchResultInterface } from "./CategorySearchResultInterface";

export interface CategoryBaseInterface {
  create(category: Category): Promise<Category>;
  findById(_id: string): Promise<Category | null>;
  update(_id: string, data: Partial<Pick<Category, 'name' | 'parentId' | 'isActive'>>): Promise<Category | null>;
  deactivate(_id: string): Promise<boolean>;
  searchByName(name: string): Promise<CategorySearchResultInterface[]>;
  delete(_id: string): Promise<boolean>;
}