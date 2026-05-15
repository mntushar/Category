import { CategoryPropsInterface } from "./interface/CategoryPropsInterface";

export class Category {
  public readonly _id?: string;
  public readonly name: string;
  public readonly parentId: string | null;
  public readonly isActive: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: CategoryPropsInterface) {
    if (!props.name || !props.name.trim()) {
      throw new Error('Category name is required');
    }

    this._id = props._id;
    this.name = props.name.trim();
    this.parentId = props.parentId ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
