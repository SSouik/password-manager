import { HttpException, HttpStatus, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { PasswordRepository } from '@password-manager:api:repositories/password/password.repository';
import { Crypto } from '@password-manager:crypto';
import { Password } from '@password-manager:types';

import { GetPasswordsController } from './get-passwords.controller';

describe('GetPasswordsController Tests', () => {
    const mockPasswordRepository = PasswordRepository.prototype;
    const mockCrypto = Crypto.prototype;
    let controller: GetPasswordsController;

    beforeEach(() => {
        mockCrypto.decrypt = jest.fn().mockReturnValue('password');

        controller = new GetPasswordsController(mockPasswordRepository, mockCrypto);
    });

    afterEach(() => {
        jest.resetAllMocks();
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

            const actual = await controller.handler('123');

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
                await controller.handler('123');
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
                await controller.handler('123');
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
