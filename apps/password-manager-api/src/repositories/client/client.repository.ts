/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { ClassProvider, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IClientRepository } from '@password-manager:api:interfaces';
import { DYNAMODB_CLIENT, LOGGER } from '@password-manager:api:providers';
import { PasswordManagerException } from '@password-manager:api:types';
import { IDynamoDBClient } from '@password-manager:dynamodb-client';
import { ILogger } from '@password-manager:logger';
import { Client } from '@password-manager:types';

@Injectable()
export class ClientRepository implements IClientRepository {
    private readonly TABLE_NAME = 'Client';

    constructor(
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(DYNAMODB_CLIENT)
        private readonly dynamoDBClient: IDynamoDBClient,
    ) {}

    public async getClientById(clientId: string): Promise<Client> {
        try {
            const input = <GetCommandInput>{
                TableName: this.TABLE_NAME, // update dynamo client to use this
                Key: {
                    clientId: clientId,
                },
            };

            const result = await this.dynamoDBClient.get(this.TABLE_NAME, input);

            if (!result.Item) {
                this.logger.warn("Couldn't find the client by ID", { dynamoDB: { table: this.TABLE_NAME } });
                return Promise.reject(PasswordManagerException.notFound().withMessage('Client not found by ID.'));
            }

            this.logger.info('Found client by ID', { dynamoDB: { table: this.TABLE_NAME } });

            return result.Item as Client;
        } catch (error) {
            this.logger.error('Failed to find the client by ID', {
                dynamoDB: { table: this.TABLE_NAME },
                error: error,
            });
            return Promise.reject(
                PasswordManagerException.serviceUnavailable().withMessage('Service is temporarily unavailable.'),
            );
        }
    }

    public async getClientByLogin(login: string): Promise<Client> {
        try {
            const input = <QueryCommandInput>{
                TableName: this.TABLE_NAME,
                IndexName: 'LoginIndex',
                KeyConditionExpression: 'login = :login',
                ExpressionAttributeValues: {
                    ':login': login,
                },
            };

            const result = await this.dynamoDBClient.query(this.TABLE_NAME, input);

            if (!result.Items || result.Items.length === 0) {
                this.logger.info('Client not found by login', { dynamoDB: { table: this.TABLE_NAME, login: login } });

                return Promise.reject(
                    PasswordManagerException.notFound<Partial<Client>>()
                        .withMessage('No client was found for the provided login.')
                        .withContext({ login: login }),
                );
            }

            this.logger.info('Successfully found the client with the provided login', {
                dynamoDB: { table: this.TABLE_NAME, login: login },
            });

            // There should only be one client per login/username so take
            // the first item in the array
            return result.Items[0] as Client;
        } catch (error) {
            this.logger.error('Failed to find the client by login', {
                dynamoDB: { table: this.TABLE_NAME, login: login },
                error: error,
            });

            return Promise.reject(
                PasswordManagerException.serviceUnavailable<Partial<Client>>()
                    .withMessage('Service is temporarily unavailable.')
                    .withContext({ login: login }),
            );
        }
    }

    public createClient(client: Client): Promise<Client> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public deleteClient(clientId: string): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public updateClient(client: Client): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}

export const CLIENT_REPOSITORY: InjectionToken = 'ClientRepository';

export default <ClassProvider>{
    provide: CLIENT_REPOSITORY,
    useClass: ClientRepository,
};
