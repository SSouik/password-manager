import { Inject, CallHandler, ExecutionContext, Injectable, NestInterceptor, ClassProvider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services/config/app-config.service';
import { PasswordManagerResponse } from '@password-manager:types';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordManagerResponseInterceptor<T> implements NestInterceptor<T, PasswordManagerResponse> {
    constructor(@Inject(APP_CONFIG_SERVICE) private readonly appConfigService: IAppConfigService<AppConfig>) {}

    public intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<PasswordManagerResponse> | Promise<Observable<PasswordManagerResponse & T>> {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse<Response>();

        const traceId = response.getHeader('x-request-trace-id');
        const version = this.appConfigService.get('version');

        // Add metadata to every response
        return next.handle().pipe(
            map((res: T) => {
                const timestamp = new Date().toISOString();
                response.setHeader('x-response-timestamp', timestamp);

                return <PasswordManagerResponse & T>{
                    statusCode: response.statusCode,
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
