import { HttpStatus } from '@nestjs/common';

export class PasswordManagerException<T> implements Error {
    public statusCode: HttpStatus;
    public name = 'PasswordManagerException';
    public message: string;
    public stack?: string;
    public context: T;

    constructor(statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message = 'Internal Server Error', context = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.context = context as T;
    }

    public static create<K>(): PasswordManagerException<K> {
        return new PasswordManagerException();
    }

    public static badRequest<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.BAD_REQUEST, 'Bad Request');
    }

    public static unauthorized<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    public static forbidden<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.FORBIDDEN, 'Forbidden');
    }

    public static notFound<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.NOT_FOUND, 'Not Found');
    }

    public static conflict<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.CONFLICT, 'Conflict');
    }

    public static internalServerError<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }

    public static notImplemented<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.NOT_IMPLEMENTED, 'Not Implemented');
    }

    public static badGateway<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.BAD_GATEWAY, 'Bad Gateway');
    }

    public static serviceUnavailable<K>(): PasswordManagerException<K> {
        return new PasswordManagerException(HttpStatus.SERVICE_UNAVAILABLE, 'Service Unavailable');
    }

    public withStatusCode(statusCode: HttpStatus): PasswordManagerException<T> {
        this.statusCode = statusCode;
        return this;
    }

    public withMessage(message: string): PasswordManagerException<T> {
        this.message = message;
        return this;
    }

    public withContext(context: T): PasswordManagerException<T> {
        this.context = context;
        return this;
    }
}
