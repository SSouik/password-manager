/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { LOG_MESSAGE_FACTORY } from '@password-manager:api:providers';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { ILogMessageFactory, LogPropertyEnum } from '@password-manager:logger';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware<Request, Response> {
    constructor(
        @Inject(APP_CONFIG_SERVICE)
        private readonly appConfigService: IAppConfigService<AppConfig>,
        @Inject(LOG_MESSAGE_FACTORY)
        private readonly logMessageFactory: ILogMessageFactory,
    ) {}

    public use(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: (error?: any) => void,
    ) {
        const clientId = req.params.clientId ?? null;
        const traceId = req.header('x-request-trace-id');
        const userAgent = req.header('user-agent');

        const appContext = {
            version: this.appConfigService.get('version'),
        };

        // Add the IP address, User agent, and trace ID to each of the logs produced
        // from one request
        this.logMessageFactory
            .setProperty(LogPropertyEnum.UserIP, req.ip)
            .setProperty(LogPropertyEnum.UserAgent, userAgent)
            .setProperty(LogPropertyEnum.TraceID, traceId)
            .setContext('clientId', clientId)
            .setContext('app', appContext);

        return next();
    }
}
