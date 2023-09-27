import { HttpStatus } from '@nestjs/common';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';

import { PasswordManagerException } from './password-manager.exception';

describe('PasswordManagerException Tests', () => {
    describe('Bad Request', () => {
        it('Creates a new Bad Request PasswordManagerException', () => {
            const actual = PasswordManagerException.badRequest();

            expect(actual.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(actual.message).toBe('Bad Request');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.BadRequest);
        });
    });

    describe('Unauthorized', () => {
        it('Creates a new Unauthorized PasswordManagerException', () => {
            const actual = PasswordManagerException.unauthorized();

            expect(actual.statusCode).toBe(HttpStatus.UNAUTHORIZED);
            expect(actual.message).toBe('Unauthorized');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.Unauthorized);
        });
    });

    describe('Forbidden', () => {
        it('Creates a new Forbidden PasswordManagerException', () => {
            const actual = PasswordManagerException.forbidden();

            expect(actual.statusCode).toBe(HttpStatus.FORBIDDEN);
            expect(actual.message).toBe('Forbidden');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.Forbidden);
        });
    });

    describe('Not Found', () => {
        it('Creates a new Not Found PasswordManagerException', () => {
            const actual = PasswordManagerException.notFound();

            expect(actual.statusCode).toBe(HttpStatus.NOT_FOUND);
            expect(actual.message).toBe('Not Found');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.NotFound);
        });
    });

    describe('Conflict', () => {
        it('Creates a new Conflict PasswordManagerException', () => {
            const actual = PasswordManagerException.conflict();

            expect(actual.statusCode).toBe(HttpStatus.CONFLICT);
            expect(actual.message).toBe('Conflict');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.Conflict);
        });
    });

    describe('Internal Server Error', () => {
        it('Creates a new Internal Server Error PasswordManagerException', () => {
            const actual = PasswordManagerException.internalServerError();

            expect(actual.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(actual.message).toBe('Internal Server Error');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.InternalServerError);
        });
    });

    describe('Not Implemented', () => {
        it('Creates a new Not Implemented PasswordManagerException', () => {
            const actual = PasswordManagerException.notImplemented();

            expect(actual.statusCode).toBe(HttpStatus.NOT_IMPLEMENTED);
            expect(actual.message).toBe('Not Implemented');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.NotImplemented);
        });
    });

    describe('Bad Gateway', () => {
        it('Creates a new Bad Gateway PasswordManagerException', () => {
            const actual = PasswordManagerException.badGateway();

            expect(actual.statusCode).toBe(HttpStatus.BAD_GATEWAY);
            expect(actual.message).toBe('Bad Gateway');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.BadGateway);
        });
    });

    describe('Service Unavailable', () => {
        it('Creates a new Service Unavailable PasswordManagerException', () => {
            const actual = PasswordManagerException.serviceUnavailable();

            expect(actual.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);
            expect(actual.message).toBe('Service Unavailable');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.ServiceUnavailable);
        });
    });

    describe('With Statuscode', () => {
        it('Adds the status code to the exception and returns the current instance of the PasswordManagerException', () => {
            const exception = PasswordManagerException.internalServerError();
            const actual = exception.withStatusCode(HttpStatus.BAD_REQUEST);

            expect(actual).toBe(exception);

            expect(actual.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(actual.message).toBe('Internal Server Error');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.InternalServerError);
        });
    });

    describe('With Message', () => {
        it('Adds the message to the exception and returns the current instance of the PasswordManagerException', () => {
            const exception = PasswordManagerException.internalServerError();
            const actual = exception.withMessage('Error');

            expect(actual).toBe(exception);

            expect(actual.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(actual.message).toBe('Error');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.InternalServerError);
        });
    });

    describe('With Error Code', () => {
        it('Adds the error code to the exception and returns the current instance of the PasswordManagerException', () => {
            const exception = PasswordManagerException.internalServerError();
            const actual = exception.withErrorCode(PasswordManagerErrorCodeEnum.ServiceUnavailable);

            expect(actual).toBe(exception);

            expect(actual.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(actual.message).toBe('Internal Server Error');
            expect(actual.errorCode).toStrictEqual(PasswordManagerErrorCodeEnum.ServiceUnavailable);
        });
    });
});
