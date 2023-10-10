import { CreatePasswordRequest } from '@password-manager:types';

export type PasswordInput = CreatePasswordRequest & {
    clientId: string;
};
