import { ClassProvider, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IJWTBuilder, IJWTService } from '@password-manager:api:interfaces';
import { JWT_BUILDER } from '@password-manager:api:providers/factories/builders/jwt-builder.provider';
import { LOGGER } from '@password-manager:api:providers/factories/logger/logger.provider';
import { PasswordManagerException } from '@password-manager:api:types';
import { DateUtils } from '@password-manager:api:utils';
import { ILogger } from '@password-manager:logger';
import { JWTPayload, AuthToken } from '@password-manager:types';

@Injectable()
export class JWTService implements IJWTService {
    constructor(
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(JWT_BUILDER)
        private readonly jwtBuilder: IJWTBuilder<JWTPayload>,
    ) {}

    public async create(claims: JWTPayload): Promise<AuthToken> {
        const now = new Date();
        const expiration = DateUtils.addHours(now, 1);

        const token = await this.jwtBuilder
            .addClaim('clientId', claims.clientId)
            .addIssuedAt(now)
            .addExpiresAt(expiration)
            .sign();

        const expiresIn = (expiration.getTime() - now.getTime()) / 1000;

        this.logger.info('Successfully created a token for the client');

        return {
            token: token,
            expiresIn: expiresIn,
        };
    }

    public async verify(token: string, clientId: string): Promise<void> {
        try {
            const claims = await this.jwtBuilder.verify(token);

            const match = clientId === claims.clientId;

            if (!match) {
                this.logger.warn('Client attempted to verify a token that is not theirs', {
                    claimsId: claims.clientId,
                    token: token,
                });

                return Promise.reject(
                    PasswordManagerException.forbidden().withMessage('Token does not belong to the client.'),
                );
            }

            this.logger.info('Successfully verified the clients token');
        } catch (error) {
            this.logger.error('Failed to verify the clients token', { token: token, error: error });
            return Promise.reject(PasswordManagerException.forbidden().withMessage('Token failed verification.'));
        }
    }
}

export const JWT_SERVICE: InjectionToken = 'JWTService';

export default <ClassProvider>{
    provide: JWT_SERVICE,
    useClass: JWTService,
};
