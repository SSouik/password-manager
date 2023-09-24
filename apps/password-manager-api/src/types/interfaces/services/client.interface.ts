import {
    CreateClientRequest,
    CreateClientResponse,
    ResponseBase,
    UpdateClientRequest,
    UpdateClientResponse,
} from '@password-manager:types';

export interface IClientService {
    createClient(request: CreateClientRequest): Promise<CreateClientResponse>;
    deleteClient(clientId: string): Promise<ResponseBase>;
    updateClient(clientId: string, request: UpdateClientRequest): Promise<UpdateClientResponse>;
}
