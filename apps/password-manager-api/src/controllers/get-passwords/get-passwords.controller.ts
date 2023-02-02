import { Controller, HttpCode, Get, Param, UseInterceptors } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { PasswordManagerResponseInterceptor } from '@password-manager:api:interceptors';
import { APIUrlsEnum, GetPasswordsResponse, Password } from '@password-manager:types';

@Controller(APIUrlsEnum.GetPasswords)
@UseInterceptors(PasswordManagerResponseInterceptor<GetPasswordsResponse>)
export class GetPasswordsController {
    @Get()
    @HttpCode(HttpStatus.OK)
    public handler(@Param('clientId') clientId: string): GetPasswordsResponse {
        return {
            statusCode: HttpStatus.OK,
            message: 'Ok',
            passwords: [
                <Password>{
                    passwordId: 'id',
                    name: 'Amazon',
                    website: 'https://amazon.com',
                    login: 'login',
                    value: 'P@ssword123',
                    clientId: clientId,
                },
            ],
        };
    }
}
