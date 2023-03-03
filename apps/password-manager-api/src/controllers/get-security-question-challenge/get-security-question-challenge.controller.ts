// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Get, Inject, Param } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ISecurityQuestionRepository } from '@password-manager:api:interfaces';
import { SECURITY_QUESTION_REPOSITORY } from '@password-manager:api:repositories/security-question/security-question.repository';
import { PasswordManagerException } from '@password-manager:api:types';
import { APIUrlsEnum, GetSecurityQuestionChallengeResponse } from '@password-manager:types';

/*
 * Controller: GetSecurityQuestionChallengeController
 * Purpose: Get a client's security question for them to answer
 *
 * Dependencies:
 *  ISecurityQuestionRepository: Needed to get the client's security question
 *
 * Returns:
 *  StatusCode: 200
 *  Body: GetSecurityQuestionResponse
 *
 * Summary:
 *  This controller is dedicated to getting a client's security question.
 *  A client does not need to be logged in to get their question since
 *  this should be used in an unauthenticated password recovery flow. The controller
 *  should get the client's security question from DynamoDB using the client's
 *  login (username) and if all goes well, return the question.
 */

@Controller(APIUrlsEnum.GetSecurityQuestionChallenge)
export class GetSecurityQuestionChallengeController {
    constructor(
        @Inject(SECURITY_QUESTION_REPOSITORY)
        private readonly securityQuestionRepository: ISecurityQuestionRepository,
    ) {}

    /**
     * Get the security question for the client
     * @param login Login (username) of the client
     * @returns The security question that needs to be answered
     *
     * @see {@link GetSecurityQuestionChallenge}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when the question/client does not exist (Not found 404)
     * or when DynamoDB is unavailable (Service unavailable 503)
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    public async handler(@Param('login') login: string): Promise<GetSecurityQuestionChallengeResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
