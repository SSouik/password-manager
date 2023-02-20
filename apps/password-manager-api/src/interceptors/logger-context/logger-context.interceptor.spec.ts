/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AppConfigService } from '@password-manager:api:services/config/app-config.service';
import { LogMessageFactory, LogPropertyEnum } from '@password-manager:logger';
import { Request, Response } from 'express';

import { LoggerContextInterceptor } from './logger-context.interceptor';

describe('LoggerContextInterceptor Tests', () => {
    const mockAppConfigService = AppConfigService.prototype;
    const mockLogMessageFactory = LogMessageFactory.prototype;
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockHttpContext = {} as HttpArgumentsHost;
    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {} as CallHandler;
    let interceptor: LoggerContextInterceptor;

    beforeEach(() => {
        mockAppConfigService.get = jest.fn().mockReturnValue('0.0.1');

        mockLogMessageFactory.setProperty = jest.fn().mockReturnThis();
        mockLogMessageFactory.setContext = jest.fn().mockReturnThis();

        mockRequest.ip = 'ip';
        mockRequest.header = jest.fn().mockReturnValueOnce('trace-id').mockReturnValueOnce('user-agent');
        mockCallHandler.handle = jest.fn();

        mockHttpContext.getRequest = jest.fn().mockReturnValue(mockRequest);
        mockHttpContext.getResponse = jest.fn().mockReturnValue(mockResponse);
        mockExecutionContext.switchToHttp = jest.fn().mockReturnValue(mockHttpContext);

        interceptor = new LoggerContextInterceptor(mockAppConfigService, mockLogMessageFactory);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Adds the trace ID, user agent, IP address along with the client id when it exists to the log message factory', () => {
        mockRequest.params = {
            clientId: '123',
        };

        interceptor.intercept(mockExecutionContext, mockCallHandler);

        expect(mockLogMessageFactory.setProperty).toBeCalledTimes(3);
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(1, LogPropertyEnum.UserIP, 'ip');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(2, LogPropertyEnum.UserAgent, 'user-agent');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(3, LogPropertyEnum.TraceID, 'trace-id');

        expect(mockLogMessageFactory.setContext).toBeCalledTimes(2);
        expect(mockLogMessageFactory.setContext).toHaveBeenNthCalledWith(1, 'clientId', '123');
        expect(mockLogMessageFactory.setContext).toHaveBeenNthCalledWith(2, 'app', { version: '0.0.1' });

        expect(mockCallHandler.handle).toBeCalledTimes(1);
    });

    it('Adds the trace ID, user agent, IP address along with the client id as null when it does not exist to the log message factory', () => {
        mockRequest.params = {};

        interceptor.intercept(mockExecutionContext, mockCallHandler);

        expect(mockLogMessageFactory.setProperty).toBeCalledTimes(3);
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(1, LogPropertyEnum.UserIP, 'ip');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(2, LogPropertyEnum.UserAgent, 'user-agent');
        expect(mockLogMessageFactory.setProperty).toHaveBeenNthCalledWith(3, LogPropertyEnum.TraceID, 'trace-id');

        expect(mockLogMessageFactory.setContext).toBeCalledTimes(2);
        expect(mockLogMessageFactory.setContext).toHaveBeenNthCalledWith(1, 'clientId', null);
        expect(mockLogMessageFactory.setContext).toHaveBeenNthCalledWith(2, 'app', { version: '0.0.1' });

        expect(mockCallHandler.handle).toBeCalledTimes(1);
    });
});
