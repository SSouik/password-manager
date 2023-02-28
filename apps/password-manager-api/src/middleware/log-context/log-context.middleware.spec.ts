/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfigService } from '@password-manager:api:services/config/app-config.service';
import { LogMessageFactory, LogPropertyEnum } from '@password-manager:logger';
import { Request, Response } from 'express';

import { LogContextMiddleware } from './log-context.middleware';

jest.mock('uuid', () => ({ v4: () => 'trace-id' }));

describe('LogContextMiddleware Tests', () => {
    const mockAppConfigService = AppConfigService.prototype;
    const mockLogMessageFactory = LogMessageFactory.prototype;
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    let mockNextHandler: (error?: any) => void;
    let middleware: LogContextMiddleware;

    beforeEach(() => {
        mockAppConfigService.get = jest.fn().mockReturnValue('0.0.1');
        mockLogMessageFactory.setProperty = jest.fn().mockReturnThis();
        mockLogMessageFactory.setContext = jest.fn().mockReturnThis();

        mockResponse.setHeader = jest.fn().mockReturnThis();
        mockNextHandler = jest.fn();

        middleware = new LogContextMiddleware(mockAppConfigService, mockLogMessageFactory);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Creates a trace ID and gathers other information to attach to response headers and log messages', () => {
        mockRequest.ip = 'ip';
        mockRequest.baseUrl = '/api/v1/foo';
        mockRequest.method = 'GET';
        mockRequest.headers = {
            'user-agent': 'user-agent',
        };

        middleware.use(mockRequest, mockResponse, mockNextHandler);

        expect(mockAppConfigService.get).toBeCalledTimes(1);
        expect(mockAppConfigService.get).toBeCalledWith('version');

        expect(mockLogMessageFactory.setProperty).toBeCalledTimes(3);
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(1, LogPropertyEnum.TraceID, 'trace-id');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(2, LogPropertyEnum.UserAgent, 'user-agent');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(3, LogPropertyEnum.UserIP, 'ip');

        expect(mockLogMessageFactory.setContext).toBeCalledTimes(2);
        expect(mockLogMessageFactory.setContext).toHaveBeenNthCalledWith(1, 'app', { version: '0.0.1' });
        expect(mockLogMessageFactory.setContext).toHaveBeenNthCalledWith(2, 'route', {
            url: '/api/v1/foo',
            method: 'GET',
        });

        expect(mockResponse.setHeader).toBeCalledTimes(2);
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(1, 'x-request-trace-id', 'trace-id');
        expect(mockResponse.setHeader).toHaveBeenNthCalledWith(2, 'x-password-manager-version', '0.0.1');

        expect(mockNextHandler).toBeCalledTimes(1);
    });
});
