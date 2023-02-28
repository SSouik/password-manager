import { Nullable } from '../../common';

export type UpdatePasswordRequest = {
    name: string;
    website: Nullable<string>;
    login: string;
    value: string;
};
