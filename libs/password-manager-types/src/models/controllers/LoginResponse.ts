import { ResponseBase } from './ResponseBase';

import { AuthToken } from '../AuthToken';

export type LoginResponse = ResponseBase & {
    clientId: string;
    auth: AuthToken;
};
