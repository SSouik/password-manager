import { PasswordManagerErrorCodeEnum } from '../../enums';

export type PasswordManagerError = {
    code: PasswordManagerErrorCodeEnum;
    details: string; // description of what the error is
};
