import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { IJWTService } from '@password-manager:api:interfaces';
import { LOGGER, LOG_MESSAGE_FACTORY } from '@password-manager:api:providers';
import { JWT_SERVICE } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { ILogger, ILogMessageFactory } from '@password-manager:logger';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
    constructor(
        @Inject(LOG_MESSAGE_FACTORY)
        private readonly logMessageFactory: ILogMessageFactory,
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(JWT_SERVICE)
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
                PasswordManagerException.forbidden().withMessage(
                    'Client is forbidden from accessing the requested resource.',
                ),
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
                    PasswordManagerException.forbidden().withMessage(
                        'Client is forbidden from accessing the requested resource.',
                    ),
                );
            });
    }
}
