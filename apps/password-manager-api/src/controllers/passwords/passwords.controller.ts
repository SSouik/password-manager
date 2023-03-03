// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Get, Param, Inject, UseGuards, Post, Body, Delete, Put } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@password-manager:api:guards';
import { IPasswordRepository } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import {
    CreatePasswordRequest,
    CreatePasswordResponse,
    GetPasswordsResponse,
    ResponseBase,
    UpdatePasswordRequest,
} from '@password-manager:types';

@Controller('clients/:clientId/passwords')
@UseGuards(AuthGuard)
export class PasswordsController {
    constructor(
        @Inject(PASSWORD_REPOSITORY)
        private readonly passwordRepository: IPasswordRepository,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getPasswords(@Param('clientId') clientId: string): Promise<GetPasswordsResponse> {
        // This can throw an exception but that's ok. If it does, we want the filters to handle it
        const passwords = await this.passwordRepository.getPasswordsByClientId(clientId);

        // Decrypt each of the passwords
        passwords.forEach((passwordEntry) => {
            passwordEntry.value = this.crypto.decrypt(passwordEntry.value);
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Ok',
            passwords: passwords,
        };
    }

    /**
     * Save/create a new password in DynamoDB for the client
     * @param clientId ID of the client
     * @param request Attributes of the password to create
     * @returns ID of the newly created password
     *
     * @remarks
     *  This method is dedicated to accepting a request to create a
     *  password for the client. The password's value needs to be encrypted
     *  before it is saved/created in DyanmoDB. This way the password's value
     *  is not sitting in a database in plain text. Also, the ID of the password
     *  should be generated before saving/creating the password. If all goes well, this
     *  method should return the passwordId of the newly created Password.
     *
     * @see {@link CreatePasswordRequest}
     * @see {@link CreatePasswordResponse}
     *
     * @throws {@link PasswordManagerException} - This can be thrown when DynamoDB is unavailable (Service Unavailable 503)
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async createPassword(
        @Param('clientId')
        clientId: string,
        @Body()
        request: CreatePasswordRequest,
    ): Promise<CreatePasswordResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    /**
     * Delete a password record in DynamoDB
     * @param passwordId ID of the password to delete
     *
     * @remarks
     * This method is dedicated to deleting a password record
     *  in DynamoDB. All that should be needed is the ID of the password
     *  and then the password record in DynamoDB can be deleted. If all
     *  goes well, ths should return a 202 (Accepted).
     *
     * @see {@link ResponseBase}
     *
     * @throws {@link PasswordManagerException} -
     * This can be thrown when the requested password does not exist (Not found 404)
     * or when DynamoDB is unavailable (Serivce unavailable 503)
     */
    @Delete(':passwordId')
    @HttpCode(HttpStatus.ACCEPTED)
    public async deletePassword(
        @Param('passwordId')
        passwordId: string,
    ): Promise<ResponseBase> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    /**
     * Save/create a new password in DynamoDB for the client
     * @param clientId ID of the client
     * @param passwordId ID of the password to update
     * @param request Attributes of the password to update
     *
     * @remarks
     * This method is dedicated to accepting a request to update an
     *  existing password in DynamoDB. The password's value needs to be
     *  encryted before being save in DynamoDB. However, before ecryption
     *  or any other work takes place, the controller should check to see
     *  if the requested password exists. If not, then return a 404 indicating
     *  the requested password does not exist.
     *
     * @see {@link UpdatePasswordRequest}
     * @see {@link ResponseBase}
     *
     * @throws {@link PasswordManagerException} -
     * This can be thrown when the requessted password to update does not exist (Not found 404)
     * or when DynamoDB is unavailable (Service Unavailable 503)
     */
    @Put(':passwordId')
    @HttpCode(HttpStatus.ACCEPTED)
    public async updatePassword(
        @Param('clientId')
        clientId: string,
        @Param('passwordId')
        passwordId: string,
        @Body()
        request: UpdatePasswordRequest,
    ): Promise<ResponseBase> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
