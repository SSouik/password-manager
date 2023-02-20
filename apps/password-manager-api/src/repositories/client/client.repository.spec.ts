import { DynamoDBClient } from '@password-manager:dynamodb-client';
import { Logger } from '@password-manager:logger';

import { ClientRepository } from './client.repository';

describe('ClientRepository Tests', () => {
    const mockLogger = Logger.prototype;
    const mockDynamoDBClient = DynamoDBClient.prototype;
    let repository: ClientRepository;

    beforeEach(() => {
        ['info', 'debug', 'warn', 'error'].forEach((level) => {
            mockLogger[level] = jest.fn();
        });

        repository = new ClientRepository(mockLogger, mockDynamoDBClient);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Client By Id', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.getClientById('id');
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Create client', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.createClient({ clientId: 'id', login: 'login', password: 'password' });
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Delete client', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.deleteClient('id');
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Update client', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.updateClient({ clientId: 'id', login: 'login', password: 'password' });
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });
});
