import { env } from "../../../utility/config/env";
import { RedisCacheGateway } from "../RedisCacheGateway";

export const cacheGatewayConnection = new RedisCacheGateway(env.redisUrl);