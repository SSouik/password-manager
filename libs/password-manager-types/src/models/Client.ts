import { Metadata } from './Metadata';

export type Client = {
    clientId: string;
    login: string;
    password: string;
    metadata: Metadata;
};
