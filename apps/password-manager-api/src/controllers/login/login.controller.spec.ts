import { HttpStatus } from '@nestjs/common';
import { ClientRepository } from '@password-manager:api:repositories/client/client.repository';
import { JWTService } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import { AuthToken, Client } from '@password-manager:types';

import { LoginController } from './login.controller';

describe('LoginController Tests', () => {
    const mockClientRepository = ClientRepository.prototype;
    const mockJWTService = JWTService.prototype;
    const mockCrypto = Crypto.prototype;
    let controller: LoginController;

    beforeEach(() => {
        mockCrypto.decrypt = jest.fn().mockReturnValue('password');

        controller = new LoginController(mockClientRepository, mockJWTService, mockCrypto);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Successful Results', () => {
        it('Returns a 200 and issues the client a token', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockResolvedValue(<Client>{ clientId: 'id', login: 'login', password: 'password' });

            mockJWTService.create = jest.fn().mockResolvedValue(<AuthToken>{ token: 'token', expiresIn: 3600 });

            const actual = await controller.handler({ login: 'login', password: 'password' });

            expect(mockClientRepository.getClientByLogin).toBeCalledTimes(1);
            expect(mockClientRepository.getClientByLogin).toBeCalledWith('login');

            expect(mockCrypto.decrypt).toBeCalledTimes(1);
            expect(mockCrypto.decrypt).toBeCalledWith('password');

            expect(mockJWTService.create).toBeCalledTimes(1);
            expect(mockJWTService.create).toBeCalledWith({ clientId: 'id' });

            expect(actual.statusCode).toBe(HttpStatus.OK);
            expect(actual.message).toBe('Login successful');
            expect(actual.auth).toStrictEqual(<AuthToken>{
                token: 'token',
                expiresIn: 3600,
            });
        });
    });

    describe('Unauthorized Results', () => {
        it('Returns a 401 when no client exists with the provided login', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockRejectedValue(
                    PasswordManagerException.notFound<Partial<Client>>().withContext({ login: 'login' }),
                );

            try {
                await controller.handler({ login: 'login', password: 'password' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<Partial<Client>>;
                expect(exception.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                expect(exception.message).toBe('Login and password combination is invalid.');
                expect(exception.context).toStrictEqual({ login: 'login' });

                expect(mockClientRepository.getClientByLogin).toBeCalledTimes(1);
                expect(mockClientRepository.getClientByLogin).toBeCalledWith('login');

                expect(mockCrypto.decrypt).toBeCalledTimes(0);

                expect(mockJWTService.create).toBeCalledTimes(0);
            }
        });

        it('Returns a 401 when the client exists but the provided password does not match', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockResolvedValue(<Client>{ clientId: 'id', login: 'login', password: 'password' });

            try {
                await controller.handler({ login: 'login', password: 'password123' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<Partial<Client>>;
                expect(exception.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                expect(exception.message).toBe('Login and password combination is invalid.');
                expect(exception.context).toStrictEqual({ login: 'login' });

                expect(mockClientRepository.getClientByLogin).toBeCalledTimes(1);
                expect(mockClientRepository.getClientByLogin).toBeCalledWith('login');

                expect(mockCrypto.decrypt).toBeCalledTimes(1);
                expect(mockCrypto.decrypt).toBeCalledWith('password');

                expect(mockJWTService.create).toBeCalledTimes(0);
            }
        });
    });

    describe('Service Unavailable Results', () => {
        it('Returns a 503 when looking up the client in DynamoDB fails due to an unknown reason', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockRejectedValue(
                    PasswordManagerException.serviceUnavailable<Partial<Client>>()
                        .withMessage('Service is temporarily unavailable.')
                        .withContext({ login: 'login' }),
                );

            try {
                await controller.handler({ login: 'login', password: 'password' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<Partial<Client>>;
                expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service is temporarily unavailable.');
                expect(exception.context).toStrictEqual({ login: 'login' });

                expect(mockClientRepository.getClientByLogin).toBeCalledTimes(1);
                expect(mockClientRepository.getClientByLogin).toBeCalledWith('login');

                expect(mockCrypto.decrypt).toBeCalledTimes(0);

                expect(mockJWTService.create).toBeCalledTimes(0);
            }
        });
    });
});
