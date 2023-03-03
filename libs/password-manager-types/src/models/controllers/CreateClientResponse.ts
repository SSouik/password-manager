import { ResponseBase } from './ResponseBase';

export type CreateClientResponse = ResponseBase & {
    clientId: string;
};
