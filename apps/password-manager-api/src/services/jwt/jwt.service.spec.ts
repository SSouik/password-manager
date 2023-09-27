import { HttpStatus } from '@nestjs/common';
import { JWTBuilder } from '@password-manager:api:builders/jwt/jwt.builder';
import { PasswordManagerException } from '@password-manager:api:types';
import { Logger } from '@password-manager:logger';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';

import { JWTService } from './jwt.service';

describe('JWTService Tests', () => {
    const mockLogger = Logger.prototype;
    const mockJWTBuilder = JWTBuilder.prototype;
    let service: JWTService;

    beforeEach(() => {
        ['info', 'debug', 'warn', 'error'].forEach((level) => {
            mockLogger[level] = jest.fn();
        });

        mockJWTBuilder.addClaim = jest.fn().mockReturnThis();
        mockJWTBuilder.addIssuedAt = jest.fn().mockReturnThis();
        mockJWTBuilder.addExpiresAt = jest.fn().mockReturnThis();

        service = new JWTService(mockLogger, mockJWTBuilder);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Create Token', () => {
        it('Creates a new token and returns it along with when it expires', async () => {
            mockJWTBuilder.sign = jest.fn().mockResolvedValue('token');

            const actual = await service.create({ clientId: '123' });

            expect(actual.token).toBe('token');
            expect(actual.expiresIn).toBe(3600);

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Successfully created a token for the client');
        });
    });

    describe('Verify Token', () => {
        it('Validates a valid token that belongs to the client', async () => {
            mockJWTBuilder.verify = jest.fn().mockResolvedValue({ clientId: '123' });

            await service.verify('token', '123');

            expect(mockLogger.info).toBeCalledTimes(1);
            expect(mockLogger.info).toBeCalledWith('Successfully verified the clients token');
        });

        it('Throws a forbidden exception when the client attempts to validate a token that is not theirs', async () => {
            mockJWTBuilder.verify = jest.fn().mockResolvedValue({ clientId: '123' });

            try {
                await service.verify('token', '1234');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.FORBIDDEN);
                expect(exception.message).toBe('Token does not belong to the client.');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.TokenDoesNotBelongToClient);

                expect(mockLogger.warn).toBeCalledTimes(1);
                expect(mockLogger.warn).toBeCalledWith('Client attempted to verify a token that is not theirs', {
                    claimsId: '123',
                    token: 'token',
                });
            }
        });

        it('Throws a forbidden exception when the token is not valid', async () => {
            const err = new Error('invalid token');

            mockJWTBuilder.verify = jest.fn().mockRejectedValue(err);

            try {
                await service.verify('token', '123');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.FORBIDDEN);
                expect(exception.message).toBe('Token failed verification.');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.InvalidToken);

                expect(mockLogger.error).toBeCalledTimes(1);
                expect(mockLogger.error).toBeCalledWith('Failed to verify the clients token', {
                    token: 'token',
                    error: err,
                });
            }
        });
    });
});
