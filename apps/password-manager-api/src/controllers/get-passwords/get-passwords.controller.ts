import { Controller, HttpCode, Get, Param, UseInterceptors, Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { PasswordManagerResponseInterceptor } from '@password-manager:api:interceptors';
import { IPasswordRepository } from '@password-manager:api:interfaces';
import { PASSWORD_REPOSITORY } from '@password-manager:api:repositories';
import { APIUrlsEnum, GetPasswordsResponse } from '@password-manager:types';

@Controller(APIUrlsEnum.GetPasswords)
@UseInterceptors(PasswordManagerResponseInterceptor<GetPasswordsResponse>)
export class GetPasswordsController {
    constructor(@Inject(PASSWORD_REPOSITORY) private readonly passwordRepository: IPasswordRepository) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async handler(@Param('clientId') clientId: string): Promise<GetPasswordsResponse> {
        // This can throw an exception but that's ok. If it does, we want the filters to handle it
        const passwordEntries = await this.passwordRepository.getPasswordsByClientId(clientId);

        // Will need to decrypt the password values once that is setup.
        // At rest the password values should be encrypted.

        return {
            statusCode: HttpStatus.OK,
            message: 'Ok',
            passwords: passwordEntries,
        };
    }
}
