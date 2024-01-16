// Remove below line when the service has been implemented
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus } from '@nestjs/common';
import { IClientRepository, IClientService, IPasswordRepository } from '@password-manager:api:interfaces';
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
        private readonly clientRepository: IClientRepository,
        private readonly passwordRepository: IPasswordRepository,
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

    public updateClient(clientId: string, request: UpdateClientRequest): Promise<UpdateClientResponse> {
        // This method should do everything that is needed to update a client.
        // The first step should verify that the client exists. You should use the
        // ClientRepository to do so. If the client does not exist, this method should
        // reject with a 404 (Not Found) exception
        // If the client does exist, then you can proceed to update the client.
        // Before updating the client, the requested password should be encrypted. Use the Crypto dependency
        // to help with that. Lastly, after encrypting the password, you can update the client by
        // using the ClientRepository
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
