import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { IJWTService } from '@password-manager:api:interfaces';
import { DependencyInjectionTokenEnum, PasswordManagerException } from '@password-manager:api:types';
import { ILogger, ILogMessageFactory } from '@password-manager:logger';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
    constructor(
        @Inject(DependencyInjectionTokenEnum.LOG_MESSAGE_FACTORY)
        private readonly logMessageFactory: ILogMessageFactory,
        @Inject(DependencyInjectionTokenEnum.LOGGER)
        private readonly logger: ILogger,
        @Inject(DependencyInjectionTokenEnum.JWT_SERVICE)
        private readonly jwtService: IJWTService,
    ) {}

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        // Authenticated routes will have the client ID in the route
        const clientId = request.params.clientId;
        const token = request.headers.authorization?.replace('Bearer ', '') ?? null;

        this.logMessageFactory.setContext('clientId', clientId);

        if (!token) {
            this.logger.warn('Client attempted to enter a protected route without a token');
            return Promise.reject(
                PasswordManagerException.forbidden()
                    .withMessage('Client is forbidden from accessing the requested resource.')
                    .withErrorCode(PasswordManagerErrorCodeEnum.NoToken),
            );
        }

        // Validate the token against the client's ID
        // If the token is valid and belongs to the client, they are authorized to access the resource
        // Otherwise, return a 403 stating the client is unauthorized from accessing the resource.
        return this.jwtService
            .verify(token, clientId)
            .then(() => true)
            .catch(() => {
                return Promise.reject(
                    PasswordManagerException.forbidden()
                        .withMessage('Client is forbidden from accessing the requested resource.')
                        .withErrorCode(PasswordManagerErrorCodeEnum.InvalidToken),
                );
            });
    }
}
