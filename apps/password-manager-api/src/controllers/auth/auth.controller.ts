import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IAuthService } from '@password-manager:api:interfaces';
import { DependencyInjectionTokenEnum } from '@password-manager:api:types';
import { LoginRequest, LoginResponse } from '@password-manager:types';

@Controller('login')
export class AuthController {
    constructor(@Inject(DependencyInjectionTokenEnum.AUTH_SERVICE) private readonly authService: IAuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    public login(@Body() request: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(request);
    }
}
