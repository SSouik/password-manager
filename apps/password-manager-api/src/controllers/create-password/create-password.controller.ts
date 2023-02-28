// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Param, Inject, UseGuards, Post, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@password-manager:api:guards';
import { IPasswordRepository } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import { APIUrlsEnum, CreatePasswordRequest, CreatePasswordResponse } from '@password-manager:types';

/*
 * Controller: CreatePasswordController
 * Purpose: Create a password entry in DynamoDB for the client
 *
 * Dependencies:
 *  IPasswordRepository: Needed to save/create the password in DynamoDB
 *  Crypto: Needed to encrypt the password's value before saving in DynamoDB
 *
 * Returns:
 *  StatusCode: 201
 *  Body: CreatePasswordResponse
 *
 * Summary:
 *  This controller is dedicated to accepting a request to create a
 *  password for the client. The password's value needs to be encrypted
 *  before it is saved/created in DyanmoDB. This way the password's value
 *  is not sitting in a database in plain text. Also, the ID of the password
 *  should be generated before saving/creating the password. If all goes well, this
 *  controller should return the passwordId of the newly created Password.
 */

@Controller(APIUrlsEnum.CreatePassword)
@UseGuards(AuthGuard)
export class CreatePasswordController {
    constructor(
        @Inject(PASSWORD_REPOSITORY)
        private readonly passwordRepository: IPasswordRepository,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
    ) {}

    /**
     * Save/create a new password in DynamoDB for the client
     * @param clientId ID of the client
     * @param request Attributes of the password to create
     * @returns ID of the newly created password
     *
     * @see {@link CreatePasswordRequest}
     * @see {@link CreatePasswordResponse}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when DynamoDB is unavailable (Service Unavailable 503)
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async handler(
        @Param('clientId')
        clientId: string,
        @Body()
        request: CreatePasswordRequest,
    ): Promise<CreatePasswordResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
