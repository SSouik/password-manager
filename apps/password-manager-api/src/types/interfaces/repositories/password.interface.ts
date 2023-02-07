import { Password } from '@password-manager:types';

export interface IPasswordRepository {
    getPasswordById(passwordId: string): Promise<Password>;
    getPasswordsByClientId(clientId: string): Promise<Array<Password>>;
    createPassword(password: Password): Promise<Password>;
    deletePassword(passwordId: string): Promise<void>;
    deletePasswordsForClientId(clientId: string): Promise<void>;
    updatePassword(password: Password): Promise<void>;
}
