/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware<Request, Response> {
    public use(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: (error?: any) => void,
    ) {
        // Generating a new UUID and adding it to the request headers.
        // This will be accessible throughout the api
        const traceId = uuid();

        req.headers['x-request-trace-id'] = traceId;

        return next();
    }
}
