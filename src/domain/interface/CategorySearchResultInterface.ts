import { Category } from "../entities/Category";

export interface CategorySearchResultInterface extends Category {
  parents: Category[];
  children: Category[];
}