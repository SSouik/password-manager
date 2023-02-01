import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { PasswordManagerResponse } from '@password-manager:types';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordManagerResponseInterceptor<T> implements NestInterceptor<T, PasswordManagerResponse> {
    public intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<PasswordManagerResponse> | Promise<Observable<PasswordManagerResponse>> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();
        const response = httpContext.getResponse<Response>();

        const traceId = request.header('x-request-trace-id');
        const timestamp = new Date().toISOString();
        const version = '0.0.1'; // update to use config

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
                    clientId: 'id', // update to use client id found in the route or auth token when that is available
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
