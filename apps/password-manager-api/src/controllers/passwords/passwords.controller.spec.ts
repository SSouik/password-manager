import { HttpException, HttpStatus, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { PasswordRepository } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import { Password } from '@password-manager:types';

import { PasswordsController } from './passwords.controller';

describe('PasswordsController Tests', () => {
    const mockPasswordRepository = PasswordRepository.prototype;
    const mockCrypto = Crypto.prototype;
    let controller: PasswordsController;

    beforeEach(() => {
        controller = new PasswordsController(mockPasswordRepository, mockCrypto);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Passwords', () => {
        beforeEach(() => {
            mockCrypto.decrypt = jest.fn().mockReturnValue('password');
        });

        describe('Successful Results', () => {
            it("Returns a 200 and the client's passwords", async () => {
                mockPasswordRepository.getPasswordsByClientId = jest.fn().mockResolvedValue([
                    <Password>{
                        passwordId: 'id',
                        name: 'Foo',
                        website: 'http://foo.com',
                        login: 'login',
                        value: 'password',
                        clientId: '123',
                    },
                ]);

                const actual = await controller.getPasswords('123');

                expect(mockPasswordRepository.getPasswordsByClientId).toBeCalledTimes(1);
                expect(mockPasswordRepository.getPasswordsByClientId).toBeCalledWith('123');

                expect(actual.statusCode).toBe(HttpStatus.OK);
                expect(actual.message).toBe('Ok');
                expect(actual.passwords).toStrictEqual([
                    <Password>{
                        passwordId: 'id',
                        name: 'Foo',
                        website: 'http://foo.com',
                        login: 'login',
                        value: 'password',
                        clientId: '123',
                    },
                ]);
            });
        });

        describe('Not Found results', () => {
            it('Returns a 404 when the client does not have any passwords', async () => {
                mockPasswordRepository.getPasswordsByClientId = jest
                    .fn()
                    .mockRejectedValue(new NotFoundException('Not Found'));

                try {
                    await controller.getPasswords('123');
                } catch (error) {
                    expect(mockPasswordRepository.getPasswordsByClientId).toBeCalledTimes(1);
                    expect(mockPasswordRepository.getPasswordsByClientId).toBeCalledWith('123');

                    expect(error instanceof HttpException).toBeTruthy();

                    const exception = error as HttpException;
                    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
                    expect(exception.message).toBe('Not Found');
                }
            });
        });

        describe('Service Unavailable results', () => {
            it("Returns a 503 when getting the client's passwords fails for an unknown reason", async () => {
                mockPasswordRepository.getPasswordsByClientId = jest
                    .fn()
                    .mockRejectedValue(new ServiceUnavailableException('Service Unavailable'));

                try {
                    await controller.getPasswords('123');
                } catch (error) {
                    expect(mockPasswordRepository.getPasswordsByClientId).toBeCalledTimes(1);
                    expect(mockPasswordRepository.getPasswordsByClientId).toBeCalledWith('123');

                    expect(error instanceof HttpException).toBeTruthy();

                    const exception = error as HttpException;
                    expect(exception.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                    expect(exception.message).toBe('Service Unavailable');
                }
            });
        });
    });

    describe('Create Password', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.createPassword('id', {
                    name: 'name',
                    website: 'http://foo.com',
                    login: 'login',
                    value: 'password',
                });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Place all unit tests for successful results (status code 201) here
        describe('Successful Results', () => {});

        // Place all unit tests for service unavailable results (status code 503) here
        describe('Service Unavailable Results', () => {});
    });

    describe('Delete Password', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.deletePassword('id');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Place all unit tests for successful results (status code 202) here
        describe('Successful Results', () => {});

        // Place all unit tests for not found results (status code 404) here
        describe('Not Found Results', () => {});

        // Place all unit tests for service unavailable results (status code 503) here
        describe('Service Unavailable Results', () => {});
    });

    describe('Update Password', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.updatePassword('id', 'id', {
                    name: 'name',
                    website: 'http://foo.com',
                    login: 'login',
                    value: 'password',
                });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Place all unit tests for successful results (status code 201) here
        describe('Successful Results', () => {});

        // Place all unit tests for not found results (status code 404)
        describe('Not Found Results', () => {});

        // Place all unit tests for service unavailable results (status code 503) here
        describe('Service Unavailable Results', () => {});
    });
});
