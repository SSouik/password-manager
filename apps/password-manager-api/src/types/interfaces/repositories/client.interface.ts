import { Client } from '@password-manager:types';

export interface IClientRepository {
    getClientById(clientId: string): Promise<Client>;
    createClient(client: Client): Promise<Client>;
    deleteClient(clientId: string): Promise<void>;
    updateClient(client: Client): Promise<void>;
}
