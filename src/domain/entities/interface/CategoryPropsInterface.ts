export interface CategoryPropsInterface {
  _id?: string;
  name: string;
  parentId?: string | null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}