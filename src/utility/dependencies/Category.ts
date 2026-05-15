import { CategoryService } from "../../application/services/CategoryService";
import { cacheGatewayConnection } from "../../infrastructure/cache/config/DbConnection";
import { CategoryRepository } from "../../infrastructure/database/mongoose/repositories/CategoryRepository";

  export const categoryRepositoryDependency = new CategoryRepository();
  export const categoryServiceDependency = new CategoryService(
    categoryRepositoryDependency, cacheGatewayConnection);