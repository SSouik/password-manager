// Remove below line after implementing the service
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassProvider, Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IChallengeService, IJWTService, ISecurityQuestionRepository } from '@password-manager:api:interfaces';
import { CRYPTO } from '@password-manager:api:providers';
import { SECURITY_QUESTION_REPOSITORY } from '@password-manager:api:repositories/security-question/security-question.repository';
import { JWT_SERVICE } from '@password-manager:api:services/jwt/jwt.service';
import { PasswordManagerException } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';
import {
    AnswerSecurityQuestionChallengeRequest,
    AnswerSecurityQuestionChallengeResponse,
    GetSecurityQuestionChallengeResponse,
} from '@password-manager:types';

@Injectable()
export class ChallengeService implements IChallengeService {
    constructor(
        @Inject(SECURITY_QUESTION_REPOSITORY)
        private readonly securityQuestionRepository: ISecurityQuestionRepository,
        @Inject(CRYPTO)
        private readonly crypto: Crypto,
        @Inject(JWT_SERVICE)
        private readonly jwtService: IJWTService,
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
    public async getSecurityQuestion(login: string): Promise<GetSecurityQuestionChallengeResponse> {
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
    public async answerSecurityQuestion(
        login: string,
        request: AnswerSecurityQuestionChallengeRequest,
    ): Promise<AnswerSecurityQuestionChallengeResponse> {
        return Promise.reject(PasswordManagerException.notImplemented());
    }
}

export const CHALLENGE_SERVICE: InjectionToken = 'ChallengeService';

export default <ClassProvider>{
    provide: CHALLENGE_SERVICE,
    useClass: ChallengeService,
};
