import { ResponseBase } from './ResponseBase';

export type GetSecurityQuestionChallengeResponse = ResponseBase & {
    question: string;
};
