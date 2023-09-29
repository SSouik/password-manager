import { HttpStatus } from '@nestjs/common';
import { ClientService } from '@password-manager:api:services/client/client.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { CreateClientResponse, PasswordManagerErrorCodeEnum } from '@password-manager:types';

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
        it('Successfully creates a new client and returns it', async () => {
            mockClientService.createClient = jest.fn().mockResolvedValue(<CreateClientResponse>{
                client: {
                    clientId: 'clientId',
                    login: 'login',
                    metadata: {
                        createdDate: 'now',
                        updatedDate: 'now',
                    },
                },
            });

            const actual = await controller.createClient({ login: 'login', password: 'password' });

            expect(actual.client).toStrictEqual({
                clientId: 'clientId',
                login: 'login',
                metadata: {
                    createdDate: 'now',
                    updatedDate: 'now',
                },
            });

            expect(mockClientService.createClient).toBeCalledTimes(1);
            expect(mockClientService.createClient).toBeCalledWith({ login: 'login', password: 'password' });
        });
    });

    describe('Delete Client', () => {
        it('Successfully deletes the client', async () => {
            mockClientService.deleteClient = jest.fn().mockResolvedValue({});

            await controller.deleteClient('clientId');

            expect(mockClientService.deleteClient).toBeCalledTimes(1);
            expect(mockClientService.deleteClient).toBeCalledWith('clientId');
        });
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
