import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IAuthService } from '@password-manager:api:interfaces';
import { AUTH_SERVICE } from '@password-manager:api:services/auth/auth.service';
import { LoginRequest, LoginResponse } from '@password-manager:types';

@Controller('login')
export class AuthController {
    constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    public async login(@Body() request: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(request);
    }
}
