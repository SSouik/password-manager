// Remove below line when the service has been implemented
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassProvider, HttpStatus, Inject, InjectionToken } from '@nestjs/common';
import { IClientRepository, IClientService, IPasswordRepository } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { CLIENT_REPOSITORY } from '@password-manager:api:repositories/client/client.repository';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import {
    CreateClientRequest,
    CreateClientResponse,
    PasswordManagerErrorCodeEnum,
    UpdateClientRequest,
    UpdateClientResponse,
} from '@password-manager:types';

export class ClientService implements IClientService {
    constructor(
        @Inject(CLIENT_REPOSITORY)
        private readonly clientRepository: IClientRepository,
        @Inject(PASSWORD_REPOSITORY)
        private readonly passwordRepository: IPasswordRepository,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
    ) {}

    public async createClient(request: CreateClientRequest): Promise<CreateClientResponse> {
        await this.clientRepository
            .getClientByLogin(request.login)
            .then(() =>
                Promise.reject(
                    PasswordManagerException.badRequest()
                        .withMessage('Login is already in use')
                        .withErrorCode(PasswordManagerErrorCodeEnum.LoginAlreadyExists),
                ),
            )
            .catch((error) => {
                // If no client was found by the requested login, resolve and
                // move on to creating the client
                if (error instanceof PasswordManagerException && error.statusCode === HttpStatus.NOT_FOUND) {
                    return Promise.resolve();
                }

                // If some other error occurs, reject with it
                return Promise.reject(error);
            });

        // Encrypt the password
        const encryptedPassword = this.crypto.encrypt(request.password);

        const client = await this.clientRepository.createClient({ login: request.login, password: encryptedPassword });

        return {
            client: {
                clientId: client.clientId,
                login: client.login,
                metadata: client.metadata,
            },
        };
    }

    public async deleteClient(clientId: string): Promise<void> {
        await this.clientRepository.deleteClient(clientId);
        await this.passwordRepository.deletePasswordsForClientId(clientId);
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
