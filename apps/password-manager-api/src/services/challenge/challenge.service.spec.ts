import { HttpStatus } from '@nestjs/common';
import { SecurityQuestionRepository } from '@password-manager:api:repositories/security-question/security-question.repository';
import { JWTService } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

import { ChallengeService } from './challenge.service';

describe('ChallengeSecurity Tests', () => {
    const mockSecurityQuestionRepository = SecurityQuestionRepository.prototype;
    const mockCrypto = Crypto.prototype;
    const mockJWTService = JWTService.prototype;
    let service: ChallengeService;

    beforeEach(() => {
        service = new ChallengeService(mockSecurityQuestionRepository, mockCrypto, mockJWTService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Security Question', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await service.getSecurityQuestion('login');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });
    });

    describe('Answer Security Question', () => {
        // Remove this test after the service is implemented
        it('Method not implemented', async () => {
            try {
                await service.answerSecurityQuestion('login', { answer: 'answer' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });
    });
});
