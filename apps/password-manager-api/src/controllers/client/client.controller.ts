// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@password-manager:api:guards';
import { IClientService } from '@password-manager:api:interfaces';
import { CLIENT_SERVICE } from '@password-manager:api:services/client/client.service';
import { PasswordManagerException } from '@password-manager:api:types';
import {
    CreateClientRequest,
    CreateClientResponse,
    UpdateClientRequest,
    UpdateClientResponse,
} from '@password-manager:types';

@Controller('clients')
export class ClientController {
    constructor(
        @Inject(CLIENT_SERVICE)
        private readonly clientService: IClientService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public createClient(@Body() request: CreateClientRequest): Promise<CreateClientResponse> {
        return this.clientService.createClient(request);
    }

    @Delete(':clientId')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(AuthGuard)
    public deleteClient(@Param('clientId') clientId: string): Promise<void> {
        return this.clientService.deleteClient(clientId);
    }

    @Put(':clientId')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(AuthGuard)
    public async updateClient(
        @Param('clientId') clientId: string,
        @Body() request: UpdateClientRequest,
    ): Promise<UpdateClientResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
