import { HttpStatus } from '@nestjs/common';
import { Password } from '@password-manager:types';

import { GetPasswordsController } from './get-passwords.controller';

describe('GetPasswordsController Tests', () => {
    let controller: GetPasswordsController;

    beforeEach(() => {
        controller = new GetPasswordsController();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Successful results', () => {
        it('Returns the clients passwords', () => {
            const actual = controller.handler('123');

            expect(actual.statusCode).toBe(HttpStatus.OK);
            expect(actual.message).toBe('Ok');
            expect(actual.passwords).toStrictEqual([
                <Password>{
                    passwordId: 'id',
                    name: 'Amazon',
                    website: 'https://amazon.com',
                    login: 'login',
                    value: 'P@ssword123',
                    clientId: '123',
                },
            ]);
        });
    });
});
