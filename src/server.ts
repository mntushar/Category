import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './utility/config/env';
import { connectMongoDB } from './infrastructure/database/config/DbConnection';
import { cacheGatewayConnection } from './infrastructure/cache/config/DbConnection';

async function bootstrap(): Promise<void> {
    await connectMongoDB(env.mongodbUri);

    try {
        await cacheGatewayConnection.connect();
        console.log('Redis connected');
    } catch (error) {
        console.warn('Redis unavailable. API will continue without cache.');
    }

    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));

    app.listen(env.port, () => {
        console.log(`Server running on http://localhost:${env.port}/health`);
    });
}

bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});
