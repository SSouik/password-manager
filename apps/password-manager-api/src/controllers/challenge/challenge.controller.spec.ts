import { HttpStatus } from '@nestjs/common';
import { ChallengeService } from '@password-manager:api:services/challenge/challenge.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';

import { ChallengeController } from './challenge.controller';

describe('ChallengeController Tests', () => {
    const mockChallenge = ChallengeService.prototype;
    let controller: ChallengeController;

    beforeEach(() => {
        controller = new ChallengeController(mockChallenge);
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

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
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

                const exception = error as PasswordManagerException;
                expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
                expect(exception.message).toBe('Not Implemented');
                expect(exception.errorCode).toBe(PasswordManagerErrorCodeEnum.NotImplemented);
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
