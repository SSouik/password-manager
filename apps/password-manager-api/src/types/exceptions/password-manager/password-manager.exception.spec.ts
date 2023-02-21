import { HttpStatus } from '@nestjs/common';

import { PasswordManagerException } from './password-manager.exception';

type TestType = {
    foo: string;
    bar: number;
};

describe('PasswordManagerException Tests', () => {
    describe('Create', () => {
        it('Creates a new PasswordManagerException', () => {
            const actual = PasswordManagerException.create<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(actual.message).toBe('Internal Server Error');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Bad Request', () => {
        it('Creates a new Bad Request PasswordManagerException', () => {
            const actual = PasswordManagerException.badRequest<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(actual.message).toBe('Bad Request');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Unauthorized', () => {
        it('Creates a new Unauthorized PasswordManagerException', () => {
            const actual = PasswordManagerException.unauthorized<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.UNAUTHORIZED);
            expect(actual.message).toBe('Unauthorized');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Forbidden', () => {
        it('Creates a new Forbidden PasswordManagerException', () => {
            const actual = PasswordManagerException.forbidden<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.FORBIDDEN);
            expect(actual.message).toBe('Forbidden');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Not Found', () => {
        it('Creates a new Not Found PasswordManagerException', () => {
            const actual = PasswordManagerException.notFound<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.NOT_FOUND);
            expect(actual.message).toBe('Not Found');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Conflict', () => {
        it('Creates a new Conflict PasswordManagerException', () => {
            const actual = PasswordManagerException.conflict<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.CONFLICT);
            expect(actual.message).toBe('Conflict');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Internal Server Error', () => {
        it('Creates a new Internal Server Error PasswordManagerException', () => {
            const actual = PasswordManagerException.internalServerError<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(actual.message).toBe('Internal Server Error');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Not Implemented', () => {
        it('Creates a new Not Implemented PasswordManagerException', () => {
            const actual = PasswordManagerException.notImplemented<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
            expect(actual.message).toBe('Not Implemented');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Bad Gateway', () => {
        it('Creates a new Bad Gateway PasswordManagerException', () => {
            const actual = PasswordManagerException.badGateway<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.BAD_GATEWAY);
            expect(actual.message).toBe('Bad Gateway');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('Service Unavailable', () => {
        it('Creates a new Service Unavailable PasswordManagerException', () => {
            const actual = PasswordManagerException.serviceUnavailable<TestType>();

            expect(actual.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
            expect(actual.message).toBe('Service Unavailable');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('With Statuscode', () => {
        it('Adds the status code to the exception and returns the current instance of the PasswordManagerException', () => {
            const exception = PasswordManagerException.create<TestType>();
            const actual = exception.withStatusCode(HttpStatus.BAD_REQUEST);

            expect(actual).toBe(exception);

            expect(actual.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(actual.message).toBe('Internal Server Error');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('With Message', () => {
        it('Adds the message to the exception and returns the current instance of the PasswordManagerException', () => {
            const exception = PasswordManagerException.create<TestType>();
            const actual = exception.withMessage('Error');

            expect(actual).toBe(exception);

            expect(actual.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(actual.message).toBe('Error');
            expect(actual.context).toStrictEqual({} as TestType);
        });
    });

    describe('With Context', () => {
        it('Adds the context to the exception and returns the current instance of the PasswordManagerException', () => {
            const exception = PasswordManagerException.create<TestType>();
            const actual = exception.withContext({ foo: 'bar', bar: 123 });

            expect(actual).toBe(exception);

            expect(actual.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(actual.message).toBe('Internal Server Error');
            expect(actual.context).toStrictEqual(<TestType>{ foo: 'bar', bar: 123 });
        });
    });
});
