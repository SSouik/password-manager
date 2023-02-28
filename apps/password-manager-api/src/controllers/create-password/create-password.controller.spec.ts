import { HttpStatus } from '@nestjs/common';
import { PasswordRepository } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

import { CreatePasswordController } from './create-password.controller';

describe('CreatePasswordController Tests', () => {
    const mockPasswordRepository = PasswordRepository.prototype;
    const mockCrypto = Crypto.prototype;
    let controller: CreatePasswordController;

    beforeEach(() => {
        controller = new CreatePasswordController(mockPasswordRepository, mockCrypto);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // Remove this test after the controller is implemented
    it('Method not implemented', async () => {
        try {
            await controller.handler('id', {
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
