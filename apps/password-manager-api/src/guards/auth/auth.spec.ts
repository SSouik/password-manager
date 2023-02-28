import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { JWTService } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Logger, LogMessageFactory } from '@password-manager:logger';
import { Request } from 'express';

import { AuthGuard } from './auth.guard';

describe('AuthGuard Tests', () => {
    const mockLogMessageFactory = LogMessageFactory.prototype;
    const mockLogger = Logger.prototype;
    const mockJWTService = JWTService.prototype;
    const mockRequest = {} as Request;
    const mockHttpContext = {} as HttpArgumentsHost;
    const mockExecutionContext = {} as ExecutionContext;
    let guard: AuthGuard;

    beforeEach(() => {
        mockLogMessageFactory.setContext = jest.fn().mockReturnThis();

        ['info', 'debug', 'warn', 'error'].forEach((level) => {
            mockLogger[level] = jest.fn();
        });

        mockRequest.params = {
            clientId: 'id',
        };
        mockHttpContext.getRequest = jest.fn().mockReturnValue(mockRequest);
        mockExecutionContext.switchToHttp = jest.fn().mockReturnValue(mockHttpContext);

        guard = new AuthGuard(mockLogMessageFactory, mockLogger, mockJWTService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Can Activate', () => {
        it('Authorizes a valid token and client to access the route', async () => {
            mockRequest.headers = {
                authorization: 'Bearer token',
            };

            mockJWTService.verify = jest.fn().mockResolvedValue({});

            const actual = (await guard.canActivate(mockExecutionContext)) as boolean;

            expect(mockLogMessageFactory.setContext).toBeCalledTimes(1);
            expect(mockLogMessageFactory.setContext).toBeCalledWith('clientId', 'id');

            expect(mockLogger.warn).toBeCalledTimes(0);

            expect(mockJWTService.verify).toBeCalledTimes(1);
            expect(mockJWTService.verify).toBeCalledWith('token', 'id');

            expect(actual).toBeTruthy();
        });

        it('Rejects with a Forbidden PasswordManagerException when no token is provided', async () => {
            mockRequest.headers = {
                authorization: null,
            };

            mockJWTService.verify = jest.fn();

            try {
                (await guard.canActivate(mockExecutionContext)) as boolean;
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.FORBIDDEN);
                expect(exception.message).toBe('Client is forbidden from accessing the requested resource.');

                expect(mockLogMessageFactory.setContext).toBeCalledTimes(1);
                expect(mockLogMessageFactory.setContext).toBeCalledWith('clientId', 'id');

                expect(mockLogger.warn).toBeCalledTimes(1);
                expect(mockLogger.warn).toBeCalledWith('Client attempted to enter a protected route without a token');

                expect(mockJWTService.verify).toBeCalledTimes(0);
            }
        });

        it('Rejects with a Forbidden PasswordManagerException when the token does not belong to the client', async () => {
            mockRequest.headers = {
                authorization: 'token',
            };

            mockJWTService.verify = jest.fn().mockRejectedValue({});

            try {
                (await guard.canActivate(mockExecutionContext)) as boolean;
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.FORBIDDEN);
                expect(exception.message).toBe('Client is forbidden from accessing the requested resource.');

                expect(mockLogMessageFactory.setContext).toBeCalledTimes(1);
                expect(mockLogMessageFactory.setContext).toBeCalledWith('clientId', 'id');

                expect(mockLogger.warn).toBeCalledTimes(0);

                expect(mockJWTService.verify).toBeCalledTimes(1);
            }
        });
    });
});
