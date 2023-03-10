import { Inject, CallHandler, ExecutionContext, Injectable, NestInterceptor, ClassProvider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services/config/app-config.service';
import { PasswordManagerResponse, ResponseBase } from '@password-manager:types';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordManagerResponseInterceptor<T extends ResponseBase>
    implements NestInterceptor<T, PasswordManagerResponse>
{
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
        const traceId = response.getHeader('x-request-trace-id');
        const version = this.appConfigService.get('version');

        // Add metadata to every response
        return next.handle().pipe(
            map((res: T) => {
                const timestamp = new Date().toISOString();
                response.setHeader('x-response-timestamp', timestamp);

                return <PasswordManagerResponse>{
                    statusCode: res.statusCode,
                    message: res.message,
                    clientId: clientId,
                    ...res,
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

// This is a global interceptor
export default <ClassProvider>{
    provide: APP_INTERCEPTOR,
    useClass: PasswordManagerResponseInterceptor,
};
