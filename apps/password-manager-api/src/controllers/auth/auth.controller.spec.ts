import { HttpStatus } from '@nestjs/common';
import { AuthService } from '@password-manager:api:services/auth/auth.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { AuthToken, ClientResponse, LoginResponse, PasswordManagerErrorCodeEnum } from '@password-manager:types';

import { AuthController } from './auth.controller';

describe('AuthController Tests', () => {
    const mockAuthService = AuthService.prototype;
    let controller: AuthController;

    beforeEach(() => {
        controller = new AuthController(mockAuthService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Login', () => {
        describe('Successful Results', () => {
            it('Returns a 200 and issues the client a token', async () => {
                mockAuthService.login = jest.fn().mockResolvedValue(<LoginResponse>{
                    client: {
                        clientId: 'clientId',
                        login: 'login',
                    },
                    auth: {
                        token: 'token',
                        expiresIn: 3600,
                    },
                });

                const actual = await controller.login({ login: 'login', password: 'password' });

                expect(actual.client).toStrictEqual(<ClientResponse>{
                    clientId: 'clientId',
                    login: 'login',
                });
                expect(actual.auth).toStrictEqual(<AuthToken>{
                    token: 'token',
                    expiresIn: 3600,
                });

                expect(mockAuthService.login).toBeCalledTimes(1);
                expect(mockAuthService.login).toBeCalledWith({ login: 'login', password: 'password' });
            });
        });

        describe('Unauthorized Results', () => {
            it('Returns a 401 when no client exists with the provided login', async () => {
                mockAuthService.login = jest
                    .fn()
                    .mockRejectedValue(
                        PasswordManagerException.unauthorized().withMessage(
                            'Login and password combination is invalid.',
                        ),
                    );

                try {
                    await controller.login({ login: 'login', password: 'password' });
                } catch (error) {
                    expect(error).toBeInstanceOf(PasswordManagerException);

                    const exception = error as PasswordManagerException;
                    expect(exception.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                    expect(exception.message).toBe('Login and password combination is invalid.');
                    expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.Unauthorized);

                    expect(mockAuthService.login).toBeCalledTimes(1);
                    expect(mockAuthService.login).toBeCalledWith({ login: 'login', password: 'password' });
                }
            });

            it('Returns a 401 when the client exists but the provided password does not match', async () => {
                mockAuthService.login = jest
                    .fn()
                    .mockRejectedValue(
                        PasswordManagerException.unauthorized().withMessage(
                            'Login and password combination is invalid.',
                        ),
                    );

                try {
                    await controller.login({ login: 'login', password: 'password123' });
                } catch (error) {
                    expect(error).toBeInstanceOf(PasswordManagerException);

                    const exception = error as PasswordManagerException;
                    expect(exception.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                    expect(exception.message).toBe('Login and password combination is invalid.');
                    expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.Unauthorized);

                    expect(mockAuthService.login).toBeCalledTimes(1);
                    expect(mockAuthService.login).toBeCalledWith({ login: 'login', password: 'password123' });
                }
            });
        });

        describe('Service Unavailable Results', () => {
            it('Returns a 503 when looking up the client in DynamoDB fails due to an unknown reason', async () => {
                mockAuthService.login = jest
                    .fn()
                    .mockRejectedValue(
                        PasswordManagerException.serviceUnavailable().withMessage(
                            'Service is temporarily unavailable.',
                        ),
                    );

                try {
                    await controller.login({ login: 'login', password: 'password' });
                } catch (error) {
                    expect(error).toBeInstanceOf(PasswordManagerException);

                    const exception = error as PasswordManagerException;
                    expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                    expect(exception.message).toBe('Service is temporarily unavailable.');
                    expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.ServiceUnavailable);

                    expect(mockAuthService.login).toBeCalledTimes(1);
                    expect(mockAuthService.login).toBeCalledWith({ login: 'login', password: 'password' });
                }
            });
        });
    });
});
