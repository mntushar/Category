export interface CacheGatewayInterface {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
    deleteByPattern(pattern: string): Promise<void>;
}