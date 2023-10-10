// Remove eslint override below once the remaining methods are implemented
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteCommandInput, QueryCommandInput, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { ClassProvider, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { IPasswordRepository } from '@password-manager:api:interfaces';
import { DYNAMODB_CLIENT, LOGGER } from '@password-manager:api:providers';
import { PasswordInput, PasswordManagerException } from '@password-manager:api:types';
import { IDynamoDBClient } from '@password-manager:dynamodb-client';
import { ILogger } from '@password-manager:logger';
import { Password, PasswordManagerErrorCodeEnum } from '@password-manager:types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PasswordRepository implements IPasswordRepository {
    private readonly TABLE_NAME = 'Password';

    constructor(
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(DYNAMODB_CLIENT)
        private readonly dynamoDBClient: IDynamoDBClient,
    ) {}

    public async getPasswordById(passwordId: string): Promise<Password> {
        // Query DynamoDB by the passwordId to get a single password record.
        // You will need to construct a GetCommandInput and use the 'dynamoDBClient'
        // to query DynamoDB. If the item/record exists, then return it. If nothing exists
        // this should reject with a 404 (Not Found) exception. Otherwise if something else fails
        // then this should reject with a 503 (Service Unavailable) exception
        // You can also reference the 'getClientById' method in the ClientRepository class
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async getPasswordsByClientId(clientId: string): Promise<Array<Password>> {
        try {
            // Construct a query command input which takes in the
            // table name, the GlobalSecondaryIndex of 'ClientIdIndex'
            // and the expression of what to query for/by
            const input = <QueryCommandInput>{
                TableName: this.TABLE_NAME,
                IndexName: 'ClientIdIndex',
                KeyConditionExpression: 'clientId = :clientId',
                ExpressionAttributeValues: {
                    ':clientId': clientId,
                },
            };

            // Send the query to DynamoDB
            const result = await this.dynamoDBClient.query(this.TABLE_NAME, input);

            // A query or scan with DynamoDB will return an array/list of items
            // So check it items exists and the length is greater than 0.
            if (!result.Items || result.Items.length === 0) {
                // If no items exist, this means no passwords were found for
                // the client. Log an info message since this is expected and should
                // not be treated as an error
                this.logger.info('No passwords were found for client');

                // Reject/throw an exception indicating that no passwords were found.
                // Consuming services/class should understand that this method
                // can reject with this since it is expected that some clients may
                // not have any passwords
                return Promise.reject(
                    PasswordManagerException.notFound()
                        .withMessage(`No passwords exist for the client ID '${clientId}'`)
                        .withErrorCode(PasswordManagerErrorCodeEnum.PasswordNotFound),
                );
            }

            // If items/passwords were found, log an info message about it
            // and then return the items array/list casted as an Array of Password
            // AKA return a list of passwords that the client has
            this.logger.info('Successfully found passwords for client');
            return result.Items as Array<Password>;
        } catch (error) {
            // If something went wrong, log an error message along with the error
            this.logger.error('Failed to get passwords for the client', {
                dynamoDB: {
                    table: this.TABLE_NAME,
                },
                error,
            });

            // Reject/throw an exception that indicates the service is unavailable
            return Promise.reject(
                PasswordManagerException.serviceUnavailable()
                    .withMessage('Service is temporarily unavailable.')
                    .withErrorCode(PasswordManagerErrorCodeEnum.DynamoDBDown),
            );
        }
    }

    public async createPassword(input: PasswordInput): Promise<Password> {
        try {
            // Get the current time stamp in ISO format
            // Looks like this - 2023-10-09T16:48:46.483Z
            const now = new Date().toISOString();

            // Create a new password record
            const entry = <Password>{
                passwordId: uuid(), // Generate a UUID/GUID (Universal/Global Unique Identifier) for the password
                name: input.name,
                website: input.website,
                login: input.login,
                value: input.value,
                clientId: input.clientId,
                metadata: {
                    createdDate: now,
                    updatedDate: now,
                },
            };

            // Using the DynamoDB client, save the created password record above
            // to the Password table
            await this.dynamoDBClient.save(this.TABLE_NAME, entry);

            // Log an info message indicating that a new password was created for the client
            this.logger.info('Successfully created anew password for client', {
                dynamoDB: {
                    table: this.TABLE_NAME,
                },
            });

            // Return the record so consuming services/classes can have access to the newly created password
            return entry;
        } catch (error) {
            // If something goes wrong, log an error message with the error that occurred
            this.logger.error('Failed to create a new password for the client', {
                dynamoDB: {
                    table: this.TABLE_NAME,
                    error,
                },
            });

            // Reject/throw an exception indicating DynamoDB is down/unavailable
            return Promise.reject(
                PasswordManagerException.serviceUnavailable().withErrorCode(PasswordManagerErrorCodeEnum.DynamoDBDown),
            );
        }
    }

    public async deletePassword(passwordId: string): Promise<void> {
        try {
            // Construct the DeleteCommandInput type
            // What is import is the table name and
            // the Key object which consists of primary key
            // of 'passwordId'
            const input = <DeleteCommandInput>{
                TableName: this.TABLE_NAME,
                Key: {
                    passwordId: passwordId,
                },
            };

            // Send the delete request to DynamoDB
            await this.dynamoDBClient.delete(this.TABLE_NAME, input);

            // Log an info message indicating the password was successfully deleted
            this.logger.info('Successfully deleted password', {
                dynamoDB: {
                    table: this.TABLE_NAME,
                    passwordId,
                },
            });
        } catch (error) {
            // If an error occurs, log an error message indicating it failed and the error that occurred
            this.logger.error('Failed to delete password', {
                dynamoDB: {
                    table: this.TABLE_NAME,
                    passwordId,
                    error,
                },
            });

            // Reject/throw an exception that indicates that DynamoDB is down and unavailable
            return Promise.reject(
                PasswordManagerException.serviceUnavailable().withErrorCode(PasswordManagerErrorCodeEnum.DynamoDBDown),
            );
        }
    }

    public async deletePasswordsForClientId(clientId: string): Promise<void> {
        // Delete all the passwords for a client ID. Here you will need
        // to get all the passwords that a client has. After getting them delete
        // all of them. Take a look at the 'batchDelete' method on the 'dynamoDBClient' class
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async updatePassword(passwordId: string, input: PasswordInput): Promise<Password> {
        try {
            // Construct an UpdateCommandInput type which contains the table name,
            // the key to query by which is the passwordId, along with the update expressions.
            // This command will update the password record's name, website, login, value, clientId, and the updatedDate
            const entry = <UpdateCommandInput>{
                TableName: this.TABLE_NAME,
                Key: {
                    passwordId: passwordId,
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
                    ':name': input.name,
                    ':website': input.website,
                    ':login': input.login,
                    ':value': input.value,
                    ':clientId': input.clientId,
                    ':updatedDate': new Date().toISOString(),
                },
                ConditionExpression: 'attribute_exists(passwordId)',
            };

            // Send the UpdateCommandInput request to DynamoDB
            const result = await this.dynamoDBClient.update(this.TABLE_NAME, entry);

            // Log an info message stating that the password was updated successfully
            this.logger.info('Successfully updated the password', {
                dynamoDB: {
                    table: this.TABLE_NAME,
                    passwordId,
                },
            });

            // Return the updated password record
            return result.Attributes as Password;
        } catch (error) {
            // If something goes wrong, log an error message indicating that updating the password failed
            this.logger.error('Failed to update password', {
                dynamoDB: {
                    table: this.TABLE_NAME,
                    passwordId,
                    error,
                },
            });

            // Reject/throw an exception that indicates that DynamoDB is down
            return Promise.reject(
                PasswordManagerException.serviceUnavailable().withErrorCode(PasswordManagerErrorCodeEnum.DynamoDBDown),
            );
        }
    }
}

export const PASSWORD_REPOSITORY: InjectionToken = 'PasswordRepository';

export default <ClassProvider>{
    provide: PASSWORD_REPOSITORY,
    useClass: PasswordRepository,
};
