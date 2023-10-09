// Remove below line after implementing the service
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassProvider, HttpStatus, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IPasswordRepository, IPasswordService } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import {
    CreatePasswordRequest,
    CreatePasswordResponse,
    GetPasswordsResponse,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
} from '@password-manager:types';

@Injectable()
export class PasswordService implements IPasswordService {
    constructor(
        @Inject(PASSWORD_REPOSITORY)
        private readonly passwordRepository: IPasswordRepository,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
    ) {}

    public async getPasswords(clientId: string): Promise<GetPasswordsResponse> {
        // This can throw an exception but that's ok. If it does, we want the filters to handle it
        const passwords = await this.passwordRepository.getPasswordsByClientId(clientId);

        // Decrypt each of the passwords
        passwords.forEach((passwordEntry) => {
            passwordEntry.value = this.crypto.decrypt(passwordEntry.value);
        });

        return {
            passwords: passwords,
        };
    }

    public async createPassword(clientId: string, request: CreatePasswordRequest): Promise<CreatePasswordResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async deletePassword(passwordId: string): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public async updatePassword(
        clientId: string,
        passwordId: string,
        request: UpdatePasswordRequest,
    ): Promise<UpdatePasswordResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}

export const PASSWORD_SERVICE: InjectionToken = 'PasswordService';

export default <ClassProvider>{
    provide: PASSWORD_SERVICE,
    useClass: PasswordService,
};