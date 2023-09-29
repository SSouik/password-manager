import { Metadata } from './Metadata';

import { Nullable } from '../common';

export type Password = {
    passwordId: string;
    name: string;
    website: Nullable<string>;
    login: string;
    value: string;
    clientId: string;
    metadata: Metadata;
};
