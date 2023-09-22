import {
    AnswerSecurityQuestionChallengeRequest,
    AnswerSecurityQuestionChallengeResponse,
    GetSecurityQuestionChallengeResponse,
} from '@password-manager:types';

export interface IChallengeService {
    getSecurityQuestion(login: string): Promise<GetSecurityQuestionChallengeResponse>;
    answerSecurityQuestion(
        login: string,
        request: AnswerSecurityQuestionChallengeRequest,
    ): Promise<AnswerSecurityQuestionChallengeResponse>;
}
