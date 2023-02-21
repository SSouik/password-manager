/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassProvider, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { ISecurityQuestionRepository } from '@password-manager:api:interfaces';
import { DYNAMODB_CLIENT, LOGGER } from '@password-manager:api:providers';
import { PasswordManagerException } from '@password-manager:api:types';
import { IDynamoDBClient } from '@password-manager:dynamodb-client';
import { ILogger } from '@password-manager:logger';
import { SecurityQuestion } from '@password-manager:types';

@Injectable()
export class SecurityQuestionRepository implements ISecurityQuestionRepository {
    constructor(
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(DYNAMODB_CLIENT)
        private readonly dynamoDBClient: IDynamoDBClient,
    ) {}

    public getSecurityQuestionById(quiestionId: string): Promise<SecurityQuestion> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public createSecurityQuestion(securityQuestion: SecurityQuestion): Promise<SecurityQuestion> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    public updateSecurityQuestion(securityQuestion: SecurityQuestion): Promise<void> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}

export const SECURITY_QUESTION_REPOSITORY: InjectionToken = 'SecurityQuestionRepository';

export default <ClassProvider>{
    provide: SECURITY_QUESTION_REPOSITORY,
    useClass: SecurityQuestionRepository,
};
