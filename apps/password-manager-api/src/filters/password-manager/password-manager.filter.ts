import { ArgumentsHost, Catch, ClassProvider, ExceptionFilter, Inject } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfig } from '@password-manager:api:config';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services/config/app-config.service';
import { IAppConfigService, PasswordManagerException } from '@password-manager:api:types';
import { PasswordManagerErrorResponse } from '@password-manager:types';
import { Response } from 'express';

@Catch(PasswordManagerException)
export class PasswordManagerFilter implements ExceptionFilter<PasswordManagerException> {
    constructor(@Inject(APP_CONFIG_SERVICE) private readonly appConfigService: IAppConfigService<AppConfig>) {}

    public catch(exception: PasswordManagerException, host: ArgumentsHost) {
        const httpContext = host.switchToHttp();
        const response = httpContext.getResponse<Response>();

        const timestamp = new Date().toISOString();
        const traceId = response.getHeader('x-request-trace-id');
        const version = this.appConfigService.get('version');

        response.setHeader('x-response-timestamp', timestamp);

        const result = <PasswordManagerErrorResponse>{
            statusCode: exception.statusCode,
            error: {
                code: exception.errorCode,
                details: exception.message,
            },
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
