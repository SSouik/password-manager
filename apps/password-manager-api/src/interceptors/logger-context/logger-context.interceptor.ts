/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Inject, NestInterceptor, CallHandler, ExecutionContext, ClassProvider, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { LOG_MESSAGE_FACTORY } from '@password-manager:api:providers';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { ILogMessageFactory, LogPropertyEnum } from '@password-manager:logger';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerContextInterceptor implements NestInterceptor {
    constructor(
        @Inject(APP_CONFIG_SERVICE)
        private readonly appConfigService: IAppConfigService<AppConfig>,
        @Inject(LOG_MESSAGE_FACTORY)
        private readonly logMessageFactory: ILogMessageFactory,
    ) {}

    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>();

        const clientId = request.params.clientId ?? null;
        const traceId = request.header('x-request-trace-id');
        const userAgent = request.header('user-agent');

        const appContext = {
            version: this.appConfigService.get('version'),
        };

        // Add the IP address, User agent, and trace ID to each of the logs produced
        // from one request
        this.logMessageFactory
            .setProperty(LogPropertyEnum.UserIP, request.ip)
            .setProperty(LogPropertyEnum.UserAgent, userAgent)
            .setProperty(LogPropertyEnum.TraceID, traceId)
            .setContext('clientId', clientId)
            .setContext('app', appContext);

        return next.handle();
    }
}

export default <ClassProvider>{
    provide: APP_INTERCEPTOR,
    useClass: LoggerContextInterceptor,
    scope: Scope.REQUEST,
};
