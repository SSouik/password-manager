import { HttpStatus } from '@nestjs/common';
import { SecurityQuestionRepository } from '@password-manager:api:repositories/security-question/security-question.repository';
import { JWTService } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

import { ChallengeController } from './challenge.controller';

describe('ChallengeController Tests', () => {
    const mockSecurityQuestionRepository = SecurityQuestionRepository.prototype;
    const mockCrypto = Crypto.prototype;
    const mockJWTService = JWTService.prototype;
    let controller: ChallengeController;

    beforeEach(() => {
        controller = new ChallengeController(mockSecurityQuestionRepository, mockCrypto, mockJWTService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Security Question', () => {
        // Remove this test after the method is implemented
        it('Method not implemented', async () => {
            try {
                await controller.getSecurityQuestion('login');
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Place all unit tests for successful results (status code 200) here
        describe('Successful Results', () => {});

        // Place all unit tests for not found results (status code 404)
        describe('Not Found Results', () => {});

        // Place all unit tests for service unavailable results (status code 503) here
        describe('Service Unavailable Results', () => {});
    });

    describe('Answer Security Question', () => {
        // Remove this test after the controller is implemented
        it('Method not implemented', async () => {
            try {
                await controller.answerSecurityQuestion('login', { answer: 'answer' });
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordManagerException);

                const exception = error as PasswordManagerException<unknown>;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
            }
        });

        // Place all unit tests for successful results (status code 200) here
        describe('Successful Results', () => {});

        // Place all unit tests for not found results (status code 404)
        describe('Not Found Results', () => {});

        // Place all unit tests for service unavailable results (status code 503) here
        describe('Service Unavailable Results', () => {});
    });
});
