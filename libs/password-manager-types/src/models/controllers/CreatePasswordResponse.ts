import { ResponseBase } from './ResponseBase';

export type CreatePasswordResponse = ResponseBase & {
    passwordId: string;
};
