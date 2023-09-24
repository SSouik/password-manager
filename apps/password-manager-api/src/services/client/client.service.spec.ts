import { HttpStatus } from '@nestjs/common';
import { ClientRepository } from '@password-manager:api:repositories/client/client.repository';
import { PasswordRepository } from '@password-manager:api:repositories/password/password.repository';
import { SecurityQuestionRepository } from '@password-manager:api:repositories/security-question/security-question.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

import { ClientService } from './client.service';

describe('ClientService Tests', () => {
    const mockClientRepository = ClientRepository.prototype;
    const mockPasswordRepository = PasswordRepository.prototype;
    const mockSecurityQuestionRepository = SecurityQuestionRepository.prototype;
    const mockCrypto = Crypto.prototype;
    let service: ClientService;

    beforeEach(() => {
        service = new ClientService(
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
        // Remove this test after the service is implemented
        it('Method not implemented', async () => {
            try {
                await service.createClient({ login: 'login', password: 'P@ssword123' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Write additional unit tests here
    });

    describe('Delete Client', () => {
        // Remove this test after the service is implemented
        it('Method not implemented', async () => {
            try {
                await service.deleteClient('clientId');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Write additional unit tests here
    });

    describe('Update Client', () => {
        // Remove this test after the service is implemented
        it('Method not implemented', async () => {
            try {
                await service.updateClient('clientId', { login: 'login', password: 'P@ssword123' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Write additional unit tests here
    });
});
