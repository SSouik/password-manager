import { DynamoDBClient } from '@password-manager:dynamodb-client';
import { Logger } from '@password-manager:logger';

import { SecurityQuestionRepository } from './security-question.repository';

describe('ClientRepository Tests', () => {
    const mockLogger = Logger.prototype;
    const mockDynamoDBClient = DynamoDBClient.prototype;
    let repository: SecurityQuestionRepository;

    beforeEach(() => {
        ['info', 'debug', 'warn', 'error'].forEach((level) => {
            mockLogger[level] = jest.fn();
        });

        repository = new SecurityQuestionRepository(mockLogger, mockDynamoDBClient);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Security Question By Id', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.getSecurityQuestionById('id');
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Create Security Question', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.createSecurityQuestion({
                    questionId: 'id',
                    question: 'question',
                    answer: 'answer',
                    clientId: 'id',
                });
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });

    describe('Update Security Question', () => {
        it('Throws an error because the method is not implemented', async () => {
            try {
                await repository.updateSecurityQuestion({
                    questionId: 'id',
                    question: 'question',
                    answer: 'answer',
                    clientId: 'id',
                });
            } catch (error) {
                expect(error.message).toBe('Method not implemented.');
            }
        });
    });
});
