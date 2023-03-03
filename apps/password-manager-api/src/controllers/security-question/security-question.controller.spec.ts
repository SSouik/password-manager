// Remove after tests are written
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SecurityQuestionController } from './security-question.controller';

describe('SecurityQuestionController Tests', () => {
    let controller: SecurityQuestionController;

    beforeEach(() => {
        controller = new SecurityQuestionController();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // Remove this once test writing as started
    it('Dummy test', () => {
        expect(controller).toBeInstanceOf(SecurityQuestionController);
    });
});
