import { CallHandler, ExecutionContext, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AppConfigService } from '@password-manager:api:services/config/app-config.service';
import { ResponseBase } from '@password-manager:types';
import { Request, Response } from 'express';
import { firstValueFrom, of } from 'rxjs';

import { PasswordManagerResponseInterceptor } from './password-manager-response.interceptor';

type TestType = ResponseBase & {
    foo: string;
    bar: number;
};

describe('PasswordManagerResponseInterceptor Tests', () => {
    const mockAppConfigService = AppConfigService.prototype;
    const mockTimestamp = '2023-02-01T17:20:01.700Z';
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockHttpContext = {} as HttpArgumentsHost;
    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {} as CallHandler<TestType>;
    let interceptor: PasswordManagerResponseInterceptor<TestType>;

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockTimestamp);

        mockResponse.getHeader = jest.fn().mockReturnValue('trace-id');
        mockResponse.setHeader = jest.fn().mockReturnThis();
        mockHttpContext.getRequest = jest.fn().mockReturnValue(mockRequest);
        mockHttpContext.getResponse = jest.fn().mockReturnValue(mockResponse);
        mockExecutionContext.switchToHttp = jest.fn().mockReturnValue(mockHttpContext);
        mockCallHandler.handle = jest.fn().mockReturnValue(
            of(<TestType>{
                statusCode: HttpStatus.OK,
                message: 'OK',
                foo: 'foo',
                bar: 123,
            }),
        );

        interceptor = new PasswordManagerResponseInterceptor<TestType>(mockAppConfigService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Intercepts the response and adds metadata to it with the client ID', async () => {
        mockRequest.params = {
            clientId: '123',
        };

        mockAppConfigService.get = jest.fn().mockReturnValue('0.0.1');

        const response = await firstValueFrom(await interceptor.intercept(mockExecutionContext, mockCallHandler));

        expect(mockResponse.getHeader).toBeCalledTimes(1);
        expect(mockResponse.getHeader).toBeCalledWith('x-request-trace-id');

        expect(mockResponse.setHeader).toBeCalledTimes(1);
        expect(mockResponse.setHeader).toHaveBeenCalledWith('x-response-timestamp', mockTimestamp);

        expect(response).toStrictEqual({
            statusCode: HttpStatus.OK,
            message: 'OK',
            clientId: '123',
            foo: 'foo',
            bar: 123,
            metadata: {
                requestTraceId: 'trace-id',
                timestamp: mockTimestamp,
                version: '0.0.1',
            },
        });
    });

    it('Intercepts the response and adds metadata to it with no client ID', async () => {
        mockRequest.params = {};

        mockAppConfigService.get = jest.fn().mockReturnValue('0.0.1');

        const response = await firstValueFrom(await interceptor.intercept(mockExecutionContext, mockCallHandler));

        expect(mockResponse.getHeader).toBeCalledTimes(1);
        expect(mockResponse.getHeader).toBeCalledWith('x-request-trace-id');

        expect(mockResponse.setHeader).toBeCalledTimes(1);
        expect(mockResponse.setHeader).toBeCalledWith('x-response-timestamp', mockTimestamp);

        expect(response).toStrictEqual({
            statusCode: HttpStatus.OK,
            message: 'OK',
            clientId: null,
            foo: 'foo',
            bar: 123,
            metadata: {
                requestTraceId: 'trace-id',
                timestamp: mockTimestamp,
                version: '0.0.1',
            },
        });
    });
});
