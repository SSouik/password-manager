// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Param, Inject, UseGuards, Delete } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@password-manager:api:guards';
import { IPasswordRepository } from '@password-manager:api:interfaces';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { APIUrlsEnum } from '@password-manager:types';

/*
 * Controller: DeletePasswordController
 * Purpose: Delete a password record in DynamoDB
 *
 * Dependencies:
 *  IPasswordRepository: Needed to delete the password in DynamoDB
 *
 * Returns:
 *  StatusCode: 202
 *
 * Summary:
 *  This controller is dedicated to deleting a password record
 *  in DynamoDB. All that should be needed is the ID of the password
 *  and then the password record in DynamoDB can be deleted. If all
 *  goes well, ths should return a 202 (Accepted).
 */

@Controller(APIUrlsEnum.DeletePassword)
@UseGuards(AuthGuard)
export class DeletePasswordController {
    constructor(
        @Inject(PASSWORD_REPOSITORY)
        private readonly passwordRepository: IPasswordRepository,
    ) {}

    /**
     * Delete a password record in DynamoDB
     * @param passwordId ID of the password to delete
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when the requested password does not exist (Not found 404)
     * or when DynamoDB is unavailable (Serivce unavailable 503)
     */
    @Delete()
    @HttpCode(HttpStatus.ACCEPTED)
    public async handler(
        @Param('passwordId')
        passwordId: string,
    ): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
