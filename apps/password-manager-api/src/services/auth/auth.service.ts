import { ClassProvider, HttpStatus, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IAuthService, IClientRepository, IJWTService } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { CLIENT_REPOSITORY } from '@password-manager:api:repositories/client/client.repository';
import { JWT_SERVICE } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import { LoginRequest, LoginResponse, PasswordManagerErrorCodeEnum } from '@password-manager:types';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(CLIENT_REPOSITORY)
        private readonly clientRepository: IClientRepository,
        @Inject(JWT_SERVICE)
        private readonly jwtService: IJWTService,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
    ) {}

    public async login(request: LoginRequest): Promise<LoginResponse> {
        const client = await this.clientRepository
            .getClientByLogin(request.login)
            .catch((error: PasswordManagerException) => {
                // If no client exists with the requested login, instead of
                // responding with a 404, respond with a 401.
                // This will tell consumers that the login and password combination is invalid.
                // No need to provide context of logins that do or do not exist.
                if (error.statusCode === HttpStatus.NOT_FOUND) {
                    return Promise.reject(
                        PasswordManagerException.unauthorized()
                            .withMessage('Login and password combination is invalid.')
                            .withErrorCode(error.errorCode), // Using same error code to know the true error
                    );
                }

                return Promise.reject(error);
            });

        // Decrypt the client's password to compare to the login request's password
        const decryptedPassword = this.crypto.decrypt(client.password);

        // If the requested password does not equal the stored password,
        // then respond with a 401 and a message stating that the login and password combination is invalid.
        if (request.password !== decryptedPassword) {
            return Promise.reject(
                PasswordManagerException.unauthorized()
                    .withMessage('Login and password combination is invalid.')
                    .withErrorCode(PasswordManagerErrorCodeEnum.CredentialsDoNotMatch),
            );
        }

        // Passwords match so issue the client a token
        const authToken = await this.jwtService.create({ clientId: client.clientId });

        return {
            client: {
                clientId: client.clientId,
                login: client.login,
                metadata: client.metadata,
            },
            auth: authToken,
        };
    }
}

export const AUTH_SERVICE: InjectionToken = 'AuthService';

export default <ClassProvider>{
    provide: AUTH_SERVICE,
    useClass: AuthService,
};
