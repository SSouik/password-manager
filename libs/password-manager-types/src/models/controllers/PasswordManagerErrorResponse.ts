import { PasswordManagerError } from './PasswordManagerError';
import { PasswordManagerResponse } from './PasswordManagerResponse';

export type PasswordManagerErrorResponse = PasswordManagerResponse & {
    error: PasswordManagerError;
};
