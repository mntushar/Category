export interface CreateCategoryInput {
  name: string;
  parentId?: string | null;
}

export interface UpdateCategoryInput {
  name?: string;
  parentId?: string | null;
  isActive?: boolean;
}
