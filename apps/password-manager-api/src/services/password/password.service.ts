// Remove below line after implementing the service
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IPasswordRepository, IPasswordService } from '@password-manager:api:interfaces';
import { PasswordInput, PasswordManagerException } from '@password-manager:api:types';
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
    constructor(private readonly passwordRepository: IPasswordRepository, private readonly crypto: Crypto) {}

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
        // Verify that the password exists
        // If it doesn't, this method will reject with a 404 (Not Found) exception
        await this.passwordRepository.getPasswordById(passwordId);

        // Encrypt the requested password record's value
        const encryptedPassword = this.crypto.encrypt(request.value);

        // Construct the PasswordInput type by spreading the
        // requested password over it and overwriting the value
        // with the encrypted value
        const input = <PasswordInput>{
            ...request,
            clientId,
            value: encryptedPassword,
        };

        // Update the password with the constructed input above
        const password = await this.passwordRepository.updatePassword(passwordId, input);

        return {
            password,
        };
    }
}
