import { HttpStatus } from '@nestjs/common';
import { PasswordService } from '@password-manager:api:services/password/password.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Password, PasswordManagerErrorCodeEnum } from '@password-manager:types';

import { PasswordsController } from './passwords.controller';

describe('PasswordsController Tests', () => {
    const mockPasswordService = PasswordService.prototype;
    let controller: PasswordsController;

    beforeEach(() => {
        controller = new PasswordsController(mockPasswordService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Passwords', () => {
        describe('Successful Results', () => {
            it("Returns a 200 and the client's passwords", async () => {
                mockPasswordService.getPasswords = jest.fn().mockResolvedValue({
                    statusCode: HttpStatus.OK,
                    message: 'Ok',
                    passwords: [
                        <Password>{
                            passwordId: 'passwordId',
                            name: 'name',
                            website: 'http://foo.com',
                            login: 'login',
                            value: 'value',
                            clientId: 'clientId',
                        },
                    ],
                });

                const actual = await controller.getPasswords('clientId');

                expect(mockPasswordService.getPasswords).toBeCalledTimes(1);
                expect(mockPasswordService.getPasswords).toBeCalledWith('clientId');

                expect(actual.passwords).toStrictEqual([
                    <Password>{
                        passwordId: 'passwordId',
                        name: 'name',
                        website: 'http://foo.com',
                        login: 'login',
                        value: 'value',
                        clientId: 'clientId',
                    },
                ]);
            });
        });

        describe('Not Found results', () => {
            it('Returns a 404 when the client does not have any passwords', async () => {
                mockPasswordService.getPasswords = jest.fn().mockRejectedValue(PasswordManagerException.notFound());

                try {
                    await controller.getPasswords('clientId');
                } catch (error) {
                    expect(mockPasswordService.getPasswords).toBeCalledTimes(1);
                    expect(mockPasswordService.getPasswords).toBeCalledWith('clientId');

                    expect(error).toBeInstanceOf(PasswordManagerException);

                    const exception = error as PasswordManagerException;
                    expect(exception.statusCode).toBe(HttpStatus.NOT_FOUND);
                    expect(exception.message).toBe('Not Found');
                    expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotFound);
                }
            });
        });

        describe('Service Unavailable results', () => {
            it("Returns a 503 when getting the client's passwords fails for an unknown reason", async () => {
                mockPasswordService.getPasswords = jest
                    .fn()
                    .mockRejectedValue(PasswordManagerException.serviceUnavailable());

                try {
                    await controller.getPasswords('clientId');
                } catch (error) {
                    expect(mockPasswordService.getPasswords).toBeCalledTimes(1);
                    expect(mockPasswordService.getPasswords).toBeCalledWith('clientId');

                    expect(error).toBeInstanceOf(PasswordManagerException);

                    const exception = error as PasswordManagerException;
                    expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                    expect(exception.message).toBe('Service Unavailable');
                    expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.ServiceUnavailable);
                }
            });
        });
    });

    describe('Create Password', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.createPassword('clientId', {
                    name: 'name',
                    website: 'http://foo.com',
                    login: 'login',
                    value: 'password',
                });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
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
                await controller.deletePassword('passwordId');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
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
                await controller.updatePassword('clientId', 'passwordId', {
                    name: 'name',
                    website: 'http://foo.com',
                    login: 'login',
                    value: 'password',
                });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
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
