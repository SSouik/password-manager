import {
    CreateClientRequest,
    CreateClientResponse,
    UpdateClientRequest,
    UpdateClientResponse,
} from '@password-manager:types';

export interface IClientService {
    createClient(request: CreateClientRequest): Promise<CreateClientResponse>;
    deleteClient(clientId: string): Promise<void>;
    updateClient(clientId: string, request: UpdateClientRequest): Promise<UpdateClientResponse>;
}
