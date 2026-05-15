import { Category } from '../../domain/entities/Category';
import { CategorySearchResultInterface } from '../../domain/interface/CategorySearchResultInterface';
import { CategoryRepository } from '../../infrastructure/database/mongoose/repositories/CategoryRepository';
import { CreateCategoryInput, UpdateCategoryInput } from '../dtos/CategoryDTO';
import { CacheGatewayInterface } from './interface/CacheGatewayInterface';

export class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly cache: CacheGatewayInterface
    ) { }

    async createCategory(input: CreateCategoryInput): Promise<Category> {
        if (input.parentId) {
            const parent = await this.categoryRepository.findById(input.parentId);
            if (!parent) throw new Error('Parent category not found');
            if (!parent.isActive) throw new Error('Cannot create child under inactive parent');
        }

        const category = await this.categoryRepository.create(new Category(input));
        await this.invalidateCache();
        return category;
    }

    async getCategory(_id: string): Promise<Category | null> {
        const cacheKey = `category:${_id}`;
        const cached = await this.cache.get<Category>(cacheKey);
        if (cached) return cached;

        const category = await this.categoryRepository.findById(_id);
        if (category) await this.cache.set(cacheKey, category, 300);
        return category;
    }

    async updateCategory(_id: string, input: UpdateCategoryInput): Promise<Category | null> {
        if (input.parentId) {
            if (input.parentId === _id) throw new Error('Category cannot be its own parent');
            const parent = await this.categoryRepository.findById(input.parentId);
            if (!parent) throw new Error('Parent category not found');
        }

        const updated = await this.categoryRepository.update(_id, input);
        await this.invalidateCache();
        return updated;
    }

    async searchCategories(name: string): Promise<CategorySearchResultInterface[]> {
        const cacheKey = `categories:search:${name.toLowerCase()}`;
        const cached = await this.cache.get<CategorySearchResultInterface[]>(cacheKey);
        if (cached) return cached;

        const result = await this.categoryRepository.searchByName(name);
        await this.cache.set(cacheKey, result, 300);
        return result;
    }

    async deactivate(_id: string): Promise<boolean> {
        const result = await this.categoryRepository.deactivate(_id);
        await this.invalidateCache();
        return result;
    }

    async deleteCategory(_id: string): Promise<boolean> {
        const deleted = await this.categoryRepository.delete(_id);
        await this.invalidateCache();
        return deleted;
    }

    private async invalidateCache(): Promise<void> {
        await this.cache.deleteByPattern('category*');
        await this.cache.deleteByPattern('categories*');
    }
}
