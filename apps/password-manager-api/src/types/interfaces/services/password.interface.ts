import {
    CreatePasswordRequest,
    CreatePasswordResponse,
    GetPasswordsResponse,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
} from '@password-manager:types';

export interface IPasswordService {
    getPasswords(clientId: string): Promise<GetPasswordsResponse>;
    createPassword(clientId: string, request: CreatePasswordRequest): Promise<CreatePasswordResponse>;
    deletePassword(passwordId: string): Promise<void>;
    updatePassword(
        clientId: string,
        passwordId: string,
        request: UpdatePasswordRequest,
    ): Promise<UpdatePasswordResponse>;
}
