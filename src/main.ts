import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';
let server: Handler;

async function createServer(): Promise<Handler> {
    const app = await NestFactory.create(AppModule);
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();

    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback
) => {
    server = server ?? await createServer();
    return server(event, context, callback);
}
