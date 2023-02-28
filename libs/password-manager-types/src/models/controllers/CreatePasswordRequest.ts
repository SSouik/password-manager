import { Nullable } from '../../common';

export type CreatePasswordRequest = {
    name: string;
    website: Nullable<string>;
    login: string;
    value: string;
};
