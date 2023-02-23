/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseBase } from './controllers';
import { Metadata } from './Metadata';

export type PasswordManagerResponse = ResponseBase & {
    clientId: string;
    metadata: Metadata;
    [key: string]: any;
};
