import { PasswordInput } from '@password-manager:api:types';
import { Password } from '@password-manager:types';

export interface IPasswordRepository {
    getPasswordById(passwordId: string): Promise<Password>;
    getPasswordsByClientId(clientId: string): Promise<Array<Password>>;
    createPassword(input: PasswordInput): Promise<Password>;
    deletePassword(passwordId: string): Promise<void>;
    deletePasswordsForClientId(clientId: string): Promise<void>;
    updatePassword(passwordId: string, input: PasswordInput): Promise<Password>;
}
