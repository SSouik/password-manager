// Remove eslint override below once the remaining methods are implemented
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { ClassProvider, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { IPasswordRepository } from '@password-manager:api:interfaces';
import { DYNAMODB_CLIENT, LOGGER } from '@password-manager:api:providers';
import { PasswordManagerException } from '@password-manager:api:types';
import { IDynamoDBClient } from '@password-manager:dynamodb-client';
import { ILogger } from '@password-manager:logger';
import { Password } from '@password-manager:types';

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
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async getPasswordsByClientId(clientId: string): Promise<Array<Password>> {
        try {
            const input = <QueryCommandInput>{
                TableName: this.TABLE_NAME,
                IndexName: 'ClientIdIndex',
                KeyConditionExpression: 'clientId = :clientId',
                ExpressionAttributeValues: {
                    ':clientId': clientId,
                },
            };

            const result = await this.dynamoDBClient.query(this.TABLE_NAME, input);

            if (!result.Items || result.Items.length === 0) {
                this.logger.info('No passwords were found for client');

                return Promise.reject(
                    PasswordManagerException.notFound().withMessage('No passwords were found for the client.'),
                );
            }

            this.logger.info('Successfully found passwords for client');
            return result.Items as Array<Password>;
        } catch (error) {
            this.logger.error('Failed to get passwords for the client', { error });

            return Promise.reject(
                PasswordManagerException.serviceUnavailable().withMessage('Service is temporarily unavailable.'),
            );
        }
    }

    public async createPassword(password: Password): Promise<Password> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async deletePassword(passwordId: string): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async deletePasswordsForClientId(clientId: string): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async updatePassword(password: Password): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}

export const PASSWORD_REPOSITORY: InjectionToken = 'PasswordRepository';

export default <ClassProvider>{
    provide: PASSWORD_REPOSITORY,
    useClass: PasswordRepository,
};
