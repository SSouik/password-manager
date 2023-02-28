import { HttpStatus } from '@nestjs/common';
import { PasswordRepository } from '@password-manager:api:repositories/password/password.repository';
import { PasswordManagerException } from '@password-manager:api:types';

import { DeletePasswordController } from './delete-password.controller';

describe('CreatePasswordController Tests', () => {
    const mockPasswordRepository = PasswordRepository.prototype;
    let controller: DeletePasswordController;

    beforeEach(() => {
        controller = new DeletePasswordController(mockPasswordRepository);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // Remove this test after the controller is implemented
    it('Method not implemented', async () => {
        try {
            await controller.handler('id');
        } catch (error) {
            expect(error).toBeInstanceOf(PasswordManagerException);

            const exception = error as PasswordManagerException<unknown>;
            expect(exception.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
            expect(exception.message).toBe('Not Implemented');
        }
    });

    // Place all unit tests for successful results (status code 202) here
    describe('Successful Results', () => {});

    // Place all unit tests for not found results (status code 404) here
    describe('Not Found Results', () => {});

    // Place all unit tests for service unavailable results (status code 503) here
    describe('Service Unavailable Results', () => {});
});
