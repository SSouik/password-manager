import { GetCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { HttpStatus } from '@nestjs/common';
import { PasswordManagerException } from '@password-manager:api:types';
import { DynamoDBClient } from '@password-manager:dynamodb-client';
import { Logger } from '@password-manager:logger';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';

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
        it('Returns the client data', async () => {
            mockDynamoDBClient.get = jest.fn().mockResolvedValue({
                Item: {
                    clientId: 'id',
                    login: 'login',
                    password: 'password',
                },
            });

            const actual = await repository.getClientById('id');

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Found client by ID', { dynamoDB: { table: 'Client' } });

            expect(mockDynamoDBClient.get).toBeCalledTimes(1);
            expect(mockDynamoDBClient.get).toBeCalledWith('Client', <GetCommandInput>{
                TableName: 'Client',
                Key: {
                    clientId: 'id',
                },
            });

            expect(actual).toStrictEqual({
                clientId: 'id',
                login: 'login',
                password: 'password',
            });
        });

        it('Rejects with a Not Found PasswordManagerException when the client does not exist', async () => {
            mockDynamoDBClient.get = jest.fn().mockResolvedValue({
                Item: null,
            });

            try {
                await repository.getClientById('clientId');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_FOUND);
                expect(exception.message).toBe("No client exists with ID 'clientId'");
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.ClientNotFound);

                expect(mockLogger.warn).toBeCalledTimes(1);
                expect(mockLogger.warn).toBeCalledWith("Couldn't find the client by ID", {
                    dynamoDB: { table: 'Client' },
                });

                expect(mockDynamoDBClient.get).toBeCalledTimes(1);
                expect(mockDynamoDBClient.get).toBeCalledWith('Client', <GetCommandInput>{
                    TableName: 'Client',
                    Key: {
                        clientId: 'clientId',
                    },
                });
            }
        });

        it('Rejects with a Service Unavailable PasswordManagerException when the request to DynamoDB fails for an unknown reason', async () => {
            const err = new Error('Something broke');

            mockDynamoDBClient.get = jest.fn().mockRejectedValue(err);

            try {
                await repository.getClientById('clientId');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service is temporarily unavailable.');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.DynamoDBDown);

                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to find the client by ID', {
                    dynamoDB: { table: 'Client' },
                    error: err,
                });

                expect(mockDynamoDBClient.get).toBeCalledTimes(1);
                expect(mockDynamoDBClient.get).toBeCalledWith('Client', <GetCommandInput>{
                    TableName: 'Client',
                    Key: {
                        clientId: 'clientId',
                    },
                });
            }
        });
    });

    describe('Get Client by login', () => {
        it('Returns the client data', async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({
                Items: [
                    {
                        clientId: 'id',
                        login: 'login',
                        password: 'password',
                    },
                ],
            });

            const actual = await repository.getClientByLogin('login');

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Successfully found the client with the provided login', {
                dynamoDB: { table: 'Client', login: 'login' },
            });

            expect(mockDynamoDBClient.query).toBeCalledTimes(1);
            expect(mockDynamoDBClient.query).toBeCalledWith('Client', <QueryCommandInput>{
                TableName: 'Client',
                IndexName: 'LoginIndex',
                KeyConditionExpression: 'login = :login',
                ExpressionAttributeValues: {
                    ':login': 'login',
                },
            });

            expect(actual).toStrictEqual({
                clientId: 'id',
                login: 'login',
                password: 'password',
            });
        });

        it('Rejects with a Not Found PasswordManagerException when DynamoDB returns null for the clients found', async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({
                Items: null,
            });

            try {
                await repository.getClientByLogin('login');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_FOUND);
                expect(exception.message).toBe("No client exists with login 'login'");
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.ClientNotFound);

                expect(mockLogger.info).toBeCalledTimes(1);
                expect(mockLogger.info).toBeCalledWith('Client not found by login', {
                    dynamoDB: { table: 'Client', login: 'login' },
                });

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Client', <QueryCommandInput>{
                    TableName: 'Client',
                    IndexName: 'LoginIndex',
                    KeyConditionExpression: 'login = :login',
                    ExpressionAttributeValues: {
                        ':login': 'login',
                    },
                });
            }
        });

        it('Rejects with a Not Found PasswordManagerException when DynamoDB returns no clients for the login', async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({
                Items: [],
            });

            try {
                await repository.getClientByLogin('login');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_FOUND);
                expect(exception.message).toBe("No client exists with login 'login'");
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.ClientNotFound);

                expect(mockLogger.info).toBeCalledTimes(1);
                expect(mockLogger.info).toBeCalledWith('Client not found by login', {
                    dynamoDB: { table: 'Client', login: 'login' },
                });

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Client', <QueryCommandInput>{
                    TableName: 'Client',
                    IndexName: 'LoginIndex',
                    KeyConditionExpression: 'login = :login',
                    ExpressionAttributeValues: {
                        ':login': 'login',
                    },
                });
            }
        });

        it('Rejects with a Service Unavailable PasswordManagerException when the request to DynamoDB fails for an unknown reason', async () => {
            const err = new Error('Something broke');

            mockDynamoDBClient.query = jest.fn().mockRejectedValue(err);

            try {
                await repository.getClientByLogin('login');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service is temporarily unavailable.');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.DynamoDBDown);

                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to find the client by login', {
                    dynamoDB: { table: 'Client', login: 'login' },
                    error: err,
                });

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Client', <QueryCommandInput>{
                    TableName: 'Client',
                    IndexName: 'LoginIndex',
                    KeyConditionExpression: 'login = :login',
                    ExpressionAttributeValues: {
                        ':login': 'login',
                    },
                });
            }
        });
    });

    describe('Create client', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.createClient({ login: 'login', password: 'password' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(error.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
            }
        });
    });

    describe('Delete client', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.deleteClient('id');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(error.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
            }
        });
    });

    describe('Update client', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.updateClient('clientId', { login: 'login', password: 'password' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(error.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
            }
        });
    });
});
