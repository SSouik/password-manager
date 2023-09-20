import { LoginRequest, LoginResponse } from '@password-manager:types';

export interface IAuthService {
    login(request: LoginRequest): Promise<LoginResponse>;
}
