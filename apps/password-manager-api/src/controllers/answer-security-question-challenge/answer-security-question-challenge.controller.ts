// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Post, Inject, Param, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { IJWTService, ISecurityQuestionRepository } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { SECURITY_QUESTION_REPOSITORY } from '@password-manager:api:repositories/security-question/security-question.repository';
import { JWT_SERVICE } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import {
    AnswerSecurityQuestionChallengeRequest,
    AnswerSecurityQuestionChallengeResponse,
    APIUrlsEnum,
} from '@password-manager:types';

/*
 * Controller: AnswerSecurityQuestionChallengeController
 * Purpose: Validate the client's answer to the security question against the stored answer
 *
 * Dependencies:
 *  ISecurityQuestionRepository: Needed to get the client's security question and answer
 *  Crypto: Needed to decrypt the answer to the question
 *  IJWTService: Needed to issue the client a token
 *
 * Returns:
 *  StatusCode: 200
 *  Body: AnswerSecurityQuestionChallengeResponse
 *
 * Summary:
 *  This controller is dedicated to validating a client's answer to
 *  their security question. A client does not need to be logged in
 *  to answer the question since this should be used in the password
 *  recovery flow. The controller should get the security question and the answer
 *  so that it can validate the client's answer against the stored answer in DynamoDB.
 *  The answer in DynamoDB should be decrypted before validating and if
 *  the client answers correctly, a token should be issued.
 */

@Controller(APIUrlsEnum.AnswerSecurityQuestionChallenge)
export class AnswerSecurityQuestionChallengeController {
    constructor(
        @Inject(SECURITY_QUESTION_REPOSITORY)
        private readonly securityQuestionRepository: ISecurityQuestionRepository,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
        @Inject(JWT_SERVICE)
        private readonly jwtService: IJWTService,
    ) {}

    /**
     * Validate the security question answer against the answer saved in DynamDB
     * @param login Login (username) of the client
     * @param request Contains the client's answer to the question
     * @returns The client's ID along with an auth token
     *
     * @see {@link AnswerSecurityQuestionChallengeRequest}
     * @see {@link AnswerSecurityQuestionChallengeResponse}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when the question/client does not exist (Not found 404)
     * or when the answer is incorrect (Unauthorized 401)
     * or when DynamoDB is unavailable (Service unavailable 503)
     */
    @Post()
    @HttpCode(HttpStatus.OK)
    public async handler(
        @Param('login')
        login: string,
        @Body()
        request: AnswerSecurityQuestionChallengeRequest,
    ): Promise<AnswerSecurityQuestionChallengeResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
