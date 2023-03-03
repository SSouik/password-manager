import { HttpStatus } from '@nestjs/common';
import { ClientRepository } from '@password-manager:api:repositories/client/client.repository';
import { PasswordRepository } from '@password-manager:api:repositories/password/password.repository';
import { SecurityQuestionRepository } from '@password-manager:api:repositories/security-question/security-question.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

import { ClientController } from './client.controller';

describe('ClientController Tests', () => {
    const mockClientRepository = ClientRepository.prototype;
    const mockPasswordRepository = PasswordRepository.prototype;
    const mockSecurityQuestionRepository = SecurityQuestionRepository.prototype;
    const mockCrypto = Crypto.prototype;
    let controller: ClientController;

    beforeEach(() => {
        controller = new ClientController(
            mockClientRepository,
            mockPasswordRepository,
            mockSecurityQuestionRepository,
            mockCrypto,
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Create Client', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.createClient({ login: 'login', password: 'password' });
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

    describe('Delete Client', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.deleteClient('id');
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

    describe('Update Client', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.updateClient('id', { login: 'login', password: 'password' });
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
