import { createClient, RedisClientType } from 'redis';
import { CacheGatewayInterface } from '../../application/services/interface/CacheGatewayInterface';

export class RedisCacheGateway implements CacheGatewayInterface {
  private client: RedisClientType;
  private isReady = false;

  constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl });
    this.client.on('error', (error) => console.error('Redis error:', error.message));
  }

  async connect(): Promise<void> {
    if (!this.isReady) {
      await this.client.connect();
      this.isReady = true;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isReady) return null;
    const value = await this.client.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async set<T>(key: string, value: T, ttlSeconds = 300): Promise<void> {
    if (!this.isReady) return;
    await this.client.set(key, JSON.stringify(value), { EX: ttlSeconds });
  }

  async deleteByPattern(pattern: string): Promise<void> {
    if (!this.isReady) return;
    const keys = await this.client.keys(pattern);
    if (keys.length) await this.client.del(keys);
  }
}
