import { HttpStatus } from '@nestjs/common';
import { ArgumentsHost, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { PasswordManagerException } from '@password-manager:api:types';
import { Request, Response } from 'express';

import { PasswordManagerFilter } from './password-manager.filter';

type TestType = {
    foo: string;
    bar: number;
};

describe('PasswordManagerFilter Tests', () => {
    const mockTimestamp = '2023-02-01T17:20:01.700Z';
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockHttpContext = {} as HttpArgumentsHost;
    const mockArgumentsHost = {} as ArgumentsHost;
    let filter: PasswordManagerFilter<TestType>;

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockTimestamp);

        mockResponse.getHeader = jest
            .fn()
            .mockReturnValueOnce('trace-id')
            .mockReturnValueOnce('0.0.1');
        mockResponse.setHeader = jest.fn().mockReturnThis();
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn().mockReturnThis();
        mockArgumentsHost.switchToHttp = jest.fn().mockReturnValue(mockHttpContext);
        mockHttpContext.getRequest = jest.fn().mockReturnValue(mockRequest);
        mockHttpContext.getResponse = jest.fn().mockReturnValue(mockResponse);

        filter = new PasswordManagerFilter<TestType>();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Catches a PasswordManagerException and converts it into a PasswordManagerResponse', () => {
        mockRequest.params = {
            clientId: '123',
        };

        filter.catch(
            PasswordManagerException.notFound<TestType>().withContext({ foo: 'bar', bar: 123 }),
            mockArgumentsHost,
        );

        expect(mockResponse.getHeader).toBeCalledTimes(2);
        expect(mockResponse.getHeader).toHaveBeenNthCalledWith(1, 'x-request-trace-id');
        expect(mockResponse.getHeader).toHaveBeenNthCalledWith(2, 'x-password-manager-version');

        expect(mockResponse.setHeader).toBeCalledTimes(1);
        expect(mockResponse.setHeader).toBeCalledWith('x-response-timestamp', mockTimestamp);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);

        expect(mockResponse.json).toBeCalledTimes(1);
        expect(mockResponse.json).toBeCalledWith({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Not Found',
            context: {
                foo: 'bar',
                bar: 123,
            },
            clientId: '123',
            metadata: {
                requestTraceId: 'trace-id',
                timestamp: mockTimestamp,
                version: '0.0.1',
            },
        });
    });

    it('Catches a PasswordManagerException and converts it into a PasswordManagerResponse with no client ID', () => {
        mockRequest.params = {};

        filter.catch(
            PasswordManagerException.notFound<TestType>().withContext({ foo: 'bar', bar: 123 }),
            mockArgumentsHost,
        );

        expect(mockResponse.getHeader).toBeCalledTimes(2);
        expect(mockResponse.getHeader).toHaveBeenNthCalledWith(1, 'x-request-trace-id');
        expect(mockResponse.getHeader).toHaveBeenNthCalledWith(2, 'x-password-manager-version');

        expect(mockResponse.setHeader).toBeCalledTimes(1);
        expect(mockResponse.setHeader).toBeCalledWith('x-response-timestamp', mockTimestamp);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);

        expect(mockResponse.json).toBeCalledTimes(1);
        expect(mockResponse.json).toBeCalledWith({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Not Found',
            context: {
                foo: 'bar',
                bar: 123,
            },
            clientId: null,
            metadata: {
                requestTraceId: 'trace-id',
                timestamp: mockTimestamp,
                version: '0.0.1',
            },
        });
    });
});
