import { CallHandler, ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { firstValueFrom, of } from 'rxjs';

import { PasswordManagerResponseInterceptor } from './password-manager-response.interceptor';

type TestType = {
    foo: string;
    bar: number;
};

describe('PasswordManagerResponseInterceptor Tests', () => {
    const mockTimestamp = '2023-02-01T17:20:01.700Z';
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockHttpContext = {} as HttpArgumentsHost;
    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {} as CallHandler<TestType>;
    let interceptor: PasswordManagerResponseInterceptor<TestType>;

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockTimestamp);

        mockRequest.header = jest.fn().mockReturnValue('trace-id');
        mockResponse.setHeader = jest.fn().mockReturnThis();
        mockHttpContext.getRequest = jest.fn().mockReturnValue(mockRequest);
        mockHttpContext.getResponse = jest.fn().mockReturnValue(mockResponse);
        mockExecutionContext.switchToHttp = jest.fn().mockReturnValue(mockHttpContext);
        mockCallHandler.handle = jest.fn().mockReturnValue(
            of(<TestType>{
                foo: 'foo',
                bar: 123,
            }),
        );

        interceptor = new PasswordManagerResponseInterceptor<TestType>();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Intercepts the response and adds metadata to it with the client ID', async () => {
        mockRequest.params = {
            clientId: '123',
        };

        const response = await firstValueFrom(await interceptor.intercept(mockExecutionContext, mockCallHandler));

        expect(mockResponse.setHeader).toBeCalledTimes(3);
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(1, 'x-request-trace-id', 'trace-id');
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(2, 'x-response-timestamp', mockTimestamp);
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(3, 'x-password-manager-version', '0.0.1');

        expect(response).toStrictEqual({
            clientId: '123',
            metadata: {
                requestTraceId: 'trace-id',
                timestamp: mockTimestamp,
                version: '0.0.1',
            },
            foo: 'foo',
            bar: 123,
        });
    });

    it('Intercepts the response and adds metadata to it with no client ID', async () => {
        mockRequest.params = {};

        const response = await firstValueFrom(await interceptor.intercept(mockExecutionContext, mockCallHandler));

        expect(mockResponse.setHeader).toBeCalledTimes(3);
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(1, 'x-request-trace-id', 'trace-id');
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(2, 'x-response-timestamp', mockTimestamp);
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(3, 'x-password-manager-version', '0.0.1');

        expect(response).toStrictEqual({
            clientId: null,
            metadata: {
                requestTraceId: 'trace-id',
                timestamp: mockTimestamp,
                version: '0.0.1',
            },
            foo: 'foo',
            bar: 123,
        });
    });
});
