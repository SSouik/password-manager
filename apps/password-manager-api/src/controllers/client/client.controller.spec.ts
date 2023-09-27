import { HttpStatus } from '@nestjs/common';
import { ClientService } from '@password-manager:api:services/client/client.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';

import { ClientController } from './client.controller';

describe('ClientController Tests', () => {
    const mockClientService = ClientService.prototype;
    let controller: ClientController;

    beforeEach(() => {
        controller = new ClientController(mockClientService);
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

    describe('Delete Client', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.deleteClient('clientId');
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

    describe('Update Client', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.updateClient('clientId', { login: 'login', password: 'password' });
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
