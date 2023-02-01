/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from './Metadata';

export type PasswordManagerResponse = {
    clientId: string;
    metadata: Metadata;
    [key: string]: any;
};
