import { ClientInput } from '@password-manager:api:types';
import { Client } from '@password-manager:types';

export interface IClientRepository {
    getClientById(clientId: string): Promise<Client>;
    getClientByLogin(login: string): Promise<Client>;
    createClient(input: ClientInput): Promise<Client>;
    deleteClient(clientId: string): Promise<void>;
    updateClient(clientId: string, input: ClientInput): Promise<Client>;
}
