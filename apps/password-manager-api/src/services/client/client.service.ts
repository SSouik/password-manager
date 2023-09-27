// Remove below line when the service has been implemented
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassProvider, Inject, InjectionToken } from '@nestjs/common';
import {
    IClientRepository,
    IClientService,
    IPasswordRepository,
    ISecurityQuestionRepository,
} from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { CLIENT_REPOSITORY } from '@password-manager:api:repositories/client/client.repository';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories/password/password.repository';
import { SECURITY_QUESTION_REPOSITORY } from '@password-manager:api:repositories/security-question/security-question.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import {
    CreateClientRequest,
    CreateClientResponse,
    UpdateClientRequest,
    UpdateClientResponse,
} from '@password-manager:types';

export class ClientService implements IClientService {
    constructor(
        @Inject(CLIENT_REPOSITORY)
        private readonly clientRepository: IClientRepository,
        @Inject(PASSWORD_REPOSITORY)
        private readonly passwordRepository: IPasswordRepository,
        @Inject(SECURITY_QUESTION_REPOSITORY)
        private readonly securityQuestionRepository: ISecurityQuestionRepository,
        @Inject(CRYPTO)
        private readonly crytpo: Crypto,
    ) {}

    /**
     * Save/create a new client in DynamoDB
     * @param request Attributes of the client to create
     * @returns The ID of the newly created client
     *
     * @remarks
     * This method is dedicated to accepting a request to create
     * a new client in DynamoDB. The password of the client should
     * be encrypted before being saved in DynamoDB. The client ID needs
     * to be generated as well before creating the client. If all goes well,
     * the method should return the newly created client ID.
     *
     * @see {@link CreateClientRequest}
     * @see {@link CreateClientResponse}
     *
     * @throws {@link PasswordManagerException} -
     * This can be thrown when DynamoDB is unavailable (Service Unavailable 503)
     */
    public createClient(request: CreateClientRequest): Promise<CreateClientResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    /**
     * Delete a client along with their passwords and security question
     * @param clientId ID of the client
     * @returns Statuscode and message indicating the result of the request
     *
     * @remarks
     * This method is dedicated to deleting a client along with anything else
     * that is tied to them. This means deleting the client, then their passwords
     * and security question. If all goes well, return a 202 (Accepted)
     *
     * @see {@link ResponseBase}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown for multiple reasons. The client was not found (404 Not Found)
     * or when DynamoDB is unavailable (Service Unavailable 503)
     */
    public deleteClient(clientId: string): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    /**
     * Update a client's login and password in DynamoDB
     * @param clientId ID of the client
     * @param request Attributes of the client to update
     * @returns Statuscode and message indicating the result of the request
     *
     * @remarks
     * This method is dedicated to updating the client's login and password.
     * The client's password must be encrypted before updating in DynamoDB.
     * If all goes well, this should return a 202 (Accepted)
     *
     * @see {@link UpdateClientRequest}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when the client does not exist (404 Not Found)
     * or when DynamoDB is unavailable (503 Service Unavailable)
     */
    public updateClient(clientId: string, request: UpdateClientRequest): Promise<UpdateClientResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}

export const CLIENT_SERVICE: InjectionToken = 'ClientService';

export default <ClassProvider>{
    provide: CLIENT_SERVICE,
    useClass: ClientService,
};
