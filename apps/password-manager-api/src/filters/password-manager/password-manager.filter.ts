import { ArgumentsHost, Catch, ClassProvider, ExceptionFilter } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PasswordManagerException } from '@password-manager:api:types';
import { PasswordManagerResponse } from '@password-manager:types';
import { Request, Response } from 'express';

@Catch(PasswordManagerException)
export class PasswordManagerFilter<T> implements ExceptionFilter<PasswordManagerException<T>> {
    public catch(exception: PasswordManagerException<T>, host: ArgumentsHost) {
        const httpContext = host.switchToHttp();
        const request = httpContext.getRequest<Request>();
        const response = httpContext.getResponse<Response>();

        // This is assuming that the client ID is available in every route
        const clientId = request.params.clientId ?? null;
        const timestamp = new Date().toISOString();
        const traceId = response.getHeader('x-request-trace-id');
        const version = response.getHeader('x-password-manager-version');

        response.setHeader('x-response-timestamp', timestamp);

        const result = <PasswordManagerResponse>{
            statusCode: exception.statusCode,
            message: exception.message,
            clientId: clientId,
            context: exception.context,
            metadata: {
                requestTraceId: traceId,
                timestamp: timestamp,
                version: version,
            },
        };

        response.status(exception.statusCode).json(result);
    }
}

export default <ClassProvider>{
    provide: APP_FILTER,
    useClass: PasswordManagerFilter,
};
