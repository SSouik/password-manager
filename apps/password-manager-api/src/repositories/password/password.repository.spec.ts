import { DeleteCommandInput } from '@aws-sdk/lib-dynamodb';
import { HttpStatus } from '@nestjs/common';
import { PasswordInput, PasswordManagerException } from '@password-manager:api:types';
import { DynamoDBClient } from '@password-manager:dynamodb-client';
import { Logger } from '@password-manager:logger';
import { Password, PasswordManagerErrorCodeEnum } from '@password-manager:types';

import { PasswordRepository } from './password.repository';

jest.mock('uuid', () => ({
    v4: () => 'uuid',
}));

describe('PasswordRepository Tests', () => {
    const mockLogger = Logger.prototype;
    const mockDynamoDBClient = DynamoDBClient.prototype;
    let repository: PasswordRepository;

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('now');

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
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(error.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
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

        it("Rejects with a Not Found PasswordManagerException when DynamoDB returns null for the client's passwords", async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({ Items: null });

            try {
                await repository.getPasswordsByClientId('clientId');
            } catch (error) {
                expect(mockLogger.info).toBeCalledTimes(1);
                expect(mockLogger.info).toBeCalledWith('No passwords were found for client');

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Password', {
                    TableName: 'Password',
                    IndexName: 'ClientIdIndex',
                    KeyConditionExpression: 'clientId = :clientId',
                    ExpressionAttributeValues: {
                        ':clientId': 'clientId',
                    },
                });

                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_FOUND);
                expect(exception.message).toBe("No passwords exist for the client ID 'clientId'");
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.PasswordNotFound);
            }
        });

        it('Rejects with a Not Found PasswordManagerException when DynamoDB returns no passwords for the client', async () => {
            mockDynamoDBClient.query = jest.fn().mockResolvedValue({ Items: [] });

            try {
                await repository.getPasswordsByClientId('clientId');
            } catch (error) {
                expect(mockLogger.info).toBeCalledTimes(1);
                expect(mockLogger.info).toBeCalledWith('No passwords were found for client');

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Password', {
                    TableName: 'Password',
                    IndexName: 'ClientIdIndex',
                    KeyConditionExpression: 'clientId = :clientId',
                    ExpressionAttributeValues: {
                        ':clientId': 'clientId',
                    },
                });

                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_FOUND);
                expect(exception.message).toBe("No passwords exist for the client ID 'clientId'");
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.PasswordNotFound);
            }
        });

        it('Rejects with a Service Unavailable PasswordManagerException when DynamoDB fails due to an unknown reason', async () => {
            const mockError = new Error('error');
            mockDynamoDBClient.query = jest.fn().mockRejectedValue(mockError);

            try {
                await repository.getPasswordsByClientId('clientId');
            } catch (error) {
                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to get passwords for the client', {
                    dynamoDB: { table: 'Password' },
                    error: mockError,
                });

                expect(mockDynamoDBClient.query).toBeCalledTimes(1);
                expect(mockDynamoDBClient.query).toBeCalledWith('Password', {
                    TableName: 'Password',
                    IndexName: 'ClientIdIndex',
                    KeyConditionExpression: 'clientId = :clientId',
                    ExpressionAttributeValues: {
                        ':clientId': 'clientId',
                    },
                });

                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service is temporarily unavailable.');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.DynamoDBDown);
            }
        });
    });

    describe('Create Password', () => {
        it('Creates a new password in DynamoDB', async () => {
            mockDynamoDBClient.save = jest.fn().mockResolvedValue({});

            const input = <PasswordInput>{
                name: 'name',
                website: null,
                login: 'login',
                value: 'P@ssword123',
                clientId: 'clientId',
            };

            const result = await repository.createPassword(input);

            expect(result.name).toBe('name');
            expect(result.website).toBeNull();
            expect(result.login).toBe('login');
            expect(result.value).toBe('P@ssword123');

            expect(mockDynamoDBClient.save).toBeCalledTimes(1);
            expect(mockDynamoDBClient.save).toBeCalledWith('Password', <Password>{
                passwordId: 'uuid',
                name: 'name',
                website: null,
                login: 'login',
                value: 'P@ssword123',
                clientId: 'clientId',
                metadata: {
                    createdDate: 'now',
                    updatedDate: 'now',
                },
            });

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Successfully created anew password for client', {
                dynamoDB: {
                    table: 'Password',
                },
            });
        });

        it('Rejects with a ServiceUnavailable exception when saving the password fails', async () => {
            const mockError = new Error('Something went wrong');
            mockDynamoDBClient.save = jest.fn().mockRejectedValue(mockError);

            const input = <PasswordInput>{
                name: 'name',
                website: null,
                login: 'login',
                value: 'P@ssword123',
                clientId: 'clientId',
            };

            try {
                await repository.createPassword(input);
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service Unavailable');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.DynamoDBDown);

                expect(mockDynamoDBClient.save).toBeCalledTimes(1);
                expect(mockDynamoDBClient.save).toBeCalledWith('Password', <Password>{
                    passwordId: 'uuid',
                    name: 'name',
                    website: null,
                    login: 'login',
                    value: 'P@ssword123',
                    clientId: 'clientId',
                    metadata: {
                        createdDate: 'now',
                        updatedDate: 'now',
                    },
                });

                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to create a new password for the client', {
                    dynamoDB: {
                        table: 'Password',
                        error: mockError,
                    },
                });
            }
        });
    });

    describe('Delete Password', () => {
        it('Deletes the password in DynamoDB', async () => {
            mockDynamoDBClient.delete = jest.fn().mockResolvedValue({});

            await repository.deletePassword('passwordId');

            expect(mockDynamoDBClient.delete).toBeCalledTimes(1);
            expect(mockDynamoDBClient.delete).toBeCalledWith('Password', <DeleteCommandInput>{
                TableName: 'Password',
                Key: {
                    passwordId: 'passwordId',
                },
            });

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Successfully deleted password', {
                dynamoDB: {
                    table: 'Password',
                    passwordId: 'passwordId',
                },
            });
        });

        it('Rejects with a ServiceUnavailable exception when deleting the password in DynamoDB fails', async () => {
            const mockError = new Error('Something broke');
            mockDynamoDBClient.delete = jest.fn().mockRejectedValue(mockError);

            try {
                await repository.deletePassword('passwordId');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service Unavailable');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.DynamoDBDown);

                expect(mockDynamoDBClient.delete).toBeCalledTimes(1);
                expect(mockDynamoDBClient.delete).toBeCalledWith('Password', <DeleteCommandInput>{
                    TableName: 'Password',
                    Key: {
                        passwordId: 'passwordId',
                    },
                });

                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to delete password', {
                    dynamoDB: {
                        table: 'Password',
                        passwordId: 'passwordId',
                        error: mockError,
                    },
                });
            }
        });
    });

    describe('Delete Password for Client Id', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.deletePasswordsForClientId('123');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(error.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
            }
        });
    });

    describe('Update Password', () => {
        it('Updates the password in DynamoDB', async () => {
            mockDynamoDBClient.update = jest.fn().mockResolvedValue({
                Attributes: <Password>{
                    passwordId: 'passwordId',
                    name: 'name',
                    website: null,
                    login: 'login',
                    value: 'P@ssword123',
                    clientId: 'clientId',
                    metadata: {
                        createdDate: 'now',
                        updatedDate: 'now',
                    },
                },
            });

            const result = await repository.updatePassword('passwordId', {
                name: 'name',
                website: null,
                login: 'login',
                value: 'P@ssword123',
                clientId: 'clientId',
            });

            expect(result.passwordId).toBe('passwordId');
            expect(result.name).toBe('name');
            expect(result.website).toBeNull();
            expect(result.login).toBe('login');
            expect(result.value).toBe('P@ssword123');
            expect(result.clientId).toBe('clientId');
            expect(result.metadata.createdDate).toBe('now');
            expect(result.metadata.updatedDate).toBe('now');

            expect(mockDynamoDBClient.update).toBeCalledTimes(1);
            expect(mockDynamoDBClient.update).toBeCalledWith('Password', {
                TableName: 'Password',
                Key: {
                    passwordId: 'passwordId',
                },
                UpdateExpression:
                    'set #name = :name, #website = :website, #login = :login, #value = :value, #clientId = :clientId, #metadata.updatedDate = :updatedDate',
                ExpressionAttributeNames: {
                    '#name': 'name',
                    '#website': 'website',
                    '#login': 'login',
                    '#value': 'value',
                    '#clientId': 'clientId',
                    '#updatedDate': 'updatedDate',
                },
                ExpressionAttributeValues: {
                    ':name': 'name',
                    ':website': null,
                    ':login': 'login',
                    ':value': 'P@ssword123',
                    ':clientId': 'clientId',
                    ':updatedDate': 'now',
                },
                ConditionExpression: 'attribute_exists(passwordId)',
            });

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Successfully updated the password', {
                dynamoDB: {
                    table: 'Password',
                    passwordId: 'passwordId',
                },
            });
        });

        it('Rejects with a ServiceUnavailable exception when updating the password in DynamoDB fails', async () => {
            const mockError = new Error('Something broke');
            mockDynamoDBClient.update = jest.fn().mockRejectedValue(mockError);

            try {
                await repository.updatePassword('passwordId', {
                    name: 'name',
                    website: null,
                    login: 'login',
                    value: 'P@ssword123',
                    clientId: 'clientId',
                });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
                expect(exception.message).toBe('Service Unavailable');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.DynamoDBDown);

                expect(mockDynamoDBClient.update).toBeCalledTimes(1);
                expect(mockDynamoDBClient.update).toBeCalledWith('Password', {
                    TableName: 'Password',
                    Key: {
                        passwordId: 'passwordId',
                    },
                    UpdateExpression:
                        'set #name = :name, #website = :website, #login = :login, #value = :value, #clientId = :clientId, #metadata.updatedDate = :updatedDate',
                    ExpressionAttributeNames: {
                        '#name': 'name',
                        '#website': 'website',
                        '#login': 'login',
                        '#value': 'value',
                        '#clientId': 'clientId',
                        '#updatedDate': 'updatedDate',
                    },
                    ExpressionAttributeValues: {
                        ':name': 'name',
                        ':website': null,
                        ':login': 'login',
                        ':value': 'P@ssword123',
                        ':clientId': 'clientId',
                        ':updatedDate': 'now',
                    },
                    ConditionExpression: 'attribute_exists(passwordId)',
                });

                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to update password', {
                    dynamoDB: {
                        table: 'Password',
                        passwordId: 'passwordId',
                        error: mockError,
                    },
                });
            }
        });
    });
});
