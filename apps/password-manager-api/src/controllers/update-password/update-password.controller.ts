// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Param, Inject, UseGuards, Post, Body, Put } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@password-manager:api:guards';
import { IPasswordRepository } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import {
    APIUrlsEnum,
    CreatePasswordRequest,
    CreatePasswordResponse,
    UpdatePasswordRequest,
} from '@password-manager:types';

/*
 * Controller: UpdatePasswordController
 * Purpose: Update an already existing password
 *
 * Dependencies:
 *  IPasswordRepository: Needed to update the password in DynamoDB
 *  Crypto: Needed to encrypt the password's value before updating it in DynamoDB
 *
 * Returns:
 *  StatusCode: 202
 *
 * Summary:
 *  This controller is dedicated to accepting a request to update an
 *  existing password in DynamoDB. The password's value needs to be
 *  encryted before being save in DynamoDB. However, before ecryption
 *  or any other work takes place, the controller should check to see
 *  if the requested password exists. If not, then return a 404 indicating
 *  the requested password does not exist.
 */

@Controller(APIUrlsEnum.UpdatePassword)
@UseGuards(AuthGuard)
export class UpdatePasswordController {
    constructor(
        @Inject(PASSWORD_REPOSITORY)
        private readonly passwordRepository: IPasswordRepository,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
    ) {}

    /**
     * Save/create a new password in DynamoDB for the client
     * @param clientId ID of the client
     * @param passwordId ID of the password to update
     * @param request Attributes of the password to update
     *
     * @see {@link UpdatePasswordRequest}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when the requsted password to update does not exist (Not found 404)
     * or when DynamoDB is unavailable (Service Unavailable 503)
     */
    @Put()
    @HttpCode(HttpStatus.ACCEPTED)
    public async handler(
        @Param('clientId')
        clientId: string,
        @Param('passwordId')
        passwordId: string,
        @Body()
        request: UpdatePasswordRequest,
    ): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
