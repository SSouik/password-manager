// Remove below line after implementing the controller
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Get, Inject, Param, Post, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { IChallengeService } from '@password-manager:api:interfaces';
import { CHALLENGE_SERVICE } from '@password-manager:api:services/challenge/challenge.service';
import { PasswordManagerException } from '@password-manager:api:types';
import {
    AnswerSecurityQuestionChallengeRequest,
    AnswerSecurityQuestionChallengeResponse,
    GetSecurityQuestionChallengeResponse,
} from '@password-manager:types';

@Controller('challenge/:login/security-question')
export class ChallengeController {
    constructor(
        @Inject(CHALLENGE_SERVICE)
        private readonly challengeService: IChallengeService,
    ) {}

    /**
     * Get the security question for the client
     * @param login Login (username) of the client
     * @returns The security question that needs to be answered
     *
     * @remarks
     * This method is dedicated to getting a client's security question.
     *  A client does not need to be logged in to get their question since
     *  this should be used in an unauthenticated password recovery flow. The controller
     *  should get the client's security question from DynamoDB using the client's
     *  login (username) and if all goes well, return the question.
     * @see {@link GetSecurityQuestionChallenge}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when the question/client does not exist (Not found 404)
     * or when DynamoDB is unavailable (Service unavailable 503)
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    public async getSecurityQuestion(@Param('login') login: string): Promise<GetSecurityQuestionChallengeResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }

    /**
     * Validate the security question answer against the answer saved in DynamDB
     * @param login Login (username) of the client
     * @param request Contains the client's answer to the question
     * @returns The client's ID along with an auth token
     *
     * @remarks
     * This method is dedicated to validating a client's answer to
     *  their security question. A client does not need to be logged in
     *  to answer the question since this should be used in the password
     *  recovery flow. The controller should get the security question and the answer
     *  so that it can validate the client's answer against the stored answer in DynamoDB.
     *  The answer in DynamoDB should be decrypted before validating and if
     *  the client answers correctly, a token should be issued.
     *
     * @see {@link AnswerSecurityQuestionChallengeRequest}
     * @see {@link AnswerSecurityQuestionChallengeResponse}
     *
     * @throws {@link PasswordManagerException}
     * This can be thrown when the question/client does not exist (Not found 404)
     * or when the answer is incorrect (Unauthorized 401)
     * or when DynamoDB is unavailable (Service unavailable 503)
     */
    @Post('answer')
    @HttpCode(HttpStatus.OK)
    public async answerSecurityQuestion(
        @Param('login')
        login: string,
        @Body()
        request: AnswerSecurityQuestionChallengeRequest,
    ): Promise<AnswerSecurityQuestionChallengeResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}
