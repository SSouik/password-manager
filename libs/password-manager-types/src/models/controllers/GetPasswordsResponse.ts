import { ResponseBase } from './ResponseBase';

import { Password } from '../Password';

export type GetPasswordsResponse = ResponseBase & {
    passwords: Array<Password>;
};
