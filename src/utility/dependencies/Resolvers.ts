import { createCategoryResolvers } from "../../presentation/graphql/CategoryResolvers";
import { categoryServiceDependency } from "./Category";

export const resolvers = [
  createCategoryResolvers(categoryServiceDependency),
];