/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassProvider, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { ISecurityQuestionRepository } from '@password-manager:api:interfaces';
import { DYNAMODB_CLIENT, LOGGER } from '@password-manager:api:providers';
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
        throw new Error('Method not implemented.');
    }

    public createSecurityQuestion(securityQuestion: SecurityQuestion): Promise<SecurityQuestion> {
        throw new Error('Method not implemented.');
    }

    public updateSecurityQuestion(securityQuestion: SecurityQuestion): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export const SECURITY_QUESTION_REPOSITORY: InjectionToken = 'SecurityQuestionRepository';

export default <ClassProvider>{
    provide: SECURITY_QUESTION_REPOSITORY,
    useClass: SecurityQuestionRepository,
};
