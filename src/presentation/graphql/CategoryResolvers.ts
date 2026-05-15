import { CategoryService } from "../../application/services/CategoryService";

export function createCategoryResolvers(categoryService: CategoryService) {
  return {
    Query: {
      category: async (_: unknown, { _id }: { _id: string }) => {
        try {
          return await categoryService.getCategory(_id);
        } catch (error) {
          throw error;
        }
      },
      searchCategories: async (_: unknown, { name }: { name: string }) => {
        try {
          return await categoryService.searchCategories(name);
        } catch (error) {
          throw error;
        }
      }
    },

    Mutation: {
      createCategory: async (
        _: unknown,
        {
          input
        }: {
          input: {
            name: string;
            parentId?: string | null;
          };
        }
      ) => {
        try {
          return await categoryService.createCategory(input);
        } catch (error) {
          throw error;
        }
      },
      updateCategory: async (
        _: unknown,
        {
          _id,
          input
        }: {
          _id: string;
          input: {
            name?: string;
            parentId?: string | null;
            isActive?: boolean;
          };
        }
      ) => {
        try {
          return await categoryService.updateCategory(_id, input);
        } catch (error) {
          throw error;
        }
      },
      deactivateCategory: async (
        _: unknown,
        { _id }: { _id: string }
      ) => {
        try {
          return await categoryService.deactivate(_id);
        } catch (error) {
          throw error;
        }
      },
      deleteCategory: async (
        _: unknown,
        { _id }: { _id: string }
      ) => {
        try {
          return await categoryService.deleteCategory(_id);
        } catch (error) {
          throw error;
        }
      }
    }
  };
}
