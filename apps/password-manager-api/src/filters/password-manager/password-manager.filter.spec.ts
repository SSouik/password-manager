import { HttpStatus } from '@nestjs/common';
import { ArgumentsHost, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AppConfigService } from '@password-manager:api:services/config/app-config.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';
import { Request, Response } from 'express';

import { PasswordManagerFilter } from './password-manager.filter';

describe('PasswordManagerFilter Tests', () => {
    const mockAppConfigService = AppConfigService.prototype;
    const mockTimestamp = '2023-02-01T17:20:01.700Z';
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockHttpContext = {} as HttpArgumentsHost;
    const mockArgumentsHost = {} as ArgumentsHost;
    let filter: PasswordManagerFilter;

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockTimestamp);

        mockAppConfigService.get = jest.fn().mockReturnValue('0.0.1');

        mockResponse.getHeader = jest.fn().mockReturnValue('trace-id');
        mockResponse.setHeader = jest.fn().mockReturnThis();
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn().mockReturnThis();
        mockArgumentsHost.switchToHttp = jest.fn().mockReturnValue(mockHttpContext);
        mockHttpContext.getRequest = jest.fn().mockReturnValue(mockRequest);
        mockHttpContext.getResponse = jest.fn().mockReturnValue(mockResponse);

        filter = new PasswordManagerFilter(mockAppConfigService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Catches a PasswordManagerException and converts it into a PasswordManagerResponse', () => {
        filter.catch(PasswordManagerException.notFound(), mockArgumentsHost);

        expect(mockResponse.getHeader).toBeCalledTimes(1);
        expect(mockResponse.getHeader).toBeCalledWith('x-request-trace-id');

        expect(mockResponse.setHeader).toBeCalledTimes(1);
        expect(mockResponse.setHeader).toBeCalledWith('x-response-timestamp', mockTimestamp);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);

        expect(mockResponse.json).toBeCalledTimes(1);
        expect(mockResponse.json).toBeCalledWith({
            statusCode: HttpStatus.NOT_FOUND,
            error: {
                code: PasswordManagerErrorCodeEnum.NotFound,
                details: 'Not Found',
            },
            metadata: {
                requestTraceId: 'trace-id',
                timestamp: mockTimestamp,
                version: '0.0.1',
            },
        });
    });
});
