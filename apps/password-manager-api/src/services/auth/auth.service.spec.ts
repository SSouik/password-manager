import { HttpStatus } from '@nestjs/common';
import { ClientRepository } from '@password-manager:api:repositories/client/client.repository';
import { JWTService } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import { AuthToken, Client } from '@password-manager:types';

import { AuthService } from './auth.service';

describe('AuthService Tests', () => {
    const mockClientRepository = ClientRepository.prototype;
    const mockJWTService = JWTService.prototype;
    const mockCrypto = Crypto.prototype;
    let service: AuthService;

    beforeEach(() => {
        service = new AuthService(mockClientRepository, mockJWTService, mockCrypto);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Login', () => {
        beforeEach(() => {
            mockCrypto.decrypt = jest.fn().mockReturnValue('password');
        });

        it('Issues the client a token when they provide the correct password', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockResolvedValue(<Client>{ clientId: 'id', login: 'login', password: 'password' });

            mockJWTService.create = jest.fn().mockResolvedValue(<AuthToken>{ token: 'token', expiresIn: 3600 });

            const actual = await service.login({ login: 'login', password: 'password' });

            expect(mockClientRepository.getClientByLogin).toBeCalledTimes(1);
            expect(mockClientRepository.getClientByLogin).toBeCalledWith('login');

            expect(mockCrypto.decrypt).toBeCalledTimes(1);
            expect(mockCrypto.decrypt).toBeCalledWith('password');

            expect(mockJWTService.create).toBeCalledTimes(1);
            expect(mockJWTService.create).toBeCalledWith({ clientId: 'id' });

            expect(actual.statusCode).toBe(HttpStatus.OK);
            expect(actual.message).toBe('Login successful');
            expect(actual.clientId).toBe('id');
            expect(actual.auth).toStrictEqual(<AuthToken>{
                token: 'token',
                expiresIn: 3600,
            });
        });

        it('Rejects with an Unauthorized PasswordManagerException when the requested login does not exist', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockRejectedValue(
                    PasswordManagerException.notFound<Partial<Client>>().withContext({ login: 'login' }),
                );

            try {
                await service.login({ login: 'login', password: 'password' });
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

        it('Rejects with an Unauthorized PasswordManagerException when the provided password does not match the saved password', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockResolvedValue(<Client>{ clientId: 'id', login: 'login', password: 'password' });

            try {
                await service.login({ login: 'login', password: 'password123' });
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

        it('Rejects with a ServiceUnavailable PasswordManagerException when an unknown error occurs with DynamoDB', async () => {
            mockClientRepository.getClientByLogin = jest
                .fn()
                .mockRejectedValue(
                    PasswordManagerException.serviceUnavailable<Partial<Client>>()
                        .withMessage('Service is temporarily unavailable.')
                        .withContext({ login: 'login' }),
                );

            try {
                await service.login({ login: 'login', password: 'password' });
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
