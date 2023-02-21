/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassProvider, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IClientRepository } from '@password-manager:api:interfaces';
import { DYNAMODB_CLIENT, LOGGER } from '@password-manager:api:providers';
import { PasswordManagerException } from '@password-manager:api:types';
import { IDynamoDBClient } from '@password-manager:dynamodb-client';
import { ILogger } from '@password-manager:logger';
import { Client } from '@password-manager:types';

@Injectable()
export class ClientRepository implements IClientRepository {
    constructor(
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(DYNAMODB_CLIENT)
        private readonly dynamoDBClient: IDynamoDBClient,
    ) {}

    public getClientById(clientId: string): Promise<Client> {
        return Promise.reject(PasswordManagerException.notImplemented());
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
