/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogMessageFactory, LogPropertyEnum } from '@password-manager:logger';
import { Request, Response } from 'express';

import { LoggerContextMiddleware } from './logger-context.middleware';

describe('LoggerContextMiddleware Tests', () => {
    const mockLogMessageFactory = LogMessageFactory.prototype;
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    let mockNextHandler: (error?: any) => void;
    let middleware: LoggerContextMiddleware;

    beforeEach(() => {
        mockLogMessageFactory.setProperty = jest.fn().mockReturnThis();
        mockLogMessageFactory.setContext = jest.fn().mockReturnThis();

        mockRequest.ip = 'ip';
        mockRequest.header = jest.fn().mockReturnValueOnce('trace-id').mockReturnValueOnce('user-agent');
        mockNextHandler = jest.fn();

        middleware = new LoggerContextMiddleware(mockLogMessageFactory);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Adds the trace ID, user agent, and environment to log message factory', () => {
        mockRequest.params = {
            clientId: '123',
        };

        middleware.use(mockRequest, mockResponse, mockNextHandler);

        expect(mockLogMessageFactory.setProperty).toBeCalledTimes(3);
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(1, LogPropertyEnum.UserIP, 'ip');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(2, LogPropertyEnum.UserAgent, 'user-agent');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(3, LogPropertyEnum.TraceID, 'trace-id');

        expect(mockLogMessageFactory.setContext).toBeCalledTimes(1);
        expect(mockLogMessageFactory.setContext).toBeCalledWith('clientId', '123');

        expect(mockNextHandler).toBeCalledTimes(1);
    });
});
