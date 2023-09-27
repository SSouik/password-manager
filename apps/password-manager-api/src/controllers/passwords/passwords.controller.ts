// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Get, Param, Inject, UseGuards, Post, Body, Delete, Put } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@password-manager:api:guards';
import { PASSWORD_SERVICE } from '@password-manager:api:services/password/password.service';
import { IPasswordService, PasswordManagerException } from '@password-manager:api:types';
import {
    CreatePasswordRequest,
    CreatePasswordResponse,
    GetPasswordsResponse,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
} from '@password-manager:types';

@Controller('clients/:clientId/passwords')
@UseGuards(AuthGuard)
export class PasswordsController {
    constructor(@Inject(PASSWORD_SERVICE) private readonly passwordService: IPasswordService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public getPasswords(@Param('clientId') clientId: string): Promise<GetPasswordsResponse> {
        return this.passwordService.getPasswords(clientId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public createPassword(
        @Param('clientId')
        clientId: string,
        @Body()
        request: CreatePasswordRequest,
    ): Promise<CreatePasswordResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    @Delete(':passwordId')
    @HttpCode(HttpStatus.ACCEPTED)
    public deletePassword(
        @Param('passwordId')
        passwordId: string,
    ): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    @Put(':passwordId')
    @HttpCode(HttpStatus.ACCEPTED)
    public async updatePassword(
        @Param('clientId')
        clientId: string,
        @Param('passwordId')
        passwordId: string,
        @Body()
        request: UpdatePasswordRequest,
    ): Promise<UpdatePasswordResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
