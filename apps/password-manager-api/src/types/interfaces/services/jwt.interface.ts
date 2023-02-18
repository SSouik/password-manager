import { AuthToken, JWTPayload } from '@password-manager:types';

export interface IJWTService {
    create(claims: JWTPayload): Promise<AuthToken>;
    verify(token: string, clientId: string): Promise<void>;
}
