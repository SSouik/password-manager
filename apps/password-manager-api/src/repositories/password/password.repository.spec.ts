import { HttpException, HttpStatus } from '@nestjs/common';
import { DynamoDBClient } from '@password-manager:dynamodb-client';
import { Logger } from '@password-manager:logger';
import { Password } from '@password-manager:types';

import { PasswordRepository } from './password.repository';

describe('PasswordRepository Tests', () => {
    const mockLogger = Logger.prototype;
    const mockDynamoDBClient = DynamoDBClient.prototype;
    let repository: PasswordRepository;

    beforeEach(() => {
        ['info', 'debug', 'warn', 'error'].forEach((level) => {
            mockLogger[level] = jest.fn();
        });

        repository = new PasswordRepository(mockLogger, mockDynamoDBClient);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Password By Id', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.getPasswordById('id');
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Get Passwords By Client Id', () => {
        it("Returns the client's passwords", async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({
                Items: [
                    <Password>{
                        passwordId: 'id',
                        name: 'Foo',
                        website: null,
                        login: 'login',
                        value: 'password',
                        clientId: '123',
                    },
                ],
            });

            const actual = await repository.getPasswordsByClientId('123');

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Successfully found passwords for client');

            expect(mockDynamoDBClient.query).toBeCalledTimes(1);
            expect(mockDynamoDBClient.query).toBeCalledWith('Password', {
                TableName: 'Password',
                IndexName: 'ClientIdIndex',
                KeyConditionExpression: 'clientId = :clientId',
                ExpressionAttributeValues: {
                    ':clientId': '123',
                },
            });

            expect(actual).toStrictEqual([
                <Password>{
                    passwordId: 'id',
                    name: 'Foo',
                    website: null,
                    login: 'login',
                    value: 'password',
                    clientId: '123',
                },
            ]);
        });

        it("Rejects with a NotFoundException when DynamoDB returns null for the client's passwords", async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({ Items: null });

            try {
                await repository.getPasswordsByClientId('123');
            } catch (error) {
                expect(mockLogger.info).toBeCalledTimes(1);
                expect(mockLogger.info).toBeCalledWith('No passwords were found for client');

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Password', {
                    TableName: 'Password',
                    IndexName: 'ClientIdIndex',
                    KeyConditionExpression: 'clientId = :clientId',
                    ExpressionAttributeValues: {
                        ':clientId': '123',
                    },
                });

                expect(error instanceof HttpException).toBeTruthy();

                const exception = error as HttpException;
                expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
                expect(exception.message).toBe('No passwords were found for client');
            }
        });

        it('Rejects with a NotFoundException when DynamoDB returns no passwords for the client', async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({ Items: [] });

            try {
                await repository.getPasswordsByClientId('123');
            } catch (error) {
                expect(mockLogger.info).toBeCalledTimes(1);
                expect(mockLogger.info).toBeCalledWith('No passwords were found for client');

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Password', {
                    TableName: 'Password',
                    IndexName: 'ClientIdIndex',
                    KeyConditionExpression: 'clientId = :clientId',
                    ExpressionAttributeValues: {
                        ':clientId': '123',
                    },
                });

                expect(error instanceof HttpException).toBeTruthy();

                const exception = error as HttpException;
                expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
                expect(exception.message).toBe('No passwords were found for client');
            }
        });

        it('Rejects with a ServiceUnavailableException when DynamoDB fails due to an unknown reason', async () => {
            const mockError = new Error('error');
            mockDynamoDBClient.query = jest.fn().mockRejectedValue(mockError);

            try {
                await repository.getPasswordsByClientId('123');
            } catch (error) {
                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to get passwords for the client', { error: mockError });

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Password', {
                    TableName: 'Password',
                    IndexName: 'ClientIdIndex',
                    KeyConditionExpression: 'clientId = :clientId',
                    ExpressionAttributeValues: {
                        ':clientId': '123',
                    },
                });

                expect(error instanceof HttpException).toBeTruthy();

                const exception = error as HttpException;
                expect(exception.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service Unavailable');
            }
        });
    });

    describe('Create Password', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.createPassword(<Password>{
                    passwordId: 'id',
                    name: 'Foo',
                    website: 'http://foo.com',
                    login: 'login',
                    value: 'password',
                    clientId: '123',
                });
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Delete Password', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.deletePassword('id');
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Delete Password for Client Id', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.deletePasswordsForClientId('123');
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Update Password', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.updatePassword(<Password>{
                    passwordId: 'id',
                    name: 'Foo',
                    website: 'http://foo.com',
                    login: 'login',
                    value: 'password',
                    clientId: '123',
                });
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });
});
