import { ArgumentsHost, Catch, ClassProvider, ExceptionFilter, Inject } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfig } from '@password-manager:api:config';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services/config/app-config.service';
import { IAppConfigService, PasswordManagerException } from '@password-manager:api:types';
import { PasswordManagerResponse } from '@password-manager:types';
import { Request, Response } from 'express';

@Catch(PasswordManagerException)
export class PasswordManagerFilter<T> implements ExceptionFilter<PasswordManagerException<T>> {
    constructor(@Inject(APP_CONFIG_SERVICE) private readonly appConfigService: IAppConfigService<AppConfig>) {}

    public catch(exception: PasswordManagerException<T>, host: ArgumentsHost) {
        const httpContext = host.switchToHttp();
        const request = httpContext.getRequest<Request>();
        const response = httpContext.getResponse<Response>();

        // This is assuming that the client ID is available in every route
        const clientId = request.params.clientId ?? null;
        const timestamp = new Date().toISOString();
        const traceId = request.header('x-request-trace-id');
        const version = this.appConfigService.get('version');

        response
            .setHeader('x-request-trace-id', traceId)
            .setHeader('x-response-timestamp', timestamp)
            .setHeader('x-password-manager-version', version);

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
