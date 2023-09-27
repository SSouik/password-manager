import { ClientResponse } from './ClientResponse';

import { AuthToken } from '../AuthToken';

export type LoginResponse = {
    client: ClientResponse;
    auth: AuthToken;
};
