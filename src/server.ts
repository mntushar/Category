import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './utility/config/env';
import { connectMongoDB } from './infrastructure/database/config/DbConnection';
import { cacheGatewayConnection } from './infrastructure/cache/config/DbConnection';
import { ApolloServer, BaseContext } from '@apollo/server';
import { typeDefs } from './utility/dependencies/TypeDefs';
import { resolvers } from './utility/dependencies/Resolvers';
import { expressMiddleware } from '@apollo/server/express4';

async function bootstrap(): Promise<void> {
    await connectMongoDB(env.mongodbUri);

    try {
        await cacheGatewayConnection.connect();
        console.log('Redis connected');
    } catch (error) {
        console.warn('Redis unavailable. API will continue without cache.');
    }

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apolloServer.start();

    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));
    app.use('/graphql', expressMiddleware(apolloServer));

    app.listen(env.port, () => {
        console.log(`Server running on http://localhost:${env.port}/graphql`);
    });
}

bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});

