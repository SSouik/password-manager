import { Inject, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { PasswordManagerResponse } from '@password-manager:types';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordManagerResponseInterceptor<T> implements NestInterceptor<T, PasswordManagerResponse> {
    constructor(@Inject(APP_CONFIG_SERVICE) private readonly appConfigService: IAppConfigService<AppConfig>) {}

    public intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<PasswordManagerResponse> | Promise<Observable<PasswordManagerResponse>> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();
        const response = httpContext.getResponse<Response>();

        // This is assuming that the client ID is available in every route
        const clientId = request.params.clientId ?? null;
        const traceId = request.header('x-request-trace-id');
        const timestamp = new Date().toISOString();
        const version = this.appConfigService.get('version');

        // Set response headers for each request
        response
            .setHeader('x-request-trace-id', traceId)
            .setHeader('x-response-timestamp', timestamp)
            .setHeader('x-password-manager-version', version);

        // Add metadata to every response
        return next.handle().pipe(
            map((res: T) => {
                return <PasswordManagerResponse>{
                    ...res,
                    clientId: clientId,
                    metadata: {
                        requestTraceId: traceId,
                        timestamp: timestamp,
                        version: version,
                    },
                };
            }),
        );
    }
}
