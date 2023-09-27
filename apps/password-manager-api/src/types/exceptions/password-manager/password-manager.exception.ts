import { HttpStatus } from '@nestjs/common';
import { PasswordManagerErrorCodeEnum } from '@password-manager:types';

export class PasswordManagerException implements Error {
    public statusCode: HttpStatus;
    public errorCode: PasswordManagerErrorCodeEnum;
    public name = 'PasswordManagerException';
    public message: string;
    public stack?: string;

    constructor(
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
        code = PasswordManagerErrorCodeEnum.InternalServerError,
        message = 'Internal Server Error',
    ) {
        this.statusCode = statusCode;
        this.errorCode = code;
        this.message = message;
    }

    public static badRequest(): PasswordManagerException {
        return new PasswordManagerException(
            HttpStatus.BAD_REQUEST,
            PasswordManagerErrorCodeEnum.BadRequest,
            'Bad Request',
        );
    }

    public static unauthorized(): PasswordManagerException {
        return new PasswordManagerException(
            HttpStatus.UNAUTHORIZED,
            PasswordManagerErrorCodeEnum.Unauthorized,
            'Unauthorized',
        );
    }

    public static forbidden(): PasswordManagerException {
        return new PasswordManagerException(HttpStatus.FORBIDDEN, PasswordManagerErrorCodeEnum.Forbidden, 'Forbidden');
    }

    public static notFound(): PasswordManagerException {
        return new PasswordManagerException(HttpStatus.NOT_FOUND, PasswordManagerErrorCodeEnum.NotFound, 'Not Found');
    }

    public static conflict(): PasswordManagerException {
        return new PasswordManagerException(HttpStatus.CONFLICT, PasswordManagerErrorCodeEnum.Conflict, 'Conflict');
    }

    public static internalServerError(): PasswordManagerException {
        return new PasswordManagerException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            PasswordManagerErrorCodeEnum.InternalServerError,
            'Internal Server Error',
        );
    }

    public static notImplemented(): PasswordManagerException {
        return new PasswordManagerException(
            HttpStatus.NOT_IMPLEMENTED,
            PasswordManagerErrorCodeEnum.NotImplemented,
            'Not Implemented',
        );
    }

    public static badGateway(): PasswordManagerException {
        return new PasswordManagerException(
            HttpStatus.BAD_GATEWAY,
            PasswordManagerErrorCodeEnum.BadGateway,
            'Bad Gateway',
        );
    }

    public static serviceUnavailable(): PasswordManagerException {
        return new PasswordManagerException(
            HttpStatus.SERVICE_UNAVAILABLE,
            PasswordManagerErrorCodeEnum.ServiceUnavailable,
            'Service Unavailable',
        );
    }

    public withStatusCode(statusCode: HttpStatus): PasswordManagerException {
        this.statusCode = statusCode;
        return this;
    }

    public withMessage(message: string): PasswordManagerException {
        this.message = message;
        return this;
    }

    public withErrorCode(errorCode: PasswordManagerErrorCodeEnum): PasswordManagerException {
        this.errorCode = errorCode;
        return this;
    }
}
