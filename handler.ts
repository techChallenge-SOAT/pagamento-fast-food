import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import dotenv from 'dotenv';
dotenv.config();
import app from './src/index';

const server = awsServerlessExpress.createServer(app);

export const handler: Handler = async (
    event: APIGatewayProxyEvent,
    context: any // Contexto específico da AWS Lambda que pode ser ignorado diretamente
): Promise<APIGatewayProxyResult> => {
    // Defina opções opcionais conforme necessário para awsServerlessExpress.proxy
    const proxyResult = await awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;

    // Ajuste o retorno para atender ao tipo esperado de APIGatewayProxyResult
    return {
        statusCode: proxyResult.statusCode || 500,
        headers: proxyResult.headers,
        body: proxyResult.body,
    };
};