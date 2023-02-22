import { AuthToken } from '../AuthToken';
import { ResponseBase } from './ResponseBase';

export type LoginResponse = ResponseBase & {
    auth: AuthToken;
};
