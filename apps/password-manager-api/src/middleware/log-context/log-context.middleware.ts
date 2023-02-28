/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, NestMiddleware } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { LOG_MESSAGE_FACTORY } from '@password-manager:api:providers';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services/config/app-config.service';
import { ILogMessageFactory, LogPropertyEnum } from '@password-manager:logger';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { v4 as uuid } from 'uuid';

export class LogContextMiddleware implements NestMiddleware<Request, Response> {
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
        const traceId = uuid();
        const ipAddress = req.ip;
        const url = req.baseUrl;
        const method = req.method;
        const userAgent = req.headers['user-agent'];
        const version = this.appConfigService.get('version');

        // Add response headers
        res.setHeader('x-request-trace-id', traceId).setHeader('x-password-manager-version', version);

        // Add properties to each log message
        this.logMessageFactory
            .setProperty(LogPropertyEnum.TraceID, traceId)
            .setProperty(LogPropertyEnum.UserAgent, userAgent)
            .setProperty(LogPropertyEnum.UserIP, ipAddress)
            .setContext('app', { version: version })
            .setContext('route', { url: url, method: method });

        return next();
    }
}
